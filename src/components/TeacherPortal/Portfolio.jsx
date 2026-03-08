import React, { useState, useEffect } from 'react';

const PortfolioUploader = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStrand, setSelectedStrand] = useState('');
  const [selectedSubStrand, setSelectedSubStrand] = useState('');
  const [selectedCompetency, setSelectedCompetency] = useState('');
  const [portfolios, setPortfolios] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [strands, setStrands] = useState([]);
  const [subStrands, setSubStrands] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Evidence types
  const evidenceTypes = [
    { value: 'photo', label: 'Photo' },
    { value: 'video', label: 'Video' },
    { value: 'document', label: 'Document' },
    { value: 'audio', label: 'Audio Recording' },
    { value: 'project', label: 'Project Work' }
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

        setSubjects([
          { id: 1, name: 'Integrated Science', code: 'SCI' },
          { id: 2, name: 'Agriculture', code: 'AGR' },
          { id: 3, name: 'Creative Arts', code: 'ART' }
        ]);

        setStrands([
          { id: 1, name: 'Human Body Systems', code: 'SCI-HBS', subjectId: 1 },
          { id: 2, name: 'Plants and Animals', code: 'SCI-PA', subjectId: 1 },
          { id: 3, name: 'Crop Production', code: 'AGR-CRP', subjectId: 2 }
        ]);

        setPortfolios([
          {
            id: 1,
            studentName: 'John Kamau',
            admissionNo: '2024/001',
            className: 'Grade 7 East',
            subject: 'Integrated Science',
            strand: 'Human Body Systems',
            subStrand: 'The Digestive System',
            competency: 'Demonstrate understanding of digestion',
            evidenceType: 'photo',
            fileName: 'digestive_system_model.jpg',
            fileSize: '2.4 MB',
            uploadedDate: '2024-01-15',
            status: 'approved',
            rating: 'ME1',
            thumbnail: '/thumbnails/digestive.jpg'
          },
          {
            id: 2,
            studentName: 'Mary Wanjiku',
            admissionNo: '2024/002',
            className: 'Grade 7 East',
            subject: 'Agriculture',
            strand: 'Crop Production',
            subStrand: 'Kitchen Garden',
            competency: 'Demonstrate kitchen garden setup',
            evidenceType: 'video',
            fileName: 'kitchen_garden_demo.mp4',
            fileSize: '15.8 MB',
            uploadedDate: '2024-01-14',
            status: 'pending',
            thumbnail: '/thumbnails/garden.jpg'
          }
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
        { id: 1, admissionNo: '2024/001', name: 'John Kamau' },
        { id: 2, admissionNo: '2024/002', name: 'Mary Wanjiku' },
        { id: 3, admissionNo: '2024/003', name: 'Peter Omondi' },
        { id: 4, admissionNo: '2024/004', name: 'Sarah Akinyi' }
      ]);
    }, 500);
  };

  const fetchSubStrands = async (strandId) => {
    // Mock API call
    setTimeout(() => {
      setSubStrands([
        { id: 1, name: 'The Digestive System', code: 'SCI-HBS-DIG', strandId: 1 },
        { id: 2, name: 'The Respiratory System', code: 'SCI-HBS-RES', strandId: 1 },
        { id: 3, name: 'Kitchen Garden Setup', code: 'AGR-CRP-KIT', strandId: 3 }
      ]);
    }, 500);
  };

  const fetchCompetencies = async (subStrandId) => {
    // Mock API call
    setTimeout(() => {
      setCompetencies([
        { id: 1, code: 'SCI-HBS-DIG-01', description: 'Identify parts of the digestive system' },
        { id: 2, code: 'SCI-HBS-DIG-02', description: 'Explain functions of each organ' },
        { id: 3, code: 'SCI-HBS-DIG-03', description: 'Demonstrate understanding of digestion process' }
      ]);
    }, 500);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    if (e.target.value) {
      fetchStudents(e.target.value);
    }
    setSelectedStudent('');
  };

  const handleStrandChange = (e) => {
    setSelectedStrand(e.target.value);
    if (e.target.value) {
      fetchSubStrands(e.target.value);
    }
    setSelectedSubStrand('');
    setSelectedCompetency('');
  };

  const handleSubStrandChange = (e) => {
    setSelectedSubStrand(e.target.value);
    if (e.target.value) {
      fetchCompetencies(e.target.value);
    }
    setSelectedCompetency('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const isValid = file.size <= 100 * 1024 * 1024; // 100MB max
      if (!isValid) {
        setError(`File ${file.name} exceeds 100MB limit`);
      }
      return isValid;
    });

    setSelectedFiles(prev => [...prev, ...validFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'pending'
    }))]);
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleUpload = async () => {
    if (!selectedStudent || !selectedSubject || !selectedCompetency) {
      setError('Please select student, subject, and competency');
      return;
    }

    if (selectedFiles.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError(null);

    // Simulate file upload with progress
    for (const file of selectedFiles) {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(prev => ({
          ...prev,
          [file.id]: progress
        }));
      }

      // Add to portfolio list
      const newPortfolio = {
        id: Date.now() + Math.random(),
        studentName: students.find(s => s.id === parseInt(selectedStudent))?.name,
        admissionNo: students.find(s => s.id === parseInt(selectedStudent))?.admissionNo,
        className: classes.find(c => c.id === parseInt(selectedClass))?.name,
        subject: subjects.find(s => s.id === parseInt(selectedSubject))?.name,
        strand: strands.find(s => s.id === parseInt(selectedStrand))?.name,
        subStrand: subStrands.find(s => s.id === parseInt(selectedSubStrand))?.name,
        competency: competencies.find(c => c.id === parseInt(selectedCompetency))?.description,
        evidenceType: file.type.split('/')[0],
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };

      setPortfolios(prev => [newPortfolio, ...prev]);
    }

    setUploading(false);
    setSuccess(`${selectedFiles.length} file(s) uploaded successfully`);
    setSelectedFiles([]);
    setUploadProgress({});
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Evidence Uploader</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload student work samples and project evidence</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload Evidence</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Class *
                  </label>
                  <select
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Student *
                  </label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    disabled={!selectedClass}
                  >
                    <option value="">Select Student</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.admissionNo})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Strand *
                  </label>
                  <select
                    value={selectedStrand}
                    onChange={handleStrandChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select Strand</option>
                    {strands.filter(s => s.subjectId === parseInt(selectedSubject)).map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sub-strand *
                  </label>
                  <select
                    value={selectedSubStrand}
                    onChange={handleSubStrandChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    disabled={!selectedStrand}
                  >
                    <option value="">Select Sub-strand</option>
                    {subStrands.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Learning Outcome *
                  </label>
                  <select
                    value={selectedCompetency}
                    onChange={(e) => setSelectedCompetency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    disabled={!selectedSubStrand}
                  >
                    <option value="">Select Learning Outcome</option>
                    {competencies.map(c => (
                      <option key={c.id} value={c.id}>{c.description}</option>
                    ))}
                  </select>
                </div>

                {/* File Upload Area */}
                <div
                  className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,video/*,.pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer"
                  >
                    <div className="text-4xl mb-2 text-gray-400">📁</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Drag & drop files here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Supports: Images, Videos, PDF, DOC (Max 100MB)
                    </p>
                  </label>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Selected Files ({selectedFiles.length})
                    </h3>
                    {selectedFiles.map(file => (
                      <div key={file.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                          >
                            ×
                          </button>
                        </div>
                        {uploadProgress[file.id] > 0 && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: `${uploadProgress[file.id]}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={handleUpload}
                      disabled={uploading || selectedFiles.length === 0}
                      className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} File(s)`}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Portfolio List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Uploads</h2>

              <div className="space-y-4">
                {portfolios.map(item => (
                  <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      {/* Thumbnail/Icon */}
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                        {item.evidenceType === 'photo' && '📷'}
                        {item.evidenceType === 'video' && '🎥'}
                        {item.evidenceType === 'document' && '📄'}
                        {item.evidenceType === 'audio' && '🎵'}
                        {item.evidenceType === 'project' && '🔨'}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {item.studentName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.admissionNo} • {item.className}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Subject:</span>{' '}
                            <span className="text-gray-900 dark:text-white">{item.subject}</span>
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Strand:</span>{' '}
                            <span className="text-gray-900 dark:text-white">{item.strand}</span>
                          </p>
                          <p className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Learning Outcome:</span>{' '}
                            <span className="text-gray-900 dark:text-white">{item.competency}</span>
                          </p>
                        </div>

                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>{item.fileName}</span>
                          <span>•</span>
                          <span>{item.fileSize}</span>
                          <span>•</span>
                          <span>Uploaded: {new Date(item.uploadedDate).toLocaleDateString()}</span>
                        </div>

                        {item.rating && (
                          <div className="mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`}>
                              Rated: {item.rating}
                            </span>
                          </div>
                        )}

                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                            View
                          </button>
                          <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50">
                            Download
                          </button>
                          {item.status === 'pending' && (
                            <button className="px-3 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/50">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default PortfolioUploader;