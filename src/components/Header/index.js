import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutSuccess = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="logo"
      />
      <button type="button" className="logout-button" onClick={logoutSuccess}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
