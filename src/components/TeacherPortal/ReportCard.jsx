import React, { useState, useEffect } from 'react';

const ReportCardGenerator = () => {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2024');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [reportCards, setReportCards] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // CBC Core Competencies
  const coreCompetencies = [
    'Communication and Collaboration',
    'Critical Thinking and Problem Solving',
    'Creativity and Imagination',
    'Citizenship',
    'Digital Literacy',
    'Learning to Learn',
    'Self-efficacy'
  ];

  // Values
  const values = [
    'Respect',
    'Responsibility',
    'Integrity',
    'Honesty',
    'Love',
    'Tolerance',
    'Peace'
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
          { id: 1, name: 'Grade 7 East', level: 7, stream: 'East' },
          { id: 2, name: 'Grade 7 West', level: 7, stream: 'West' },
          { id: 3, name: 'Grade 8 East', level: 8, stream: 'East' }
        ]);

        setStudents([
          {
            id: 1,
            admissionNo: '2024/001',
            name: 'John Kamau',
            className: 'Grade 7 East',
            photo: '/photos/john.jpg',
            attendance: { present: 62, absent: 3, total: 65 }
          },
          {
            id: 2,
            admissionNo: '2024/002',
            name: 'Mary Wanjiku',
            className: 'Grade 7 East',
            photo: '/photos/mary.jpg',
            attendance: { present: 65, absent: 0, total: 65 }
          },
          {
            id: 3,
            admissionNo: '2024/003',
            name: 'Peter Omondi',
            className: 'Grade 7 East',
            photo: '/photos/peter.jpg',
            attendance: { present: 60, absent: 5, total: 65 }
          }
        ]);

        setReportCards([
          {
            id: 1,
            studentId: 1,
            studentName: 'John Kamau',
            admissionNo: '2024/001',
            className: 'Grade 7 East',
            term: 'Term 1',
            academicYear: '2024',
            generatedDate: '2024-04-15',
            status: 'published',
            learningAreas: [
              { name: 'Integrated Science', score: 'ME1', points: 6, grade: 'Good', teacherComment: 'Good understanding of human body systems' },
              { name: 'Agriculture', score: 'EE2', points: 7, grade: 'Very Good', teacherComment: 'Excellent project on kitchen garden' },
              { name: 'Mathematics', score: 'ME2', points: 5, grade: 'Fair', teacherComment: 'Needs more practice with fractions' },
              { name: 'English', score: 'ME1', points: 6, grade: 'Good', teacherComment: 'Good reading comprehension' },
              { name: 'Kiswahili', score: 'AE1', points: 4, grade: 'Needs Improvement', teacherComment: 'Should practice more vocabulary' }
            ],
            competencyRatings: [
              { name: 'Communication and Collaboration', rating: 'ME1', descriptor: 'Good' },
              { name: 'Critical Thinking', rating: 'EE2', descriptor: 'Very Good' },
              { name: 'Creativity', rating: 'ME2', descriptor: 'Fair' },
              { name: 'Citizenship', rating: 'EE1', descriptor: 'Exceptional' },
              { name: 'Digital Literacy', rating: 'ME1', descriptor: 'Good' },
              { name: 'Learning to Learn', rating: 'ME1', descriptor: 'Good' },
              { name: 'Self-efficacy', rating: 'ME2', descriptor: 'Fair' }
            ],
            valuesRatings: [
              { name: 'Respect', rating: 'ME1' },
              { name: 'Responsibility', rating: 'ME1' },
              { name: 'Integrity', rating: 'EE2' },
              { name: 'Honesty', rating: 'ME1' },
              { name: 'Love', rating: 'EE1' }
            ],
            teacherRemarks: 'John has shown good progress this term. He excels in practical activities and works well in groups. Needs to improve in mathematics.',
            headTeacherRemarks: 'A promising student. Keep up the good work.',
            parentFeedback: ''
          }
        ]);

        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const handleGenerateReportCard = async () => {
    if (!selectedClass || !selectedTerm || !selectedAcademicYear) {
      setError('Please select class, term, and academic year');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Report cards generated successfully');
    } catch (err) {
      setError('Failed to generate report cards');
    } finally {
      setGenerating(false);
    }
  };

  const handlePreview = (student) => {
    const report = reportCards.find(r => r.studentId === student.id);
    if (report) {
      setSelectedStudent(student);
      setPreviewData(report);
    } else {
      // Generate preview data
      setPreviewData({
        studentId: student.id,
        studentName: student.name,
        admissionNo: student.admissionNo,
        className: student.className,
        term: selectedTerm,
        academicYear: selectedAcademicYear,
        generatedDate: new Date().toISOString().split('T')[0],
        learningAreas: [
          { name: 'Integrated Science', score: 'ME1', points: 6, teacherComment: 'Pending' },
          { name: 'Agriculture', score: 'ME2', points: 5, teacherComment: 'Pending' },
          { name: 'Mathematics', score: 'AE1', points: 4, teacherComment: 'Pending' }
        ],
        competencyRatings: coreCompetencies.map(c => ({
          name: c,
          rating: 'ME2',
          descriptor: 'Fair'
        })),
        valuesRatings: values.slice(0, 5).map(v => ({
          name: v,
          rating: 'ME1'
        })),
        teacherRemarks: 'To be completed',
        headTeacherRemarks: '',
        parentFeedback: ''
      });
      setSelectedStudent(student);
    }
  };

  const getScoreColor = (score) => {
    if (score.startsWith('EE')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (score.startsWith('ME')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    if (score.startsWith('AE')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (score.startsWith('BE')) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Report Card Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate CBE format report cards with 4-point scale</p>
        </header>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Academic Year
              </label>
              <select
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Term
              </label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Class</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGenerateReportCard}
                disabled={generating || !selectedClass}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? 'Generating...' : 'Generate Report Cards'}
              </button>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Students</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {students.map(student => {
              const hasReport = reportCards.some(r => r.studentId === student.id);
              return (
                <div key={student.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.admissionNo} • {student.className}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      hasReport ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {hasReport ? 'Generated' : 'Pending'}
                    </span>
                    <button
                      onClick={() => handlePreview(student)}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Preview
                    </button>
                    {hasReport && (
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        Print
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Report Card Preview Modal */}
        {previewData && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Report Card Preview
                  </h2>
                  <button
                    onClick={() => {
                      setPreviewData(null);
                      setSelectedStudent(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>

                {/* Report Card Content */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">MINISTRY OF EDUCATION</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">Kenya Certificate of Basic Education</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">COMPETENCY BASED ASSESSMENT</p>
                  </div>

                  {/* Student Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Name: <span className="font-medium text-gray-900 dark:text-white">{previewData.studentName}</span></p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Admission No: <span className="font-medium text-gray-900 dark:text-white">{previewData.admissionNo}</span></p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Class: <span className="font-medium text-gray-900 dark:text-white">{previewData.className}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Term: <span className="font-medium text-gray-900 dark:text-white">{previewData.term}</span></p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Year: <span className="font-medium text-gray-900 dark:text-white">{previewData.academicYear}</span></p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date: <span className="font-medium text-gray-900 dark:text-white">{previewData.generatedDate}</span></p>
                    </div>
                  </div>

                  {/* Learning Areas */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Learning Areas Achievement</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Learning Area</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Score</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Points</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Teacher's Comment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {previewData.learningAreas.map((area, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{area.name}</td>
                              <td className="px-4 py-2 text-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${getScoreColor(area.score)}`}>
                                  {area.score}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-center text-sm text-gray-900 dark:text-white">{area.points}</td>
                              <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{area.teacherComment}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Core Competencies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Core Competencies</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {previewData.competencyRatings.map((comp, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{comp.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getScoreColor(comp.rating)}`}>
                            {comp.rating} - {comp.descriptor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Values */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Values</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewData.valuesRatings.map((value, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{value.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getScoreColor(value.rating)}`}>
                            {value.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attendance Summary */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Attendance Summary</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Days</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedStudent.attendance.total}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">{selectedStudent.attendance.present}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">{selectedStudent.attendance.absent}</p>
                      </div>
                    </div>
                  </div>

                  {/* Teacher's Remarks */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Class Teacher's Remarks</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                      {previewData.teacherRemarks}
                    </p>
                  </div>

                  {/* Head Teacher's Remarks */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Head Teacher's Remarks</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                      {previewData.headTeacherRemarks || '_____________________'}
                    </p>
                  </div>

                  {/* Parent Feedback Section */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Parent/Guardian Feedback</h4>
                    <textarea
                      rows="3"
                      placeholder="Parent comments..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                    <div className="mt-2 flex justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>Parent Signature: _____________________</div>
                      <div>Date: _____________</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setPreviewData(null);
                      setSelectedStudent(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Print Report Card
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default ReportCardGenerator;