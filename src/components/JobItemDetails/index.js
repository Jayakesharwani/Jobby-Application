// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import SkillItem from '../SkillItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(each => ({
      name: each.name,
      imageUrl: each.image_url,
    })),
  })

  getSimilarJobsFormatted = each => ({
    id: each.id,
    title: each.title,
    companyLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    jobDescription: each.job_description,
    location: each.location,
    rating: each.rating,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedJobDetails = this.getFormattedData(data.job_details)
      const updatedSimilarJobs = data.similar_jobs.map(each =>
        this.getSimilarJobsFormatted(each),
      )
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} />
    </div>
  )

  onRetryJobDetails = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="job-details-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsSuccess = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="job-card">
          <div className="job-header">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-logo"
            />
            <div>
              <h1 className="job-details-title">{title}</h1>
              <div className="details-rating-container">
                <AiFillStar className="star" />
                <p className="details-rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-role-package">
            <div className="location-type">
              <div className="icon-text">
                <MdLocationOn className="icon" />
                <p className="details-text">{location}</p>
              </div>
              <div className="icon-text">
                <MdBusinessCenter className="icon" />
                <p className="details-text">{employmentType}</p>
              </div>
            </div>

            <p className="details-package">{packagePerAnnum}</p>
          </div>

          <hr className="separator" />

          <div className="desc-visit">
            <h1 className="details-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit
            </a>
          </div>

          <p className="details-description">{jobDescription}</p>

          <h1 className="details-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <SkillItem key={each.name} skillDetails={each} />
            ))}
          </ul>

          <h1 className="details-heading">Life at Company</h1>
          <div className="life-container">
            <p className="life-description">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-image"
            />
          </div>
        </div>

        <h1 className="details-heading similar-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(each => (
            <SimilarJobItem key={each.id} jobDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccess()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-bg">{this.renderFinalView()}</div>
      </>
    )
  }
}

export default JobItemDetails
