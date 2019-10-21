import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

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
      .then(res => this.setState({ profile: res.data }))
      .catch(err => console.log('errors', err))
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
        <section className="hero is-dark is-bold is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{`Hi ${this.state.profile.username}`}</h1>
              <h2 className="subtitle">{`Your profile was created ${this.dateAndTime(this.state.profile.createdAt)}`}</h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-multiline">
            </div>
          </div>
        </section>
      </>
    )
  }
}
export default Profile 