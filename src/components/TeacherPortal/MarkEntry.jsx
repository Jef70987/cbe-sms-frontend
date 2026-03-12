/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Save,
  X,
  Filter,
  Users,
  BookOpen,
  Clipboard,
  Star,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Loader,
  ChevronDown,
  Download,
  Printer,
  Plus,
  Edit3,
  Trash2,
  Award,
  Heart,
  Target,
  Layers
} from 'react-feather';

const MarksEntrySheet = () => {
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [selectedStrand, setSelectedStrand] = useState('');
  const [selectedSubStrand, setSelectedSubStrand] = useState('');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [strands, setStrands] = useState([]);
  const [subStrands, setSubStrands] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // CBC Rating Scale
  const ratingScale = [
    { level: 'EE', subLevel: 'EE1', points: 8, label: 'Exceptional', range: '90-100%', color: 'bg-green-100 text-green-800 border-green-200' },
    { level: 'EE', subLevel: 'EE2', points: 7, label: 'Very Good', range: '75-89%', color: 'bg-green-50 text-green-700 border-green-200' },
    { level: 'ME', subLevel: 'ME1', points: 6, label: 'Good', range: '58-74%', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { level: 'ME', subLevel: 'ME2', points: 5, label: 'Fair', range: '41-57%', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { level: 'AE', subLevel: 'AE1', points: 4, label: 'Needs Improvement', range: '31-40%', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { level: 'AE', subLevel: 'AE2', points: 3, label: 'Below Average', range: '21-30%', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { level: 'BE', subLevel: 'BE1', points: 2, label: 'Well Below Average', range: '11-20%', color: 'bg-red-100 text-red-800 border-red-200' },
    { level: 'BE', subLevel: 'BE2', points: 1, label: 'Minimal', range: '1-10%', color: 'bg-red-50 text-red-700 border-red-200' },
  ];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API calls
      setTimeout(() => {
        setClasses([
          { id: 1, name: 'Grade 7 East', stream: 'East' },
          { id: 2, name: 'Grade 7 West', stream: 'West' },
          { id: 3, name: 'Grade 8 East', stream: 'East' }
        ]);

        setSubjects([
          { id: 1, name: 'Integrated Science', code: 'SCI' },
          { id: 2, name: 'Agriculture', code: 'AGR' },
          { id: 3, name: 'Mathematics', code: 'MATH' }
        ]);

        setAssessments([
          { id: 1, name: 'Opener Examination', type: 'opener', weight: 20 },
          { id: 2, name: 'Midterm Assessment', type: 'midterm', weight: 30 },
          { id: 3, name: 'Endterm Examination', type: 'endterm', weight: 50 }
        ]);

        setStrands([
          { id: 1, name: 'Human Body Systems', code: 'SCI-HBS' },
          { id: 2, name: 'Plants and Animals', code: 'SCI-PA' },
          { id: 3, name: 'Environment', code: 'SCI-ENV' }
        ]);

        setSubStrands([
          { id: 1, name: 'The Digestive System', code: 'SCI-HBS-DIG' },
          { id: 2, name: 'The Respiratory System', code: 'SCI-HBS-RES' },
          { id: 3, name: 'The Circulatory System', code: 'SCI-HBS-CIR' }
        ]);

        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const fetchStudents = async (classId) => {
    // Mock API call
    setTimeout(() => {
      setStudents([
        { id: 1, admissionNo: '2024/001', name: 'John Kamau', marks: { rating: 'ME1', comment: 'Good progress' } },
        { id: 2, admissionNo: '2024/002', name: 'Mary Wanjiku', marks: { rating: 'EE2', comment: 'Excellent work' } },
        { id: 3, admissionNo: '2024/003', name: 'Peter Omondi', marks: { rating: 'AE1', comment: 'Needs more practice' } },
        { id: 4, admissionNo: '2024/004', name: 'Sarah Akinyi', marks: { rating: 'ME2', comment: 'Satisfactory' } },
        { id: 5, admissionNo: '2024/005', name: 'David Mwangi', marks: { rating: 'BE1', comment: 'Requires remediation' } },
        { id: 6, admissionNo: '2024/006', name: 'Grace Mutheu', marks: { rating: 'EE1', comment: 'Outstanding' } },
        { id: 7, admissionNo: '2024/007', name: 'James Kariuki', marks: { rating: 'ME1', comment: 'Making progress' } },
        { id: 8, admissionNo: '2024/008', name: 'Lucy Akinyi', marks: { rating: 'AE2', comment: 'Below average' } },
      ]);
    }, 500);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    if (e.target.value) {
      fetchStudents(e.target.value);
    }
  };

  const handleRatingChange = (studentId, rating) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, marks: { ...student.marks, rating } }
        : student
    ));
  };

  const handleCommentChange = (studentId, comment) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, marks: { ...student.marks, comment } }
        : student
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Marks saved successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save marks');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getRatingColor = (rating) => {
    const found = ratingScale.find(r => r.subLevel === rating);
    return found ? found.color : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getRatingStats = () => {
    const stats = {};
    ratingScale.forEach(r => {
      stats[r.subLevel] = students.filter(s => s.marks.rating === r.subLevel).length;
    });
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Loading marks entry sheet...</p>
        </div>
      </div>
    );
  }

  const ratingStats = getRatingStats();

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Full-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clipboard className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Marks Entry Sheet</h1>
                <p className="text-gray-600 mt-1">Enter student marks using CBC 8-point scale</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Rating Scale Legend */}
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">CBC Rating Scale (8-Point)</h2>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ratingScale.map((rating) => (
                <div key={rating.subLevel} className={`px-3 py-2 rounded-lg border ${rating.color}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{rating.subLevel}</span>
                    <span className="text-xs opacity-75">{rating.points} pts</span>
                  </div>
                  <p className="text-xs font-medium mt-1">{rating.label}</p>
                  <p className="text-xs opacity-75 mt-0.5">{rating.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selection Filters */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Filter Assessment Criteria</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class *
                  </label>
                  <select
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment *
                  </label>
                  <select
                    value={selectedAssessment}
                    onChange={(e) => setSelectedAssessment(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  >
                    <option value="">Select Assessment</option>
                    {assessments.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.weight}%)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strand *
                  </label>
                  <select
                    value={selectedStrand}
                    onChange={(e) => setSelectedStrand(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  >
                    <option value="">Select Strand</option>
                    {strands.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-strand *
                  </label>
                  <select
                    value={selectedSubStrand}
                    onChange={(e) => setSelectedSubStrand(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    required
                  >
                    <option value="">Select Sub-strand</option>
                    {subStrands.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Marks Entry Table */}
          {selectedClass && students.length > 0 && (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {ratingScale.map(rating => (
                  <div key={rating.subLevel} className={`px-3 py-2 rounded-lg border ${rating.color} text-center`}>
                    <div className="font-bold text-sm">{rating.subLevel}</div>
                    <div className="text-xl font-semibold">{ratingStats[rating.subLevel] || 0}</div>
                    <div className="text-xs opacity-75">students</div>
                  </div>
                ))}
              </div>

              <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Admission No.
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student Name
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating (8-Point Scale)
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Teacher Comment
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => {
                        const ratingInfo = ratingScale.find(r => r.subLevel === student.marks.rating);
                        return (
                          <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {student.admissionNo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                  <Users className="w-4 h-4 text-blue-600" />
                                </div>
                                {student.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={student.marks.rating}
                                onChange={(e) => handleRatingChange(student.id, e.target.value)}
                                className={`px-3 py-1.5 rounded-lg border text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${getRatingColor(student.marks.rating)}`}
                              >
                                {ratingScale.map((rating) => (
                                  <option key={rating.subLevel} value={rating.subLevel}>
                                    {rating.subLevel} - {rating.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <MessageCircle className="w-4 h-4 text-gray-400" />
                                <input
                                  type="text"
                                  value={student.marks.comment}
                                  onChange={(e) => handleCommentChange(student.id, e.target.value)}
                                  placeholder="Add comment..."
                                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {ratingInfo?.points || '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                {/* Table Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Total Students: <strong>{students.length}</strong></span>
                      <span>|</span>
                      <span>Average Points: <strong>
                        {(students.reduce((acc, s) => {
                          const rating = ratingScale.find(r => r.subLevel === s.marks.rating);
                          return acc + (rating?.points || 0);
                        }, 0) / students.length).toFixed(1)}
                      </strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !selectedClass || !selectedSubject || !selectedAssessment}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Marks
                </>
              )}
            </button>
          </div>
        </form>

        {/* Status Messages */}
        {error && (
          <div className="fixed bottom-6 right-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50 max-w-md">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-sm font-medium break-words">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="fixed bottom-6 right-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50 max-w-md">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-sm font-medium break-words">{success}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MarksEntrySheet;