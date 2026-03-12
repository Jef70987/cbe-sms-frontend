import React from 'react'
import { useEffect, useState } from 'react'
import { fetchLibraryBooks, fetchBorrowedBooks } from '../api/studentApi'
import { DocumentArrowDownIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function Library() {
  const [books, setBooks] = useState([])
  const [borrowed, setBorrowed] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchLibraryBooks(), fetchBorrowedBooks()]).then(([lib, br]) => {
      setBooks(lib)
      setBorrowed(br)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64 text-white">Loading...</div>

  const statusColor = (status) => {
    if (status === 'Available') return 'bg-green-100 text-green-800'
    if (status === 'Issued') return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-white">Library</h1>

      {/* Currently Borrowed Books card */}
      <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Books Currently Borrowed</h3>
        </div>
        {borrowed.length === 0 ? (
          <p className="px-4 py-5 text-sm text-gray-500">No books borrowed at the moment.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {borrowed.map((item, idx) => (
              <li key={idx} className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">{item.book}</p>
                    <p className="text-xs text-gray-500">
                      Borrowed: {item.borrowed_date} | Due: {item.due_date}
                    </p>
                  </div>
                  <div className="mt-1 sm:mt-0">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Library Catalog card */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Library Catalog</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accession No.</th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author(s)</th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher</th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.accession_number}>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.accession_number}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">{book.authors}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">{book.publisher}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">{book.available_copies}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(book.status)}`}>
                        {book.status}
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