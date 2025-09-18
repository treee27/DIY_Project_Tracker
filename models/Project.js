// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   materials: String,
//   imagePath: String
// });

// module.exports = mongoose.model('Project', projectSchema);

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  materials: String,
  imagePath: String,
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  progress: { type: Number, default: 0 }, // percentage
  startDate: Date,
  dueDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
