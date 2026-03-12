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

  if (loading) return <div className="flex justify-center items-center h-64 text-white">Loading...</div>

  const totalBalance = invoices.reduce((acc, inv) => acc + inv.balance, 0)

  const statusColor = (status) => {
    if (status === 'Paid') return 'bg-green-100 text-green-800'
    if (status === 'Partially Paid') return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-white">Fees</h1>

      {/* Outstanding balance card */}
      <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Outstanding Balance</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">KES {totalBalance.toLocaleString()}</p>
          <p className="mt-1 text-sm text-gray-500">as of today</p>
        </div>
      </div>

      {/* Invoices table card */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Invoices</h3>
          </div>
          <div className="overflow-x-auto">
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
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inv.invoice_no}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">{inv.term}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">{inv.due_date}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900">KES {inv.total_amount.toLocaleString()}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">KES {inv.amount_paid.toLocaleString()}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900">KES {inv.balance.toLocaleString()}</td>
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

      {/* Recent Transactions card */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {transactions.map((tx) => (
              <li key={tx.transaction_no} className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tx.transaction_no}</p>
                    <p className="text-xs text-gray-500">
                      {tx.date} - {tx.payment_mode} ({tx.reference})
                    </p>
                  </div>
                  <div className="mt-1 sm:mt-0 text-right">
                    <p className="text-sm font-semibold text-gray-900">KES {tx.amount.toLocaleString()}</p>
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