const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true, unique: true },
  yearOfMake: { type: Number, required: true },
  fuelType: { type: String, required: true },
  mileage: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  otherFeatures: { type: [String] },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

// carSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Car', carSchema)