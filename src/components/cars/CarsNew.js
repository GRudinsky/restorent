import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import CarsForm from './CarsForm'

class CarsNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    console.log(data, errors)
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('submitted')
    axios.post('/api/cars', this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.props.history.push(`/cars/${res.data._id}`)
      })
      // .catch(err => console.log(err.response.data.errors))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    console.log('rendering cars new', this.state)
    return (
      <section className="section">
        <div className="container">
          <CarsForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
          />
        </div>
      </section>
    )
  }
}

export default CarsNew