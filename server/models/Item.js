const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  desc: {
    type: String
  },
  images: {
    type: Array,
    default: []
  },
  views: {
    type: Number,
    default: 0
  },
  places: {
    type: Number,
    default: 1
  },
  conditions: {
    type: Number,
    default: 1
  }
}, {timestamps: true})


const Item = mongoose.model('Item', itemSchema)

module.exports = { Item } 