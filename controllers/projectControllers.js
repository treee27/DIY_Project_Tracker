const Project = require('../models/Project');
const path = require('path');
const fs = require('fs');

// Show all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.render('index', { projects });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, materials, status, progress, startDate, dueDate } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    await Project.create({
      title,
      description,
      materials,
      imagePath,
      status,
      progress,
      startDate,
      dueDate
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create project');
  }
};

// Show edit form
exports.getEditForm = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send('Project not found');
  res.render('edit', { project });
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, materials, status, progress, startDate, dueDate } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');

    // Delete old image if a new one is uploaded
    if (req.file && project.imagePath) {
      const oldPath = path.join(__dirname, '..', project.imagePath);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      project.imagePath = `/uploads/${req.file.filename}`;
    } else if (req.file) {
      project.imagePath = `/uploads/${req.file.filename}`;
    }

    // Update all fields
    project.title = title;
    project.description = description;
    project.materials = materials;
    project.status = status;
    project.progress = progress;
    project.startDate = startDate;
    project.dueDate = dueDate;

    await project.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update project');
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');

    // Delete image file
    if (project.imagePath) {
      const imgPath = path.join(__dirname, '..', project.imagePath);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete project');
  }
};
