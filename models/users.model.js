const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
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
    required: true,
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
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});
module.exports = mongoose.model('User', User);