const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate('user', 'username email');
  res.status(200).json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    'user',
    'username email'
  );

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.status(200).json(project);
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Please add title and description');
  }

  const project = await Project.create({
    title,
    description,
    imageUrl,
    repoUrl,
    liveUrl,
    user: req.user._id,
  });

  res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProject);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user owns the project
  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await project.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
