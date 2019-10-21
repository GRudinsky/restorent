const router = require('express').Router()
const cars = require('../controller/cars')
const users = require('../controller/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/cars')
  .post(secureRoute, cars.create)
  .get(cars.index)

router.route('/cars/:id')
  .get(cars.show)
  .delete(secureRoute, cars.remove)
  .put(secureRoute, cars.update)

router.route('/cars/:id/comments')
  .post(secureRoute, cars.comment)

router.route('/cars/:id/comments/:commentId')
  .delete(secureRoute, cars.removeComment)


router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profile')
  .get(secureRoute, users.profile)

module.exports = router