import React from 'react'

const CarsForm = ({ data, handleChange, handleSubmit, errors }) => (
  <form onSubmit={handleSubmit}>
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field">
          <label className="label">Make</label>
          <div className="control">
            <input
              className={`input ${errors.make ? 'is-danger' : ''}`}
              placeholder="Make"
              name="make"
              onChange={handleChange}
              value={data.make}
            />
          </div>
          {errors.make && <small className="help is-danger">{errors.make.slice(errors.make.length - 9, -1)}</small>}
        </div>
        <div className="field">
          <label className="label">Model</label>
          <div className="control">
            <input
              className={`input ${errors.model ? 'is-danger' : ''} is-half`}
              placeholder="Model"
              name="model"
              onChange={handleChange}
              value={data.model}
            />
          </div>
          {errors.model && <small className="help is-danger">{errors.model.slice(errors.model.length - 9, -1)}</small>}
        </div>
      </div>
    </div>
    <div className="field-body">
      <div className="field">
        <label className="label">Fuel Type</label>
        <div className="control">
          <input
            className={`input ${errors.fuelType ? 'is-danger' : ''}`}
            placeholder="Fuel Type"
            name="fuelType"
            onChange={handleChange}
            value={data.fuelType}
          />
        </div>
        {errors.fuelType && <small className="help is-danger">{errors.fuelType.slice(errors.fuelType.length - 9, -1)}</small>}
      </div>

      <div className="field">
        <label className="label">Mileage</label>
        <div className="control">
          <input
            className={`input ${errors.mileage ? 'is-danger' : ''}`}
            placholeder="Mileage"
            name="mileage"
            onChange={handleChange}
            value={data.mileage}
          />
        </div>
        {errors.mileage && <small className="help is-danger">{errors.mileage.slice(errors.mileage.length - 9, -1)}</small>}
      </div>
      <div className="field-body">
        <div className="field">
          <label className="label">Year of Make</label>
          <div className="control">
            <input
              className={`input ${errors.yearOfMake ? 'is-danger' : ''}`}
              placeholder="Year Of Make"
              name="yearOfMake"
              onChange={handleChange}
              value={data.yearOfMake}
            />
          </div>
          {errors.yearOfMake && <small className="help is-danger">{errors.yearOfMake.slice(errors.yearOfMake.length - 9, -1)}</small>}
        </div>
        <div className="field">
          <label className="label">Price, £</label>
          <div className="control">
            <input
              className={`input ${errors.price ? 'is-danger' : ''}`}
              placeholder="Price"
              name="price"
              onChange={handleChange}
              value={data.price}
            />
          </div>
          {errors.price && <small className="help is-danger">{errors.price.slice(errors.price.length - 9, -1)}</small>}
        </div>
      </div>
    </div>
    <div className="field">
      <label className="label">Image</label>
      <div className="control">
        <input
          className={`input ${errors.image ? 'is-danger' : ''}`}
          placeholder="Image"
          name="image"
          onChange={handleChange}
          value={data.image}
        />
      </div>
      {errors.image && <small className="help is-danger">{errors.image.slice(errors.image.length - 9, -1)}</small>}
    </div>
    <div className="field">
      <label className="label">Other Features</label>
      <div className="control">
        <textarea
          className="textarea"
          placeholder="Other Features"
          name="otherFeatures"
          onChange={handleChange}
          value={data.otherFeatures}
        />
      </div>
    </div>
    <div className="field is-horizontal">
      <div className="field-body is-">
        <label className="label">Make Available</label>
      </div>
      <div className="field-body is-expanded">
        <div className="control is-horizontal-flex">
          <label className="label is-flex-child">Yes</label>
          <input
            type="radio"
            className="radio is-flex-child"
            name="isAvailable"
            value="true"
            // checked={data.isAvailable === 'true' && true || false}
            onChange={handleChange}
          />
        </div>
        <div className="control is-horizontal-flex">
          <label className="label is-flex-child">No</label>
          <input
            type="radio"
            className="radio is-flex-child"
            name="isAvailable"
            value="false"
            // checked={data.isAvailable === 'false' && false || true}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>

    <button type="submit" className="button is-link is-fullwidth">Create Car</button>
  </form>
)

export default CarsForm