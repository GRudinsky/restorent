const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/car-market'
const port = process.env.PORT || 4000
const secretIngredient = process.env.SECRET || 'pssst'

module.exports = {
  dbURI,
  port,
  secretIngredient
}