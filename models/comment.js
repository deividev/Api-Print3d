const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new mongoose.Schema({
  username: {
    type: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
    required: false,
  },
  modelId: {
    type: { type : mongoose.Schema.Types.ObjectId, ref: 'Model' },
    required: false,
  },
  message: {
    type: String,
    required: false,
    trim: true
  }},{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});



module.exports = mongoose.model('Comment', Comment);