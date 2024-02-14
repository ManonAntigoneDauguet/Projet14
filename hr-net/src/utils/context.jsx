import { useState, createContext } from "react"

export const EmployeeListContext = createContext()

export const EmployeeListProvider = ({ children }) => {
    const [employeeList, setEmployeeList] = useState([])
    const addEmployee = (newEmployee) => {
        setEmployeeList(oldList => [...oldList, newEmployee])
    }

    return (
        <EmployeeListContext.Provider value={{ employeeList, addEmployee }}>
            {children}
        </EmployeeListContext.Provider>
    )
}