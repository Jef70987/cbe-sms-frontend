import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout'
import Dashboard from './components/dashboard'
import Profile from './components/profile'
import Attendance from './components/attendance'
import Grades from './components/grades'
import Fees from './components/fees'
import Timetable from './components/timetable'
import Library from './components/library'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="grades" element={<Grades />} />
          <Route path="fees" element={<Fees />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="library" element={<Library />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App