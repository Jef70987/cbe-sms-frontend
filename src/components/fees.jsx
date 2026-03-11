import React from 'react'
import { useEffect, useState } from 'react'
import { fetchFeeInvoices, fetchFeeTransactions } from '../api/studentApi'

export default function Fees() {
  const [invoices, setInvoices] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchFeeInvoices(), fetchFeeTransactions()]).then(([inv, tx]) => {
      setInvoices(inv)
      setTransactions(tx)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>

  const totalBalance = invoices.reduce((acc, inv) => acc + inv.balance, 0)

  const statusColor = (status) => {
    if (status === 'Paid') return 'bg-green-100 text-green-800'
    if (status === 'Partially Paid') return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Fees</h1>

      {/* Outstanding balance */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">Outstanding Balance</h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-indigo-600">KES {totalBalance.toLocaleString()}</p>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">as of today</p>
        </div>
      </div>

      {/* Invoices */}
      <div className="mt-8">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">Invoices</h2>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No.</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((inv) => (
                      <tr key={inv.invoice_no}>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{inv.invoice_no}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{inv.term}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{inv.due_date}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">KES {inv.total_amount.toLocaleString()}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">KES {inv.amount_paid.toLocaleString()}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">KES {inv.balance.toLocaleString()}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(inv.status)}`}>
                            {inv.status}
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
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">Recent Transactions</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {transactions.map((tx) => (
              <li key={tx.transaction_no} className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">{tx.transaction_no}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {tx.date} - {tx.payment_mode} ({tx.reference})
                    </p>
                  </div>
                  <div className="mt-1 sm:mt-0 text-right">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">KES {tx.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{tx.status}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}