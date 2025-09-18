const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Project = require('../models/Project');
const bcrypt = require('bcryptjs');
const ensureAuth = require('../middleware/auth');

const {
  createProject,
  getEditForm,
  updateProject,
  deleteProject
} = require('../controllers/projectControllers');
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}
/**
 * ✅ Home route – show all projects
 */
router.get('/', ensureAuth,async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // newest first
    res.render('index', { projects });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * ✅ Show add-project form
 * Must come before /projects/:id to avoid CastError
 */
// router.get('/projects/new', (req, res) => {
//   res.render('add'); // add.ejs contains your add project form
// });
router.get('/projects/new',(req, res) => res.render('add'));
router.get('/projects/list', ensureAuth,async (req, res) => {
  const projects = await Project.find();
  res.render('list', { projects });
});

/**
 * ✅ Create a new project (form submission)
 */
router.post('/projects', ensureAuth,upload.single('image'), createProject);

/**
 * ✅ Edit form for an existing project
 */
router.get('/projects/:id/edit', getEditForm);

/**
 * ✅ Update a project
 */
router.put('/projects/:id', ensureAuth,upload.single('image'), updateProject);

/**
 * ✅ Delete a project
 */
router.delete('/projects/:id', ensureAuth,deleteProject);
router.get('/projects/:id', ensureAuth,async (req, res) => {
  // validate ObjectId before querying
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('Invalid project ID');
  }
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send('Project not found');
    res.render('project', { project });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
/**
 * ✅ View single project details
 * Must come after /projects/new to prevent "new" being treated as ObjectId
 */
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.render('project', { project });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
