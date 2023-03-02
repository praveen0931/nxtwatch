/* eslint-disable jsx-a11y/img-redundant-alt */
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShown: false,
    errorMsg: '',
    isSubmission: false,
  }

  enterUserName = event => {
    this.setState({username: event.target.value})
  }

  enterUserPassword = event => {
    this.setState({password: event.target.value})
  }

  shownPassword = () => {
    this.setState(prevState => ({isShown: !prevState.isShown}))
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({isSubmission: true, errorMsg})
  }

  userLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    console.log(data)
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isShown, isSubmission, errorMsg} = this.state
    const inputType = isShown ? 'text' : 'password'
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="login-image"
          />
          <form className="form-container" onSubmit={this.userLogin}>
            <label htmlFor="username" className="label-heading">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="input-element"
              onChange={this.enterUserName}
              value={username}
            />
            <label htmlFor="password" className="label-heading">
              PASSWORD
            </label>
            <input
              id="password"
              type={inputType}
              placeholder="Password"
              className="input-element"
              onChange={this.enterUserPassword}
              value={password}
            />
            <div className="show-password-container">
              <input
                type="checkbox"
                id="checkbox"
                onClick={this.shownPassword}
              />
              <label htmlFor="checkbox" className="label-heading-show-password">
                Show Password
              </label>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
            {isSubmission && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
