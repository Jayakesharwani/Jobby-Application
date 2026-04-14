// Write your code here
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    companyLogoUrl,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-item-link">
      <li className="job-item">
        <div className="job-logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-type-package-container">
          <div className="location-type-container">
            <div className="icon-text-container">
              <MdLocationOn className="icon" />
              <p className="text">{location}</p>
            </div>
            <div className="icon-text-container">
              <MdBusinessCenter className="icon" />
              <p className="text">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>

        <hr className="line" />

        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
