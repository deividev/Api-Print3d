const mongoose = require('mongoose');


const Model = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true
  },
  userId: {
    type: String,
    require: true,
    trim: true
  },
  userName: {
    type: String,
    require: true,
    trim: true
  },
  img: {
    type: String,
    required: false,
    trim: true
  },
  model: {
    type: String,
    required: false,
    trim: true
  },
  likes: {
    type: Number,
    required: false,
    trim: true
  },
  downloads: {
    type: Number,
    required: false,
    trim: true
  },
  categories: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  settings: {
    type: String,
    required: false,
    trim: true
  },
  custom: {
    type: String,
    required: false,
    trim: true
  },
  license: {
    type: String,
    trim: true
  },
  tags: {
    type: String,
    required: false,
    trim: true
  }},{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

module.exports = mongoose.model('Model', Model);