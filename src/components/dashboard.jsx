import React from 'react'
import { useEffect, useState } from 'react'
import { fetchStudentInfo, fetchAttendanceSummary, fetchTermlySummary } from '../api/studentApi'
import { AcademicCapIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [student, setStudent] = useState(null)
  const [attendance, setAttendance] = useState(null)
  const [termSummary, setTermSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchStudentInfo(), fetchAttendanceSummary(), fetchTermlySummary()])
      .then(([studentData, attendanceData, termData]) => {
        setStudent(studentData)
        setAttendance(attendanceData)
        setTermSummary(termData)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64 text-white">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-300">Welcome back, {student.first_name}!</p>

      {/* Summary Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Attendance Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Attendance</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {attendance.present} / {attendance.total_days} days
                    </div>
                    <div className="text-sm text-gray-500">
                      Absent: {attendance.absent} | Late: {attendance.late}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
            <div className="text-sm">
              <a href="/attendance" className="font-medium text-blue-600 hover:text-blue-800">
                View details
              </a>
            </div>
          </div>
        </div>

        {/* Current Grade Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AcademicCapIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Current Term Grade</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{termSummary.final_grade}</div>
                    <div className="text-sm text-gray-500">{termSummary.term}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
            <div className="text-sm">
              <a href="/grades" className="font-medium text-blue-600 hover:text-blue-800">
                View full report
              </a>
            </div>
          </div>
        </div>

        {/* Fees Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Fee Balance</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">KES 15,000</div>
                    <div className="text-sm text-gray-500">Due: 15 Mar 2025</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
            <div className="text-sm">
              <a href="/fees" className="font-medium text-blue-600 hover:text-blue-800">
                View statement
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Announcements Card */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-white">Recent Announcements</h2>
        <div className="mt-4 bg-white rounded-lg shadow-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            <li className="px-6 py-4">
              <p className="text-sm font-medium text-gray-900">School closed on Friday for sports day</p>
              <p className="text-sm text-gray-500">Posted 2 days ago</p>
            </li>
            <li className="px-6 py-4">
              <p className="text-sm font-medium text-gray-900">Mid-term exams begin next Monday</p>
              <p className="text-sm text-gray-500">Posted 5 days ago</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}