const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secretIngredient } = require('../config/environment')

function secureRoute(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = req.headers.authorization.replace('Bearer ', '')
  jwt.verify(token, secretIngredient, (err, payload) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' })
    User
      .findById(payload.sub)
      .then(user => {
        if (!user) return res.status(401).json({ message: 'Unauthorized' })
        req.currentUser = user
        next()
      })
      .catch(() => res.status(401).json({ message: 'Unauthorized' }))
  })
}

module.exports = secureRoute