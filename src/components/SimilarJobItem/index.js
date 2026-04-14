// Write your code here
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <div className="similar-job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-logo"
        />
        <div>
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-rating-container">
            <AiFillStar className="similar-star" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-heading-small">Description</h1>
      <p className="similar-description">{jobDescription}</p>

      <div className="similar-location-type">
        <div className="similar-icon-text">
          <MdLocationOn className="similar-icon" />
          <p className="similar-text">{location}</p>
        </div>
        <div className="similar-icon-text">
          <MdBusinessCenter className="similar-icon" />
          <p className="similar-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
