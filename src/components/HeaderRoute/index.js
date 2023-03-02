/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/img-redundant-alt */
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiSun} from 'react-icons/fi'
import {HiMoon} from 'react-icons/hi'
import Popup from 'reactjs-popup'
import ThemeContext from '../../Context/ThemeContext'
import {
  PopupLogoutContainer,
  PopupLogoutDescription,
  PopupModeButtonContainer,
  CancelButtonNav,
  // ConfirmButtonNav,
} from '../StyledComponent/styledcomponent'

import './index.css'

const HeaderRoute = props => (
  <ThemeContext.Consumer>
    {value => {
      const {theme, changeTheme} = value

      const onClickChangeTheme = () => {
        changeTheme()
      }

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const navClassName = theme ? 'darkTheme ' : 'lightTheme'
      const navImage = theme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      return (
        <nav className={navClassName}>
          <Link to="/">
            <img
              src={navImage}
              alt="website logo"
              className={theme ? 'nav-logo' : 'nav-logo'}
            />
          </Link>
          <ul className="nav-card-container">
            <button
              type="button"
              onClick={onClickChangeTheme}
              className="button-icon"
            >
              {theme ? (
                <FiSun className="react-icon-sun" />
              ) : (
                <HiMoon className="react-icon" />
              )}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
              alt="profile"
              className="profile-logo"
            />
            <Popup
              trigger={
                <button
                  type="button"
                  className={theme ? 'dark-button' : 'light-button'}
                  data-testid="theme"
                >
                  Logout
                </button>
              }
            >
              {close => (
                <PopupLogoutContainer bgColor={theme}>
                  <PopupLogoutDescription colorDec={theme}>
                    Are you sure, you want to logout
                  </PopupLogoutDescription>
                  <PopupModeButtonContainer cancelTheme={theme}>
                    <CancelButtonNav type="button" onClick={() => close()}>
                      Cancel
                    </CancelButtonNav>
                    <button
                      className="confirm-button"
                      type="button"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </PopupModeButtonContainer>
                </PopupLogoutContainer>
              )}
            </Popup>
          </ul>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)
export default withRouter(HeaderRoute)
