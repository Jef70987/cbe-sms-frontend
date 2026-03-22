/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import {
  Search,
  Filter,
  Download,
  Printer,
  Edit2,
  Eye,
  PlusCircle,
  Trash2,
  RefreshCw,
  DollarSign,
  Building,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Bell,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  X,
  Loader2,
  Info,
  LogOut
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
    success: <CheckCircle className="text-white" size={18} />,
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

const FeeStructure = () => {
  const { user, getAuthHeaders, isAuthenticated, logout } = useAuth();
  
  // State management
  const [feeStructures, setFeeStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toasts, setToasts] = useState([]);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const [filters, setFilters] = useState({
    academic_year: '',
    term: '',
    class_id: '',
    is_active: 'all'
  });
  
  // UI states
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());
  
  // Filter options
  const [academicYears, setAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [terms] = useState(['Term 1', 'Term 2', 'Term 3']);

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

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      // Fetch academic years from academic years endpoint
      const yearsRes = await fetch(`${API_BASE_URL}/api/registrar/academic/academic-years/`, {
        headers: getAuthHeaders()
      });
      if (yearsRes.status === 401) { handleApiError({ status: 401 }); return; }
      const yearsData = await yearsRes.json();
      if (yearsData.success) {
        setAcademicYears(yearsData.data.map(y => y.year_code));
      }
      
      // Fetch classes
      const classesRes = await fetch(`${API_BASE_URL}/api/registrar/classes/`, {
        headers: getAuthHeaders()
      });
      if (classesRes.status === 401) { handleApiError({ status: 401 }); return; }
      const classesData = await classesRes.json();
      if (classesData.success) {
        setClasses(classesData.data || []);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  // Fetch fee structures
  const fetchFeeStructures = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.academic_year) params.append('academic_year', filters.academic_year);
      if (filters.term && filters.term !== 'all') params.append('term', filters.term);
      if (filters.class_id) params.append('class_id', filters.class_id);
      if (filters.is_active && filters.is_active !== 'all') params.append('is_active', filters.is_active);
      
      const res = await fetch(`${API_BASE_URL}/api/accountant/fees/structures/?${params}`, {
        headers: getAuthHeaders()
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      
      if (data.success) {
        setFeeStructures(data.data || []);
        setError(null);
      } else {
        setError(data.error || 'Failed to load fee structures');
        showToast(data.error || 'Failed to load fee structures', 'error');
      }
    } catch (error) {
      console.error('Error fetching fee structures:', error);
      setError('Failed to load fee structures');
      showToast('Failed to load fee structures', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch structure details
  const fetchStructureDetails = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/accountant/fees/structures/${id}/`, {
        headers: getAuthHeaders()
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      
      if (data.success) {
        setSelectedStructure(data.data);
        setShowDetailModal(true);
      } else {
        showToast(data.error || 'Failed to load structure details', 'error');
      }
    } catch (error) {
      console.error('Error fetching structure details:', error);
      showToast('Failed to load structure details', 'error');
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  // Apply filters
  const applyFilters = () => {
    fetchFeeStructures();
    setShowFilters(false);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      academic_year: '',
      term: '',
      class_id: '',
      is_active: 'all'
    });
  };

  // Clear filters and refresh
  const clearFiltersAndRefresh = () => {
    clearFilters();
    setTimeout(() => fetchFeeStructures(), 100);
  };

  // Export data
  const exportData = (format) => {
    const exportData = filteredStructures.map(s => ({
      'Academic Year': s.academic_year,
      'Term': s.term,
      'Class': s.class_name,
      'Category': s.category_name,
      'Amount (KES)': s.amount,
      'Due Date': new Date(s.due_date).toLocaleDateString(),
      'Frequency': s.frequency,
      'Late Fee %': s.late_fee_percentage,
      'Installments': s.installment_allowed ? `Yes (Max ${s.max_installments})` : 'No',
      'Discount': s.discount_allowed ? `Yes (Max ${s.max_discount_percentage}%)` : 'No',
      'Status': s.is_active ? 'Active' : 'Inactive'
    }));
    
    if (format === 'csv') {
      const headers = Object.keys(exportData[0] || {});
      const rows = exportData.map(row => headers.map(h => row[h]).join(','));
      const csvContent = [headers.join(','), ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fee_structures_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      showToast('Data exported as CSV', 'success');
    } else if (format === 'print') {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head><title>Fee Structures Report</title><style>
          body { font-family: Arial; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .header { text-align: center; margin-bottom: 20px; }
        </style></head>
        <body>
          <div class="header">
            <h1>Fee Structures Report</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Total Structures: ${filteredStructures.length}</p>
          </div>
          <table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      
      showToast('Printing...', 'info');
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    const activeStructures = feeStructures.filter(s => s.is_active);
    const inactiveStructures = feeStructures.filter(s => !s.is_active);
    
    const totalAmount = feeStructures.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const averageAmount = feeStructures.length > 0 ? totalAmount / feeStructures.length : 0;
    
    const uniqueClasses = [...new Set(feeStructures.map(s => s.class_name))].length;
    const uniqueCategories = [...new Set(feeStructures.map(s => s.category_name))].length;
    
    return {
      totalStructures: feeStructures.length,
      activeStructures: activeStructures.length,
      inactiveStructures: inactiveStructures.length,
      totalAmount,
      averageAmount,
      uniqueClasses,
      uniqueCategories,
      lastUpdated: new Date().toLocaleDateString()
    };
  };

  const stats = calculateStats();

  // Filter fee structures based on search
  const filteredStructures = feeStructures.filter(structure => {
    const searchLower = searchTerm.toLowerCase();
    return (
      structure.class_name?.toLowerCase().includes(searchLower) ||
      structure.category_name?.toLowerCase().includes(searchLower) ||
      structure.academic_year?.toLowerCase().includes(searchLower) ||
      structure.term?.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchFilterOptions();
      fetchFeeStructures();
    }
  }, [isAuthenticated]);

  // Format currency
  const formatCurrency = (amount) => {
    return `KSh ${parseFloat(amount || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center"><AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" /><h2 className="text-2xl font-bold">Authentication Required</h2><p className="text-gray-600 mt-2">Please login to access fee structures</p><a href="/login" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg">Go to Login</a></div>
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Fee Structure Management</h1>
              <p className="text-gray-600 text-lg">View and manage fee structures configured by the accounting department</p>
              {user && <p className="text-xs text-gray-400 mt-1">{user.first_name} {user.last_name} • {user.role}</p>}
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center"><p className="text-sm text-gray-600">Total Structures</p><p className="font-bold text-gray-800">{stats.totalStructures}</p></div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="text-center"><p className="text-sm text-gray-600">Role</p><p className="font-bold text-blue-600">Bursar</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-blue-600 mb-1">Total Structures</p><p className="text-2xl font-bold text-gray-800">{stats.totalStructures}</p></div><div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center"><FileText className="w-6 h-6 text-white" /></div></div>
            <div className="mt-4 flex items-center text-sm"><div className="flex items-center text-green-600"><TrendingUp className="w-4 h-4 mr-1" /><span>{stats.activeStructures} active</span></div><div className="ml-4 text-gray-500">{stats.inactiveStructures} inactive</div></div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-green-600 mb-1">Total Amount</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalAmount)}</p></div><div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center"><DollarSign className="w-6 h-6 text-white" /></div></div>
            <div className="mt-4 text-sm text-gray-600">Avg: {formatCurrency(stats.averageAmount)}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-purple-600 mb-1">Classes & Categories</p><div className="flex items-center space-x-4"><div><p className="text-xl font-bold text-gray-800">{stats.uniqueClasses}</p><p className="text-xs text-gray-600">Classes</p></div><div><p className="text-xl font-bold text-gray-800">{stats.uniqueCategories}</p><p className="text-xs text-gray-600">Categories</p></div></div></div><div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center"><Building className="w-6 h-6 text-white" /></div></div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-orange-600 mb-1">System Status</p><p className="text-lg font-bold text-gray-800">{stats.lastUpdated}</p><p className="text-xs text-gray-600">Last Updated</p></div><div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center"><Calendar className="w-6 h-6 text-white" /></div></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-200 mb-6 transition-all duration-300 ${showFilters ? 'p-6' : 'p-0 border-0'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filter Structures</h3>
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center text-blue-600 hover:text-blue-800">
                  {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  <span className="ml-2">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                </button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label><select value={filters.academic_year} onChange={(e) => setFilters({...filters, academic_year: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="">All Years</option>{academicYears.map(year => <option key={year} value={year}>{year}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Term</label><select value={filters.term} onChange={(e) => setFilters({...filters, term: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="">All Terms</option>{terms.map(term => <option key={term} value={term}>{term}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Class</label><select value={filters.class_id} onChange={(e) => setFilters({...filters, class_id: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="">All Classes</option>{classes.map(cls => <option key={cls.id} value={cls.id}>{cls.class_name}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">Status</label><select value={filters.is_active} onChange={(e) => setFilters({...filters, is_active: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="all">All Status</option><option value="true">Active</option><option value="false">Inactive</option></select></div>
                  <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-3 pt-4"><button onClick={clearFiltersAndRefresh} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Clear Filters</button><button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply Filters</button></div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1"><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by class, category, year, or term..." className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" /></div></div>
                <div className="flex items-center space-x-3"><button onClick={fetchFeeStructures} disabled={loading} className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}</button><button onClick={() => exportData('csv')} className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"><Download className="w-4 h-4 mr-2" /> Export CSV</button><button onClick={() => exportData('print')} className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"><Printer className="w-4 h-4 mr-2" /> Print</button></div>
              </div>
            </div>

            {/* Fee Structures Table */}
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm p-8 flex items-center justify-center"><div className="text-center"><Loader2 className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" /><p className="mt-4 text-gray-600">Loading fee structures...</p></div></div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-sm p-8"><div className="text-center text-red-600"><AlertCircle className="w-12 h-12 mx-auto mb-4" /><p className="text-lg font-semibold mb-2">{error}</p><button onClick={fetchFeeStructures} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Try Again</button></div></div>
            ) : filteredStructures.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8"><div className="text-center text-gray-600"><FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" /><p className="text-lg font-semibold mb-2">No fee structures found</p><p className="text-gray-500">Try adjusting your filters or search criteria</p></div></div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-800 to-gray-900">
                      <tr><th className="px-6 py-4 text-left text-sm font-semibold text-white">Academic Year & Term</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Class & Category</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Fee Details</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Payment Terms</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th><th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredStructures.map((structure) => (
                        <React.Fragment key={structure.id}>
                          <tr className="hover:bg-blue-50 transition-colors">
                            <td className="px-6 py-4"><div className="flex items-center"><div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3"><Calendar className="w-5 h-5 text-blue-600" /></div><div><div className="font-semibold text-gray-900">{structure.academic_year}</div><div className="text-sm text-gray-500">{structure.term}</div><div className="text-xs text-gray-400">Due: {new Date(structure.due_date).toLocaleDateString()}</div></div></div></td>
                            <td className="px-6 py-4"><div className="font-semibold text-gray-900">{structure.class_name}</div><div className="text-sm text-gray-600">{structure.category_name}</div><div className="text-xs text-gray-500">{structure.category_code}</div></td>
                            <td className="px-6 py-4"><div className="text-lg font-bold text-green-600">{formatCurrency(structure.amount)}</div><div className="text-sm text-gray-600">Frequency: {structure.frequency}</div></td>
                            <td className="px-6 py-4"><div className="space-y-1">{structure.installment_allowed && <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">Installments: {structure.max_installments}</span>}{structure.discount_allowed && <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 ml-2">Discount: {structure.max_discount_percentage}%</span>}<div className="text-xs text-gray-500">Late Fee: {structure.late_fee_percentage}% after {structure.late_fee_after_days} days</div></div></td>
                            <td className="px-6 py-4"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${structure.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{structure.is_active ? 'ACTIVE' : 'INACTIVE'}</span></td>
                            <td className="px-6 py-4"><div className="flex items-center space-x-2"><button onClick={() => toggleRowExpansion(structure.id)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">{expandedRows.has(structure.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</button><button onClick={() => fetchStructureDetails(structure.id)} className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"><Eye className="w-4 h-4" /></button></div></td>
                          </tr>
                          {expandedRows.has(structure.id) && (
                            <tr className="bg-gray-50"><td colSpan="6" className="px-6 py-4"><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div><h4 className="text-sm font-semibold text-gray-700 mb-2">Payment Information</h4><div className="space-y-1 text-sm"><div className="flex justify-between"><span className="text-gray-600">GL Account:</span><span className="font-medium">{structure.gl_account_code || 'Not set'}</span></div><div className="flex justify-between"><span className="text-gray-600">Mandatory:</span><span className={`font-medium ${structure.is_mandatory ? 'text-green-600' : 'text-yellow-600'}`}>{structure.is_mandatory ? 'Yes' : 'No'}</span></div></div></div><div><h4 className="text-sm font-semibold text-gray-700 mb-2">Created By</h4><div className="space-y-1 text-sm"><div className="text-gray-900">{structure.created_by_name || 'System'}</div><div className="text-gray-500 text-xs">{new Date(structure.created_at).toLocaleString()}</div></div></div><div><h4 className="text-sm font-semibold text-gray-700 mb-2">Quick Actions</h4><div className="flex space-x-2"><button onClick={() => exportData('structure')} className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Export</button><button onClick={() => fetchStructureDetails(structure.id)} className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">View Full</button></div></div></div></td></tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                    <tfoot className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr><td colSpan="2" className="px-6 py-4"><div className="font-semibold text-gray-900">{filteredStructures.length} structure(s) found</div></td><td className="px-6 py-4 text-right"><div className="text-sm text-gray-600">Total Amount:</div></td><td className="px-6 py-4 text-right"><div className="text-lg font-bold text-green-700">{formatCurrency(filteredStructures.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0))}</div></td><td colSpan="2" className="px-6 py-4"><div className="text-sm text-gray-600 text-right">Average: {formatCurrency(filteredStructures.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0) / filteredStructures.length)}</div></td></tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white"><h3 className="text-lg font-semibold mb-4 flex items-center"><DollarSign className="w-5 h-5 mr-2" />Payment Channels</h3><div className="space-y-4"><div className="bg-white/20 backdrop-blur-sm rounded-xl p-4"><div className="flex items-center space-x-3"><div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center"><span className="font-bold text-white">M</span></div><div><p className="font-semibold">MPESA</p><p className="text-blue-100 text-sm">Paybill: ---</p><p className="text-blue-100 text-xs">Account: Student Admission No</p></div></div></div><div className="bg-white/20 backdrop-blur-sm rounded-xl p-4"><div className="flex items-center space-x-3"><div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center"><span className="font-bold text-white">K</span></div><div><p className="font-semibold">KCB Bank</p><p className="text-blue-100 text-sm">Acc: 1234567890</p><p className="text-blue-100 text-xs">Name: Jawabu School</p></div></div></div></div></div>

            <div className="bg-white rounded-2xl shadow-sm p-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3><div className="space-y-4"><div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"><span className="text-gray-700">Active Structures</span><span className="font-bold text-blue-600">{stats.activeStructures}</span></div><div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><span className="text-gray-700">Total Amount</span><span className="font-bold text-green-600">{formatCurrency(stats.totalAmount / 1000)}K</span></div><div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"><span className="text-gray-700">Unique Classes</span><span className="font-bold text-purple-600">{stats.uniqueClasses}</span></div></div></div>

            <div className="bg-white rounded-2xl shadow-sm p-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">System Information</h3><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-gray-600">Last Sync:</span><span className="font-medium">{new Date().toLocaleTimeString()}</span></div><div className="flex justify-between"><span className="text-gray-600">Data Version:</span><span className="font-medium">v1.0</span></div><div className="pt-3 border-t border-gray-200"><button onClick={fetchFeeStructures} disabled={loading} className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center">{loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />} Refresh Data</button></div></div></div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedStructure && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div><h3 className="text-2xl font-bold text-gray-900">Fee Structure Details</h3><p className="text-gray-600">{selectedStructure.class_name} • {selectedStructure.category_name}</p></div>
              <button onClick={() => setShowDetailModal(false)} className="p-2 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-6"><h4 className="text-lg font-semibold mb-4">Basic Information</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-gray-600">Academic Year:</span><span className="font-semibold">{selectedStructure.academic_year}</span></div><div className="flex justify-between"><span className="text-gray-600">Term:</span><span className="font-semibold">{selectedStructure.term}</span></div><div className="flex justify-between"><span className="text-gray-600">Class:</span><span className="font-semibold">{selectedStructure.class_name}</span></div><div className="flex justify-between"><span className="text-gray-600">Category:</span><span className="font-semibold">{selectedStructure.category_name}</span></div></div></div>
                <div className="bg-gray-50 rounded-xl p-6"><h4 className="text-lg font-semibold mb-4">Financial Details</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-gray-600">Amount:</span><span className="text-xl font-bold text-green-600">{formatCurrency(selectedStructure.amount)}</span></div><div className="flex justify-between"><span className="text-gray-600">Due Date:</span><span className="font-semibold">{new Date(selectedStructure.due_date).toLocaleDateString()}</span></div><div className="flex justify-between"><span className="text-gray-600">Frequency:</span><span className="font-semibold">{selectedStructure.frequency}</span></div></div></div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6"><h4 className="text-lg font-semibold mb-4">Payment Terms</h4><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="text-center p-4 bg-white rounded-lg"><div className="text-sm text-gray-600 mb-2">Installment Allowed</div><div className={`text-lg font-semibold ${selectedStructure.installment_allowed ? 'text-green-600' : 'text-red-600'}`}>{selectedStructure.installment_allowed ? 'Yes' : 'No'}</div>{selectedStructure.installment_allowed && <div className="text-sm text-gray-500">Max: {selectedStructure.max_installments}</div>}</div><div className="text-center p-4 bg-white rounded-lg"><div className="text-sm text-gray-600 mb-2">Discount Allowed</div><div className={`text-lg font-semibold ${selectedStructure.discount_allowed ? 'text-green-600' : 'text-red-600'}`}>{selectedStructure.discount_allowed ? 'Yes' : 'No'}</div>{selectedStructure.discount_allowed && <div className="text-sm text-gray-500">Max: {selectedStructure.max_discount_percentage}%</div>}</div><div className="text-center p-4 bg-white rounded-lg"><div className="text-sm text-gray-600 mb-2">Late Fee Policy</div><div className="text-lg font-semibold text-orange-600">{selectedStructure.late_fee_percentage}%</div><div className="text-sm text-gray-500">After {selectedStructure.late_fee_after_days} days</div></div></div></div>
              <div className="bg-gray-50 rounded-xl p-6"><h4 className="text-lg font-semibold mb-4">Status & Audit</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><div className="flex items-center mb-3"><span className="text-gray-600 mr-4">Status:</span><span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedStructure.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedStructure.is_active ? 'ACTIVE' : 'INACTIVE'}</span></div><div className="text-sm text-gray-600"><div className="flex items-center mb-1"><Calendar className="w-4 h-4 mr-2" />Created: {new Date(selectedStructure.created_at).toLocaleString()}</div><div className="flex items-center"><Users className="w-4 h-4 mr-2" />Created by: {selectedStructure.created_by_name || 'System'}</div></div></div><div><h5 className="text-sm font-semibold text-gray-700 mb-2">Description</h5><p className="text-gray-600 text-sm">{selectedStructure.description || 'No description provided.'}</p></div></div></div>
            </div>
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex justify-end space-x-3"><button onClick={() => setShowDetailModal(false)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Close</button><button onClick={() => exportData('structure-detail')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Export Details</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeStructure;