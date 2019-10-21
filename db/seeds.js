const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Car = require('../models/Car')
const User = require('../models/User')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'Giedrius',
            email: 'g@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'John Bell',
            email: 'Jb@email.com',
            password: 'passat',
            passwordConfirmation: 'passat'
          },
          {
            username: 'Jay Leno',
            email: 'jl@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'user1',
            email: 'user1@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'Marty McFly',
            email: 'marty@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'James Bond',
            email: 'james@mi6.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          }
        ])
      })
      .then(users => {
        console.log(`${users.length} users created`)
        return Car.create([
          {
            make: 'Audi',
            model: '80',
            yearOfMake: 1984,
            fuelType: 'petrol',
            mileage: 6000000,
            isAvailable: true,
            otherFeatures: ['working stereo', 'power steering'],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsOPSeqxx2QTDeOEvi15nNhXBf185cir4RmpMvTIFVj5vMPKlG',
            price: 50,
            user: users[1]
          },
          {
            make: 'Nissan',
            model: 'Skyline GTR',
            yearOfMake: '1990',
            fuelType: 'petrol',
            mileage: 100000,
            isAvailable: true,
            image: 'https://www.torque-gt.co.uk/media/catalog/product/cache/5db5e42708a7605f533ac6f6b3874018/d/s/dsc00867a.jpg',
            price: 200,
            user: users[0]
          },
          {
            make: 'Porsche',
            model: '911',
            yearOfMake: 1973,
            fuelType: 'petrol',
            mileage: 6000000,
            isAvailable: true,
            image: 'https://www.sportscarmarket.com/wp-content/uploads/2018/06/1973-porsche-911-carrera-rs-2-7-lightweight-front-1.jpg',
            price: 2000,
            user: users[1]
          },
          {
            make: 'Ferrari',
            model: '288 GTO',
            yearOfMake: 1985,
            fuelType: 'petrol',
            mileage: 6000000,
            isAvailable: true,
            image: 'https://silodrome.com/wp-content/uploads/2017/07/Ferrari-288-GTO-2-1600x1067.jpg',
            price: 5000,
            user: users[1]
          },
          {
            make: 'Jaguar',
            model: 'E-Type',
            yearOfMake: 1963,
            fuelType: 'petrol',
            mileage: 6000,
            isAvailable: true,
            image: 'https://cdn2.mecum.com/auctions/sc0519/sc0519-370069/images/2-1551884418319.jpg?1557940798000',
            price: 1000,
            user: users[2]
          },
          {
            make: 'Ford',
            model: 'GT40',
            yearOfMake: 1966,
            fuelType: 'petrol',
            mileage: 6000,
            isAvailable: true,
            image: 'https://cdn1.mecum.com/auctions/ca0816/ca0816-244573/images/ca0816-244573_1@2x.jpg?1471029388000',
            price: 1500,
            user: users[3]
          },
          {
            make: 'Delorean',
            model: 'DMC-12',
            yearOfMake: 1980,
            fuelType: 'EV',
            mileage: 6000,
            isAvailable: true,
            image: 'https://car-images.bauersecure.com/pagefiles/25366/000000delorean-10.jpg',
            price: 500,
            user: users[4]
          },
          {
            make: 'Porsche',
            model: '356',
            yearOfMake: 1956,
            fuelType: 'Petrol',
            mileage: 600000,
            isAvailable: true,
            image: 'https://assets.hemmings.com/uimage/66822580-770-0@2X.jpg?rev=1',
            price: 500,
            user: users[3]
          }, {
            make: 'Aston Martin',
            model: 'DB5',
            yearOfMake: 1956,
            fuelType: 'Petrol',
            mileage: 600000,
            isAvailable: true,
            image: 'https://www.historics.co.uk/media/1592771/aston-martin-db5-1.jpg?anchor=center&mode=crop&width=1000',
            price: 1000,
            user: users[5]
          }
        ])
      })
      .then(cars => console.log(`${cars.length} Cars created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)