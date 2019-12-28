import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import CarCard from '../cars/CarCard'

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: null,
      cars: null
    }
  }
  componentDidMount() {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ profile: res.data }, this.getCars))
      .catch(err => console.log('errors', err))
  }

  getCars() {
    axios.get('/api/cars')
      .then(res => this.setState({ cars: res.data }))
  }

  getAndFilterUserCars() {
    if (!this.state.cars) return []
    return this.state.cars.filter(car => car.user._id === this.state.profile._id)
  }

  dateAndTime(value) {
    const time = new Date(value)
    return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} at  ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  }

  render() {
    console.log(this.state)
    if (!this.state.profile && !this.state.cars) return null
    return (
      <>
        <section className="hero is-dark is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{`Hi ${this.state.profile.username}`}</h1>
              <h2 className="subtitle">{`Your email address: ${this.state.profile.email}`}</h2>
              <h2 className="subtitle">{`Profile was created: ${this.dateAndTime(this.state.profile.createdAt)}`}</h2>
              <h2 className="subtitle">{`Profile last updated: ${this.state.profile.updatedAt === this.state.profile.createdAt && 'Never' || this.dateAndTime(this.state.profile.updatedAt)}`}</h2>
              <div >
                <Link to="/profile/edit" className="button is-link">
                Update profile
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title">{`Your cars: ${this.getAndFilterUserCars().length}`}</h2>
            {this.getAndFilterUserCars().map(car => (
              <CarCard key={car._id} {...car} />
            ))}
          </div>
        </section>
      </>
    )
  }
}
export default Profile 