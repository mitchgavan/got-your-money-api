const mongoose = require('mongoose')

const model = mongoose.model('Item', {
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
  }
})

module.exports = model