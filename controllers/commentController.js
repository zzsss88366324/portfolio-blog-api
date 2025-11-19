const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// @desc    Get all comments for a post
// @route   GET /api/blog/:postId/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.postId);

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort({ createdAt: -1 });

  res.status(200).json(comments);
});

// @desc    Create new comment
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { body } = req.body;

  if (!body) {
    res.status(400);
    throw new Error('Please add a comment');
  }

  const post = await BlogPost.findById(req.params.postId);

  if (!post) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  const comment = await Comment.create({
    body,
    author: req.user._id,
    post: req.params.postId,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    'author',
    'username'
  );

  res.status(201).json(populatedComment);
});

module.exports = {
  getComments,
  createComment,
};
