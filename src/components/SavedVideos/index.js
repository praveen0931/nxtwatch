import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiListPlus} from 'react-icons/bi'
// import Cookies from 'js-cookie'
import HeaderRoute from '../HeaderRoute'
import CategoryItems from '../CategoryItems'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'
import {
  SavedVideosBgContainer,
  SavedVideoDetailsContainer,
  SavedVideosImage,
  SavedVideoContextBgContainer,
  SavedVideoViewsContainer,
  SavedVideoTitle,
  SavedVideoDescription,
  SavedVideoList,
  SavedVideosLiBgContainer,
  NoVideosHeading,
  NoVideoDescription,
} from '../StyledComponent/styledcomponent'

class SavedVideos extends Component {
  // state = {list: []}

  savedVideosDetails = saveVideo => (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value
        console.log(saveVideo)
        return (
          <Link to={`/videos/${saveVideo.id}`} className="link-decoration">
            <SavedVideosLiBgContainer key={saveVideo.id}>
              <SavedVideosImage
                src={saveVideo.thumbnailUrl}
                alt="video thumbnail"
              />
              <SavedVideoContextBgContainer>
                <SavedVideoTitle savedVideoHeading={theme}>
                  {saveVideo.title}
                </SavedVideoTitle>
                <SavedVideoDescription savedVideoDescriptionTheme={theme}>
                  {saveVideo.name}
                </SavedVideoDescription>
                <SavedVideoViewsContainer>
                  <SavedVideoDescription savedVideoDescriptionTheme={theme}>
                    {saveVideo.viewCount} views
                  </SavedVideoDescription>
                  <SavedVideoList>{saveVideo.publishedAt}</SavedVideoList>
                </SavedVideoViewsContainer>
              </SavedVideoContextBgContainer>
            </SavedVideosLiBgContainer>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {savedVideosList, theme} = value
          console.log(savedVideosList)
          return (
            <div>
              <HeaderRoute />
              <SavedVideosBgContainer saveVideosBgTheme={theme}>
                <CategoryItems />
                <SavedVideoDetailsContainer
                  saveVideosTheme={theme}
                  data-testid="savedVideos"
                >
                  <div
                    className={
                      theme
                        ? 'dark-heading-container'
                        : 'light-heading-container'
                    }
                  >
                    <BiListPlus
                      className={
                        theme
                          ? 'dark-react-icons-trending'
                          : 'light-react-icons-trending'
                      }
                    />
                    <h1 className={theme ? 'dark-heading' : 'light-heading'}>
                      Saved Videos
                    </h1>
                  </div>
                  <div className="saved-list">
                    {savedVideosList.length > 0 ? (
                      savedVideosList.map(eachIdVideo =>
                        this.savedVideosDetails(eachIdVideo),
                      )
                    ) : (
                      <div className="no-videos-bg-container">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                          alt="no saved videos"
                          className="no-videos-image"
                        />
                        <NoVideosHeading NoVideoHeading={theme}>
                          No saved videos found
                        </NoVideosHeading>
                        <NoVideoDescription NoVideoDescriptionTheme={theme}>
                          Save your videos by clicking a button
                        </NoVideoDescription>
                      </div>
                    )}
                  </div>
                </SavedVideoDetailsContainer>
              </SavedVideosBgContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SavedVideos
