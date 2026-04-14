// Write your code here
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />

          <div className="input-container">
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input-field"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
            />
          </div>

          <div className="input-container">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input-field"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginPage
