const Car = require('../models/Car')

//create route
function create(req, res, next) {
  req.body.user = req.currentUser
  Car
    .create(req.body)
    .then(car => res.status(201).json(car))
    //     .catch(err => res.status(422).json(err))
    .catch(next)
}

//Index route
function index(req, res) {
  Car
    .find()
    .populate('user')
    .populate('comments.user')
    .then(cars => res.status(200).json(cars))
    .catch(err => console.log(err))
}
//show route
function show(req, res) {
  Car
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(car => {
      if (!car) return res.sendStatus(404).json({ message: 'Request Not Found' })
      res.status(200).json(car)
    })
    .catch(err => res.json(err.message))
}

// delete route
function remove(req, res) {
  Car
    .findById(req.params.id)
    .then(car => {
      if (!car) return res.sendStatus(404).json({ message: 'Request Not Found' })
      if (!car.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      car.remove()
    })
    .then(() => res.sendStatus(204))
    // .catch(err => res.json(err.message))
    .catch(() => res.sendStatus(404))
}

// update route
function update(req, res, next) {
  Car
    .findById(req.params.id)
    .then(car => {
      if (!car) return res.status(404).json({ message: 'Car Not Found' })
      if (!car.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      return car.set(req.body)
    })
    .then(car => car.save())
    .then(car => res.status(202).json(car))
    .catch(next)
}

//comment creating route
function comment(req, res, next) {
  req.body.user = req.currentUser
  Car
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(car => {
      if (!car) return res.status(404).json({ message: 'Car Not Found' })
      car.comments.push(req.body)
      return car.save()
    })
    .then(car => res.status(202).json(car))
    .catch(next)
}
// comment deleting route
function removeComment(req, res) {
  Car
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(car => {
      if (!car) return res.status(404).json({ message: 'Car Not Found' })
      const comment = car.comments.id(req.params.commentId)
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      comment.remove()
      return car.save()
    })
    .then(car => res.status(202).json(car))
    .catch(err => res.json(err))
}

module.exports = {
  create,
  index,
  show,
  remove,
  update,
  comment,
  removeComment
}