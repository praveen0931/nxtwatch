/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import Popup from 'reactjs-popup'
import {FiSearch} from 'react-icons/fi'
import {BsX} from 'react-icons/bs'
import HeaderRoute from '../HeaderRoute'
import ThemeContext from '../../Context/ThemeContext'
import CategoryItems from '../CategoryItems'
import {
  InputSearchContainer,
  InputElement,
} from '../StyledComponent/styledcomponent'
// import HeaderRoute from '../HeaderRoute'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class HomeRoute extends Component {
  state = {
    isPopup: true,
    apiStatus: apiStatusConstants.initial,
    nxtWatchList: [],
    searchData: '',
  }

  componentDidMount = () => {
    this.getNetWatchDetails()
    this.setState({isPopup: true})
  }

  getNetWatchDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const {searchData} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchData}`
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
      // console.log(updatedFetchedData)
      this.setState({
        nxtWatchList: updatedFetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  closeBannerSection = () => {
    this.setState({isPopup: false})
  }

  renderingBannerSection = () => {
    const {isPopup} = this.state
    return isPopup ? (
      <div className="popup-container" data-testid="banner">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
            className="banner-logo"
          />
          <p>Buy Nxt watch Premium Prepaid Plans With UPI</p>
          <button type="button">GET IT NOW</button>
        </div>
        <button
          type="button"
          className="close-button-icon"
          onClick={this.closeBannerSection}
          data-testid="close"
        >
          <BsX />
        </button>
      </div>
    ) : null
  }

  nxtWatchSuccessFetchedData = () => (
    <ThemeContext>
      {value => {
        const {theme} = value
        const {nxtWatchList} = this.state
        return nxtWatchList.length > 0 ? (
          <div className="home-videos-bg-container">
            <ul className="home-videos-bg-container">
              {nxtWatchList.map(eachList => (
                <Link
                  to={`/videos/${eachList.id}`}
                  className="home-link-videos"
                >
                  <li key={eachList.id} className="home-list-container">
                    <img
                      src={eachList.thumbnailUrl}
                      alt="video thumbnail"
                      className="thumbnail-image"
                    />
                    <div className="home-profile-image-container">
                      <img
                        src={eachList.profileImageUrl}
                        alt="channel logo"
                        className="profile-image"
                      />
                      <div>
                        <p
                          className={
                            theme ? 'dark-heading-data' : 'light-heading-data '
                          }
                        >
                          {eachList.title}
                        </p>
                        <p
                          className={
                            theme ? 'dark-heading-data' : 'light-heading-data '
                          }
                        >
                          {eachList.name}
                        </p>
                        <div className="home-views-container">
                          <p
                            className={
                              theme
                                ? 'dark-heading-data'
                                : 'light-heading-data '
                            }
                          >
                            {eachList.viewCount} views
                          </p>
                          <p
                            className={
                              theme
                                ? 'dark-heading-data'
                                : 'light-heading-data '
                            }
                          >
                            {formatDistanceToNow(
                              new Date(eachList.publishedAt),
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
        ) : (
          <div className="failure-bg-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              alt="no videos"
              className="failure-image"
            />
            <h1
              className={
                theme ? 'dark-failure-heading' : 'dark-failure-heading'
              }
            >
              No Search results found
            </h1>
            <p className={theme ? 'dark-heading-data' : 'light-heading-data '}>
              Try different key words or remove search filter
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

  retryFailureData = () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    this.getNetWatchDetails()
  }

  nxtWatchFailureFetchedData = () => (
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

  nxtWatchLoadingFetchedData = () => (
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
        return this.nxtWatchSuccessFetchedData()
      case apiStatusConstants.failure:
        return this.nxtWatchFailureFetchedData()
      case apiStatusConstants.isLoading:
        return this.nxtWatchLoadingFetchedData()
      default:
        return null
    }
  }

  changeSearch = event => {
    this.setState({searchData: event.target.value}, this.getNetWatchDetails)
  }

  searchInput = event => {
    // this.setState({apiStatus: apiStatusConstants.isLoading})

    if (event.key === 'Enter') {
      this.getNetWatchDetails()
    }
  }

  render() {
    const {searchData} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {theme} = value
          return (
            <div data-testid="home">
              <HeaderRoute />
              <div className="content-bg-container">
                <CategoryItems />
                <div
                  data-testid="banner"
                  className={
                    theme
                      ? 'dark-banner-fetched-container'
                      : 'light-banner-fetched-container'
                  }
                >
                  {this.renderingBannerSection()}
                  <InputSearchContainer
                    inputTheme={theme}
                    data-testid="searchButton"
                  >
                    <InputElement
                      type="search"
                      placeholder="Search"
                      onChange={this.changeSearch}
                      onKeydown={this.searchInput}
                      value={searchData}
                    />
                    <FiSearch
                      data-testid="searchButton"
                      className={
                        theme ? 'dark-search-icon' : 'light-search-icon'
                      }
                    />
                  </InputSearchContainer>
                  {this.renderingFetchedData()}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default HomeRoute
