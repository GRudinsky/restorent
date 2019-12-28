import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../../lib/auth'


class CarsShow extends React.Component {
  constructor() {
    super()
    this.state = {
      car: null
    },
    this.handleReviewDelete = this.handleReviewDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
 
  isOwner(value) {
    return Auth.getPayload().sub === value
  }

  handleChange(e) {
    const data = { ...this.state.text, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleReviewSubmit(e) {
    e.preventDefault()
    axios.post(`/api/cars/${this.state.car._id}/comments`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ car: res.data }))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }
  handleReviewDelete(e) {
    if (confirm('Are you sure about this?')) {
      const commentId = e.target.id
      axios.delete(`/api/cars/${this.state.car._id}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(res => this.setState({ car: res.data }))
        .catch(err => console.log(err))
    }
  }
  commentTime(value) {
    const time = new Date(value)
    return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

  }
  handleDelete() {
    if (confirm('Are you sure about this?')) {
      const carId = this.props.match.params.id
      axios.delete(`/api/cars/${carId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(() => this.props.history.push('/cars'))
        .catch(err => console.log(err))
    }
  }

  componentDidMount() {
    const carId = this.props.match.params.id
    // console.log('mounting showpage', carId)
    axios.get(`/api/cars/${carId}`)
      .then(res => this.setState({ car: res.data }))
      .catch(err => console.log(err))
  }
  render() {
    if (!this.state.car) return null
    const { car } = this.state
    return (
      <section className="section">
        <div className="container">
          <h2 className="title">{`${car.make} ${car.model}`}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={car.image} alt={`${car.make} ${car.model}`} />
              </figure>
            </div>
            <div className="column is-half">
              <p className="subtitle is-5">{`Year Produced: ${car.yearOfMake}`}</p>
              <p className="subtitle is-5">{`Mileage: ${car.mileage}`}</p>
              <p className="subtitle is-5">{`Fuel type: ${car.fuelType}`}</p>
              <p className="subtitle is-5">{`Owned by: ${this.isOwner(this.state.car.user._id) && 'You' || car.user.username}`}</p>
              <p className="subtitle is-5">{`Currently Available for bookings: ${car.isAvailable && 'Yes' || 'No'}`}</p>
              <hr />
              <h2 className="title is-5">{`Daily Price: ${car.price}£`}</h2>
              <hr />
              {this.isOwner(this.state.car.user._id) &&
                <div className="field is-grouped">
                  <Link to={`/cars/${car._id}/edit`} className="button is-link">
                    Edit car
                  </Link>
                  <button onClick={this.handleDelete} className="button is-danger">Delete car</button>
                </div>
              }
            </div>
          </div>
          <hr />
          <div className="column">
            <h4 className="title is-4">Reviews:</h4>
            {car.comments.map(comment => (
              <article className="message is-dark" key={comment._id}>
                <div className="message-header">
                  <p>{`${this.commentTime(comment.createdAt)} By: ${this.isOwner(comment.user._id) && 'You' || comment.user.username}`}</p>
                  {this.isOwner(comment.user._id) &&
                    <>
                      <button id={comment._id} onClick={this.handleReviewDelete} className="delete" aria-label="delete"></button>
                    </>}
                </div>
                <div className="message-body">
                  {comment.text}
                </div>
              </article>
            ))}
            <hr />
            {Auth.isAuthenticated() &&
              <>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <div onClick={this.handleReviewSubmit} className="button is-link">
                      Leave Review
                    </div>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <textarea
                          className="textarea"
                          placeholder="Your review here"
                          name="text"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>}
          </div>
        </div>
      </section >
    )
  }
}
export default CarsShow