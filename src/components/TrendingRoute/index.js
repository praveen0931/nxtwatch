import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFirefoxBrowser} from 'react-icons/fa'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import HeaderRoute from '../HeaderRoute'
import CategoryItems from '../CategoryItems'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class TrendingRoute extends Component {
  state = {apiStatus: apiStatusConstants.initial, nxtWatchTrendingList: []}

  componentDidMount() {
    this.getTrendingDetails()
  }

  getTrendingDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)

    const url = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedFetchedData = fetchedData.videos.map(fetchedDataList => ({
        name: fetchedDataList.channel.name,
        profileImageUrl: fetchedDataList.channel.profile_image_url,
        id: fetchedDataList.id,
        publishedAt: fetchedDataList.published_at,
        thumbnailUrl: fetchedDataList.thumbnail_url,
        title: fetchedDataList.title,
        viewCount: fetchedDataList.view_count,
      }))
      //   console.log(updatedFetchedData)
      this.setState({
        nxtWatchTrendingList: updatedFetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  nxtWatchTrendingSuccessFetchedData = () => (
    <ThemeContext>
      {value => {
        const {theme} = value
        const {nxtWatchTrendingList} = this.state
        return (
          <div className="trending-videos-container">
            <ul className="trending-videos-container">
              {nxtWatchTrendingList.map(eachTrendingList => (
                <Link
                  to={`/videos/${eachTrendingList.id}`}
                  className="trending-link-videos"
                >
                  <li
                    key={eachTrendingList.id}
                    className="trending-list-container"
                  >
                    <img
                      src={eachTrendingList.thumbnailUrl}
                      alt="video thumbnail"
                      className="thumbnail-image"
                    />
                    <div className="home-profile-image-container">
                      <img
                        src={eachTrendingList.profileImageUrl}
                        alt={eachTrendingList.name}
                        className="profile-image"
                      />
                      <div>
                        <p
                          className={
                            theme ? 'dark-heading-data' : 'light-heading-data '
                          }
                        >
                          {eachTrendingList.title}
                        </p>
                        <p
                          className={
                            theme ? 'dark-heading-data' : 'light-heading-data '
                          }
                        >
                          {eachTrendingList.name}
                        </p>
                        <div className="home-views-container">
                          <p
                            className={
                              theme
                                ? 'dark-heading-data'
                                : 'light-heading-data '
                            }
                          >
                            {eachTrendingList.viewCount} views
                          </p>
                          <p
                            className={
                              theme
                                ? 'dark-heading-data'
                                : 'light-heading-data '
                            }
                          >
                            {formatDistanceToNow(
                              new Date(eachTrendingList.publishedAt),
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )
      }}
    </ThemeContext>
  )

  retryFailureData = () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    this.getTrendingDetails()
  }

  nxtWatchTrendingFailureFetchedData = () => (
    <ThemeContext>
      {value => {
        const {theme} = value
        const failureImage = theme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="failure-bg-container">
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
          </div>
        )
      }}
    </ThemeContext>
  )

  nxtWatchLoadingTrendingFetchedData = () => (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value
        return (
          <div
            className={
              theme ? 'dark-loader-container' : 'light-loader-container'
            }
            data-testid="loader"
          >
            <Loader
              type="ThreeDots"
              color={theme ? '#f9f9f9' : '#0f0f0f'}
              height="50"
              width="50"
            />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderingFetchedData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.nxtWatchTrendingSuccessFetchedData()
      case apiStatusConstants.failure:
        return this.nxtWatchTrendingFailureFetchedData()
      case apiStatusConstants.isLoading:
        return this.nxtWatchLoadingTrendingFetchedData()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext>
        {value => {
          const {theme} = value
          return (
            <div>
              <HeaderRoute />
              <div
                className={
                  theme
                    ? ' dark-trending-bg-container'
                    : ' light-trending-bg-container'
                }
              >
                <CategoryItems />

                <div className="fetching-data-container">
                  <div
                    className={
                      theme
                        ? 'dark-heading-container'
                        : 'light-heading-container'
                    }
                  >
                    <FaFirefoxBrowser
                      className={
                        theme
                          ? 'dark-react-icons-trending'
                          : 'light-react-icons-trending'
                      }
                    />
                    <h1 className={theme ? 'dark-heading' : 'light-heading'}>
                      Trending
                    </h1>
                  </div>

                  {this.renderingFetchedData()}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext>
    )
  }
}

export default TrendingRoute
