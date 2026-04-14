// Write your code here
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const {changeEmploymentType, changeSalaryRange} = props

  const onSelectEmploymentType = event => {
    changeEmploymentType(event.target.id)
  }

  const onSelectSalaryRange = event => {
    changeSalaryRange(event.target.id)
  }

  const renderEmploymentFilter = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              className="checkbox"
              onChange={onSelectEmploymentType}
            />
            <label htmlFor={each.employmentTypeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderSalaryRangeFilter = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="filter-item">
            <input
              type="radio"
              name="salary"
              id={each.salaryRangeId}
              className="radio"
              onChange={onSelectSalaryRange}
            />
            <label htmlFor={each.salaryRangeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div>
      {renderEmploymentFilter()}
      <hr className="separator" />
      {renderSalaryRangeFilter()}
    </div>
  )
}

export default FiltersGroup
