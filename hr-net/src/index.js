import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { EmployeeListProvider } from './utils/context'
// pages
import Home from './pages/home'
import EmployeeList from './pages/employeeList'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <EmployeeListProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </EmployeeListProvider>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
