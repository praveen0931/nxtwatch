import React from 'react'

const ThemeContext = React.createContext({
  changeTheme: () => {},
  activeTabId: '',
  theme: false,
  savedVideosList: [],
  addVideos: () => {},
  removeVideos: () => {},
  isSave: false,
  /* onClickHomeButton: () => {},
  onClickTrendingButton: () => {},
  onClickGamingButton: () => {}, */
})
export default ThemeContext
