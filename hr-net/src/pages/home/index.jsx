import React, { useContext, useRef, useState } from "react"
import style from "./home.module.css"
import { Link } from 'react-router-dom'
// data
import { formatsDepartmentList, formatsStates } from "../../services/dataFormatter.service"
import { EmployeeListContext } from "../../utils/context"
// components
import CustomSelect from "../../component/CustomSelect"
import CustomDatePicker from "../../component/CustomDatePicker"
import { ManonModal } from "manon-projet14"


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
  const { addEmployee } = useContext(EmployeeListContext)

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
    const employee = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      dateOfBirth: dateOfBirth?.toLocaleDateString(),
      startDate: startDate?.toLocaleDateString(),
      department: department,
      street: street.current.value,
      city: city.value,
      state: state,
      zipCode: zipCode.current.value
    }
    updateIsModalVisible(true)
    console.log(employee)
    addEmployee(employee)
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
                : <CustomDatePicker
                  value={ref}
                  setValue={setMethod}
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
                    : <CustomSelect
                      inputId={inputId}
                      options={formatsStates()}
                      setOption={setState}
                    />
                  }
                </div>
              )
            })}
          </fieldset>

          <label htmlFor="department">
            Department
          </label>
          <CustomSelect
            inputId="department"
            options={formatsDepartmentList()}
            setOption={setDepartment}
          />
        </form>
        <button onClick={handleSubmit}>Save</button>
      </main>
      {isModalVisible &&
        <ManonModal text="Employee Created!" onClose={() => updateIsModalVisible(false)} />
      }
    </React.Fragment>
  )
}

export default Home
