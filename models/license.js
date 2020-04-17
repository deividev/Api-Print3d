const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const License = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  }},{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  
});



module.exports = mongoose.model('License', License);