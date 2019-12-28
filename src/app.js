import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './style.scss'
import SecureRoute from './components/common/SecureRoute'
import Navbar from './components/common/Navbar'
import CarsIndex from './components/cars/CarsIndex'
import CarsNew from './components/cars/CarsNew'
import CarsShow from './components/cars/CarsShow'
import CarsEdit from './components/cars/CarsEdit'
import Home from './components/common/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/auth/Profile'
import ProfileEdit from './components/auth/ProfileEdit'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <SecureRoute path="/cars/:id/edit" component={CarsEdit} />
        <SecureRoute path="/cars/new" component={CarsNew} />
        <Route path="/cars/:id" component={CarsShow} />
        <Route path="/cars" component={CarsIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile/edit" component={ProfileEdit} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
