import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import SplashScreen from '../common/SplashScreen'

class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {
      },
      loading: false
    }
    this.splashMessage = 'Welcome back!'
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }
  toggleLoading() {
    const loading = true
    this.setState({ loading })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.toggleLoading()
        setTimeout(() => this.props.history.push('/cars'), 1000)
      })

      .catch(err => this.setState({ errors: err }))
  }

  render() {
    console.log(Auth.getToken())
    if (this.state.loading) return (
      <SplashScreen
        message={this.splashMessage}
      />
    )
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">Login</h2>
            {this.state.errors.message &&
              <div className="field">
                <div className="control">
                  <button type="button" disabled className="button is-danger is-fullwidth">There was a problem with your login</button>
                </div>
              </div>}
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button type="submit" className="button is-link is-fullwidth">Login</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Login