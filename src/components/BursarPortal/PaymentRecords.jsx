/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import {
  Search,
  Filter,
  Download,
  Printer,
  RefreshCw,
  Eye,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Check,
  Info,
  X,
  Loader2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-gradient-to-r from-emerald-500 to-green-500',
    error: 'bg-gradient-to-r from-rose-500 to-pink-500',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500'
  };

  const icon = {
    success: <Check className="text-white" size={18} />,
    error: <AlertCircle className="text-white" size={18} />,
    info: <Info className="text-white" size={18} />,
    warning: <AlertCircle className="text-white" size={18} />
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`${bgColor[type]} text-white rounded-lg shadow-xl p-4 min-w-[320px] max-w-md`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">{icon[type]}</div>
            <div>
              <p className="font-semibold capitalize">{type}</p>
              <p className="text-sm text-white/90 mt-1">{message}</p>
            </div>
          </div>
          <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Session Expired Modal
const SessionExpiredModal = ({ isOpen, onLogout }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Session Expired</h3>
          </div>
          <p className="text-gray-600 mb-6">Your session has expired. Please login again to continue.</p>
          <div className="flex justify-end">
            <button onClick={onLogout} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentRecords = () => {
  const { user, getAuthHeaders, isAuthenticated, logout } = useAuth();
  
  // State management
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  
  // Filters
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    status: 'all',
    payment_mode: 'all',
    search_term: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  const handleApiError = (error) => {
    if (error?.status === 401 || error?.message?.includes('Unauthorized')) {
      setShowSessionExpired(true);
    }
  };

  const handleLogout = () => {
    setShowSessionExpired(false);
    logout();
    window.location.href = '/logout';
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.start_date) params.append('start_date', filters.start_date);
      if (filters.end_date) params.append('end_date', filters.end_date);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.payment_mode && filters.payment_mode !== 'all') params.append('payment_mode', filters.payment_mode);
      params.append('limit', '100');

      const res = await fetch(`${API_BASE_URL}/api/bursar/records/transactions/?${params}`, {
        headers: getAuthHeaders()
      });
      
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      
      const data = await res.json();
      if (data.success) {
        setTransactions(data.data || []);
        setError(null);
      } else {
        setError(data.error || 'Failed to load transactions');
        showToast(data.error || 'Failed to load transactions', 'error');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions');
      showToast('Failed to load transactions', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch transaction statistics
  const fetchTransactionStats = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.start_date) params.append('start_date', filters.start_date);
      if (filters.end_date) params.append('end_date', filters.end_date);

      const res = await fetch(`${API_BASE_URL}/api/bursar/records/transactions/stats/?${params}`, {
        headers: getAuthHeaders()
      });
      
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
    }
  };

  // Fetch transaction details
  const fetchTransactionDetails = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bursar/records/transactions/${id}/`, {
        headers: getAuthHeaders()
      });
      
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      
      const data = await res.json();
      if (data.success) {
        setSelectedTransaction(data.data);
        setShowDetailModal(true);
      } else {
        showToast(data.error || 'Failed to load transaction details', 'error');
      }
    } catch (error) {
      console.error('Error fetching transaction details:', error);
      showToast('Failed to load transaction details', 'error');
    }
  };

  // Apply filters
  const applyFilters = useCallback(() => {
    let filtered = [...transactions];

    if (filters.search_term) {
      const searchLower = filters.search_term.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.transaction_no?.toLowerCase().includes(searchLower) ||
        transaction.first_name?.toLowerCase().includes(searchLower) ||
        transaction.last_name?.toLowerCase().includes(searchLower) ||
        transaction.admission_no?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === filters.status);
    }

    if (filters.payment_mode && filters.payment_mode !== 'all') {
      filtered = filtered.filter(transaction => transaction.payment_mode === filters.payment_mode);
    }

    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  // Initialize
  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
      fetchTransactionStats();
    }
  }, [isAuthenticated]);

  // Apply filters whenever filters change
  useEffect(() => {
    applyFilters();
  }, [filters, transactions, applyFilters]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      start_date: '',
      end_date: '',
      status: 'all',
      payment_mode: 'all',
      search_term: ''
    });
  };

  // Apply filters and refresh
  const applyFiltersAndRefresh = () => {
    fetchTransactions();
    fetchTransactionStats();
    setShowFilters(false);
  };

  // Export data
  const exportData = (format) => {
    const exportData = filteredTransactions.map(t => ({
      'Transaction No': t.transaction_no,
      'Student Name': `${t.first_name} ${t.last_name}`,
      'Admission No': t.admission_no,
      'Amount (KES)': t.amount_kes,
      'Date': new Date(t.payment_date).toLocaleDateString(),
      'Time': new Date(t.payment_date).toLocaleTimeString(),
      'Payment Method': t.payment_mode,
      'Reference': t.payment_reference || 'N/A',
      'Status': t.status
    }));
    
    if (format === 'csv') {
      const headers = Object.keys(exportData[0] || {});
      const rows = exportData.map(row => headers.map(h => row[h]).join(','));
      const csvContent = [headers.join(','), ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      showToast('Data exported as CSV', 'success');
    } else if (format === 'print') {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head><title>Payment Records Report</title><style>
          body { font-family: Arial; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .header { text-align: center; margin-bottom: 20px; }
        </style></head>
        <body>
          <div class="header">
            <h1>Payment Records Report</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Total Records: ${filteredTransactions.length}</p>
          </div>
          <table>
            // eslint-disable-next-line no-undef
            <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      
      showToast('Printing...', 'info');
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REVERSED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment method color
  const getMethodColor = (method) => {
    switch (method) {
      case 'MPESA':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'CASH':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'BANK_TRANSFER':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'CHEQUE':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `KSh ${parseFloat(amount || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center"><AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" /><h2 className="text-2xl font-bold">Authentication Required</h2><p className="text-gray-600 mt-2">Please login to access payment records</p><a href="/login" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg">Go to Login</a></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .animate-slideIn { animation: slideIn 0.3s ease-out; }`}</style>
      
      <SessionExpiredModal isOpen={showSessionExpired} onLogout={handleLogout} />
      {toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(t2 => t2.id !== t.id))} />)}

      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payment Records</h1>
              <p className="text-gray-600 text-lg">View and manage all student fee payment transactions</p>
              {user && <p className="text-xs text-gray-400 mt-1">{user.first_name} {user.last_name} • {user.role}</p>}
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center"><p className="text-sm text-gray-600">Records</p><p className="font-bold text-gray-800">{filteredTransactions.length}</p></div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="text-center"><p className="text-sm text-gray-600">Role</p><p className="font-bold text-blue-600">Bursar</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-green-600 mb-1">Total Collected</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.total_collected)}</p></div>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center"><DollarSign className="w-6 h-6 text-white" /></div>
                </div>
                <div className="mt-4 text-sm text-gray-600">Avg: {formatCurrency(stats.average_amount)}</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-blue-600 mb-1">Total Transactions</p><p className="text-2xl font-bold text-gray-800">{stats.total_transactions || 0}</p></div>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center"><FileText className="w-6 h-6 text-white" /></div>
                </div>
                <div className="mt-4 flex items-center text-sm"><div className="flex items-center text-green-600"><TrendingUp className="w-4 h-4 mr-1" /><span>{stats.completed_count || 0} completed</span></div></div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-purple-600 mb-1">Unique Students</p><p className="text-2xl font-bold text-gray-800">{stats.unique_students || 0}</p></div>
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><Users className="w-6 h-6 text-white" /></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-orange-600 mb-1">Time Period</p><p className="text-lg font-bold text-gray-800">{filters.start_date ? formatDate(filters.start_date) : 'All Time'}</p>{filters.end_date && <p className="text-sm text-gray-600">to {formatDate(filters.end_date)}</p>}</div>
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center"><Calendar className="w-6 h-6 text-white" /></div>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className={`bg-white rounded-xl shadow-sm border border-gray-200 mb-6 transition-all duration-300 ${showFilters ? 'p-6' : 'p-0 border-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filter Transactions</h3>
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center text-blue-600 hover:text-blue-800">
                {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                <span className="ml-2">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label><input type="date" value={filters.start_date} onChange={(e) => setFilters({...filters, start_date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">End Date</label><input type="date" value={filters.end_date} onChange={(e) => setFilters({...filters, end_date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Status</label><select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="all">All Status</option><option value="VERIFIED">Verified</option><option value="COMPLETED">Completed</option><option value="PENDING">Pending</option><option value="REVERSED">Reversed</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label><select value={filters.payment_mode} onChange={(e) => setFilters({...filters, payment_mode: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="all">All Methods</option><option value="MPESA">MPESA</option><option value="CASH">Cash</option><option value="BANK_TRANSFER">Bank Transfer</option><option value="CHEQUE">Cheque</option></select></div>
                <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-3 pt-4"><button onClick={clearFilters} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Clear Filters</button><button onClick={applyFiltersAndRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply Filters</button></div>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1"><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div><input type="text" value={filters.search_term} onChange={(e) => setFilters({...filters, search_term: e.target.value})} placeholder="Search by transaction no, student name, or admission number..." className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div></div>
              <div className="flex items-center space-x-3"><button onClick={fetchTransactions} disabled={loading} className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 flex items-center">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}</button><button onClick={() => exportData('csv')} className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"><Download className="w-4 h-4 mr-2" /> Export CSV</button><button onClick={() => exportData('print')} className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"><Printer className="w-4 h-4 mr-2" /> Print</button></div>
            </div>
          </div>

          {/* Transactions Table */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm p-8 flex items-center justify-center"><div className="text-center"><Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" /><p className="mt-4 text-gray-600">Loading transactions...</p></div></div>
          ) : error ? (
            <div className="bg-white rounded-xl shadow-sm p-8"><div className="text-center text-red-600"><p className="text-lg font-semibold mb-2">{error}</p><button onClick={fetchTransactions} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Try Again</button></div></div>
          ) : filteredTransactions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8"><div className="text-center text-gray-600"><FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" /><p className="text-lg font-semibold mb-2">No transactions found</p><p className="text-gray-500">Try adjusting your filters or search criteria</p></div></div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-800 to-gray-900">
                    <tr><th className="px-6 py-4 text-left text-sm font-semibold text-white">Transaction Details</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Student Information</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Amount</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Payment Details</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4"><div><div className="font-semibold text-gray-900">{transaction.transaction_no}</div><div className="text-sm text-gray-600">{formatDate(transaction.payment_date)} at {formatTime(transaction.payment_date)}</div></div></td>
                        <td className="px-6 py-4"><div><div className="font-semibold text-gray-900">{transaction.first_name} {transaction.last_name}</div><div className="text-sm text-gray-600">{transaction.admission_no}</div></div></td>
                        <td className="px-6 py-4"><div className="text-lg font-bold text-green-600">{formatCurrency(transaction.amount_kes)}</div></td>
                        <td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getMethodColor(transaction.payment_mode)}`}>{transaction.payment_mode}</span>{transaction.payment_reference && <div className="text-xs text-gray-600 mt-1">Ref: {transaction.payment_reference}</div>}</td>
                        <td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>{transaction.status}</span></td>
                        <td className="px-6 py-4"><button onClick={() => fetchTransactionDetails(transaction.id)} className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Details"><Eye className="w-4 h-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr><td colSpan="2" className="px-6 py-4"><div className="font-semibold text-gray-900">{filteredTransactions.length} transaction(s) found</div></td><td className="px-6 py-4 text-right"><div className="text-sm text-gray-600">Total Amount:</div></td><td className="px-6 py-4 text-right"><div className="text-lg font-bold text-green-700">{formatCurrency(filteredTransactions.reduce((sum, t) => sum + parseFloat(t.amount_kes || 0), 0))}</div></td><td colSpan="2" className="px-6 py-4"><div className="text-sm text-gray-600 text-right">Showing {filteredTransactions.length} records</div></td></tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div><h3 className="text-2xl font-bold text-gray-900">Transaction Details</h3><p className="text-gray-600">{selectedTransaction.transaction_no}</p></div>
              <button onClick={() => setShowDetailModal(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><X size={24} /></button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-6"><h4 className="text-lg font-semibold mb-4">Transaction Information</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-gray-600">Transaction No:</span><span className="font-semibold">{selectedTransaction.transaction_no}</span></div><div className="flex justify-between"><span className="text-gray-600">Payment Date:</span><span className="font-semibold">{formatDate(selectedTransaction.payment_date)} {formatTime(selectedTransaction.payment_date)}</span></div><div className="flex justify-between"><span className="text-gray-600">Status:</span><span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.status)}`}>{selectedTransaction.status}</span></div></div></div>
                <div className="bg-gray-50 rounded-xl p-6"><h4 className="text-lg font-semibold mb-4">Financial Details</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-gray-600">Amount:</span><span className="text-xl font-bold text-green-600">{formatCurrency(selectedTransaction.amount_kes)}</span></div><div className="flex justify-between"><span className="text-gray-600">Payment Method:</span><span className={`px-3 py-1 rounded-full text-xs font-medium ${getMethodColor(selectedTransaction.payment_mode)}`}>{selectedTransaction.payment_mode}</span></div></div></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-6"><h4 className="text-lg font-semibold mb-4">Student Information</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-gray-600">Name:</span><span className="font-semibold">{selectedTransaction.first_name} {selectedTransaction.last_name}</span></div><div className="flex justify-between"><span className="text-gray-600">Admission No:</span><span className="font-semibold">{selectedTransaction.admission_no}</span></div></div></div>
                <div className="bg-gray-50 rounded-xl p-6"><h4 className="text-lg font-semibold mb-4">Payment Information</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-gray-600">Reference:</span><span className="font-semibold">{selectedTransaction.payment_reference || 'N/A'}</span></div>{selectedTransaction.mobile_money_no && <div className="flex justify-between"><span className="text-gray-600">M-PESA No:</span><span className="font-semibold">{selectedTransaction.mobile_money_no}</span></div>}</div></div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6"><h4 className="text-lg font-semibold mb-4">Audit Information</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><h5 className="text-sm font-medium text-gray-700 mb-2">Collection</h5><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-600">Collected By:</span><span className="font-medium">{selectedTransaction.collected_by_name || 'N/A'}</span></div></div></div><div><h5 className="text-sm font-medium text-gray-700 mb-2">Verification</h5><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-600">Verified At:</span><span className="font-medium">{selectedTransaction.verified_at ? formatDate(selectedTransaction.verified_at) : 'Not verified'}</span></div></div></div></div></div>
            </div>
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button onClick={() => setShowDetailModal(false)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Close</button>
              <button onClick={() => exportData('transaction-detail')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Export Details</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentRecords;