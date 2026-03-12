/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Target, 
  CheckCircle, 
  Plus, 
  Save, 
  X, 
  Filter,
  ChevronRight,
  Layers,
  Award,
  Heart,
  Loader,
  AlertCircle,
  Check,
  Trash2,
  Edit3
} from 'react-feather';

const CompetencyMatrix = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStrand, setSelectedStrand] = useState('');
  const [selectedSubStrand, setSelectedSubStrand] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [strands, setStrands] = useState([]);
  const [subStrands, setSubStrands] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [mappedCompetencies, setMappedCompetencies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Core Competencies (KICD)
  const coreCompetencies = [
    { id: 1, code: 'CC01', name: 'Communication and Collaboration', description: 'Ability to communicate effectively and work collaboratively' },
    { id: 2, code: 'CC02', name: 'Critical Thinking and Problem Solving', description: 'Ability to think critically and solve problems' },
    { id: 3, code: 'CC03', name: 'Creativity and Imagination', description: 'Ability to be creative and imaginative' },
    { id: 4, code: 'CC04', name: 'Citizenship', description: 'Understanding of citizenship and social responsibility' },
    { id: 5, code: 'CC05', name: 'Digital Literacy', description: 'Ability to use digital tools effectively' },
    { id: 6, code: 'CC06', name: 'Learning to Learn', description: 'Ability to learn independently' },
    { id: 7, code: 'CC07', name: 'Self-efficacy', description: 'Belief in one\'s ability to succeed' }
  ];

  // Values
  const values = [
    { id: 1, code: 'VAL01', name: 'Respect' },
    { id: 2, code: 'VAL02', name: 'Responsibility' },
    { id: 3, code: 'VAL03', name: 'Integrity' },
    { id: 4, code: 'VAL04', name: 'Honesty' },
    { id: 5, code: 'VAL05', name: 'Love' },
    { id: 6, code: 'VAL06', name: 'Tolerance' },
    { id: 7, code: 'VAL07', name: 'Peace' }
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
          { id: 1, name: 'Grade 7', level: 7 },
          { id: 2, name: 'Grade 8', level: 8 },
          { id: 3, name: 'Grade 9', level: 9 }
        ]);

        setSubjects([
          { id: 1, name: 'Integrated Science', code: 'SCI' },
          { id: 2, name: 'Agriculture', code: 'AGR' },
          { id: 3, name: 'Mathematics', code: 'MATH' },
          { id: 4, name: 'English', code: 'ENG' },
          { id: 5, name: 'Kiswahili', code: 'KIS' },
          { id: 6, name: 'Creative Arts', code: 'ART' }
        ]);

        setStrands([
          { id: 1, name: 'Human Body Systems', code: 'SCI-HBS', subjectId: 1 },
          { id: 2, name: 'Plants and Animals', code: 'SCI-PA', subjectId: 1 },
          { id: 3, name: 'Environment', code: 'SCI-ENV', subjectId: 1 },
          { id: 4, name: 'Crop Production', code: 'AGR-CRP', subjectId: 2 },
          { id: 5, name: 'Animal Production', code: 'AGR-ANP', subjectId: 2 }
        ]);

        setSubStrands([
          { id: 1, name: 'The Digestive System', code: 'SCI-HBS-DIG', strandId: 1 },
          { id: 2, name: 'The Respiratory System', code: 'SCI-HBS-RES', strandId: 1 },
          { id: 3, name: 'The Circulatory System', code: 'SCI-HBS-CIR', strandId: 1 },
          { id: 4, name: 'Kitchen Garden', code: 'AGR-CRP-KIT', strandId: 4 }
        ]);

        setMappedCompetencies([
          {
            id: 1,
            substrandId: 1,
            competencyCode: 'SCI-HBS-DIG-01',
            description: 'Identify parts of the digestive system',
            coreCompetencies: ['CC01', 'CC05'],
            values: ['VAL01', 'VAL03'],
            performanceIndicator: 'Can correctly label all parts of the digestive system'
          },
          {
            id: 2,
            substrandId: 1,
            competencyCode: 'SCI-HBS-DIG-02',
            description: 'Explain functions of each organ',
            coreCompetencies: ['CC02', 'CC06'],
            values: ['VAL01', 'VAL04'],
            performanceIndicator: 'Can explain the function of each digestive organ'
          }
        ]);

        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const handleAddCompetency = () => {
    const newCompetency = {
      id: Date.now(),
      substrandId: parseInt(selectedSubStrand),
      competencyCode: '',
      description: '',
      coreCompetencies: [],
      values: [],
      performanceIndicator: ''
    };
    setCompetencies(prev => [...prev, newCompetency]);
  };

  const handleCompetencyChange = (index, field, value) => {
    const updated = [...competencies];
    updated[index][field] = value;
    setCompetencies(updated);
  };

  const handleCoreCompetencyToggle = (index, competencyCode) => {
    const updated = [...competencies];
    const current = updated[index].coreCompetencies || [];
    if (current.includes(competencyCode)) {
      updated[index].coreCompetencies = current.filter(c => c !== competencyCode);
    } else {
      updated[index].coreCompetencies = [...current, competencyCode];
    }
    setCompetencies(updated);
  };

  const handleValueToggle = (index, valueCode) => {
    const updated = [...competencies];
    const current = updated[index].values || [];
    if (current.includes(valueCode)) {
      updated[index].values = current.filter(v => v !== valueCode);
    } else {
      updated[index].values = [...current, valueCode];
    }
    setCompetencies(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMappedCompetencies(prev => [...prev, ...competencies]);
      setCompetencies([]);
      setSuccess('Competencies mapped successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save competency mapping');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveCompetency = (index) => {
    setCompetencies(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteMapped = async (id) => {
    if (!window.confirm('Are you sure you want to delete this competency mapping?')) return;

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMappedCompetencies(prev => prev.filter(c => c.id !== id));
      setSuccess('Competency mapping deleted');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete competency mapping');
      setTimeout(() => setError(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Loading competency matrix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Full-width container with proper padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Header - Full width */}
        <div className="w-full mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Layers className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Competency Matrix</h1>
          </div>
          <p className="text-gray-600 ml-11">
            Map learning outcomes to core competencies and values as per KICD guidelines
          </p>
        </div>

        {/* Filter Section - Full width */}
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <h2 className="font-semibold">Filter Curriculum Content</h2>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Level
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="">Select Grade</option>
                  {grades.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Strand
                </label>
                <select
                  value={selectedStrand}
                  onChange={(e) => setSelectedStrand(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="">Select Strand</option>
                  {strands.filter(s => s.subjectId === parseInt(selectedSubject)).map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Full width with flexible columns */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Sub-strands List - 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm sticky top-6">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center space-x-2 text-gray-700">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="font-semibold">Sub-strands</h2>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {subStrands.map(ss => (
                    <button
                      key={ss.id}
                      onClick={() => setSelectedSubStrand(ss.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        selectedSubStrand === ss.id
                          ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                          : 'border-2 border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{ss.name}</p>
                          <p className="text-xs text-gray-500 mt-1 font-mono truncate">{ss.code}</p>
                        </div>
                        {selectedSubStrand === ss.id && (
                          <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Competency Mapping - 9 columns on large screens */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h2 className="font-semibold text-gray-900">
                      Learning Outcomes Mapping
                    </h2>
                  </div>
                  {selectedSubStrand && (
                    <button
                      onClick={handleAddCompetency}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      Add Learning Outcome
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {!selectedSubStrand ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-700 font-medium mb-1">No Sub-strand Selected</h3>
                    <p className="text-gray-500 text-sm">
                      Select a sub-strand from the left to start mapping competencies
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* New Competency Form */}
                    {competencies.map((comp, index) => (
                      <div key={comp.id} className="bg-gray-50 rounded-xl border border-gray-200 p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">{index + 1}</span>
                            </div>
                            <h3 className="font-medium text-gray-900">New Learning Outcome</h3>
                          </div>
                          <button
                            onClick={() => handleRemoveCompetency(index)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Competency Code *
                            </label>
                            <input
                              type="text"
                              value={comp.competencyCode}
                              onChange={(e) => handleCompetencyChange(index, 'competencyCode', e.target.value)}
                              placeholder="e.g., SCI-HBS-DIG-01"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Learning Outcome Description *
                            </label>
                            <textarea
                              value={comp.description}
                              onChange={(e) => handleCompetencyChange(index, 'description', e.target.value)}
                              rows="3"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                              placeholder="Describe what the learner should be able to do..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Performance Indicator
                            </label>
                            <textarea
                              value={comp.performanceIndicator}
                              onChange={(e) => handleCompetencyChange(index, 'performanceIndicator', e.target.value)}
                              rows="2"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                              placeholder="How will success be measured?"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              <div className="flex items-center space-x-2">
                                <Award className="w-4 h-4" />
                                <span>Core Competencies</span>
                              </div>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {coreCompetencies.map(cc => (
                                <label key={cc.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={comp.coreCompetencies?.includes(cc.code)}
                                    onChange={() => handleCoreCompetencyToggle(index, cc.code)}
                                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <span className="text-sm font-medium text-gray-900 block truncate">{cc.name}</span>
                                    <span className="text-xs text-gray-500">{cc.code}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4" />
                                <span>Values</span>
                              </div>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {values.map(v => (
                                <label key={v.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={comp.values?.includes(v.code)}
                                    onChange={() => handleValueToggle(index, v.code)}
                                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <span className="text-sm font-medium text-gray-900 block truncate">{v.name}</span>
                                    <span className="text-xs text-gray-500">{v.code}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Save Button */}
                    {competencies.length > 0 && (
                      <div className="flex justify-end pt-4">
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        >
                          {saving ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Competency Mapping
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Existing Mappings */}
                    <div className="mt-8">
                      <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Existing Learning Outcomes
                      </h3>
                      <div className="space-y-4">
                        {mappedCompetencies
                          .filter(c => c.substrandId === parseInt(selectedSubStrand))
                          .map(comp => (
                            <div key={comp.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex-1 min-w-0 w-full">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-mono">
                                      {comp.competencyCode}
                                    </span>
                                  </div>
                                  <p className="text-gray-900 mb-3 break-words">{comp.description}</p>
                                  {comp.performanceIndicator && (
                                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                      <p className="text-sm text-gray-600 break-words">
                                        <span className="font-medium">Performance Indicator:</span> {comp.performanceIndicator}
                                      </p>
                                    </div>
                                  )}
                                  <div className="flex flex-wrap gap-2">
                                    {comp.coreCompetencies?.map(cc => {
                                      const competency = coreCompetencies.find(c => c.code === cc);
                                      return (
                                        <span key={cc} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs flex items-center gap-1">
                                          <Award className="w-3 h-3 flex-shrink-0" />
                                          <span className="truncate max-w-[150px]">{competency?.name || cc}</span>
                                        </span>
                                      );
                                    })}
                                    {comp.values?.map(v => {
                                      const value = values.find(val => val.code === v);
                                      return (
                                        <span key={v} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs flex items-center gap-1">
                                          <Heart className="w-3 h-3 flex-shrink-0" />
                                          <span className="truncate max-w-[150px]">{value?.name || v}</span>
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDeleteMapped(comp.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start sm:self-center flex-shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
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
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
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

export default CompetencyMatrix;