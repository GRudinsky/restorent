const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secretIngredient } = require('../config/environment')


function register(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(201).json({ Message: `You're all set, ${user.username}!` }))
    .catch(next)
}

function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const token = jwt.sign({ sub: user._id }, secretIngredient, { expiresIn: '8h' })
      res.status(202).json({ message: `Welcome back, ${user.username}`, token })
    })
    .catch(() => res.status(401).json({ message: 'Unauthorized' }))
}
function profile(req, res) {
  User
    .findById(req.currentUser._id)
    .then(user => res.status(200).json(user))
    .catch(err => res.json(err))
}
// profile edit route
function editProfile(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'Not Found' })
      if (!user._id.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      req.body.user = req.currentUser
      return user.set(req.body)
    })
    .then(user => user.save())
    .then(user => res.status(202).json(user))
    .catch(next)
}
module.exports = {
  register,
  login,
  profile,
  editProfile
}