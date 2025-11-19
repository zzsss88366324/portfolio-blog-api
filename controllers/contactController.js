const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const newMessage = await Message.create({
    name,
    email,
    message,
  });

  res.status(201).json(newMessage);
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.status(200).json(messages);
});

module.exports = {
  createMessage,
  getMessages,
};
