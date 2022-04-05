const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
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
  place: {
    type: Number,
    default: 1
  }
}, {timestamps: true})


const Product = mongoose.model('Product', productSchema)

module.exports = { Product } 