import { useState, createContext } from "react"
import mockedData from "../data/mockedData.json"


export const EmployeeListContext = createContext()

export const EmployeeListProvider = ({ children }) => {
    const isMockedData = false
    let initialValue = []
    if (isMockedData) { initialValue = mockedData.mockedUsers }

    const [employeeList, setEmployeeList] = useState(initialValue)
    const addEmployee = (newEmployee) => {
        if (!isMockedData) {
            setEmployeeList(oldList => [...oldList, newEmployee])
        }
    }

    return (
        <EmployeeListContext.Provider value={{ employeeList, addEmployee }}>
            {children}
        </EmployeeListContext.Provider>
    )
}