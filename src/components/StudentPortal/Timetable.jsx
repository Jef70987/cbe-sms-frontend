import React from 'react'
import { useEffect, useState } from 'react'
import { fetchTimetable } from '../api/studentApi'

export default function Timetable() {
  const [timetable, setTimetable] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTimetable().then((data) => {
      setTimetable(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64 text-white">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-white">Class Timetable</h1>
      <p className="mt-1 text-sm text-gray-300">Current term timetable</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {timetable.map((daySchedule) => (
          <div key={daySchedule.day} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 py-3 sm:px-5 sm:py-4 bg-indigo-50 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-medium text-indigo-900">{daySchedule.day}</h3>
            </div>
            <div className="p-3 sm:p-4 space-y-2">
              {daySchedule.periods.map((period) =>
                period.subject !== 'Break' && period.subject !== 'Lunch' ? (
                  <div key={period.period} className="text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">
                        {period.period}. {period.subject}
                      </span>
                      <span className="text-gray-500">{period.time}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {period.teacher} | Room {period.room}
                    </div>
                  </div>
                ) : (
                  <div key={period.period} className="text-xs sm:text-sm text-gray-400 italic">
                    {period.time} - {period.subject}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}