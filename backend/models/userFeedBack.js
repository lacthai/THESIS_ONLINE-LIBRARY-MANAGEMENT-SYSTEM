const mongoose = require('mongoose')

const userFeedBack = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      gender: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      problem: {
        type: String,
        required: true
      },
      idea: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

    
module.exports = mongoose.model('userfeedback', userFeedBack)