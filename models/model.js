const mongoose = require('mongoose');


const Model = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author_id: {
    type: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  img: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    required: true,
    trim: true
  },
  downloads: {
    type: Number,
    required: true,
    trim: true
  },
  categorie_id: {
    type: { type : mongoose.Schema.Types.ObjectId, ref: 'Categories' },
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  settings: {
    type: String,
    required: true,
    trim: true
  },
  custom: {
    type: String,
    required: true,
    trim: true
  },
  license_id: {
    type: { type : mongoose.Schema.Types.ObjectId, ref: 'License' },
  },
  tags: {
    type: String,
    required: true,
    trim: true
  }},{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

module.exports = mongoose.model('Model', Model);