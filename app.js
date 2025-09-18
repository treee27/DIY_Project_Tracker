require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cron = require('node-cron');


const bcrypt = require('bcryptjs');
const path = require('path');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/routes.js');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');





const app = express();
connectDB();

// Middleware
app.use(session({
  secret: 'your-secret-key', // change this in production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/DIY_Project_Tracker' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// after session middleware
app.use((req, res, next) => {
  res.locals.userId = req.session.userId; // accessible in all EJS templates
  next();
});

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));



// View engine
app.set('view engine', 'ejs');
const authRoutes = require('./routes/authRoutes');
// Routes
app.use('/', authRoutes);
app.use('/', projectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
