/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const AssessmentManager = () => {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'opener',
    term: 'Term 1',
    academicYear: '2024',
    classId: '',
    subjectId: '',
    openDate: '',
    closeDate: '',
    weight: '',
    description: ''
  });
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filters, setFilters] = useState({
    term: '',
    type: '',
    class: '',
    subject: ''
  });

  // Assessment types based on CBC
  const assessmentTypes = [
    { value: 'opener', label: 'Opener Examination', weight: 20, color: 'blue' },
    { value: 'midterm', label: 'Midterm Assessment', weight: 30, color: 'green' },
    { value: 'endterm', label: 'Endterm Examination', weight: 50, color: 'purple' },
    { value: 'sba', label: 'School-Based Assessment (KNEC)', weight: 60, color: 'orange' },
    { value: 'ca', label: 'Classroom Assessment', weight: 30, color: 'teal' }
  ];

  const terms = ['Term 1', 'Term 2', 'Term 3'];
  const academicYears = ['2024', '2025', '2026'];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API calls
      setTimeout(() => {
        setClasses([
          { id: 1, name: 'Grade 7 East', level: 7, stream: 'East', studentCount: 45 },
          { id: 2, name: 'Grade 7 West', level: 7, stream: 'West', studentCount: 42 },
          { id: 3, name: 'Grade 8 East', level: 8, stream: 'East', studentCount: 38 },
          { id: 4, name: 'Grade 8 West', level: 8, stream: 'West', studentCount: 40 }
        ]);

        setSubjects([
          { id: 1, name: 'Integrated Science', code: 'SCI', color: 'emerald' },
          { id: 2, name: 'Agriculture', code: 'AGR', color: 'green' },
          { id: 3, name: 'Mathematics', code: 'MATH', color: 'blue' },
          { id: 4, name: 'English', code: 'ENG', color: 'purple' },
          { id: 5, name: 'Kiswahili', code: 'KIS', color: 'orange' }
        ]);

        setAssessments([
          {
            id: 1,
            name: 'Opener Examination 2024',
            type: 'opener',
            term: 'Term 1',
            academicYear: '2024',
            class: 'Grade 7 East',
            classId: 1,
            subject: 'Integrated Science',
            subjectId: 1,
            openDate: '2024-01-15',
            closeDate: '2024-01-20',
            weight: 20,
            status: 'active',
            completionRate: 75,
            submissions: 34,
            totalStudents: 45
          },
          {
            id: 2,
            name: 'Midterm Assessment',
            type: 'midterm',
            term: 'Term 1',
            academicYear: '2024',
            class: 'Grade 8 West',
            classId: 4,
            subject: 'Mathematics',
            subjectId: 3,
            openDate: '2024-02-10',
            closeDate: '2024-02-15',
            weight: 30,
            status: 'upcoming',
            completionRate: 0,
            submissions: 0,
            totalStudents: 40
          },
          {
            id: 3,
            name: 'Endterm Examination',
            type: 'endterm',
            term: 'Term 1',
            academicYear: '2024',
            class: 'Grade 7 East',
            classId: 1,
            subject: 'Agriculture',
            subjectId: 2,
            openDate: '2024-03-20',
            closeDate: '2024-03-25',
            weight: 50,
            status: 'draft',
            completionRate: 0,
            submissions: 0,
            totalStudents: 45
          }
        ]);

        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const selectedType = assessmentTypes.find(t => t.value === e.target.value);
    setFormData(prev => ({
      ...prev,
      type: e.target.value,
      weight: selectedType?.weight || ''
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const selectedClass = classes.find(c => c.id === parseInt(formData.classId));
      const selectedSubject = subjects.find(s => s.id === parseInt(formData.subjectId));
      
      const newAssessment = {
        id: Date.now(),
        ...formData,
        class: selectedClass?.name,
        subject: selectedSubject?.name,
        status: 'draft',
        completionRate: 0,
        submissions: 0,
        totalStudents: selectedClass?.studentCount || 0
      };

      if (editingAssessment) {
        setAssessments(prev => prev.map(a => 
          a.id === editingAssessment.id ? { ...newAssessment, id: a.id } : a
        ));
        setSuccess('Assessment updated successfully');
      } else {
        setAssessments(prev => [...prev, newAssessment]);
        setSuccess('Assessment created successfully');
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Failed to save assessment');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this assessment?')) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAssessments(prev => prev.filter(a => a.id !== id));
      setSuccess('Assessment deleted successfully');
    } catch (err) {
      setError('Failed to delete assessment');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'opener',
      term: 'Term 1',
      academicYear: '2024',
      classId: '',
      subjectId: '',
      openDate: '',
      closeDate: '',
      weight: '',
      description: ''
    });
    setEditingAssessment(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-50 text-green-700 border-green-200',
      upcoming: 'bg-blue-50 text-blue-700 border-blue-200',
      draft: 'bg-gray-50 text-gray-700 border-gray-200',
      completed: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return styles[status] || styles.draft;
  };

  const getTypeColor = (type) => {
    const typeColors = {
      opener: 'blue',
      midterm: 'green',
      endterm: 'purple',
      sba: 'orange',
      ca: 'teal'
    };
    return typeColors[type] || 'gray';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Assessment Manager</h1>
              <p className="text-sm text-gray-500 mt-1">Create and manage CBC assessments</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Assessment
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Filters */}
        <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Term</label>
              <select 
                value={filters.term}
                onChange={(e) => handleFilterChange('term', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Terms</option>
                {terms.map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Assessment Type</label>
              <select 
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Types</option>
                {assessmentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Class</label>
              <select 
                value={filters.class}
                onChange={(e) => handleFilterChange('class', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Classes</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
              <select 
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Subjects</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Assessments Grid */}
        <div className="space-y-4">
          {assessments.map((assessment) => {
            const typeInfo = assessmentTypes.find(t => t.value === assessment.type);
            const typeColor = getTypeColor(assessment.type);
            
            return (
              <div
                key={assessment.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusBadge(assessment.status)}`}>
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full bg-${typeColor}-50 text-${typeColor}-700 border border-${typeColor}-200`}>
                        {typeInfo?.label}
                      </span>
                      <span className="text-sm text-gray-500">{assessment.term} • {assessment.academicYear}</span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{assessment.name}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Class & Subject</p>
                        <p className="text-sm text-gray-900">{assessment.class}</p>
                        <p className="text-sm text-gray-600">{assessment.subject}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                        <p className="text-sm text-gray-900">
                          {new Date(assessment.openDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-gray-600">
                          to {new Date(assessment.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Weight</p>
                        <p className="text-lg font-semibold text-gray-900">{assessment.weight}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Submissions</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">{assessment.submissions}</span>
                          <span className="text-sm text-gray-500">/ {assessment.totalStudents}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-500">Completion Rate</p>
                        <p className="text-xs font-medium text-gray-700">{assessment.completionRate}%</p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${assessment.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-6">
                    <button
                      onClick={() => {
                        setEditingAssessment(assessment);
                        setFormData({
                          name: assessment.name,
                          type: assessment.type,
                          term: assessment.term,
                          academicYear: assessment.academicYear,
                          classId: assessment.classId?.toString() || '',
                          subjectId: assessment.subjectId?.toString() || '',
                          openDate: assessment.openDate,
                          closeDate: assessment.closeDate,
                          weight: assessment.weight,
                          description: assessment.description || ''
                        });
                        setShowModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit assessment"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(assessment.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete assessment"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {assessments.length === 0 && (
            <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new assessment.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingAssessment ? 'Edit Assessment' : 'Create New Assessment'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assessment Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., End of Term Examination"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assessment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleTypeChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {assessmentTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (%)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      readOnly
                    />
                    <p className="mt-1 text-xs text-gray-500">Auto-calculated based on assessment type</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Term <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="term"
                      value={formData.term}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {terms.map(term => (
                        <option key={term} value={term}>{term}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Academic Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {academicYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="classId"
                      value={formData.classId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Class</option>
                      {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.studentCount} students)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subjectId"
                      value={formData.subjectId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Open Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="openDate"
                      value={formData.openDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Close Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="closeDate"
                      value={formData.closeDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add any additional notes or instructions..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    {editingAssessment ? 'Update Assessment' : 'Create Assessment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      {success && (
        <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">{success}</span>
          <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentManager;