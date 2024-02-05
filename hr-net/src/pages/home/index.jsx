import React, { useRef, useState } from "react"
import { Link } from 'react-router-dom'
import data from "../../data/data.json"
import Modal from "../../component/modal"
import style from "./home.module.css"


function Home() {
  const firstName = useRef(null)
  const lastName = useRef(null)
  const dateOfBirth = useRef(null)
  const startDate = useRef(null)
  const department = useRef(null)
  const street = useRef(null)
  const city = useRef(null)
  const state = useRef(null)
  const zipCode = useRef(null)
  const [isModalVisible, updateIsModalVisible] = useState(false)

  const mainInputList = [
    { "inputId": "first-name", "label": "First Name", "type": "text", "ref": firstName },
    { "inputId": "last-name", "label": "Last Name", "type": "text", "ref": lastName },
    { "inputId": "date-of-birth", "label": "Date of Birth", "type": "text", "ref": dateOfBirth },
    { "inputId": "start-date", "label": "Start Date", "type": "text", "ref": startDate }
  ]

  const addresseInputList = [
    { "inputId": "street", "label": "Street", "type": "text", "ref": street },
    { "inputId": "city", "label": "City", "type": "text", "ref": city },
    { "inputId": "state", "label": "State", "type": "select", "ref": state },
    { "inputId": "zip-code", "label": "Zip Code", "type": "number", "ref": zipCode }
  ]

  const handleSubmit = () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || []
    const employee = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      startDate: startDate.value,
      department: department.value,
      street: street.value,
      city: city.value,
      state: state.value,
      zipCode: zipCode.value
    }
    employees.push(employee)
    localStorage.setItem('employees', JSON.stringify(employees))
    updateIsModalVisible(true)
  }

  return (
    <React.Fragment>
      <header className="container">
        <h1>HRnet</h1>
      </header>
      <main className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>

        <form action="#" id="create-employee" className={style.createForm}>

          {mainInputList.map(({ inputId, label, type, ref }) => (
            <div key={inputId}>
              <label htmlFor={inputId}>{label}</label>
              <input type={type} id={inputId} ref={ref} />
            </div>
          ))}

          <fieldset className={style.address}>
            <legend>Address</legend>
            {addresseInputList.map(({ inputId, label, type, ref }) => {
              return (
                <div key={inputId}>
                  <label htmlFor={inputId}>{label}</label>
                  {type !== "select" ?
                    <input id={inputId} type={type} ref={ref} />
                    : <select
                      name={inputId}
                      id={inputId}>
                      {data.states.map(({ name, abbreviation }) => (
                        <option key={abbreviation} value={abbreviation}>
                          {name}
                        </option>
                      ))}
                    </select>
                  }
                </div>
              )
            })}
          </fieldset>

          <label htmlFor="department">
            Department
          </label>
          <select
            name="department"
            id="department"
            ref={department}>
            {data.departmentList.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </form>
        <button onClick={handleSubmit}>Save</button>
      </main>
      {isModalVisible &&
        <Modal methodeOff={() => updateIsModalVisible(false)} />
      }
    </React.Fragment>

  )
}

export default Home
