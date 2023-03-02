import {Component} from 'react'
import ReactPlayer from 'react-player'
// import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import HeaderRoute from '../HeaderRoute'
import CategoryItems from '../CategoryItems'
import ThemeContext from '../../Context/ThemeContext'
import {
  VideoPlayerBgContainer,
  VideoDetailsContainer,
  ViewsLikesBgContainer,
  ViewsBgContainer,
  LikesBgContainer,
  VideoDetailsHeading,
  VideoDetailsList,
  VideoDetails,
  VideoDetailsUnContainer,
} from '../StyledComponent/styledcomponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class VideoItemDetails extends Component {
  state = {
    videosDetailsList: [],
    isLike: false,
    isDislike: false,
    isSave: false,
    apiStatus: apiStatusConstants.initial,
    //  activeButton: 'Save',
  }

  componentDidMount() {
    this.getVideosDetails()
  }

  getVideosDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    //  console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    //  console.log(response)
    if (response.ok === true) {
      const videosData = await response.json()
      // console.log(videosData)
      const updateVideos = {
        name: videosData.video_details.channel.name,
        profileImageUrl: videosData.video_details.channel.profile_image_url,
        subscriberCount: videosData.video_details.channel.subscriber_count,
        description: videosData.video_details.description,
        id: videosData.video_details.id,
        publishedAt: videosData.video_details.published_at,
        thumbnailUrl: videosData.video_details.thumbnail_url,
        title: videosData.video_details.title,
        videoUrl: videosData.video_details.video_url,
        viewCount: videosData.video_details.view_count,
      }
      //  console.log(updateVideos)
      this.setState({
        videosDetailsList: updateVideos,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderingVideoDetails = () => (
    <ThemeContext.Consumer>
      {value => {
        const {theme, addVideos} = value
        const {
          videosDetailsList,
          isLike,
          isSave,
          isDislike,
          activeButton,
        } = this.state

        const like = () => {
          this.setState({isLike: true, isDislike: false})
        }

        const dislike = () => {
          this.setState({isLike: false, isDislike: true})
        }

        const {
          videoUrl,
          title,
          viewCount,
          publishedAt,
          profileImageUrl,
          name,
          subscriberCount,
          description,
          id,
        } = videosDetailsList
        // console.log(formatDistanceToNow(new Date(publishedAt)))
        const saveVideos = () => {
          addVideos(id)
          this.setState({isSave: true})
        }
        const removeSaveVideos = () => {
          console.log(id)
          // this.setState({isSave: false, activeButton: 'Save'})
        }

        return (
          <VideoDetailsUnContainer videoTheme={theme}>
            <ReactPlayer url={videoUrl} width="950px" height="400px" controls />
            <VideoDetailsHeading VideoDetailsHeadingTheme={theme}>
              {title}
            </VideoDetailsHeading>
            <ViewsLikesBgContainer>
              <ViewsBgContainer>
                <VideoDetails VideoDetailsViewsTheme={theme}>
                  {viewCount} views
                </VideoDetails>
                <VideoDetailsList VideoDetailsListTheme={theme}>
                  {publishedAt}
                </VideoDetailsList>
              </ViewsBgContainer>
              <LikesBgContainer>
                <button
                  type="button"
                  className="save-button"
                  onClick={like}
                  value={isLike}
                >
                  <BiLike
                    className={`${
                      theme ? 'dark-react-icons' : 'light-react-icons'
                    } ${isLike && 'like-button'}`}
                  />
                  <p
                    className={`${
                      theme ? 'dark-description' : 'light-description'
                    } 
                      ${isLike && 'save-description'}`}
                  >
                    Like
                  </p>
                </button>

                <button
                  type="button"
                  className="save-button"
                  value={isDislike}
                  onClick={dislike}
                >
                  <BiDislike
                    className={`${
                      theme ? 'dark-react-icons' : 'light-react-icons'
                    } ${isDislike && 'like-button'}`}
                  />
                  <p
                    className={`${
                      theme ? 'dark-description' : 'light-description'
                    } ${isDislike ? 'save-description' : 'save-descriptionF'}`}
                  >
                    Dislike
                  </p>
                </button>

                {isSave ? (
                  <button
                    type="button"
                    className="save-button"
                    onClick={removeSaveVideos}
                    value={activeButton}
                  >
                    <BiListPlus
                      className={`${
                        theme ? 'dark-react-icons' : 'light-react-icons'
                      } ${isSave && 'save-description'}`}
                    />
                    <p
                      className={`${
                        theme ? 'dark-description' : 'light-description'
                      } ${isSave && 'save-description'}`}
                    >
                      {isSave && 'Saved'}
                    </p>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="save-button"
                    onClick={saveVideos}
                    value={activeButton}
                  >
                    <BiListPlus
                      className={`${
                        theme ? 'dark-react-icons' : 'light-react-icons'
                      } ${!isSave && 'save-descriptionF'}`}
                    />
                    <p
                      className={`${
                        theme ? 'dark-description' : 'light-description'
                      } ${!isSave && 'save-descriptionF'}`}
                    >
                      {!isSave && 'Save'}
                    </p>
                  </button>
                )}
              </LikesBgContainer>
            </ViewsLikesBgContainer>
            <hr className="hr-line" />
            <div className="videos-bg-context-container">
              <img
                src={profileImageUrl}
                alt="channel logo"
                className="video-profile-logo"
              />
              <div>
                <VideoDetailsHeading VideoDetailsHeadingTheme={theme}>
                  {name}
                </VideoDetailsHeading>
                <VideoDetails VideoDetailsViewsTheme={theme}>
                  {subscriberCount} subscribers
                </VideoDetails>
                <VideoDetails VideoDetailsViewsTheme={theme}>
                  {description}
                </VideoDetails>
              </div>
            </div>
          </VideoDetailsUnContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  retryFailureData = () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    this.getVideosDetails()
  }

  nxtWatchVideosFailureFetchedData = () => (
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
              We are having some trouble to complete your request. Please try
              again.
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

  nxtWatchLoadingVideosFetchedData = () => (
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

  renderingEachVideoDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderingVideoDetails()
      case apiStatusConstants.failure:
        return this.nxtWatchVideosFailureFetchedData()
      case apiStatusConstants.isLoading:
        return this.nxtWatchLoadingVideosFetchedData()
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
              <VideoPlayerBgContainer>
                <CategoryItems />
                <VideoDetailsContainer
                  videoTheme={theme}
                  data-testid="videoItemDetails"
                >
                  {this.renderingEachVideoDetails()}
                </VideoDetailsContainer>
              </VideoPlayerBgContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
