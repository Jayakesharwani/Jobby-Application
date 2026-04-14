// Write your code here
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiHome} from 'react-icons/bi'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        {/* Large devices */}
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>

        {/* Mobile Devices */}
        <ul className="nav-mobile-icons">
          <li>
            <Link to="/">
              <BiHome className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsBriefcaseFill className="nav-icon" />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-icon-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="nav-icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
