/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import { 
  Plus, Edit2, Trash2, Eye, RefreshCw, Calendar, BookOpen, 
  Layers, Target, CheckCircle, AlertCircle, X, Loader2, 
  ChevronDown, ChevronRight, FolderTree, GraduationCap, Clock,
  Award, Users, FileText, Upload, Download, Filter, Search,
  LogOut
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Helper function to get current term based on month
const getCurrentTermFromDate = () => {
  const currentMonth = new Date().getMonth() + 1;
  if (currentMonth >= 1 && currentMonth <= 3) return 'Term 1';
  if (currentMonth >= 5 && currentMonth <= 7) return 'Term 2';
  if (currentMonth >= 9 && currentMonth <= 11) return 'Term 3';
  return null;
};

// Session Expired Modal
const SessionExpiredModal = ({ isOpen, onLogout }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Session Expired</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Your session has expired. Please login again to continue using the system.
          </p>
          <div className="flex justify-end">
            <button
              onClick={onLogout}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notification Component
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    info: <FileText className="h-5 w-5 text-blue-500" />
  };

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${styles[type]} animate-slide-in`}>
      {icons[type]}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-4"><X className="h-4 w-4" /></button>
    </div>
  );
};

// Confirmation Modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'warning' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className={`h-6 w-6 ${type === 'danger' ? 'text-red-500' : 'text-yellow-500'} mr-3`} />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={onConfirm} className={`px-4 py-2 text-white rounded-lg ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Modal
const FormModal = ({ isOpen, onClose, onSubmit, title, children, submitText = "Save", loading = false }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6">{children}</div>
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={onSubmit} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}{submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Grading Scale Component
const GradingScale = () => {
  const gradingLevels = [
    { rating: 'EE', subLevel: 1, label: 'Exceeding Expectations', color: 'bg-green-100 text-green-800', percentage: '80-100%', points: 8 },
    { rating: 'EE', subLevel: 2, label: 'Exceeding Expectations', color: 'bg-green-100 text-green-800', percentage: '70-79%', points: 7 },
    { rating: 'ME', subLevel: 1, label: 'Meeting Expectations', color: 'bg-blue-100 text-blue-800', percentage: '60-69%', points: 6 },
    { rating: 'ME', subLevel: 2, label: 'Meeting Expectations', color: 'bg-blue-100 text-blue-800', percentage: '50-59%', points: 5 },
    { rating: 'AE', subLevel: 1, label: 'Approaching Expectations', color: 'bg-yellow-100 text-yellow-800', percentage: '40-49%', points: 4 },
    { rating: 'AE', subLevel: 2, label: 'Approaching Expectations', color: 'bg-yellow-100 text-yellow-800', percentage: '30-39%', points: 3 },
    { rating: 'BE', subLevel: 1, label: 'Below Expectations', color: 'bg-red-100 text-red-800', percentage: '20-29%', points: 2 },
    { rating: 'BE', subLevel: 2, label: 'Below Expectations', color: 'bg-red-100 text-red-800', percentage: '0-19%', points: 1 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Award className="h-4 w-4" /> CBC Grading Scale (8 Levels)</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {gradingLevels.map((level, idx) => (
          <div key={idx} className={`${level.color} rounded-lg p-2 text-center border`}>
            <div className="font-bold text-sm">{level.rating}{level.subLevel}</div>
            <div className="text-xs">{level.percentage}</div>
            <div className="text-xs font-medium mt-1">{level.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Competency Table for Class
const CompetencyTable = ({ classData, competencies, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Competencies - {classData?.class_name} (Level {classData?.numeric_level})</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Learning Area</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strand</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sub-strand</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competency Code</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competency Statement</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {competencies.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{comp.learning_area}</td>
                    <td className="px-4 py-3 text-sm">{comp.strand}</td>
                    <td className="px-4 py-3 text-sm">{comp.substrand}</td>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">{comp.competency_code}</td>
                    <td className="px-4 py-3 text-sm">{comp.competency_statement}</td>
                    <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 text-xs rounded-full ${comp.is_core ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{comp.is_core ? 'Core' : 'Supplementary'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

function AcademicManagement() {
  const { user, getAuthHeaders, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('academic-calendar');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showCompetencyTable, setShowCompetencyTable] = useState(false);
  const [selectedClassForCompetencies, setSelectedClassForCompetencies] = useState(null);
  const [classCompetencies, setClassCompetencies] = useState([]);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  // Data States
  const [academicYears, setAcademicYears] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [learningAreas, setLearningAreas] = useState([]);
  const [strands, setStrands] = useState([]);
  const [substrands, setSubstrands] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [selectedLearningArea, setSelectedLearningArea] = useState(null);
  const [selectedStrand, setSelectedStrand] = useState(null);
  const [selectedSubstrand, setSelectedSubstrand] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState(null);

  // Get current term based on month
  useEffect(() => {
    const term = getCurrentTermFromDate();
    setCurrentTerm(term);
  }, []);

  const addNotification = (type, message) => {
    setError(type === 'error' ? message : null);
    setSuccess(type === 'success' ? message : null);
    setTimeout(() => { setError(null); setSuccess(null); }, 5000);
  };

  // Handle session expiration
  const handleApiError = (error) => {
    if (error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('unauthorized')) {
      setShowSessionExpired(true);
    }
  };

  const handleLogout = () => {
    setShowSessionExpired(false);
    logout();
    window.location.href = '/logout';
  };

  // Fetch Data
  useEffect(() => {
    if (isAuthenticated) {
      fetchAcademicYears();
      fetchLearningAreas();
      fetchClasses();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedAcademicYear) fetchTerms(selectedAcademicYear.id);
  }, [selectedAcademicYear]);

  const fetchAcademicYears = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/academic-years/`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        setAcademicYears(data.data);
        const current = data.data.find(y => y.is_current);
        if (current) setSelectedAcademicYear(current);
        else if (data.data.length > 0) setSelectedAcademicYear(data.data[0]);
      }
    } catch (err) { 
      addNotification('error', 'Failed to fetch academic years');
      if (err.message?.includes('401')) handleApiError({ status: 401 });
    } finally { setLoading(false); }
  };

  const fetchTerms = async (yearId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/terms/?academic_year=${yearId}`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) setTerms(data.data);
    } catch (err) { addNotification('error', 'Failed to fetch terms'); }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/classes/`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) setClasses(data.data);
    } catch (err) { addNotification('error', 'Failed to fetch classes'); }
  };

  const fetchLearningAreas = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/learning-areas/`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) setLearningAreas(data.data);
    } catch (err) { addNotification('error', 'Failed to fetch learning areas'); }
  };

  const fetchStrands = async (areaId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/strands/?learning_area=${areaId}`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) setStrands(data.data);
    } catch (err) { addNotification('error', 'Failed to fetch strands'); }
  };

  const fetchSubstrands = async (strandId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/substrands/?strand=${strandId}`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) setSubstrands(data.data);
    } catch (err) { addNotification('error', 'Failed to fetch substrands'); }
  };

  const fetchCompetencies = async (substrandId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/competencies/?substrand=${substrandId}`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) setCompetencies(data.data);
    } catch (err) { addNotification('error', 'Failed to fetch competencies'); }
  };

  const fetchClassCompetencies = async (classId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/class-competencies/?class_id=${classId}`, { headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        setClassCompetencies(data.data);
        setShowCompetencyTable(true);
      }
    } catch (err) { addNotification('error', 'Failed to fetch competencies'); }
    finally { setLoading(false); }
  };

  // CRUD Operations
  const handleCreateAcademicYear = async () => {
    if (!formData.year_name || !formData.year_code || !formData.start_date || !formData.end_date) {
      addNotification('warning', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/academic-years/create/`, {
        method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(formData)
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        addNotification('success', 'Academic year created');
        setShowModal(false);
        fetchAcademicYears();
        setFormData({});
      } else addNotification('error', data.error || 'Creation failed');
    } catch (err) { addNotification('error', 'Failed to create'); }
    finally { setSubmitting(false); }
  };

  const handleCreateTerm = async () => {
    if (!formData.term || !formData.start_date || !formData.end_date) {
      addNotification('warning', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/terms/create/`, {
        method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ ...formData, academic_year: selectedAcademicYear.id })
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        addNotification('success', 'Term created');
        setShowModal(false);
        fetchTerms(selectedAcademicYear.id);
        setFormData({});
      } else addNotification('error', data.error || 'Creation failed');
    } catch (err) { addNotification('error', 'Failed to create'); }
    finally { setSubmitting(false); }
  };

  const handleCreateLearningArea = async () => {
    if (!formData.area_code || !formData.area_name) {
      addNotification('warning', 'Area code and name are required');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/learning-areas/create/`, {
        method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(formData)
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        addNotification('success', 'Learning area created');
        setShowModal(false);
        fetchLearningAreas();
        setFormData({});
      } else addNotification('error', data.error || 'Creation failed');
    } catch (err) { addNotification('error', 'Failed to create'); }
    finally { setSubmitting(false); }
  };

  const handleCreateStrand = async () => {
    if (!formData.strand_code || !formData.strand_name || !selectedLearningArea) {
      addNotification('warning', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/strands/create/`, {
        method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ ...formData, learning_area: selectedLearningArea.id })
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        addNotification('success', 'Strand created');
        setShowModal(false);
        fetchStrands(selectedLearningArea.id);
        setFormData({});
      } else addNotification('error', data.error || 'Creation failed');
    } catch (err) { addNotification('error', 'Failed to create'); }
    finally { setSubmitting(false); }
  };

  const handleCreateSubstrand = async () => {
    if (!formData.substrand_code || !formData.substrand_name || !selectedStrand) {
      addNotification('warning', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/substrands/create/`, {
        method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ ...formData, strand: selectedStrand.id })
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        addNotification('success', 'Sub-strand created');
        setShowModal(false);
        fetchSubstrands(selectedStrand.id);
        setFormData({});
      } else addNotification('error', data.error || 'Creation failed');
    } catch (err) { addNotification('error', 'Failed to create'); }
    finally { setSubmitting(false); }
  };

  const handleCreateCompetency = async () => {
    if (!formData.competency_code || !formData.competency_statement || !selectedSubstrand) {
      addNotification('warning', 'Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/registrar/academic/competencies/create/`, {
        method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ ...formData, substrand: selectedSubstrand.id })
      });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        addNotification('success', 'Competency created');
        setShowModal(false);
        fetchCompetencies(selectedSubstrand.id);
        setFormData({});
      } else addNotification('error', data.error || 'Creation failed');
    } catch (err) { addNotification('error', 'Failed to create'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (type, id) => {
    let endpoint = '';
    if (type === 'academicYear') endpoint = `/api/registrar/academic/academic-years/${id}/`;
    else if (type === 'term') endpoint = `/api/registrar/academic/terms/${id}/`;
    else if (type === 'learningArea') endpoint = `/api/registrar/academic/learning-areas/${id}/`;
    else if (type === 'strand') endpoint = `/api/registrar/academic/strands/${id}/`;
    else if (type === 'substrand') endpoint = `/api/registrar/academic/substrands/${id}/`;
    else if (type === 'competency') endpoint = `/api/registrar/academic/competencies/${id}/`;
    
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.status === 401) { handleApiError({ status: 401 }); return; }
      const data = await res.json();
      if (data.success) {
        addNotification('success', `${type} deleted`);
        if (type === 'academicYear') fetchAcademicYears();
        else if (type === 'term') fetchTerms(selectedAcademicYear?.id);
        else if (type === 'learningArea') fetchLearningAreas();
        else if (type === 'strand') fetchStrands(selectedLearningArea?.id);
        else if (type === 'substrand') fetchSubstrands(selectedStrand?.id);
        else if (type === 'competency') fetchCompetencies(selectedSubstrand?.id);
      } else addNotification('error', data.error || 'Delete failed');
    } catch (err) { addNotification('error', 'Failed to delete'); }
    finally { setSubmitting(false); setDeleteConfirm(null); }
  };

  const handleSelectLearningArea = async (area) => {
    setSelectedLearningArea(area);
    setSelectedStrand(null);
    setSelectedSubstrand(null);
    await fetchStrands(area.id);
  };

  const handleSelectStrand = async (strand) => {
    setSelectedStrand(strand);
    setSelectedSubstrand(null);
    await fetchSubstrands(strand.id);
  };

  const handleSelectSubstrand = async (substrand) => {
    setSelectedSubstrand(substrand);
    await fetchCompetencies(substrand.id);
  };

  // Render Academic Calendar Tab
  const renderAcademicCalendar = () => (
    <div className="space-y-8">
      {currentTerm && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">Current Academic Period</h3>
              <p className="text-sm text-blue-700">Based on current month ({new Date().toLocaleString('default', { month: 'long' })}), the active term is <span className="font-bold">{currentTerm}</span></p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div><h2 className="font-semibold text-gray-800">Academic Years</h2><p className="text-sm text-gray-500">Manage school academic years</p></div>
          <button onClick={() => { setModalType('academicYear'); setFormData({ year_name: '', year_code: '', start_date: '', end_date: '', is_current: false }); setShowModal(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus className="h-4 w-4" /> Add Year</button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {academicYears.map(year => (
              <div key={year.id} className={`border rounded-lg p-4 ${year.is_current ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{year.year_name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${year.is_current ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{year.is_current ? 'Current' : 'Inactive'}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{year.year_code}</p>
                <p className="text-xs text-gray-500">{new Date(year.start_date).toLocaleDateString()} - {new Date(year.end_date).toLocaleDateString()}</p>
                <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
                  <button onClick={() => setDeleteConfirm({ id: year.id, name: year.year_name, type: 'academicYear' })} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedAcademicYear && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div><h2 className="font-semibold text-gray-800">Terms - {selectedAcademicYear.year_name}</h2><p className="text-sm text-gray-500">Term 1: Jan-Mar | Term 2: May-Jul | Term 3: Sep-Nov</p></div>
            <button onClick={() => { setModalType('term'); setFormData({ term: '', start_date: '', end_date: '', is_current: false }); setShowModal(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus className="h-4 w-4" /> Add Term</button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {terms.map(term => {
                const isCurrent = term.is_current || (currentTerm && term.term === currentTerm && !term.is_current);
                return (
                  <div key={term.id} className={`border rounded-lg p-4 ${isCurrent ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{term.term}</h3>
                      {isCurrent && <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Current</span>}
                    </div>
                    <p className="text-sm text-gray-600">{new Date(term.start_date).toLocaleDateString()} - {new Date(term.end_date).toLocaleDateString()}</p>
                    <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
                      <button onClick={() => setDeleteConfirm({ id: term.id, name: term.term, type: 'term' })} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <GradingScale />
    </div>
  );

  // Render Curriculum Tab
  const renderCurriculum = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Grade Levels</h3>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          {classes.map(cls => (
            <div key={cls.id} className={`border-b border-gray-100 ${selectedGradeLevel?.id === cls.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              <div className="px-4 py-3 cursor-pointer flex justify-between items-center" onClick={() => setSelectedGradeLevel(cls)}>
                <div><span className="font-medium text-gray-800">{cls.class_name}</span><span className="text-xs text-gray-500 ml-2">Level {cls.numeric_level}</span></div>
                <button onClick={(e) => { e.stopPropagation(); setSelectedClassForCompetencies(cls); fetchClassCompetencies(cls.id); }} className="text-blue-500 hover:text-blue-700"><Eye className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2"><BookOpen className="h-4 w-4" /> Learning Areas</h3>
          <button onClick={() => { if (!selectedGradeLevel) { addNotification('warning', 'Select a grade level first'); return; } setModalType('learningArea'); setFormData({ area_code: '', area_name: '', short_name: '', area_type: 'Core', description: '', is_active: true }); setShowModal(true); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Plus className="h-4 w-4" /></button>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          {learningAreas.map(area => (
            <div key={area.id} className={`border-b border-gray-100 ${selectedLearningArea?.id === area.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              <div className="px-4 py-3 cursor-pointer flex justify-between items-center" onClick={() => handleSelectLearningArea(area)}>
                <div><span className="font-medium text-gray-800">{area.area_name}</span><span className="text-xs text-gray-500 ml-2">({area.area_code})</span></div>
                <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ id: area.id, name: area.area_name, type: 'learningArea' }); }} className="text-red-500 hover:text-red-700"><Trash2 className="h-3 w-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Layers className="h-4 w-4" /> Strands</h3>
            <button onClick={() => { if (!selectedLearningArea) { addNotification('warning', 'Select a learning area first'); return; } setModalType('strand'); setFormData({ strand_code: '', strand_name: '', description: '', display_order: '' }); setShowModal(true); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {selectedLearningArea ? strands.map(strand => (
              <div key={strand.id} className={`border-b border-gray-100 ${selectedStrand?.id === strand.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <div className="px-4 py-2 cursor-pointer flex justify-between items-center" onClick={() => handleSelectStrand(strand)}>
                  <div><span className="text-sm text-gray-800">{strand.strand_name}</span><span className="text-xs text-gray-500 ml-2">({strand.strand_code})</span></div>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ id: strand.id, name: strand.strand_name, type: 'strand' }); }} className="text-red-500 hover:text-red-700"><Trash2 className="h-3 w-3" /></button>
                </div>
              </div>
            )) : <div className="p-4 text-center text-gray-500">Select a learning area to view strands</div>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><FolderTree className="h-4 w-4" /> Sub-strands</h3>
            <button onClick={() => { if (!selectedStrand) { addNotification('warning', 'Select a strand first'); return; } setModalType('substrand'); setFormData({ substrand_code: '', substrand_name: '', description: '', display_order: '' }); setShowModal(true); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {selectedStrand ? substrands.map(sub => (
              <div key={sub.id} className={`border-b border-gray-100 ${selectedSubstrand?.id === sub.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <div className="px-4 py-2 cursor-pointer flex justify-between items-center" onClick={() => handleSelectSubstrand(sub)}>
                  <div><span className="text-sm text-gray-800">{sub.substrand_name}</span><span className="text-xs text-gray-500 ml-2">({sub.substrand_code})</span></div>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ id: sub.id, name: sub.substrand_name, type: 'substrand' }); }} className="text-red-500 hover:text-red-700"><Trash2 className="h-3 w-3" /></button>
                </div>
              </div>
            )) : <div className="p-4 text-center text-gray-500">Select a strand to view sub-strands</div>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Target className="h-4 w-4" /> Competencies</h3>
            <button onClick={() => { if (!selectedSubstrand) { addNotification('warning', 'Select a sub-strand first'); return; } setModalType('competency'); setFormData({ competency_code: '', competency_statement: '', performance_indicator: '', is_core_competency: true, display_order: '' }); setShowModal(true); }} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="max-h-[250px] overflow-y-auto p-2">
            {selectedSubstrand ? competencies.map(comp => (
              <div key={comp.id} className="p-2 border-b border-gray-100">
                <div className="flex justify-between">
                  <div className="flex-1"><span className="font-mono text-xs text-blue-600">{comp.competency_code}</span><p className="text-xs text-gray-700 mt-1">{comp.competency_statement?.substring(0, 100)}...</p></div>
                  <button onClick={() => setDeleteConfirm({ id: comp.id, name: comp.competency_code, type: 'competency' })} className="text-red-500 hover:text-red-700"><Trash2 className="h-3 w-3" /></button>
                </div>
              </div>
            )) : <div className="p-4 text-center text-gray-500">Select a sub-strand to view competencies</div>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderModalContent = () => {
    switch (modalType) {
      case 'academicYear':
        return (<div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Year Code *</label><input type="text" value={formData.year_code || ''} onChange={e => setFormData({...formData, year_code: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="2024-2025" /></div><div><label className="block text-sm font-medium mb-1">Year Name *</label><input type="text" value={formData.year_name || ''} onChange={e => setFormData({...formData, year_name: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="2024-2025 Academic Year" /></div></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Start Date *</label><input type="date" value={formData.start_date || ''} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full border rounded-lg px-3 py-2" /></div><div><label className="block text-sm font-medium mb-1">End Date *</label><input type="date" value={formData.end_date || ''} onChange={e => setFormData({...formData, end_date: e.target.value})} className="w-full border rounded-lg px-3 py-2" /></div></div><div className="flex items-center"><input type="checkbox" id="isCurrent" checked={formData.is_current || false} onChange={e => setFormData({...formData, is_current: e.target.checked})} className="h-4 w-4 rounded" /><label htmlFor="isCurrent" className="ml-2 text-sm">Set as current academic year</label></div></div>);
      case 'term':
        return (<div className="space-y-4"><div><label className="block text-sm font-medium mb-1">Term Name *</label><select value={formData.term || ''} onChange={e => setFormData({...formData, term: e.target.value})} className="w-full border rounded-lg px-3 py-2"><option value="">Select Term</option><option value="Term 1">Term 1 (Jan-Mar)</option><option value="Term 2">Term 2 (May-Jul)</option><option value="Term 3">Term 3 (Sep-Nov)</option></select></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Start Date *</label><input type="date" value={formData.start_date || ''} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full border rounded-lg px-3 py-2" /></div><div><label className="block text-sm font-medium mb-1">End Date *</label><input type="date" value={formData.end_date || ''} onChange={e => setFormData({...formData, end_date: e.target.value})} className="w-full border rounded-lg px-3 py-2" /></div></div><div className="flex items-center"><input type="checkbox" id="isCurrentTerm" checked={formData.is_current || false} onChange={e => setFormData({...formData, is_current: e.target.checked})} className="h-4 w-4 rounded" /><label htmlFor="isCurrentTerm" className="ml-2 text-sm">Set as current term</label></div></div>);
      case 'learningArea':
        return (<div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Area Code *</label><input type="text" value={formData.area_code || ''} onChange={e => setFormData({...formData, area_code: e.target.value.toUpperCase()})} className="w-full border rounded-lg px-3 py-2" placeholder="ENG" /></div><div><label className="block text-sm font-medium mb-1">Short Name</label><input type="text" value={formData.short_name || ''} onChange={e => setFormData({...formData, short_name: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="English" /></div></div><div><label className="block text-sm font-medium mb-1">Area Name *</label><input type="text" value={formData.area_name || ''} onChange={e => setFormData({...formData, area_name: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="English Language" /></div><div><label className="block text-sm font-medium mb-1">Area Type</label><select value={formData.area_type || 'Core'} onChange={e => setFormData({...formData, area_type: e.target.value})} className="w-full border rounded-lg px-3 py-2"><option value="Core">Core</option><option value="Optional">Optional</option><option value="Extracurricular">Extracurricular</option></select></div><div><label className="block text-sm font-medium mb-1">Description</label><textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} rows="2" className="w-full border rounded-lg px-3 py-2" /></div><div className="flex items-center"><input type="checkbox" id="isActive" checked={formData.is_active !== false} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="h-4 w-4 rounded" /><label htmlFor="isActive" className="ml-2 text-sm">Active</label></div></div>);
      case 'strand':
        return (<div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Strand Code *</label><input type="text" value={formData.strand_code || ''} onChange={e => setFormData({...formData, strand_code: e.target.value.toUpperCase()})} className="w-full border rounded-lg px-3 py-2" placeholder="ENG-L" /></div><div><label className="block text-sm font-medium mb-1">Display Order</label><input type="number" value={formData.display_order || ''} onChange={e => setFormData({...formData, display_order: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="1" /></div></div><div><label className="block text-sm font-medium mb-1">Strand Name *</label><input type="text" value={formData.strand_name || ''} onChange={e => setFormData({...formData, strand_name: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Listening and Speaking" /></div><div><label className="block text-sm font-medium mb-1">Description</label><textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} rows="2" className="w-full border rounded-lg px-3 py-2" /></div></div>);
      case 'substrand':
        return (<div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Sub-strand Code *</label><input type="text" value={formData.substrand_code || ''} onChange={e => setFormData({...formData, substrand_code: e.target.value.toUpperCase()})} className="w-full border rounded-lg px-3 py-2" placeholder="ENG-L1" /></div><div><label className="block text-sm font-medium mb-1">Display Order</label><input type="number" value={formData.display_order || ''} onChange={e => setFormData({...formData, display_order: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="1" /></div></div><div><label className="block text-sm font-medium mb-1">Sub-strand Name *</label><input type="text" value={formData.substrand_name || ''} onChange={e => setFormData({...formData, substrand_name: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Oral Communication" /></div><div><label className="block text-sm font-medium mb-1">Description</label><textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} rows="2" className="w-full border rounded-lg px-3 py-2" /></div></div>);
      case 'competency':
        return (<div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-1">Competency Code *</label><input type="text" value={formData.competency_code || ''} onChange={e => setFormData({...formData, competency_code: e.target.value.toUpperCase()})} className="w-full border rounded-lg px-3 py-2" placeholder="ENG-L1.1" /></div><div><label className="block text-sm font-medium mb-1">Display Order</label><input type="number" value={formData.display_order || ''} onChange={e => setFormData({...formData, display_order: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="1" /></div></div><div><label className="block text-sm font-medium mb-1">Competency Statement *</label><textarea value={formData.competency_statement || ''} onChange={e => setFormData({...formData, competency_statement: e.target.value})} rows="3" className="w-full border rounded-lg px-3 py-2" placeholder="Describe the specific skill..." /></div><div><label className="block text-sm font-medium mb-1">Performance Indicator</label><textarea value={formData.performance_indicator || ''} onChange={e => setFormData({...formData, performance_indicator: e.target.value})} rows="2" className="w-full border rounded-lg px-3 py-2" placeholder="How will this be measured?" /></div><div className="flex items-center"><input type="checkbox" id="isCore" checked={formData.is_core_competency !== false} onChange={e => setFormData({...formData, is_core_competency: e.target.checked})} className="h-4 w-4 rounded" /><label htmlFor="isCore" className="ml-2 text-sm">Core Competency</label></div></div>);
      default: return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center"><AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-gray-900">Authentication Required</h2><p className="text-gray-600 mt-2 mb-6">Please login to access academic management</p><a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Login</a></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } .animate-slide-in { animation: slideIn 0.3s ease-out; }`}</style>

      <SessionExpiredModal isOpen={showSessionExpired} onLogout={handleLogout} />

      {error && <Notification type="error" message={error} onClose={() => setError(null)} />}
      {success && <Notification type="success" message={success} onClose={() => setSuccess(null)} />}

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><GraduationCap className="h-7 w-7 text-blue-600" /> Academic Management</h1>
              <p className="text-gray-500 text-sm">Manage academic years, terms, and CBE curriculum structure by grade level</p>
              {user && <p className="text-xs text-gray-400 mt-1">{user.first_name} {user.last_name} • {user.role}</p>}
            </div>
            <div className="flex items-center gap-3">
              {currentTerm && <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1"><Clock className="h-3 w-3" /> Current: {currentTerm}</div>}
              <button onClick={() => { fetchAcademicYears(); fetchLearningAreas(); fetchClasses(); }} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"><RefreshCw className="h-5 w-5" /></button>
            </div>
          </div>
        </div>

        <div className="px-6 border-b border-gray-200">
          <div className="flex gap-6">
            <button onClick={() => setActiveTab('academic-calendar')} className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === 'academic-calendar' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}><Calendar className="h-4 w-4" /> Academic Calendar</button>
            <button onClick={() => setActiveTab('curriculum')} className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === 'curriculum' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}><BookOpen className="h-4 w-4" /> Curriculum Structure</button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (<div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 text-blue-600 animate-spin" /></div>) : activeTab === 'academic-calendar' ? renderAcademicCalendar() : renderCurriculum()}
      </div>

      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={() => {
        if (modalType === 'academicYear') handleCreateAcademicYear();
        else if (modalType === 'term') handleCreateTerm();
        else if (modalType === 'learningArea') handleCreateLearningArea();
        else if (modalType === 'strand') handleCreateStrand();
        else if (modalType === 'substrand') handleCreateSubstrand();
        else if (modalType === 'competency') handleCreateCompetency();
      }} title={`Add ${modalType?.replace(/([A-Z])/g, ' $1').trim()}`} loading={submitting}>{renderModalContent()}</FormModal>

      <ConfirmationModal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => handleDelete(deleteConfirm?.type, deleteConfirm?.id)} title="Delete Item" message={`Are you sure you want to delete "${deleteConfirm?.name}"? This cannot be undone.`} type="danger" />

      {showCompetencyTable && selectedClassForCompetencies && (
        <CompetencyTable classData={selectedClassForCompetencies} competencies={classCompetencies} onClose={() => { setShowCompetencyTable(false); setSelectedClassForCompetencies(null); setClassCompetencies([]); }} />
      )}
    </div>
  );
}

export default AcademicManagement;