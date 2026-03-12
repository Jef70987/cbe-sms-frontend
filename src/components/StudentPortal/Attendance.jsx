import React from 'react'
import { useEffect, useState } from 'react'
import { fetchAttendanceRecords, fetchAttendanceSummary } from '../api/studentApi'

export default function Attendance() {
  const [records, setRecords] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchAttendanceRecords(), fetchAttendanceSummary()]).then(([rec, sum]) => {
      setRecords(rec)
      setSummary(sum)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64 text-white">Loading...</div>

  const statusColors = {
    Present: 'text-green-800 bg-green-100',
    Absent: 'text-red-800 bg-red-100',
    Late: 'text-yellow-800 bg-yellow-100',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-white">Attendance</h1>

      {/* Summary Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5">
          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Present</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-gray-900">{summary.present}</dd>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5">
          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Absent</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-gray-900">{summary.absent}</dd>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5">
          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Late</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-gray-900">{summary.late}</dd>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5">
          <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Days</dt>
          <dd className="mt-1 text-xl sm:text-3xl font-semibold text-gray-900">{summary.total_days}</dd>
        </div>
      </div>

      {/* Attendance Records Table Card */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Attendance Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record, idx) => (
                  <tr key={idx}>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{record.date}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{record.session}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{record.subject}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[record.status]}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}