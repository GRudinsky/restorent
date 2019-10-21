import React from 'react'
import { Link } from 'react-router-dom'


const CarCard = ({ make, model, image, price, _id, isAvailable }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`cars/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{`${make} ${model}`}</h4>
        </div>
        <div className="card-image">
          <figure className="image is-3by2">
            <img src={image} alt={make, model} />
          </figure>
          <div className="card-content">
            <h5 className="title is-6">{isAvailable && 'Available' || 'Not Available'}</h5>
            <h6 className="title is-6">{`Daily Price: ${price}£`}</h6>
          </div>
        </div>
      </div>
    </Link>
  </div>
)

export default CarCard