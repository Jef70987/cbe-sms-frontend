/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Upload,
  File,
  Image,
  Video,
  Music,
  FileText,
  Folder,
  Download,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Loader,
  X,
  Plus,
  Users,
  BookOpen,
  Filter,
  Award,
  Clock,
  Check,
  ChevronDown,
  Grid,
  List
} from 'react-feather';

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
  const [viewMode, setViewMode] = useState('grid');

  // Evidence types
  const evidenceTypes = [
    { value: 'photo', label: 'Photo', icon: Image, color: 'bg-purple-100 text-purple-600' },
    { value: 'video', label: 'Video', icon: Video, color: 'bg-red-100 text-red-600' },
    { value: 'document', label: 'Document', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { value: 'audio', label: 'Audio Recording', icon: Music, color: 'bg-green-100 text-green-600' },
    { value: 'project', label: 'Project Work', icon: Folder, color: 'bg-orange-100 text-orange-600' }
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
          { id: 1, name: 'Grade 7 East', level: 7, stream: 'East', studentCount: 42 },
          { id: 2, name: 'Grade 7 West', level: 7, stream: 'West', studentCount: 38 },
          { id: 3, name: 'Grade 8 East', level: 8, stream: 'East', studentCount: 45 }
        ]);

        setSubjects([
          { id: 1, name: 'Integrated Science', code: 'SCI', icon: '🔬' },
          { id: 2, name: 'Agriculture', code: 'AGR', icon: '🌱' },
          { id: 3, name: 'Creative Arts', code: 'ART', icon: '🎨' }
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
            thumbnail: '/thumbnails/digestive.jpg',
            comments: 'Excellent model showing all parts'
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
          },
          {
            id: 3,
            studentName: 'Sarah Akinyi',
            admissionNo: '2024/004',
            className: 'Grade 7 West',
            subject: 'Creative Arts',
            strand: 'Visual Arts',
            subStrand: 'Painting',
            competency: 'Create a landscape painting',
            evidenceType: 'photo',
            fileName: 'landscape_painting.jpg',
            fileSize: '3.1 MB',
            uploadedDate: '2024-01-13',
            status: 'approved',
            rating: 'EE2',
            thumbnail: '/thumbnails/painting.jpg'
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
        { id: 4, admissionNo: '2024/004', name: 'Sarah Akinyi' },
        { id: 5, admissionNo: '2024/005', name: 'David Mwangi' }
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
        setTimeout(() => setError(null), 3000);
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
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (selectedFiles.length === 0) {
      setError('Please select files to upload');
      setTimeout(() => setError(null), 3000);
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
    setTimeout(() => setSuccess(null), 3000);
    setSelectedFiles([]);
    setUploadProgress({});
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return AlertCircle;
      default: return File;
    }
  };

  const getFileIcon = (type) => {
    const evidenceType = evidenceTypes.find(et => et.value === type);
    return evidenceType?.icon || File;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Loading portfolio uploader...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Full-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Upload className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Portfolio Evidence Uploader</h1>
                <p className="text-gray-600 mt-1">Upload student work samples and project evidence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Upload Form - 4 columns on large screens */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm sticky top-6">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <h2 className="font-semibold text-gray-900">Upload Evidence</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  {/* Class Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedClass}
                      onChange={handleClassChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Class</option>
                      {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.studentCount} students)</option>
                      ))}
                    </select>
                  </div>

                  {/* Student Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      required
                      disabled={!selectedClass}
                    >
                      <option value="">Select Student</option>
                      {students.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.admissionNo})</option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
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

                  {/* Strand Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Strand <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedStrand}
                      onChange={handleStrandChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      required
                      disabled={!selectedSubject}
                    >
                      <option value="">Select Strand</option>
                      {strands.filter(s => s.subjectId === parseInt(selectedSubject)).map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sub-strand Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub-strand <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedSubStrand}
                      onChange={handleSubStrandChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      required
                      disabled={!selectedStrand}
                    >
                      <option value="">Select Sub-strand</option>
                      {subStrands.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Learning Outcome Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Outcome <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedCompetency}
                      onChange={(e) => setSelectedCompetency(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      required
                      disabled={!selectedSubStrand}
                    >
                      <option value="">Select Learning Outcome</option>
                      {competencies.map(c => (
                        <option key={c.id} value={c.id}>{c.code} - {c.description}</option>
                      ))}
                    </select>
                  </div>

                  {/* File Upload Area */}
                  <div
                    className={`mt-4 border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50'
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
                      accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer block"
                    >
                      <Upload className={`w-12 h-12 mx-auto mb-3 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                      <p className="text-sm text-gray-700 mb-1 font-medium">
                        Drag & drop files here or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports: Images, Videos, PDF, Office Documents (Max 100MB)
                      </p>
                    </label>
                  </div>

                  {/* Selected Files List */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h3 className="text-sm font-medium text-gray-700 flex items-center justify-between">
                        <span>Selected Files ({selectedFiles.length})</span>
                        <button 
                          onClick={() => setSelectedFiles([])}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Clear all
                        </button>
                      </h3>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {selectedFiles.map(file => {
                          const FileIcon = getFileIcon(file.type.split('/')[0]);
                          return (
                            <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1 min-w-0">
                                  <div className="p-2 bg-blue-50 rounded-lg">
                                    <FileIcon className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFile(file.id)}
                                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              {uploadProgress[file.id] > 0 && (
                                <div className="mt-2">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600">Uploading...</span>
                                    <span className="text-blue-600">{uploadProgress[file.id]}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                      style={{ width: `${uploadProgress[file.id]}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={handleUpload}
                        disabled={uploading || selectedFiles.length === 0}
                        className="w-full mt-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
                      >
                        {uploading ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Upload {selectedFiles.length} File(s)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio List - 8 columns on large screens */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Folder className="w-5 h-5 text-blue-600" />
                    <h2 className="font-semibold text-gray-900">Student Portfolios</h2>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {portfolios.length} items
                  </span>
                </div>
              </div>

              <div className="p-6">
                {viewMode === 'grid' ? (
                  /* Grid View */
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {portfolios.map(item => {
                      const StatusIcon = getStatusIcon(item.status);
                      const FileIcon = getFileIcon(item.evidenceType);
                      return (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                          {/* Thumbnail */}
                          <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-t-xl flex items-center justify-center relative">
                            <FileIcon className="w-16 h-16 text-blue-400" />
                            <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full border ${getStatusColor(item.status)} flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />
                              {item.status}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-900">{item.studentName}</h3>
                                <p className="text-xs text-gray-500">{item.admissionNo}</p>
                              </div>
                            </div>

                            <div className="space-y-1 mb-3">
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">Subject:</span> {item.subject}
                              </p>
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">Strand:</span> {item.strand}
                              </p>
                              <p className="text-xs text-gray-600 truncate" title={item.competency}>
                                <span className="font-medium">Outcome:</span> {item.competency}
                              </p>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                              <span>{item.fileName}</span>
                              <span>{item.fileSize}</span>
                            </div>

                            {item.rating && (
                              <div className="mb-3">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs flex items-center gap-1 inline-flex">
                                  <Award className="w-3 h-3" />
                                  Rated: {item.rating}
                                </span>
                              </div>
                            )}

                            <div className="flex gap-2 pt-2 border-t border-gray-100">
                              <button className="flex-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                                <Eye className="w-3 h-3" />
                                View
                              </button>
                              <button className="flex-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-1">
                                <Download className="w-3 h-3" />
                                Download
                              </button>
                              {item.status === 'pending' && (
                                <button className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* List View */
                  <div className="space-y-3">
                    {portfolios.map(item => {
                      const StatusIcon = getStatusIcon(item.status);
                      const FileIcon = getFileIcon(item.evidenceType);
                      return (
                        <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                              <FileIcon className="w-8 h-8 text-blue-500" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{item.studentName}</h3>
                                  <p className="text-sm text-gray-600">{item.subject} • {item.strand}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(item.status)} flex items-center gap-1`}>
                                  <StatusIcon className="w-3 h-3" />
                                  {item.status}
                                </span>
                              </div>

                              <p className="text-sm text-gray-700 mb-2 line-clamp-2">{item.competency}</p>

                              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <span className="flex items-center gap-1">
                                  <File className="w-3 h-3" />
                                  {item.fileName}
                                </span>
                                <span>•</span>
                                <span>{item.fileSize}</span>
                                <span>•</span>
                                <span>Uploaded: {new Date(item.uploadedDate).toLocaleDateString()}</span>
                              </div>

                              {item.rating && (
                                <div className="mb-3">
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs flex items-center gap-1 inline-flex">
                                    <Award className="w-3 h-3" />
                                    Rated: {item.rating}
                                  </span>
                                </div>
                              )}

                              <div className="flex gap-2">
                                <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  View
                                </button>
                                <button className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1">
                                  <Download className="w-3 h-3" />
                                  Download
                                </button>
                                {item.status === 'pending' && (
                                  <button className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1">
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {portfolios.length === 0 && (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Folder className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-700 font-medium mb-1">No portfolios yet</h3>
                    <p className="text-gray-500 text-sm">
                      Upload evidence to start building student portfolios
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default PortfolioUploader;