/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-pascal-case */
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginRoute from './components/LoginRoute'
// import HeaderRoute from './components/HeaderRoute'
import HomeRoute from './components/HomeRoute'
import TrendingRoute from './components/TrendingRoute'
import ThemeContext from './Context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import GamingRoute from './components/GamingRoute'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import './App.css'

// Replace your code here
class App extends Component {
  state = {theme: false, savedVideosList: [], activeTabId: '', isSave: false}

  changeTheme = () => {
    this.setState(prevState => ({
      theme: !prevState.theme,
    }))
  }

  addVideos = async id => {
    // const {isSave} = this.state
    //  if (isSave === true) {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    const savedData = await response.json()

    const updateSavedVideos = {
      name: savedData.video_details.channel.name,
      profileImageUrl: savedData.video_details.channel.profile_image_url,
      subscriberCount: savedData.video_details.channel.subscriber_count,
      description: savedData.video_details.description,
      id: savedData.video_details.id,
      publishedAt: savedData.video_details.published_at,
      thumbnailUrl: savedData.video_details.thumbnail_url,
      title: savedData.video_details.title,
      videoUrl: savedData.video_details.video_url,
      viewCount: savedData.video_details.view_count,
    }
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, updateSavedVideos],
      // activeTabId: 'Saved',
      isSave: !prevState.isSave,
    }))
    //    }
  }

  render() {
    const {theme, savedVideosList, activeTabId, isSave} = this.state
    // console.log(savedVideosList.length)
    console.log(isSave)
    return (
      <ThemeContext.Provider
        value={{
          theme,
          activeTabId,
          savedVideosList,
          addVideos: this.addVideos,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Redirect exact path="/not-found" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
