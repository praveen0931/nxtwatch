import ThemeContext from '../../Context/ThemeContext'
import {
  NotFoundBgContainer,
  NotFoundDataContainer,
  NotFoundImage,
  NotFoundHeading,
  NotFoundDescription,
} from '../StyledComponent/styledcomponent'
import HeaderRoute from '../HeaderRoute'
import CategoryItems from '../CategoryItems'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {theme} = value
      const images = theme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <div>
          <HeaderRoute />
          <NotFoundDataContainer>
            <CategoryItems />
            <NotFoundBgContainer NotFoundTheme={theme}>
              <NotFoundImage src={images} alt="not found" />
              <NotFoundHeading NotFoundHeadingTheme={theme}>
                Page Not Found
              </NotFoundHeading>
              <NotFoundDescription NotFoundDescriptionTheme={theme}>
                we are sorry, the page you requested could not be found.
              </NotFoundDescription>
            </NotFoundBgContainer>
          </NotFoundDataContainer>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default NotFound
