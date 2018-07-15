const mongoose = require('mongoose')

const model = mongoose.model('Item', {
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