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

  // KNEC assessment types
  const knecAssessments = [
    { value: 'sba', label: 'School-Based Assessment (SBA) - Grade 4-6 (30%)' },
    { value: 'sba_junior', label: 'School-Based Assessment (SBA) - Grade 7-9 (60%)' },
    { value: 'kpsea', label: 'KPSEA - Grade 6 (40%)' },
    { value: 'kjsea', label: 'KJSEA - Grade 9 (40%)' },
    { value: 'keya', label: 'KEYA - Grade 3' },
    { value: 'kmya', label: 'KMYA - Grade 9' }
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
          { id: 1, name: 'Grade 4', level: 4, students: 45 },
          { id: 2, name: 'Grade 5', level: 5, students: 42 },
          { id: 3, name: 'Grade 6', level: 6, students: 38 },
          { id: 4, name: 'Grade 7', level: 7, students: 40 },
          { id: 5, name: 'Grade 8', level: 8, students: 43 },
          { id: 6, name: 'Grade 9', level: 9, students: 41 }
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
      // Mock API call to generate export data
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock export data based on KNEC format
      const mockExportData = {
        header: {
          schoolCode: '123456',
          schoolName: 'Kenya Model School',
          assessmentType: selectedAssessment,
          academicYear: selectedYear,
          term: selectedTerm,
          grade: selectedGrade,
          generatedDate: new Date().toISOString(),
          totalRecords: 42
        },
        records: [
          {
            upi: '1234567890',
            admissionNo: '2024/001',
            studentName: 'John Kamau',
            gender: 'M',
            subjects: [
              { code: 'SCI', name: 'Integrated Science', score: 'ME1', points: 6, percentage: 65 },
              { code: 'AGR', name: 'Agriculture', score: 'EE2', points: 7, percentage: 82 },
              { code: 'MATH', name: 'Mathematics', score: 'ME2', points: 5, percentage: 52 },
              { code: 'ENG', name: 'English', score: 'ME1', points: 6, percentage: 68 }
            ]
          },
          {
            upi: '1234567891',
            admissionNo: '2024/002',
            studentName: 'Mary Wanjiku',
            gender: 'F',
            subjects: [
              { code: 'SCI', name: 'Integrated Science', score: 'EE2', points: 7, percentage: 85 },
              { code: 'AGR', name: 'Agriculture', score: 'EE1', points: 8, percentage: 92 },
              { code: 'MATH', name: 'Mathematics', score: 'ME1', points: 6, percentage: 71 },
              { code: 'ENG', name: 'English', score: 'EE2', points: 7, percentage: 88 }
            ]
          },
          {
            upi: '1234567892',
            admissionNo: '2024/003',
            studentName: 'Peter Omondi',
            gender: 'M',
            subjects: [
              { code: 'SCI', name: 'Integrated Science', score: 'ME1', points: 6, percentage: 64 },
              { code: 'AGR', name: 'Agriculture', score: 'ME2', points: 5, percentage: 55 },
              { code: 'MATH', name: 'Mathematics', score: 'AE1', points: 4, percentage: 35 },
              { code: 'ENG', name: 'English', score: 'ME2', points: 5, percentage: 48 }
            ]
          }
        ],
        summary: {
          totalStudents: 42,
          submittedCount: 42,
          pendingCount: 0,
          averageScore: 67.5,
          completionRate: 100
        }
      };

      setExportData(mockExportData);
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
      // Generate file based on format
      let fileContent = '';
      let fileName = '';
      let fileType = '';

      if (exportFormat === 'csv') {
        // Generate CSV format (KNEC compatible)
        const headers = ['UPI', 'Admission No', 'Student Name', 'Gender', ...exportData.records[0].subjects.map(s => s.code)];
        const rows = exportData.records.map(record => [
          record.upi,
          record.admissionNo,
          record.studentName,
          record.gender,
          ...record.subjects.map(s => s.percentage)
        ]);
        
        fileContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        fileName = `knec_export_${selectedYear}_${selectedTerm}_${selectedGrade}.csv`;
        fileType = 'text/csv';
      } else if (exportFormat === 'json') {
        // Generate JSON format (for KNEC API)
        fileContent = JSON.stringify(exportData, null, 2);
        fileName = `knec_export_${selectedYear}_${selectedTerm}_${selectedGrade}.json`;
        fileType = 'application/json';
      } else if (exportFormat === 'xml') {
        // Generate XML format
        fileContent = `<?xml version="1.0" encoding="UTF-8"?>
<knecExport>
  <header>
    <schoolCode>${exportData.header.schoolCode}</schoolCode>
    <schoolName>${exportData.header.schoolName}</schoolName>
    <assessmentType>${exportData.header.assessmentType}</assessmentType>
    <academicYear>${exportData.header.academicYear}</academicYear>
    <term>${exportData.header.term}</term>
    <grade>${exportData.header.grade}</grade>
    <generatedDate>${exportData.header.generatedDate}</generatedDate>
  </header>
  <records>
    ${exportData.records.map(record => `
    <student>
      <upi>${record.upi}</upi>
      <admissionNo>${record.admissionNo}</admissionNo>
      <studentName>${record.studentName}</studentName>
      <gender>${record.gender}</gender>
      ${record.subjects.map(subject => `
      <subject code="${subject.code}">
        <score>${subject.score}</score>
        <points>${subject.points}</points>
        <percentage>${subject.percentage}</percentage>
      </subject>`).join('')}
    </student>`).join('')}
  </records>
</knecExport>`;
        fileName = `knec_export_${selectedYear}_${selectedTerm}_${selectedGrade}.xml`;
        fileType = 'application/xml';
      }

      // Create and download file
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

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KNEC Export Portal</h1>
          <p className="text-gray-600 dark:text-gray-400">Export assessment data in KNEC-compatible formats</p>
        </header>

        {/* Export Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Academic Year *
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Term *
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
                Grade Level *
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Grade</option>
                {grades.map(g => (
                  <option key={g.id} value={g.name}>{g.name}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assessment Type *
              </label>
              <select
                value={selectedAssessment}
                onChange={(e) => setSelectedAssessment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {knecAssessments.map(a => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={generateKNECExport}
                disabled={exporting || !selectedGrade}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exporting ? 'Generating...' : 'Generate Export'}
              </button>
            </div>
          </div>
        </div>

        {/* Export Preview */}
        {exportData && (
          <div className="space-y-6">
            {/* Export Header Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">School Code</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{exportData.header.schoolCode}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">School Name</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{exportData.header.schoolName}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{exportData.summary.totalStudents}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{exportData.summary.completionRate}%</p>
                </div>
              </div>
            </div>

            {/* Export Data Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Export Data Preview</h2>
                <div className="flex gap-3">
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="csv">CSV Format</option>
                    <option value="json">JSON Format</option>
                    <option value="xml">XML Format</option>
                  </select>
                  <button
                    onClick={handleExport}
                    disabled={exporting}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>📥</span>
                    {exporting ? 'Exporting...' : 'Download Export'}
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        UPI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Admission No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Gender
                      </th>
                      {exportData.records[0].subjects.map(subject => (
                        <th key={subject.code} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          {subject.code}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {exportData.records.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {record.upi}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {record.admissionNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {record.studentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {record.gender}
                        </td>
                        {record.subjects.map((subject, idx) => (
                          <td key={idx} className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getScoreColor(subject.percentage)}`}>
                              {subject.percentage}%
                            </span>
                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                              ({subject.score})
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing 3 of {exportData.summary.totalStudents} records
                </p>
              </div>
            </div>

            {/* KNEC Portal Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">KNEC CBA Portal Upload Instructions</h3>
              <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc list-inside space-y-1">
                <li>Login to the KNEC CBA Portal at https://cba.knec.ac.ke</li>
                <li>Navigate to "School-Based Assessment Upload" section</li>
                <li>Select the appropriate assessment type and grade level</li>
                <li>Upload the exported {exportFormat.toUpperCase()} file</li>
                <li>Verify the uploaded data matches your records</li>
                <li>Submit for KNEC verification</li>
              </ul>
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

export default KNECExportView;