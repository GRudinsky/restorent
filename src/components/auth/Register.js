import React from 'react'
import axios from 'axios'
import ProfileForm from './ProfileForm'
import SplashScreen from '../common/SplashScreen'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: {
      },
      errors: {},
      loading: false
    }
    this.splashMessage = 'You\'re all set. Now please log in.'
    this.formTitle = 'Create An Account'
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  toggleLoading() {
    const loading = true
    this.setState({ loading })
  }
  handleChange(e) {
    const profile = { ...this.state.profile, [e.target.name]: e.target.value }
    console.log(profile)
    this.setState({ profile })
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log('submitting', this.state.profile)
    axios.post('/api/register', this.state.profile)
      .then(res => console.log(res.data))
      .then(() => {
        this.toggleLoading()
        setTimeout(() => this.props.history.push('/login'), 2000)
      })
      .catch(err => this.setState({ errors: err }))
  }
  render() {
    console.log('rendering', this.state.errors)
    if (this.state.loading) return (
      <SplashScreen
        message={this.splashMessage}
      />
    )
    return (
      <ProfileForm
        profile={this.state.profile}
        errors={this.state.errors}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        formTitle={this.formTitle}
      />
    )
  }
}
export default Register
