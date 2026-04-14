// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentTypeList: [],
    salaryRange: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentTypeList, salaryRange} = this.state

    const employmentTypeQuery = employmentTypeList.join(',')
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employmentTypeQuery}&minimum_package=${salaryRange}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        rating: job.rating,
        companyLogoUrl: job.company_logo_url,
        location: job.location,
        employmentType: job.employment_type,
        packagePerAnnum: job.package_per_annum,
        jobDescription: job.job_description,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onChangeEmploymentType = id => {
    this.setState(
      prevState => ({
        employmentTypeList: [...prevState.employmentTypeList, id],
      }),
      this.getJobs,
    )
  }

  onChangeSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobs)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-error-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-text">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobItem key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderJobsSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filters-section">
            <Profile />
            <FiltersGroup
              changeEmploymentType={this.onChangeEmploymentType}
              changeSalaryRange={this.onChangeSalaryRange}
            />
          </div>

          <div className="jobs-section">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.updateSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.renderJobsSection()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
