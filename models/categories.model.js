const mongoose = require('mongoose');


const Categories = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }},{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  
});



module.exports = mongoose.model('Categories', Categories);