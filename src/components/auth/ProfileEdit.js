import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import ProfileForm from './ProfileForm'

class ProfileEdit extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: null,
      errors: {}
    }
    this.formTitle = 'Update Your Profile'
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {

    const profile = { ...this.state.profile, [e.target.name]: e.target.value }
    console.log(e.target.name, e.target.value)
    this.setState({ profile })
  }
  handleSubmit(e) {
    e.preventDefault()
    axios.put('/api/profile', this.state.profile, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => console.log(res.data.profile))
      .then(() => this.props.history.push('/profile'))
      .catch(err => this.setState({ errors: err }))
  }

  componentDidMount() {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ profile: res.data }, this.getCars))
      .catch(err => console.log('errors', err))
  }

  render() {
    console.log(this.state.errors)
    if (!this.state.profile) return null
    return (
      <>
        <ProfileForm
          profile={this.state.profile}
          errors={this.state.errors}
          formTitle={this.formTitle}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    )
  }
}
export default ProfileEdit