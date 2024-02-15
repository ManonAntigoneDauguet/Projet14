import React, { useContext } from "react"
import style from "./employeeList.module.css"
import { Link } from 'react-router-dom'
// data
import { EmployeeListContext } from "../../utils/context"
import mockedData from "../../data/mockedData.json"
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
      "name": "Start Date"
    },
    {
      "key": "department",
      "name": "Department"
    },
    {
      "key": "dateOfBirth",
      "name": "Date of Birth"
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
        <Link to="/">Home</Link>
        <CustomTable
          columns={columns}
          // data={employeeList}
          data={mockedData.mockedUsers}
        />
      </main>
    </React.Fragment>
  )
}

export default EmployeeList