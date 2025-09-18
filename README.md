


# 📋 DIY Project Tracker

A full-stack **DIY Project Tracker** web application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. It allows users to **register, log in, add, view, and delete DIY projects** in a modern and responsive interface styled with **Bootstrap** and custom **CSS**.

---

## 🚀 Features
- 🔑 **User Authentication** – Secure session-based login and signup system.  
- ➕ **Add Projects** – Log and organize your DIY ideas.  
- 📜 **View All Projects** – Browse your projects in a clean dashboard.  
- 🗑 **Delete Projects** – Easily remove projects.  
- 🎨 **Modern UI** – Responsive Bootstrap design with custom styling.  
- 🗄 **MongoDB Database** – Stores user info and project data.  

---

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript, Bootstrap, EJS  
- **Backend:** Node.js, Express.js, Express-Session  
- **Database:** MongoDB (Mongoose ODM)  
- **Version Control:** Git & GitHub  

---

## 📦 Installation
1. **Clone the repository**  
   ```bash
   git clone https://github.com/treee27/DIY_Project_Tracker.git
   cd DIY_Project_Tracker
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```
3. **Set up environment variables**  
   Create a `.env` file in the root directory:  
   ```
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   PORT=3000
   ```
4. **Start the server**  
   ```bash
   npm start
   ```
5. Visit the app at:  
   ```
   http://localhost:3000
   ```

---

## 🧰 Usage
- **Sign up or log in** to create a personal account.  
- Use the dashboard to **add**, **view**, and **delete** your DIY projects.  
- Log out securely when done.  

---

---

## 🗂 Folder Structure
```
DIY_Project_Tracker/
├── public/           # Static assets (CSS, JS, images)
├── views/            # EJS templates
├── routes/           # Express routes
├── models/           # Mongoose schemas
├── app.js            # Entry point
├── .env              # Environment variables
├── .gitignore        # Ignored files and folders
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

---

## 🤝 Contributing
Contributions are welcome!  
1. Fork this repository.  
2. Create a new branch (`git checkout -b feature-name`).  
3. Commit your changes (`git commit -m "Add feature"`).  
4. Push to the branch (`git push origin feature-name`).  
5. Open a Pull Request.  

