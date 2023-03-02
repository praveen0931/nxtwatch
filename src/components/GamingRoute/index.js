import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import HeaderRoute from '../HeaderRoute'
import CategoryItems from '../CategoryItems'
import ThemeContext from '../../Context/ThemeContext'
import {
  GameDataContainer,
  GameImage,
  GameDetailsContainer,
  GameListContainer,
  GameHeading,
  GameRating,
  GamingFailureBgContainer,
  GamingLoadingBgContainer,
  GameDetailsUlContainer,
} from '../StyledComponent/styledcomponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class GamingRoute extends Component {
  state = {apiStatus: apiStatusConstants.initial, gamingList: []}

  componentDidMount() {
    this.getGamingFetchedData()
  }

  getGamingFetchedData = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const gamingData = await response.json()

      const updateGamingData = gamingData.videos.map(eachGame => ({
        id: eachGame.id,
        thumbnailUrl: eachGame.thumbnail_url,
        title: eachGame.title,
        viewCount: eachGame.view_count,
      }))
      this.setState({
        gamingList: updateGamingData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  nxtWatchGamingSuccessFetchedData = () => (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value
        const {gamingList} = this.state
        return (
          // <GameDetailsContainer gameTheme={theme}>
          <GameDetailsUlContainer gameTheme={theme}>
            {gamingList.map(gameList => (
              <Link to={`/videos/${gameList.id}`} className="gaming-link">
                <GameListContainer key={gameList.id}>
                  <GameImage
                    value={gameList.thumbnailUrl}
                    src={gameList.thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <GameHeading gameHeadingTheme={theme}>
                    {gameList.title}
                  </GameHeading>
                  <GameRating gameRatingTheme={theme}>
                    {gameList.viewCount} Watching Worldwide
                  </GameRating>
                </GameListContainer>
              </Link>
            ))}
          </GameDetailsUlContainer>
          //   </GameDetailsContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  retryFailureData = () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    this.getGamingFetchedData()
  }

  nxtWatchGamingFailureFetchedData = () => (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value
        const failureImage = theme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <GamingFailureBgContainer>
            <img
              src={failureImage}
              alt="failure view"
              className="failure-image"
            />
            <h1
              className={
                theme ? 'dark-failure-heading' : 'dark-failure-heading'
              }
            >
              Oops! Something Went Wrong
            </h1>
            <p
              className={
                theme ? 'dark-failure-description' : 'light-failure-description'
              }
            >
              We are having some trouble to complete your request <br />
              Please try again.
            </p>
            <button
              type="button"
              className="failure-retry-button"
              onClick={this.retryFailureData}
            >
              Retry
            </button>
          </GamingFailureBgContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  nxtWatchGamingLoadingFetchedData = () => (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value
        return (
          <GamingLoadingBgContainer data-testid="loader">
            <Loader
              type="ThreeDots"
              color={theme ? '#f9f9f9' : '#0f0f0f'}
              height="50"
              width="50"
            />
          </GamingLoadingBgContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderingGameFetchedData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.nxtWatchGamingSuccessFetchedData()
      case apiStatusConstants.failure:
        return this.nxtWatchGamingFailureFetchedData()
      case apiStatusConstants.isLoading:
        return this.nxtWatchGamingLoadingFetchedData()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {theme} = value
          return (
            <div>
              <HeaderRoute />
              <GameDataContainer>
                <CategoryItems />
                <GameDetailsContainer gameTheme={theme}>
                  <div
                    className={
                      theme
                        ? 'dark-heading-container'
                        : 'light-heading-container'
                    }
                  >
                    <SiYoutubegaming
                      className={
                        theme
                          ? 'dark-react-icons-trending'
                          : 'light-react-icons-trending'
                      }
                    />
                    <h1 className={theme ? 'dark-heading' : 'light-heading'}>
                      Gaming
                    </h1>
                  </div>
                  {this.renderingGameFetchedData()}
                </GameDetailsContainer>
              </GameDataContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default GamingRoute
