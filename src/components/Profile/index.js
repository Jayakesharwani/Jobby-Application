// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="profile-loader" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-retry-container">
      <button type="button" className="retry-btn" onClick={this.getProfileData}>
        Retry
      </button>
    </div>
  )

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, shortBio, profileImageUrl} = profileData

    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-section">{this.renderProfileDetails()}</div>
  }
}

export default Profile
