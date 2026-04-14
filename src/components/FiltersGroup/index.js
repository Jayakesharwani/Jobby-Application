import './index.css'

// Employment Types
const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

// Salary
const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

// ✅ Location List (IMPORTANT)
const locationsList = [
  {label: 'Hyderabad', locationId: 'HYDERABAD'},
  {label: 'Bangalore', locationId: 'BANGALORE'},
  {label: 'Chennai', locationId: 'CHENNAI'},
  {label: 'Delhi', locationId: 'DELHI'},
  {label: 'Mumbai', locationId: 'MUMBAI'},
]

const FiltersGroup = props => {
  const {
    updateEmploymentTypesChecked,
    updateSalaryRangeId,
    activeSalaryRangeId,
    updateLocationsChecked,
  } = props

  // Employment
  const renderEmploymentTypesList = () =>
    employmentTypesList.map(each => (
      <li key={each.employmentTypeId} className="fliters-list-item">
        <input
          type="checkbox"
          id={each.employmentTypeId}
          className="checkbox-input"
          onChange={() => updateEmploymentTypesChecked(each.employmentTypeId)}
        />
        <label htmlFor={each.employmentTypeId} className="filter-label">
          {each.label}
        </label>
      </li>
    ))

  const renderEmploymentTypes = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">{renderEmploymentTypesList()}</ul>
    </>
  )

  // ✅ Locations
  const renderLocationsList = () =>
    locationsList.map(each => (
      <li key={each.locationId} className="fliters-list-item">
        <input
          type="checkbox"
          id={each.locationId}
          className="checkbox-input"
          onChange={event =>
            updateLocationsChecked(each.locationId, event.target.checked)
          }
        />
        <label htmlFor={each.locationId} className="filter-label">
          {each.label}
        </label>
      </li>
    ))

  const renderLocations = () => (
    <>
      <h1 className="filter-heading">Location</h1>
      <ul className="filters-list">{renderLocationsList()}</ul>
    </>
  )

  // Salary
  const renderSalaryRangesList = () =>
    salaryRangesList.map(each => {
      const isChecked = each.salaryRangeId === activeSalaryRangeId

      return (
        <li key={each.salaryRangeId} className="fliters-list-item">
          <input
            type="radio"
            id={each.salaryRangeId}
            name="salary"
            className="checkbox-input"
            checked={isChecked}
            onChange={() => updateSalaryRangeId(each.salaryRangeId)}
          />
          <label htmlFor={each.salaryRangeId} className="filter-label">
            {each.label}
          </label>
        </li>
      )
    })

  const renderSalaryRanges = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">{renderSalaryRangesList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderLocations()} {/* ✅ REQUIRED */}
      <hr className="separator" />
      {renderSalaryRanges()}
    </div>
  )
}

export default FiltersGroup
