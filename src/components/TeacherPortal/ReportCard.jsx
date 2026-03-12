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
    { name: 'Communication and Collaboration', icon: '💬' },
    { name: 'Critical Thinking and Problem Solving', icon: '🧠' },
    { name: 'Creativity and Imagination', icon: '✨' },
    { name: 'Citizenship', icon: '🌍' },
    { name: 'Digital Literacy', icon: '💻' },
    { name: 'Learning to Learn', icon: '📚' },
    { name: 'Self-efficacy', icon: '⚡' }
  ];

  // Values
  const values = [
    { name: 'Respect', icon: '🤝' },
    { name: 'Responsibility', icon: '✅' },
    { name: 'Integrity', icon: '🎯' },
    { name: 'Honesty', icon: '🫂' },
    { name: 'Love', icon: '❤️' },
    { name: 'Tolerance', icon: '🕊️' },
    { name: 'Peace', icon: '☮️' }
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
          { id: 1, name: 'Grade 7 East', level: 7, stream: 'East', studentCount: 45 },
          { id: 2, name: 'Grade 7 West', level: 7, stream: 'West', studentCount: 42 },
          { id: 3, name: 'Grade 8 East', level: 8, stream: 'East', studentCount: 38 }
        ]);

        setStudents([
          {
            id: 1,
            admissionNo: '2024/001',
            name: 'John Kamau',
            className: 'Grade 7 East',
            classId: 1,
            attendance: { present: 62, absent: 3, total: 65 }
          },
          {
            id: 2,
            admissionNo: '2024/002',
            name: 'Mary Wanjiku',
            className: 'Grade 7 East',
            classId: 1,
            attendance: { present: 65, absent: 0, total: 65 }
          },
          {
            id: 3,
            admissionNo: '2024/003',
            name: 'Peter Omondi',
            className: 'Grade 7 East',
            classId: 1,
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
          name: c.name,
          rating: 'ME2',
          descriptor: 'Fair'
        })),
        valuesRatings: values.slice(0, 5).map(v => ({
          name: v.name,
          rating: 'ME1'
        })),
        teacherRemarks: 'To be completed',
        headTeacherRemarks: '',
        parentFeedback: ''
      });
      setSelectedStudent(student);
    }
  };

  const getScoreBadge = (score) => {
    if (score.startsWith('EE')) return 'bg-green-50 text-green-700 border-green-200';
    if (score.startsWith('ME')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (score.startsWith('AE')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    if (score.startsWith('BE')) return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getScoreIcon = (score) => {
    if (score.startsWith('EE')) return '🏆';
    if (score.startsWith('ME')) return '📈';
    if (score.startsWith('AE')) return '📊';
    if (score.startsWith('BE')) return '📉';
    return '📋';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading report card data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Report Card Generator</h1>
              <p className="text-sm text-gray-500 mt-1">
                Generate CBE format report cards with 4-point scale
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
                📋 CBE Format
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Academic Year
              </label>
              <select
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Term
              </label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Class</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.studentCount} students)</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGenerateReportCard}
                disabled={generating || !selectedClass}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate Report Cards
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Students</h2>
            <span className="text-sm text-gray-500">
              {students.length} students
            </span>
          </div>
          <div className="divide-y divide-gray-200">
            {students.map(student => {
              const hasReport = reportCards.some(r => r.studentId === student.id);
              return (
                <div key={student.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{student.admissionNo}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-xs text-gray-500">{student.className}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                      hasReport 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      <span className="mr-1">{hasReport ? '✅' : '⏳'}</span>
                      {hasReport ? 'Generated' : 'Pending'}
                    </span>
                    <button
                      onClick={() => handlePreview(student)}
                      className="inline-flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </button>
                    {hasReport && (
                      <button className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
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
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  Report Card Preview - {previewData.studentName}
                </h2>
                <button
                  onClick={() => {
                    setPreviewData(null);
                    setSelectedStudent(null);
                  }}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {/* Report Card Content */}
                <div className="border border-gray-200 rounded-xl p-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-block p-3 bg-blue-50 rounded-full mb-3">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">MINISTRY OF EDUCATION</h3>
                    <p className="text-lg text-gray-700">Kenya Certificate of Basic Education</p>
                    <p className="text-sm text-gray-500 mt-1">COMPETENCY BASED ASSESSMENT</p>
                  </div>

                  {/* Student Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm text-gray-600">Name:</span>
                        <span className="text-sm font-medium text-gray-900">{previewData.studentName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                        </svg>
                        <span className="text-sm text-gray-600">Admission:</span>
                        <span className="text-sm font-medium text-gray-900">{previewData.admissionNo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-sm text-gray-600">Class:</span>
                        <span className="text-sm font-medium text-gray-900">{previewData.className}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600">Term:</span>
                        <span className="text-sm font-medium text-gray-900">{previewData.term}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600">Year:</span>
                        <span className="text-sm font-medium text-gray-900">{previewData.academicYear}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600">Date:</span>
                        <span className="text-sm font-medium text-gray-900">{previewData.generatedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Learning Areas */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Learning Areas Achievement
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Learning Area</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Score</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Points</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Teacher's Comment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {previewData.learningAreas.map((area, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm text-gray-900">{area.name}</td>
                              <td className="px-4 py-2 text-center">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${getScoreBadge(area.score)}`}>
                                  <span>{getScoreIcon(area.score)}</span>
                                  {area.score}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-center text-sm font-medium text-gray-900">{area.points}</td>
                              <td className="px-4 py-2 text-sm text-gray-600">{area.teacherComment}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Core Competencies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Core Competencies
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {previewData.competencyRatings.map((comp, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{comp.name}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${getScoreBadge(comp.rating)}`}>
                            <span>{getScoreIcon(comp.rating)}</span>
                            {comp.rating} - {comp.descriptor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Values */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Values
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {previewData.valuesRatings.map((value, index) => (
                        <div key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{value.name}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getScoreBadge(value.rating)}`}>
                            <span>{getScoreIcon(value.rating)}</span>
                            {value.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attendance Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Attendance Summary
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-2 bg-white rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Total Days</p>
                        <p className="text-xl font-bold text-gray-900">{selectedStudent.attendance.total}</p>
                      </div>
                      <div className="p-2 bg-white rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Present</p>
                        <p className="text-xl font-bold text-green-600">{selectedStudent.attendance.present}</p>
                      </div>
                      <div className="p-2 bg-white rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Absent</p>
                        <p className="text-xl font-bold text-red-600">{selectedStudent.attendance.absent}</p>
                      </div>
                    </div>
                  </div>

                  {/* Teacher's Remarks */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Class Teacher's Remarks
                    </h4>
                    <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                      {previewData.teacherRemarks}
                    </p>
                  </div>

                  {/* Head Teacher's Remarks */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Head Teacher's Remarks
                    </h4>
                    <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                      {previewData.headTeacherRemarks || '_____________________'}
                    </p>
                  </div>

                  {/* Parent Feedback Section */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                      Parent/Guardian Feedback
                    </h4>
                    <textarea
                      rows="3"
                      placeholder="Parent comments..."
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <div className="mt-3 flex justify-end gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>Parent Signature:</span>
                        <span className="border-b border-gray-300 w-32"></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Date:</span>
                        <span className="border-b border-gray-300 w-24"></span>
                      </div>
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
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Report Card
                  </button>
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </button>
                </div>
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
    </div>
  );
};

export default ReportCardGenerator;