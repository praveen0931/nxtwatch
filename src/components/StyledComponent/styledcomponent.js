/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

export const PopupLogoutContainer = styled.div`
  background-color: ${props => (props.bgColor ? '#0f0f0f' : '#f9f9f9')};
  height: 20vh;
  width: 20vw;
  margin-right: 1000px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`
export const PopupLogoutDescription = styled.p`
  font-weight: bold;
  font-family: 'Roboto';
  color: ${props => (props.colorDec ? '#f9f9f9' : '#0f0f0f')};
`

export const PopupModeButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

export const CancelButtonNav = styled.button`
  height: 30px;
  width: 80px;
  background-color: ${props => (props.cancelTheme ? '#f9f9f9' : '#0f0f0f')};
  border-style: 1px;
  border-color: ${props => (props.cancelTheme ? '#0f0f0f' : '#f9f9f9')};
  border-radius: 10px;
  color: ${props => (props.cancelTheme ? '#0f0f0f' : '#f9f9f9')};
  font-weight: bold;
  font-family: 'Roboto';
`
export const ConfirmButtonNav = styled.button`
  height: 30px;
  width: 80px;
  background-color: #3b82f6;
  border-style: none;
  border-color: none;
  border-radius: 10px;
  color: #f9f9f9;
  font-weight: bold;
  font-family: 'Roboto';
`
export const InputSearchContainer = styled.div`
  width: 430px;
  background-color: ${props => (props.inputTheme ? '#f9f9f9' : '#0f0f0f')};
  display: flex;
  margin-left: 68px;
  margin-top: 10px;
  border-width: 1px;
  border-color: black;
`
export const InputElement = styled.input`
  height: 31px;
  padding-left: 7px;
  width: 400px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => (props.inputTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const GameDataContainer = styled.div`
  display: flex;
`
export const GameDetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  // padding-left: 20px;
  // padding-top: 20px;
  background-color: ${props => (props.gameTheme ? '#0f0f0f' : '#f9f9f9')};
`
export const GameDetailsUlContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 40px;
  padding-top: 10px;
  background-color: ${props => (props.gameTheme ? '#0f0f0f' : '#f9f9f9')};
`
export const GameListContainer = styled.li`
  list-style-type: none;
  margin: 10px;
`
export const GameImage = styled.img`
  height: 200px;
`
export const GameHeading = styled.p`
  font-size: 15px;
  color: ${props => (props.gameHeadingTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const GameRating = styled.p`
  font-size: 10px;
  font-weight: bold;
  color: ${props => (props.gameRatingTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const GamingFailureBgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 30px;
`
export const GamingLoadingBgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const NotFoundDataContainer = styled.div`
  display: flex;
`

export const NotFoundBgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.NotFoundTheme ? '#0f0f0f' : '#f9f9f9')};
`
export const NotFoundImage = styled.img`
  height: ${props => !props.imageTheme && '200px'};
`
export const NotFoundHeading = styled.h1`
  font-weight: bold;
  font-size: 35px;
  color: ${props => (props.NotFoundHeadingTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const NotFoundDescription = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: ${props => (props.NotFoundDescriptionTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const VideoPlayerBgContainer = styled.div`
  display: flex;
  width: 100%;
`
export const VideoDetailsContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-top: 20px;
  background-color: ${props => (props.videoTheme ? '#0f0f0f' : '#f9f9f9')};
`
export const VideoDetailsUnContainer = styled.ul`
  width: 100%;
  padding-left: 20px;
  padding-top: 20px;
  background-color: ${props => (props.videoTheme ? '#0f0f0f' : '#f9f9f9')};
`
export const ViewsLikesBgContainer = styled.div`
  display: flex;
  width: 94%;

  justify-content: space-between;
`
export const ViewsBgContainer = styled.div`
  display: flex;
  width: 25%;

  justify-content: space-between;
`
export const LikesBgContainer = styled.div`
  display: flex;
  width: 50%;

  justify-content: space-between;
`
export const LikeDisLikeSaveBgContainer = styled.div`
  display: flex;
  width: 60%;
`
export const VideoDetailsHeading = styled.p`
  font-weight: bold;
  font-size: 20px;
  font-family: 'Roboto';
  color: ${props => (props.VideoDetailsHeadingTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const VideoDetailsViews = styled.p`
  font-weight: bold;
  font-size: 15px;
  color: ${props => props.IsLike && '#3b82f6'}
    ${props => props.IsDislike && '#3b82f6'};
  // color: ${props => (props.VideoDetailsViewsTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const VideoDetails = styled.p`
  font-weight: bold;
  font-size: 15px;
  // color: ${props => props.IsLike && '#3b82f6'}
  //   ${props => props.IsDislike && '#3b82f6'};
  color: ${props => (props.VideoDetailsViewsTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const VideoDetailsList = styled.p`
  font-weight: bold;
  font-size: 15px;
  color: ${props => (props.VideoDetailsListTheme ? '#f9f9f9' : '#0f0f0f')};
  align-self: center;
`

export const SavedVideosBgContainer = styled.div`
  display: flex;
  // background-color: blue;
  margin-top: 0px;
  width: 100%;
  background-color: ${props =>
    props.saveVideosBgTheme ? '#0f0f0f' : '#f9f9f9'};
`
export const SavedVideosLiBgContainer = styled.li`
  display: flex;
  width: 100%;
  list-style-type: none;
`
export const SavedVideoDetailsContainer = styled.ul`
  padding-top: 0px;
  padding-left: 0px;
  // background-color: red;
  margin-top: 0px;
  width: 100%;

  background-color: ${props => (props.saveVideosTheme ? '#0f0f0f' : '#f9f9f9')};
`
export const SavedVideosImage = styled.img`
  height: 200px;
  width: 300px;
  margin-bottom: 15px;
`
export const SavedVideoContextBgContainer = styled.div`
  margin-left: 20px;
  width: 100%;
  margin-bottom: 20px;
`
export const SavedVideoViewsContainer = styled.div`
  display: flex;

  width: 40%;
  align-self: center;
  justify-content: space-between;
`
export const SavedVideoTitle = styled.p`
  font-size: 23px;
  font-weight: bold;
  color: ${props => (props.savedVideoHeading ? '#f9f9f9' : '#0f0f0f')};
  font-family: 'Roboto';
`
export const SavedVideoDescription = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: ${props => (props.savedVideoDescriptionTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const SavedVideoList = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: ${props => (props.savedVideoDescriptionTheme ? '#f9f9f9' : '#0f0f0f')};
  align-self: center;
`
export const NoVideosHeading = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: ${props => (props.NoVideoHeading ? '#f9f9f9' : '#0f0f0f')};
  font-family: 'Roboto';
`
export const NoVideoDescription = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: ${props => (props.NoVideoDescriptionTheme ? '#f9f9f9' : '#0f0f0f')};
`
