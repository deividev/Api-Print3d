const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new mongoose.Schema({
  user_id: {
    type: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
    required: true,
  },
  model_id: {
    type: { type : mongoose.Schema.Types.ObjectId, ref: 'Model' },
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true
  }},{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  
});



module.exports = mongoose.model('Comment', Comment);