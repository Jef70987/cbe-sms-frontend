/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const KNECExportView = () => {
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [selectedAssessment, setSelectedAssessment] = useState('sba');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [exportData, setExportData] = useState(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // KNEC assessment types with details
  const knecAssessments = [
    { 
      value: 'sba', 
      label: 'School-Based Assessment (SBA)', 
      grades: 'Grade 4-6', 
      weight: '30%',
      description: 'Continuous assessment for upper primary',
      color: 'blue'
    },
    { 
      value: 'sba_junior', 
      label: 'School-Based Assessment (SBA)', 
      grades: 'Grade 7-9', 
      weight: '60%',
      description: 'Continuous assessment for junior secondary',
      color: 'green'
    },
    { 
      value: 'kpsea', 
      label: 'KPSEA', 
      grades: 'Grade 6', 
      weight: '40%',
      description: 'Kenya Primary School Education Assessment',
      color: 'purple'
    },
    { 
      value: 'kjsea', 
      label: 'KJSEA', 
      grades: 'Grade 9', 
      weight: '40%',
      description: 'Kenya Junior School Education Assessment',
      color: 'orange'
    },
    { 
      value: 'keya', 
      label: 'KEYA', 
      grades: 'Grade 3', 
      weight: '100%',
      description: 'Kenya Early Years Assessment',
      color: 'teal'
    },
    { 
      value: 'kmya', 
      label: 'KMYA', 
      grades: 'Grade 9', 
      weight: '100%',
      description: 'Kenya Middle Years Assessment',
      color: 'red'
    }
  ];

  const academicYears = ['2024', '2025', '2026'];
  const terms = ['Term 1', 'Term 2', 'Term 3'];
  const formats = [
    { value: 'csv', label: 'CSV (KNEC Standard)', icon: '📊' },
    { value: 'json', label: 'JSON (API Compatible)', icon: '🔧' },
    { value: 'xml', label: 'XML (KNEC Portal)', icon: '📄' }
  ];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API calls
      setTimeout(() => {
        setGrades([
          { id: 1, name: 'Grade 4', level: 4, students: 45, stream: 'East' },
          { id: 2, name: 'Grade 5', level: 5, students: 42, stream: 'East' },
          { id: 3, name: 'Grade 6', level: 6, students: 38, stream: 'West' },
          { id: 4, name: 'Grade 7', level: 7, students: 40, stream: 'West' },
          { id: 5, name: 'Grade 8', level: 8, students: 43, stream: 'East' },
          { id: 6, name: 'Grade 9', level: 9, students: 41, stream: 'West' }
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const generateKNECExport = async () => {
    if (!selectedYear || !selectedTerm || !selectedAssessment || !selectedGrade) {
      setError('Please select all required fields');
      return;
    }

    setExporting(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedAssessmentData = knecAssessments.find(a => a.value === selectedAssessment);
      const selectedGradeData = grades.find(g => g.name === selectedGrade);

      // Mock export data based on KNEC format
      const mockExportData = {
        metadata: {
          schoolCode: '123456',
          schoolName: 'Kenya Model School',
          assessmentType: selectedAssessment,
          assessmentLabel: selectedAssessmentData?.label,
          gradeLevel: selectedGrade,
          gradeRange: selectedAssessmentData?.grades,
          weight: selectedAssessmentData?.weight,
          academicYear: selectedYear,
          term: selectedTerm,
          generatedDate: new Date().toISOString(),
          generatedBy: 'Admin User',
          totalRecords: selectedGradeData?.students || 42,
          version: '1.0'
        },
        summary: {
          totalStudents: selectedGradeData?.students || 42,
          submittedCount: 38,
          pendingCount: 4,
          averageScore: 67.5,
          completionRate: 90,
          maleCount: 22,
          femaleCount: 20
        },
        records: [
          {
            upi: '1234567890',
            admissionNo: '2024/001',
            studentName: 'John Kamau',
            gender: 'M',
            dateOfBirth: '2012-05-15',
            subjects: [
              { code: 'SCI', name: 'Integrated Science', score: 'ME1', points: 6, percentage: 65, grade: 'B' },
              { code: 'AGR', name: 'Agriculture', score: 'EE2', points: 7, percentage: 82, grade: 'A' },
              { code: 'MATH', name: 'Mathematics', score: 'ME2', points: 5, percentage: 52, grade: 'C' },
              { code: 'ENG', name: 'English', score: 'ME1', points: 6, percentage: 68, grade: 'B' }
            ],
            totalPoints: 24,
            averagePercentage: 66.75
          },
          {
            upi: '1234567891',
            admissionNo: '2024/002',
            studentName: 'Mary Wanjiku',
            gender: 'F',
            dateOfBirth: '2012-08-22',
            subjects: [
              { code: 'SCI', name: 'Integrated Science', score: 'EE2', points: 7, percentage: 85, grade: 'A' },
              { code: 'AGR', name: 'Agriculture', score: 'EE1', points: 8, percentage: 92, grade: 'A' },
              { code: 'MATH', name: 'Mathematics', score: 'ME1', points: 6, percentage: 71, grade: 'B' },
              { code: 'ENG', name: 'English', score: 'EE2', points: 7, percentage: 88, grade: 'A' }
            ],
            totalPoints: 28,
            averagePercentage: 84
          },
          {
            upi: '1234567892',
            admissionNo: '2024/003',
            studentName: 'Peter Omondi',
            gender: 'M',
            dateOfBirth: '2012-03-10',
            subjects: [
              { code: 'SCI', name: 'Integrated Science', score: 'ME1', points: 6, percentage: 64, grade: 'B' },
              { code: 'AGR', name: 'Agriculture', score: 'ME2', points: 5, percentage: 55, grade: 'C' },
              { code: 'MATH', name: 'Mathematics', score: 'AE1', points: 4, percentage: 35, grade: 'D' },
              { code: 'ENG', name: 'English', score: 'ME2', points: 5, percentage: 48, grade: 'C' }
            ],
            totalPoints: 20,
            averagePercentage: 50.5
          }
        ]
      };

      setExportData(mockExportData);
      setShowPreview(true);
      setSuccess('Export data generated successfully');
    } catch (err) {
      setError('Failed to generate export data');
    } finally {
      setExporting(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);

    try {
      let fileContent = '';
      let fileName = '';
      let fileType = '';

      if (exportFormat === 'csv') {
        // Generate CSV format (KNEC compatible)
        const headers = ['UPI', 'Admission No', 'Student Name', 'Gender', 'Date of Birth', ...exportData.records[0].subjects.map(s => `${s.code} (%)`), 'Average'];
        const rows = exportData.records.map(record => [
          record.upi,
          record.admissionNo,
          record.studentName,
          record.gender,
          record.dateOfBirth,
          ...record.subjects.map(s => s.percentage),
          record.averagePercentage.toFixed(1)
        ]);
        
        fileContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        fileName = `KNEC_${exportData.metadata.assessmentLabel}_${selectedGrade}_${selectedYear}_${selectedTerm}.csv`;
        fileType = 'text/csv';
      } else if (exportFormat === 'json') {
        fileContent = JSON.stringify(exportData, null, 2);
        fileName = `KNEC_${exportData.metadata.assessmentLabel}_${selectedGrade}_${selectedYear}_${selectedTerm}.json`;
        fileType = 'application/json';
      } else if (exportFormat === 'xml') {
        fileContent = `<?xml version="1.0" encoding="UTF-8"?>
<knecExport version="1.0">
  <metadata>
    <schoolCode>${exportData.metadata.schoolCode}</schoolCode>
    <schoolName>${exportData.metadata.schoolName}</schoolName>
    <assessmentType>${exportData.metadata.assessmentType}</assessmentType>
    <assessmentLabel>${exportData.metadata.assessmentLabel}</assessmentLabel>
    <gradeLevel>${exportData.metadata.gradeLevel}</gradeLevel>
    <academicYear>${exportData.metadata.academicYear}</academicYear>
    <term>${exportData.metadata.term}</term>
    <generatedDate>${exportData.metadata.generatedDate}</generatedDate>
    <totalRecords>${exportData.metadata.totalRecords}</totalRecords>
  </metadata>
  <summary>
    <totalStudents>${exportData.summary.totalStudents}</totalStudents>
    <submittedCount>${exportData.summary.submittedCount}</submittedCount>
    <completionRate>${exportData.summary.completionRate}</completionRate>
    <averageScore>${exportData.summary.averageScore}</averageScore>
  </summary>
  <records>
    ${exportData.records.map(record => `
    <student>
      <upi>${record.upi}</upi>
      <admissionNo>${record.admissionNo}</admissionNo>
      <studentName>${record.studentName}</studentName>
      <gender>${record.gender}</gender>
      <dateOfBirth>${record.dateOfBirth}</dateOfBirth>
      <subjects>
        ${record.subjects.map(subject => `
        <subject code="${subject.code}">
          <name>${subject.name}</name>
          <score>${subject.score}</score>
          <points>${subject.points}</points>
          <percentage>${subject.percentage}</percentage>
          <grade>${subject.grade}</grade>
        </subject>`).join('')}
      </subjects>
      <totalPoints>${record.totalPoints}</totalPoints>
      <averagePercentage>${record.averagePercentage}</averagePercentage>
    </student>`).join('')}
  </records>
</knecExport>`;
        fileName = `KNEC_${exportData.metadata.assessmentLabel}_${selectedGrade}_${selectedYear}_${selectedTerm}.xml`;
        fileType = 'application/xml';
      }

      const blob = new Blob([fileContent], { type: fileType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setSuccess('Export file downloaded successfully');
    } catch (err) {
      setError('Failed to export file');
    } finally {
      setExporting(false);
    }
  };

  const getScoreBadge = (percentage) => {
    if (percentage >= 80) return 'bg-green-50 text-green-700 border-green-200';
    if (percentage >= 60) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (percentage >= 40) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  const getAssessmentColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      teal: 'bg-teal-50 text-teal-700 border-teal-200',
      red: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading KNEC export data...</p>
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
              <h1 className="text-2xl font-semibold text-gray-900">KNEC Export Portal</h1>
              <p className="text-sm text-gray-500 mt-1">
                Export assessment data in KNEC-compatible formats for CBA portal upload
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
                KNEC Certified
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Export Configuration */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Export Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Academic Year <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {academicYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Term <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {terms.map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Grade Level <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Grade</option>
                {grades.map(g => (
                  <option key={g.id} value={g.name}>{g.name} ({g.students} students)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Assessment Type <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedAssessment}
                onChange={(e) => setSelectedAssessment(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {knecAssessments.map(a => (
                  <option key={a.value} value={a.value}>{a.label} - {a.grades} ({a.weight})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={generateKNECExport}
              disabled={exporting || !selectedGrade}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Generate Export
                </>
              )}
            </button>
          </div>
        </div>

        {/* Export Preview */}
        {exportData && showPreview && (
          <div className="space-y-6">
            {/* Assessment Info Banner */}
            <div className={`p-4 rounded-xl border ${getAssessmentColor(knecAssessments.find(a => a.value === selectedAssessment)?.color)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">KNEC Assessment:</span>
                    <span className="text-sm">{exportData.metadata.assessmentLabel}</span>
                    <span className="px-2 py-0.5 text-xs bg-white rounded-full border">
                      {exportData.metadata.gradeRange}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-white rounded-full border">
                      Weight: {exportData.metadata.weight}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {knecAssessments.find(a => a.value === selectedAssessment)?.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Generated on</p>
                  <p className="text-sm font-medium">
                    {new Date(exportData.metadata.generatedDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">School Code</p>
                <p className="text-lg font-semibold text-gray-900">{exportData.metadata.schoolCode}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Total Students</p>
                <p className="text-lg font-semibold text-gray-900">{exportData.summary.totalStudents}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Submitted</p>
                <p className="text-lg font-semibold text-green-600">{exportData.summary.submittedCount}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Completion Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-gray-900">{exportData.summary.completionRate}%</p>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${exportData.summary.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Average Score</p>
                <p className="text-lg font-semibold text-gray-900">{exportData.summary.averageScore}%</p>
              </div>
            </div>

            {/* Export Controls and Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-medium text-gray-900">Export Data Preview</h2>
                <div className="flex items-center gap-3">
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {formats.map(format => (
                      <option key={format.value} value={format.value}>
                        {format.icon} {format.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleExport}
                    disabled={exporting}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {exporting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download {exportFormat.toUpperCase()}
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        UPI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      {exportData.records[0].subjects.map(subject => (
                        <th key={subject.code} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {subject.code}
                          <span className="block text-xs font-normal text-gray-400">{subject.name}</span>
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {exportData.records.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-900">{record.upi}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                          <div className="text-xs text-gray-500">{record.admissionNo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{record.gender}</span>
                        </td>
                        {record.subjects.map((subject, idx) => (
                          <td key={idx} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getScoreBadge(subject.percentage)}`}>
                                {subject.percentage}%
                              </span>
                              <span className="text-xs text-gray-500">{subject.score}</span>
                            </div>
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getScoreBadge(record.averagePercentage)}`}>
                            {record.averagePercentage.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {exportData.records.length} of {exportData.summary.totalStudents} records
                  </p>
                  <p className="text-xs text-gray-500">
                    Version: {exportData.metadata.version} | Generated by: {exportData.metadata.generatedBy}
                  </p>
                </div>
              </div>
            </div>

            {/* KNEC Upload Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">KNEC CBA Portal Upload Instructions</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                    <li>Login to the <a href="#" className="underline hover:text-blue-800">KNEC CBA Portal</a> (https://cba.knec.ac.ke)</li>
                    <li>Navigate to <span className="font-medium">"School-Based Assessment Upload"</span> section</li>
                    <li>Select assessment type: <span className="font-medium">{exportData.metadata.assessmentLabel}</span> for {exportData.metadata.gradeLevel}</li>
                    <li>Choose the <span className="font-medium">{exportFormat.toUpperCase()}</span> file you just downloaded</li>
                    <li>Click <span className="font-medium">"Upload"</span> and wait for validation</li>
                    <li>Review the upload summary and confirm submission</li>
                    <li>Download the acknowledgment receipt for your records</li>
                  </ol>
                  <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-600">
                      <span className="font-medium">Note:</span> Ensure all student UPIs are verified before upload. 
                      The system will validate against the KNEC national database.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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

export default KNECExportView;