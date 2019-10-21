import React from 'react'
import axios from 'axios'
import CarCard from './CarCard'


class CarsIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      cars: null
    }
  }
  componentDidMount() {
    axios.get('/api/cars')
      .then(res => this.setState({ cars: res.data }))
      .catch(err => console.log('errors', err))
  }
  render() {
    console.log(this.state)
    if (!this.state.cars) return null
    return (
      <>
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.cars.map(car => (
              <CarCard key={car._id} {...car} />
            ))}
          </div>
        </div>
      </section>
      </>
    )
  }
}
export default CarsIndex 