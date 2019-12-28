import React from 'react'
const ProfileForm = ({ profile, errors, handleChange, handleSubmit, formTitle }) => (
  <section className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 className="title">{formTitle}</h2>
        {errors.message &&
          <div className="field">
            <div className="control">
              <button type="button" disabled className="button is-danger is-fullwidth">There was a problem with your registration. All below fields are required.</button>
            </div>
          </div>}
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              name="username"
              placeholder="Username"
              value={profile.username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password Confirmation</label>
          <div className="control">
            <input
              className="input"
              name="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation"
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="button is-link is-fullwidth">{formTitle}</button>
      </form>
    </div>
  </section>
)

export default ProfileForm