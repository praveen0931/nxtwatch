import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFirefoxBrowser} from 'react-icons/fa'
import {BiListPlus} from 'react-icons/bi'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

const CategoryItems = () => (
  <ThemeContext.Consumer>
    {value => {
      const {theme} = value
      return (
        <div
          className={
            theme
              ? 'dark-category-contact-us-bg-container'
              : 'light-category-contact-us-bg-container'
          }
        >
          <div className="category-container">
            <Link to="/" className="link-category">
              <div className="container">
                <AiFillHome
                  className={
                    theme
                      ? 'dark-react-icons-category'
                      : 'light-react-icons-category'
                  }
                />
                <p className={theme ? 'dark-heading' : 'light-heading'}>Home</p>
              </div>
            </Link>
            <Link to="/trending" className="link-category">
              <div className="container">
                <FaFirefoxBrowser
                  className={
                    theme
                      ? 'dark-react-icons-category'
                      : 'light-react-icons-category'
                  }
                />
                <p className={theme ? 'dark-heading' : 'light-heading'}>
                  Trending
                </p>
              </div>
            </Link>
            <Link to="/gaming" className="link-category">
              <div className="container">
                <SiYoutubegaming
                  className={
                    theme
                      ? 'dark-react-icons-category'
                      : 'light-react-icons-category'
                  }
                />
                <p className={theme ? 'dark-heading' : 'light-heading'}>
                  Gaming
                </p>
              </div>
            </Link>
            <Link to="/saved-videos" className="link-category">
              <div className="container">
                <BiListPlus
                  className={
                    theme
                      ? 'dark-react-icons-category'
                      : 'light-react-icons-category'
                  }
                />
                <p className={theme ? 'dark-heading' : 'light-heading'}>
                  Saved videos
                </p>
              </div>
            </Link>
          </div>

          <div className="contact-us-container">
            <p
              className={
                theme ? 'dark-heading-contact-us' : 'light-heading-contact-us'
              }
            >
              CONTACT US
            </p>
            <div className="contact-us-icons-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="contact-us-images"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                alt="twitter logo"
                className="contact-us-images"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                alt="linked in logo"
                className="contact-us-images"
              />
            </div>
            <p className={theme ? 'dark-description' : 'light-description'}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default CategoryItems
