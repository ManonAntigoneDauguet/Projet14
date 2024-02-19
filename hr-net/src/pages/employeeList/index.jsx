import React, { useContext } from "react"
import { Link } from 'react-router-dom'
// data
import { EmployeeListContext } from "../../utils/context"
// components
import CustomTable from "../../component/CustomTable"


function EmployeeList() {
  const { employeeList } = useContext(EmployeeListContext)

  const columns = [
    {
      "key": "firstName",
      "name": "FirstName"
    },
    {
      "key": "lastName",
      "name": "Last Name"
    },
    {
      "key": "startDate",
      "name": "Start Date",
      "date": true
    },
    {
      "key": "department",
      "name": "Department"
    },
    {
      "key": "dateOfBirth",
      "name": "Date of Birth",
      "date": true
    },
    {
      "key": "street",
      "name": "Street"
    },
    {
      "key": "city",
      "name": "City"
    },
    {
      "key": "state",
      "name": "State"
    },
    {
      "key": "zipCode",
      "name": "Zip Code"
    }
  ]

  return (
    <React.Fragment>
      <header className="container">
        <h1>Current Employees</h1>
      </header>
      <main className="container">
        <CustomTable
          columns={columns}
          data={employeeList}
        />
        <Link to="/">Home</Link>
      </main>
    </React.Fragment>
  )
}

export default EmployeeList