import React, { useState, useEffect } from 'react';

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
    { level: 'EE', subLevel: 'EE1', points: 8, label: 'Exceptional', range: '90-100%', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    { level: 'EE', subLevel: 'EE2', points: 7, label: 'Very Good', range: '75-89%', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    { level: 'ME', subLevel: 'ME1', points: 6, label: 'Good', range: '58-74%', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    { level: 'ME', subLevel: 'ME2', points: 5, label: 'Fair', range: '41-57%', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    { level: 'AE', subLevel: 'AE1', points: 4, label: 'Needs Improvement', range: '31-40%', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
    { level: 'AE', subLevel: 'AE2', points: 3, label: 'Below Average', range: '21-30%', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
    { level: 'BE', subLevel: 'BE1', points: 2, label: 'Well Below Average', range: '11-20%', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
    { level: 'BE', subLevel: 'BE2', points: 1, label: 'Minimal', range: '1-10%', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
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
          { id: 1, name: 'Grade 7 East' },
          { id: 2, name: 'Grade 7 West' },
          { id: 3, name: 'Grade 8 East' }
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
        { id: 1, admissionNo: '2024/001', name: 'John Kamau', marks: { rating: 'ME1', comment: '' } },
        { id: 2, admissionNo: '2024/002', name: 'Mary Wanjiku', marks: { rating: 'EE2', comment: '' } },
        { id: 3, admissionNo: '2024/003', name: 'Peter Omondi', marks: { rating: 'AE1', comment: '' } },
        { id: 4, admissionNo: '2024/004', name: 'Sarah Akinyi', marks: { rating: 'ME2', comment: '' } },
        { id: 5, admissionNo: '2024/005', name: 'David Mwangi', marks: { rating: 'BE1', comment: '' } },
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
    } catch (err) {
      setError('Failed to save marks');
    } finally {
      setSaving(false);
    }
  };

  const getRatingColor = (rating) => {
    const found = ratingScale.find(r => r.subLevel === rating);
    return found ? found.color : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marks Entry Sheet</h1>
          <p className="text-gray-600 dark:text-gray-400">Enter student marks using CBC 8-point scale</p>
        </header>

        {/* Rating Scale Legend */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">CBC Rating Scale (8-Point)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {ratingScale.map((rating) => (
              <div key={rating.subLevel} className={`px-2 py-1 rounded text-xs ${rating.color}`}>
                <span className="font-bold">{rating.subLevel}</span> - {rating.label} ({rating.range})
              </div>
            ))}
          </div>
        </div>

        {/* Selection Filters */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Class *
                </label>
                <select
                  id="class"
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="assessment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assessment Type *
                </label>
                <select
                  id="assessment"
                  value={selectedAssessment}
                  onChange={(e) => setSelectedAssessment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Assessment</option>
                  {assessments.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.weight}%)</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="strand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Strand *
                </label>
                <select
                  id="strand"
                  value={selectedStrand}
                  onChange={(e) => setSelectedStrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Strand</option>
                  {strands.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="substrand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sub-strand *
                </label>
                <select
                  id="substrand"
                  value={selectedSubStrand}
                  onChange={(e) => setSelectedSubStrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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

          {/* Marks Entry Table */}
          {selectedClass && students.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Admission No.
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rating (8-Point Scale)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Teacher Comment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {student.admissionNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={student.marks.rating}
                            onChange={(e) => handleRatingChange(student.id, e.target.value)}
                            className={`px-2 py-1 rounded text-sm border-0 focus:ring-2 focus:ring-blue-500 ${getRatingColor(student.marks.rating)}`}
                          >
                            {ratingScale.map((rating) => (
                              <option key={rating.subLevel} value={rating.subLevel}>
                                {rating.subLevel} - {rating.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={student.marks.comment}
                            onChange={(e) => handleCommentChange(student.id, e.target.value)}
                            placeholder="Add comment..."
                            className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !selectedClass || !selectedSubject || !selectedAssessment}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Marks'}
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="fixed bottom-4 right-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="fixed bottom-4 right-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MarksEntrySheet;