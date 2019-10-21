import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
class Navbar extends React.Component {
  constructor() {
    super()
    this.state = { navOpen: false }
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    Auth.logout()
    this.props.history.push('/')
  }
  toggleNavbar() {
    this.setState({ navOpen: !this.state.navOpen })
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navOpen: false })
    }
  }
  render() {
    return (
      <nav className="navbar is-black">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">RestoRent 🏎</Link>
            <a
              className={`navbar-burger ${this.state.navOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu  ${this.state.navOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item has-text-white" to="/cars">Cars</Link>
              {!Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/register">Register</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/profile">My Profile</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item has-text-white" to="/cars/new">Create car</Link>}
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item has-text-white">Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)