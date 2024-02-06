import React, { useRef, useState } from "react"
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { formatsDepartmentList, formatsStates } from "../../services/dataFormatter.service"
import Modal from "../../component/modal"
import style from "./home.module.css"


function Home() {
  const firstName = useRef(null)
  const lastName = useRef(null)
  const street = useRef(null)
  const city = useRef(null)
  const zipCode = useRef(null)
  const [startDate, setStartDate] = useState()
  const [dateOfBirth, setDateOfBirth] = useState()
  const [state, setState] = useState()
  const [department, setDepartment] = useState()
  const [isModalVisible, updateIsModalVisible] = useState(false)

  const mainInputList = [
    { "inputId": "first-name", "label": "First Name", "type": "text", "ref": firstName },
    { "inputId": "last-name", "label": "Last Name", "type": "text", "ref": lastName },
    { "inputId": "date-of-birth", "label": "Date of Birth", "type": "date", "ref": dateOfBirth, "setMethod": setDateOfBirth },
    { "inputId": "start-date", "label": "Start Date", "type": "date", "ref": startDate, "setMethod": setStartDate }
  ]

  const addresseInputList = [
    { "inputId": "street", "label": "Street", "type": "text", "ref": street },
    { "inputId": "city", "label": "City", "type": "text", "ref": city },
    { "inputId": "state", "label": "State", "type": "select", "ref": state, "setMethod": setState },
    { "inputId": "zip-code", "label": "Zip Code", "type": "number", "ref": zipCode }
  ]

  const handleSubmit = () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || []
    const employee = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      department: department,
      street: street.current.value,
      city: city.value,
      state: state,
      zipCode: zipCode.current.value
    }
    employees.push(employee)
    localStorage.setItem('employees', JSON.stringify(employees))
    updateIsModalVisible(true)
    console.log(employee)
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

          {mainInputList.map(({ inputId, label, type, ref, setMethod }) => (
            <div key={inputId}>
              <label htmlFor={inputId}>{label}</label>
              {type !== "date" ?
                <input
                  className={style.input}
                  type={type}
                  id={inputId}
                  ref={ref}
                />
                : <DatePicker
                  className={style.input}
                  value={ref}
                  clearIcon={null}
                  calendarIcon={null}
                  format="MM/dd/y"
                  onChange={(date) => setMethod(date)}
                />
              }
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
                    : <Select
                      name={inputId}
                      id={inputId}
                      options={formatsStates()}
                      className={style.customSelect}
                      onChange={(option) => setState(option)}
                    />
                  }
                </div>
              )
            })}
          </fieldset>

          <label htmlFor="department">
            Department
          </label>
          <Select
            name="department"
            id="department"
            options={formatsDepartmentList()}
            className={style.customSelect}
            onChange={(option) => setDepartment(option)}
          />
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
