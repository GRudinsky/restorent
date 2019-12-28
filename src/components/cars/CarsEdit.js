import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

import CarsForm from './CarsForm'

class CarsEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
      },
      errors: {}
    }
    this.formTitle = 'Edit Your Car'
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    const carId = this.props.match.params.id
    axios.get(`/api/cars/${carId}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('submitted')
    const carId = this.props.match.params.id
    axios.put(`/api/cars/${carId}`, this.state.data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.props.history.push(`/cars/${res.data._id}`)
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }
  handleToggle(e) {
    console.log('toggled', e.target.value)
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <CarsForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleToggle={this.handleToggle}
            errors={this.state.errors}
            formTitle={this.formTitle}
          />
        </div>
      </section>
    )
  }
}

export default CarsEdit
