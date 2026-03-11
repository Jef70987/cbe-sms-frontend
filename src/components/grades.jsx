import React from 'react'
import { useEffect, useState } from 'react'
import { fetchGradeSummary, fetchTermlySummary } from '../api/studentApi'

export default function Grades() {
  const [grades, setGrades] = useState([])
  const [termSummary, setTermSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchGradeSummary(), fetchTermlySummary()]).then(([gradeData, termData]) => {
      setGrades(gradeData)
      setTermSummary(termData)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600'
    if (grade.startsWith('B')) return 'text-blue-600'
    if (grade.startsWith('C')) return 'text-yellow-600'
    if (grade.startsWith('D')) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Grades</h1>

      {/* Term summary */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">{termSummary.term} Summary</h3>
          <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500">Overall performance and teacher comment.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500">Final Grade</p>
              <p className={`mt-1 text-xl sm:text-2xl font-semibold ${getGradeColor(termSummary.final_grade)}`}>
                {termSummary.final_grade}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Competencies</p>
              <p className="mt-1 text-sm sm:text-base text-gray-900">
                BE: {termSummary.performance.BE} | AE: {termSummary.performance.AE} | ME: {termSummary.performance.ME} | EE: {termSummary.performance.EE}
              </p>
            </div>
            <div className="sm:col-span-3">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Teacher's Comment</p>
              <p className="mt-1 text-sm sm:text-base text-gray-900">{termSummary.teacher_comment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject grades table */}
      <div className="mt-8">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">Subject Performance</h2>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opener</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Midterm</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endterm</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {grades.map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{row.subject}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{row.opener}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{row.midterm}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{row.endterm}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className={`text-xs sm:text-sm font-semibold ${getGradeColor(row.final)}`}>{row.final}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}