const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({  
  title: String,
  cost: Number,
  date: Date
})

module.exports = mongoose.model('Item', ItemSchema)