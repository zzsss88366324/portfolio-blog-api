const asyncHandler = require('express-async-handler');
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find()
    .populate('author', 'username email')
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
const getBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id).populate(
    'author',
    'username email'
  );

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Get comments for this post
  const comments = await Comment.find({ post: req.params.id })
    .populate('author', 'username')
    .sort({ createdAt: -1 });

  res.status(200).json({ ...post.toObject(), comments });
});

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private
const createBlogPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add title and content');
  }

  const post = await BlogPost.create({
    title,
    content,
    author: req.user._id,
  });

  const populatedPost = await BlogPost.findById(post._id).populate(
    'author',
    'username email'
  );

  res.status(201).json(populatedPost);
});

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private
const updateBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Check if user is the author
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedPost = await BlogPost.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).populate('author', 'username email');

  res.status(200).json(updatedPost);
});

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Check if user is the author
  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Delete all comments for this post
  await Comment.deleteMany({ post: req.params.id });

  await post.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
