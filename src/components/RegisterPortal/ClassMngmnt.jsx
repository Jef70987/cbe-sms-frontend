import React, { useState, useEffect } from 'react';
import { 
  Plus, RefreshCw, School, CheckCircle, Users, 
  BarChart3, AlertCircle, X, Loader2, Info,
  Edit2, Trash2, Eye
} from 'lucide-react';
import { useAuth } from '../Authentication/AuthContext'; 
import { useNavigate } from 'react-router';


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Custom notification component
const Notification = ({ type, message, onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  if (!visible) return null;

  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-md w-full md:w-auto animate-slide-in ${getStyles()} rounded-lg border p-4 shadow-lg`}
      style={{
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      <div className="flex items-start">
        {getIcon()}
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">
            {type === 'success' ? 'Success' : type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : 'Information'}
          </p>
          <p className="text-sm mt-1">{message}</p>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          className="ml-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "warning" }) => {
  if (!isOpen) return null;

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
      default:
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-4 border-red-500 rounded-xl shadow-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className={`h-6 w-6 ${type === 'danger' ? 'text-red-500' : type === 'success' ? 'text-green-500' : 'text-yellow-500'} mr-3`} />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonStyles()}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ClassManagement() {
  const { user, getAuthHeaders, isAuthenticated } = useAuth();
  const [classes, setClasses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [numericLevels, setNumericLevels] = useState([]);
  const [loading, setLoading] = useState({
    classes: true,
    teachers: true,
    streams: true,
    levels: true
  });
  const [notifications, setNotifications] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    data: null,
    action: null
  });

  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    class_code: '',
    class_name: '',
    numeric_level: '',
    stream: '',
    capacity: 40,
    class_teacher_id: '',
    is_active: true
  });

  const [formErrors, setFormErrors] = useState({});

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      addNotification('error', 'Please login to access class management');
      return;
    }
    fetchInitialData();
  }, [isAuthenticated]);

  const fetchInitialData = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading({
        classes: true,
        teachers: true,
        streams: true,
        levels: true
      });
      
      // Fetch streams first
      await fetchStreams();
      
      // Fetch numeric levels
      await fetchNumericLevels();
      
      // Fetch classes
      await fetchClasses();
      
      // Fetch teachers
      await fetchTeachers();

    } catch (error) {
      console.error('Initial fetch error:', error);
      addNotification('error', 'Error fetching initial data. Please refresh the page.');
    }
  };

  const fetchStreams = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrar/classes/streams/`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStreams(data.data);
        }
      }
    } catch (error) {
      console.error('Streams fetch error:', error);
      addNotification('error', 'Failed to load streams');
    } finally {
      setLoading(prev => ({ ...prev, streams: false }));
    }
  };

  const fetchNumericLevels = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrar/classes/numeric-levels/`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNumericLevels(data.data);
        }
      }
    } catch (error) {
      console.error('Numeric levels fetch error:', error);
      addNotification('error', 'Failed to load numeric levels');
    } finally {
      setLoading(prev => ({ ...prev, levels: false }));
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrar/classes/`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          addNotification('error', 'Session expired. Please login again.');
          navigate('/Logout');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setClasses(data.data);
      } else {
        addNotification('error', data.error || 'Failed to load classes');
      }
    } catch (error) {
      console.error('Classes fetch error:', error);
      addNotification('error', 'Error fetching classes. Please check your connection.');
    } finally {
      setLoading(prev => ({ ...prev, classes: false }));
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/registrar/classes/teachers/`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTeachers(data.data);
        }
      }
    } catch (error) {
      if (error){
        addNotification('error', 'Failed to load teachers');
      }
      
    } finally {
      setLoading(prev => ({ ...prev, teachers: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.class_code.trim()) {
      errors.class_code = 'Class code is required';
    } else if (classes.some(c => c.class_code === formData.class_code)) {
      errors.class_code = 'Class code already exists';
    }
    
    if (!formData.class_name.trim()) {
      errors.class_name = 'Class name is required';
    }
    
    if (!formData.numeric_level) {
      errors.numeric_level = 'Numeric level is required';
    }
    
    if (formData.capacity < 1 || formData.capacity > 100) {
      errors.capacity = 'Capacity must be between 1 and 100';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      addNotification('error', 'Please login to create classes');
      return;
    }
    
    if (!validateForm()) {
      addNotification('warning', 'Please fix the errors in the form');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/registrar/classes/create/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        addNotification('success', `Class "${formData.class_name}" created successfully`);
        await fetchClasses();
        resetForm();
        setShowCreateModal(false);
      } else {
        addNotification('error', data.error || 'Failed to create class');
      }
    } catch (error) {
      if (error){
         addNotification('error', 'Failed to create class. Please try again.');
      }
     
    }
  };

  const resetForm = () => {
    setFormData({
      class_code: '',
      class_name: '',
      numeric_level: '',
      stream: '',
      capacity: 40,
      class_teacher_id: '',
      is_active: true
    });
    setFormErrors({});
  };

  const openConfirmation = (action, data) => {
    setConfirmationModal({
      isOpen: true,
      action,
      data
    });
  };

  const handleToggleActive = async (classId) => {
    if (!isAuthenticated) {
      addNotification('error', 'Please login to update classes');
      return;
    }

    try {
      const cls = classes.find(c => c.id === classId);
      const newStatus = !cls.is_active;
      
      const response = await fetch(`${API_BASE_URL}/api/registrar/classes/update/${classId}/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ is_active: newStatus })
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        addNotification('success', `Class ${newStatus ? 'activated' : 'deactivated'} successfully`);
        await fetchClasses();
      } else {
        addNotification('error', data.error || 'Failed to update class');
      }
    } catch (error) {
      if (error){
        addNotification('error', 'Failed to update class. Please try again.');
      }
      
    }
  };

  const handleDelete = async (classId) => {
    if (!isAuthenticated) {
      addNotification('error', 'Please login to delete classes');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/registrar/classes/delete/${classId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        addNotification('success', 'Class deleted successfully');
        await fetchClasses();
      } else {
        addNotification('error', data.error || 'Failed to delete class');
      }
    } catch (error) {
      if (error){
        addNotification('error', 'Failed to delete class. Please try again.');
      }
      
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const totalClasses = classes.length;
    const activeClasses = classes.filter(c => c.is_active).length;
    const totalCapacity = classes.reduce((sum, c) => sum + (c.capacity || 0), 0);
    const averageCapacity = totalClasses > 0 ? Math.round(totalCapacity / totalClasses) : 0;
    const totalStudents = classes.reduce((sum, c) => sum + (c.current_students || 0), 0);

    return { totalClasses, activeClasses, totalCapacity, averageCapacity, totalStudents };
  };

  const stats = getStatistics();

  // Add animation style
  const animationStyle = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.3s ease-out;
    }
  `;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <style>{animationStyle}</style>
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please login to access class management</p>
          <a 
            href="/login" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 inline-block"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{animationStyle}</style>
      
      {/* Notifications */}
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ isOpen: false, data: null, action: null })}
        onConfirm={() => {
          if (confirmationModal.action === 'toggle') {
            handleToggleActive(confirmationModal.data.id);
          } else if (confirmationModal.action === 'delete') {
            handleDelete(confirmationModal.data.id);
          }
        }}
        title={
          confirmationModal.action === 'toggle' 
            ? `${confirmationModal.data?.is_active ? 'Deactivate' : 'Activate'} Class`
            : 'Delete Class'
        }
        message={
          confirmationModal.action === 'toggle'
            ? `Are you sure you want to ${confirmationModal.data?.is_active ? 'deactivate' : 'activate'} ${confirmationModal.data?.class_name}?`
            : `Are you sure you want to delete ${confirmationModal.data?.class_name}? This action cannot be undone.`
        }
        confirmText={confirmationModal.action === 'delete' ? 'Delete' : 'Confirm'}
        type={confirmationModal.action === 'delete' ? 'danger' : 'warning'}
      />

      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8 bg-blue-400 rounded-2xl p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-red-800">Class Management</h1>
              <p className="text-white mt-1 text-sm md:text-base">Create and manage classes for the academic year</p>
              {user && (
                <p className="text-sm text-white font-bold mt-2">
                  Logged in as: <span className="font-medium font-bold text-red-800">{user.first_name} {user.last_name}</span> ({user.role})
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                disabled={loading.streams || loading.levels}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Class
              </button>
              <button
                onClick={fetchInitialData}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading.classes ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
          
          {/* Loading indicators for streams and levels */}
          {(loading.streams || loading.levels) && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin mr-2" />
              <span className="text-sm text-blue-700">
                Loading streams and levels...
              </span>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Classes</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                  {loading.classes ? '...' : stats.totalClasses}
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <School className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Active Classes</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                  {loading.classes ? '...' : stats.activeClasses}
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Students</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                  {loading.classes ? '...' : stats.totalStudents}
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 md:h-7 md:w-7 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 md:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Average Capacity</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                  {loading.classes ? '...' : stats.averageCapacity}
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 md:h-7 md:w-7 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-800">All Classes</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                {loading.classes ? '...' : classes.length} classes
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {loading.classes ? (
              <div className="p-8 md:p-12 text-center">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
                <p className="mt-4 text-gray-600">Loading classes...</p>
              </div>
            ) : classes.length === 0 ? (
              <div className="p-8 md:p-12 text-center">
                <School className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No classes found</h3>
                <p className="text-gray-500 mt-1 mb-4">Create your first class to get started</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={loading.streams || loading.levels}
                >
                  Create New Class
                </button>
              </div>
            ) : (
              <div className="block md:hidden">
                {/* Mobile view */}
                <div className="divide-y divide-gray-200">
                  {classes.map(cls => (
                    <div key={cls.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <School className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{cls.class_name}</h4>
                            <p className="text-sm text-gray-600">
                              {cls.class_code} • Level {cls.numeric_level}
                              {cls.stream && ` • ${cls.stream}`}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          cls.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-1 ${
                            cls.is_active ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          {cls.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium ml-1">
                            {cls.current_students || 0}/{cls.capacity}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Eye className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">Teacher:</span>
                          <span className="font-medium ml-1">
                            {cls.class_teacher_name || 'Not assigned'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, ((cls.current_students || 0) / cls.capacity) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-center mb-4">
                        {Math.round(((cls.current_students || 0) / cls.capacity) * 100)}% filled
                      </p>
                      
                      <div className="flex justify-between space-x-2">
                        <button
                          onClick={() => openConfirmation('toggle', cls)}
                          className={`flex-1 px-3 py-1.5 rounded text-xs font-medium ${
                            cls.is_active
                              ? 'bg-red-50 text-red-700 hover:bg-red-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {cls.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => openConfirmation('delete', cls)}
                          className="flex-1 px-3 py-1.5 bg-red-50 text-red-700 rounded text-xs font-medium hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Desktop table view */}
            {!loading.classes && classes.length > 0 && (
              <table className="hidden md:table min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classes.map(cls => (
                    <tr key={cls.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <School className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {cls.class_name}
                            </h4>
                            <div className="flex flex-wrap items-center mt-1 gap-1">
                              <span className="text-sm text-gray-600">Code: {cls.class_code}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-sm text-gray-600">Level: {cls.numeric_level}</span>
                              {cls.stream && (
                                <>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-sm text-gray-600">Stream: {cls.stream}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {cls.class_teacher_name ? (
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                              <Users className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="text-sm text-gray-700 truncate max-w-[150px]">
                              {cls.class_teacher_name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Not assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${Math.min(100, ((cls.current_students || 0) / cls.capacity) * 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                              {cls.current_students || 0}/{cls.capacity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round(((cls.current_students || 0) / cls.capacity) * 100)}% filled
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          cls.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            cls.is_active ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          {cls.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openConfirmation('toggle', cls)}
                            className={`px-3 py-1.5 rounded text-xs font-medium ${
                              cls.is_active
                                ? 'bg-red-50 text-red-700 hover:bg-red-100'
                                : 'bg-green-50 text-green-700 hover:bg-green-100'
                            }`}
                          >
                            {cls.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => openConfirmation('delete', cls)}
                            className="px-3 py-1.5 bg-red-50 text-red-700 rounded text-xs font-medium hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Information Panel */}
        <div className="mt-6 p-4 md:p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start">
            <Info className="h-5 w-5 md:h-6 md:w-6 text-blue-500 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Class Management Information</h4>
              <ul className="text-sm text-blue-700 space-y-1.5">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  Classes are used for student placement and timetable scheduling
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  Each class requires a unique class code for identification
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  Class teachers can be assigned to manage specific classes
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  Deactivated classes will not appear in student enrollment options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Create Class Modal with Blur Effect */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center p-2 md:p-4 z-50">
          {/* Backdrop with blur effect - no darkening */}
          <div 
            className="absolute inset-0 backdrop-blur bg-transparent"
            onClick={() => {
              setShowCreateModal(false);
              resetForm();
            }}
          ></div>
          
          {/* Modal content - stays sharp */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] border-4 border-blue-500 overflow-hidden animate-fade-in-up">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-blue-500 ">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <School className="h-5 w-5 text-white mr-2" />
                  Create New Class
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-red-400 hover:text-red-500 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-6 overflow-auto max-h-[70vh]">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-white rounded-lg p-4 md:p-5 border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                      <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Class Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="class_code"
                          value={formData.class_code}
                          onChange={handleInputChange}
                          className={`w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            formErrors.class_code ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="Example: C-101, C-102"
                          required
                        />
                        {formErrors.class_code && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.class_code}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Unique identifier for the class</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Class Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="class_name"
                          value={formData.class_name}
                          onChange={handleInputChange}
                          className={`w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            formErrors.class_name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="Example: Grade 1"
                          required
                        />
                        {formErrors.class_name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.class_name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Numeric Level <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="numeric_level"
                          value={formData.numeric_level}
                          onChange={handleInputChange}
                          className={`w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            formErrors.numeric_level ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          required
                          disabled={loading.levels}
                        >
                          <option value="">Select Level</option>
                          {numericLevels.map(level => (
                            <option key={level.level} value={level.level}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                        {formErrors.numeric_level && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.numeric_level}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Academic level (1-12)</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stream
                        </label>
                        <select
                          name="stream"
                          value={formData.stream}
                          onChange={handleInputChange}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                          disabled={loading.streams}
                        >
                          <option value="">No Stream</option>
                          {streams.map(stream => (
                            <option key={stream.id} value={stream.name}>
                              {stream.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Class Details */}
                  <div className="bg-white rounded-lg p-4 md:p-5 border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                      <span className="w-1 h-5 bg-green-500 rounded-full mr-2"></span>
                      Class Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Class Capacity
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            min="1"
                            max="100"
                            className={`w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                              formErrors.capacity ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            students
                          </div>
                        </div>
                        {formErrors.capacity && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.capacity}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Maximum students in this class</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Class Teacher
                        </label>
                        <select
                          name="class_teacher_id"
                          value={formData.class_teacher_id}
                          onChange={handleInputChange}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                          disabled={loading.teachers}
                        >
                          <option value="">Select Teacher</option>
                          {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.full_name || `${teacher.first_name} ${teacher.last_name}`}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex items-center md:col-span-2">
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              id="is_active"
                              name="is_active"
                              checked={formData.is_active}
                              onChange={handleInputChange}
                              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-200"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="is_active" className="font-medium text-gray-700">
                              Active Class
                            </label>
                            <p className="text-gray-500">Class will be available for student enrollment immediately</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 md:p-5 border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                      <span className="w-1 h-5 bg-purple-500 rounded-full mr-2"></span>
                      Class Preview
                    </h4>
                    <div className="p-4 bg-white rounded-lg border-2 border-blue-200 shadow-md">
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
                          <School className="h-6 w-6 md:h-7 md:w-7 text-white" />
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-800 text-lg">
                            {formData.class_name || 'Class Name'}
                          </h5>
                          <p className="text-sm text-gray-600 flex flex-wrap gap-1">
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              {formData.class_code || 'CODE'}
                            </span>
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Level {formData.numeric_level || '0'}
                            </span>
                            {formData.stream && (
                              <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                {formData.stream}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium ml-1">{formData.capacity} students</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">Status:</span>
                          <span className={`ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            formData.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                              formData.is_active ? 'bg-green-500' : 'bg-red-500'
                            }`}></span>
                            {formData.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-all duration-200 shadow-md"
                    disabled={loading.classes || loading.teachers || loading.streams || loading.levels}
                  >
                    {(loading.classes || loading.teachers || loading.streams || loading.levels) ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Class
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassManagement;