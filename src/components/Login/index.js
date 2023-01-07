import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    showError: false,
    userId: '',
    pinNumber: '',
    errorMsg: '',
  }

  getUserInput = event => {
    this.setState({userId: event.target.value})
  }

  getUserPin = event => {
    this.setState({pinNumber: event.target.value})
  }

  submitDetails = async event => {
    event.preventDefault()
    const {userId, pinNumber} = this.state

    const userDetails = {
      user_id: userId,
      pin: pinNumber,
    }

    console.log(userDetails)

    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  loginFailure = error => {
    this.setState({errorMsg: error, showError: true})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {showError, userId, pinNumber, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-details-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <form className="login-text-container" onSubmit={this.submitDetails}>
            <h1 className="login-heading">Welcome Back!</h1>
            <label htmlFor="input" className="label">
              USER ID
            </label>
            <br />
            <input
              type="text"
              className="input"
              id="input"
              onChange={this.getUserInput}
              value={userId}
            />
            <br />
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <br />
            <input
              type="password"
              className="input"
              id="pin"
              onChange={this.getUserPin}
              value={pinNumber}
            />
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
