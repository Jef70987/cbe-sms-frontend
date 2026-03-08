import React, { useState, useEffect } from 'react';

const TermlySummary = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [summaryDetail, setSummaryDetail] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // CBC Rating Scale
  const ratingScale = {
    EE: { label: 'Exceeding Expectations', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
    ME: { label: 'Meeting Expectations', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
    AE: { label: 'Approaching Expectations', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
    BE: { label: 'Below Expectations', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' }
  };

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
            className: 'Grade 7 East'
          },
          {
            id: 2,
            admissionNo: '2024/002',
            name: 'Mary Wanjiku',
            className: 'Grade 7 East'
          },
          {
            id: 3,
            admissionNo: '2024/003',
            name: 'Peter Omondi',
            className: 'Grade 7 East'
          }
        ]);

        setSummaries([
          {
            studentId: 1,
            studentName: 'John Kamau',
            admissionNo: '2024/001',
            className: 'Grade 7 East',
            term: 'Term 1',
            academicYear: '2024',
            overallRating: 'ME1',
            overallPoints: 6,
            learningAreas: [
              { name: 'Integrated Science', opener: 'ME1', midterm: 'ME2', endterm: 'ME1', final: 'ME1', points: 6 },
              { name: 'Agriculture', opener: 'EE2', midterm: 'EE2', endterm: 'EE1', final: 'EE1', points: 8 },
              { name: 'Mathematics', opener: 'AE1', midterm: 'AE1', endterm: 'AE2', final: 'AE1', points: 4 },
              { name: 'English', opener: 'ME2', midterm: 'ME1', endterm: 'ME1', final: 'ME1', points: 6 },
              { name: 'Kiswahili', opener: 'ME1', midterm: 'ME2', endterm: 'ME1', final: 'ME1', points: 6 }
            ],
            competencyCounts: {
              EE: 8,
              ME: 12,
              AE: 4,
              BE: 1
            },
            attendance: {
              present: 62,
              absent: 3,
              total: 65
            },
            teacherComment: 'Good progress overall. Excels in practical subjects.',
            promotionStatus: 'Promote',
            recommendation: 'Recommended for next grade'
          },
          {
            studentId: 2,
            studentName: 'Mary Wanjiku',
            admissionNo: '2024/002',
            className: 'Grade 7 East',
            term: 'Term 1',
            academicYear: '2024',
            overallRating: 'EE2',
            overallPoints: 7,
            learningAreas: [
              { name: 'Integrated Science', opener: 'EE2', midterm: 'EE1', endterm: 'EE2', final: 'EE2', points: 7 },
              { name: 'Agriculture', opener: 'EE1', midterm: 'EE1', endterm: 'EE1', final: 'EE1', points: 8 },
              { name: 'Mathematics', opener: 'ME1', midterm: 'ME1', endterm: 'EE2', final: 'ME1', points: 6 },
              { name: 'English', opener: 'EE2', midterm: 'EE2', endterm: 'EE1', final: 'EE2', points: 7 },
              { name: 'Kiswahili', opener: 'EE2', midterm: 'ME1', endterm: 'EE2', final: 'EE2', points: 7 }
            ],
            competencyCounts: {
              EE: 18,
              ME: 7,
              AE: 0,
              BE: 0
            },
            attendance: {
              present: 65,
              absent: 0,
              total: 65
            },
            teacherComment: 'Excellent performance across all learning areas.',
            promotionStatus: 'Promote',
            recommendation: 'Recommended for next grade with excellence'
          }
        ]);

        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const handleGenerateSummaries = async () => {
    if (!selectedClass || !selectedTerm || !selectedYear) {
      setError('Please select class, term, and academic year');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess('Termly summaries generated successfully');
    } catch (err) {
      setError('Failed to generate summaries');
    } finally {
      setSaving(false);
    }
  };

  const handleApproveAll = async () => {
    if (!window.confirm('Are you sure you want to approve all summaries?')) return;

    setSaving(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('All summaries approved successfully');
    } catch (err) {
      setError('Failed to approve summaries');
    } finally {
      setSaving(false);
    }
  };

  const handleViewSummary = (student) => {
    const summary = summaries.find(s => s.studentId === student.id);
    if (summary) {
      setSelectedStudent(student);
      setSummaryDetail(summary);
    }
  };

  const handleApproveSummary = async (studentId) => {
    setSaving(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Summary approved successfully');
    } catch (err) {
      setError('Failed to approve summary');
    } finally {
      setSaving(false);
    }
  };

  const getRatingColor = (rating) => {
    const prefix = rating.substring(0, 2);
    return ratingScale[prefix]?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Termly Summary</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and review term-end summaries with promotion recommendations</p>
        </header>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Academic Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
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

            <div className="flex items-end gap-2">
              <button
                onClick={handleGenerateSummaries}
                disabled={saving || !selectedClass}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Generating...' : 'Generate'}
              </button>
              <button
                onClick={handleApproveAll}
                disabled={saving}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Approve All
              </button>
            </div>
          </div>
        </div>

        {/* Class Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Class Summary Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{students.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {summaries.filter(s => s.overallRating.startsWith('EE')).length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">Exceeding</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {summaries.filter(s => s.overallRating.startsWith('ME')).length}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Meeting</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {summaries.filter(s => s.overallRating.startsWith('AE')).length}
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Approaching</p>
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Student Summaries</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {students.map(student => {
              const summary = summaries.find(s => s.studentId === student.id);
              return (
                <div key={student.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.admissionNo} • {student.className}
                      </p>
                    </div>
                    {summary ? (
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${getRatingColor(summary.overallRating)}`}>
                          {summary.overallRating}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Points: {summary.overallPoints}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          summary.promotionStatus === 'Promote' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {summary.promotionStatus}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">Not generated</span>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {summary ? (
                      <>
                        <button
                          onClick={() => handleViewSummary(student)}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleApproveSummary(student.id)}
                          disabled={saving}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          Approve
                        </button>
                      </>
                    ) : (
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        Generate
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Detail Modal */}
        {summaryDetail && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Termly Summary - {selectedStudent.name}
                  </h2>
                  <button
                    onClick={() => {
                      setSummaryDetail(null);
                      setSelectedStudent(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>

                {/* Student Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Name: <span className="font-medium text-gray-900 dark:text-white">{summaryDetail.studentName}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Admission: <span className="font-medium text-gray-900 dark:text-white">{summaryDetail.admissionNo}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Class: <span className="font-medium text-gray-900 dark:text-white">{summaryDetail.className}</span></p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Term: <span className="font-medium text-gray-900 dark:text-white">{summaryDetail.term} {summaryDetail.academicYear}</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Overall Rating: 
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getRatingColor(summaryDetail.overallRating)}`}>
                        {summaryDetail.overallRating}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Learning Areas Performance */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Learning Areas Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Learning Area</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Opener</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Midterm</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Endterm</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Final</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Points</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {summaryDetail.learningAreas.map((area, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{area.name}</td>
                            <td className="px-4 py-2 text-center">
                              <span className={`px-2 py-1 text-xs rounded-full ${getRatingColor(area.opener)}`}>
                                {area.opener}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span className={`px-2 py-1 text-xs rounded-full ${getRatingColor(area.midterm)}`}>
                                {area.midterm}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span className={`px-2 py-1 text-xs rounded-full ${getRatingColor(area.endterm)}`}>
                                {area.endterm}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span className={`px-2 py-1 text-xs rounded-full ${getRatingColor(area.final)}`}>
                                {area.final}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-center text-sm text-gray-900 dark:text-white">{area.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Competency Distribution */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Competency Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Exceeding (EE):</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{summaryDetail.competencyCounts.EE}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(summaryDetail.competencyCounts.EE / 25) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Meeting (ME):</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{summaryDetail.competencyCounts.ME}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(summaryDetail.competencyCounts.ME / 25) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Approaching (AE):</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{summaryDetail.competencyCounts.AE}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${(summaryDetail.competencyCounts.AE / 25) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Below (BE):</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{summaryDetail.competencyCounts.BE}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(summaryDetail.competencyCounts.BE / 25) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Summary */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Attendance Summary</h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="text-center mb-4">
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">
                          {((summaryDetail.attendance.present / summaryDetail.attendance.total) * 100).toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">{summaryDetail.attendance.total}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Total Days</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">{summaryDetail.attendance.present}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Present</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-red-600 dark:text-red-400">{summaryDetail.attendance.absent}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Absent</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teacher Comment */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Teacher's Comment</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                    {summaryDetail.teacherComment}
                  </p>
                </div>

                {/* Promotion Recommendation */}
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Promotion Recommendation</h3>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      summaryDetail.promotionStatus === 'Promote'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {summaryDetail.promotionStatus}
                    </span>
                    <p className="text-sm text-blue-700 dark:text-blue-400">{summaryDetail.recommendation}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setSummaryDetail(null);
                      setSelectedStudent(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Print Summary
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Approve & Close Term
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

export default TermlySummary;