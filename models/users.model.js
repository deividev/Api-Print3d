const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  username: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String,
    required: false,
    trim: true
  },
  location: {
    type: String,
    required: false,
    trim: true
  },
  instagram: {
    type: String,
    required: false,
    trim: true
  },
  personalSite: {
    type: String,
    required: false,
    trim: true
  },
  bio: {
    type: String,
    required: false,
    trim: true
  },
  comment_id: {
    type: { type : mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    required: false,
  }},{
    timestamps: true
});
module.exports = mongoose.model('User', User);