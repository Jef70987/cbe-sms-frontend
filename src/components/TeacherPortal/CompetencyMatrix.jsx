import React, { useState, useEffect } from 'react';

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
    } catch (err) {
      setError('Failed to save competency mapping');
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
    } catch (err) {
      setError('Failed to delete competency mapping');
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Competency Matrix</h1>
          <p className="text-gray-600 dark:text-gray-400">Map learning outcomes to core competencies and values</p>
        </header>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Subject</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Grade</option>
                {grades.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Strand
              </label>
              <select
                value={selectedStrand}
                onChange={(e) => setSelectedStrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Strand</option>
                {strands.filter(s => s.subjectId === parseInt(selectedSubject)).map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Sub-strands List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sub-strands</h2>
              <div className="space-y-2">
                {subStrands.map(ss => (
                  <button
                    key={ss.id}
                    onClick={() => setSelectedSubStrand(ss.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedSubStrand === ss.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent'
                    }`}
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{ss.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ss.code}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Competency Mapping */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Learning Outcomes Mapping
                </h2>
                {selectedSubStrand && (
                  <button
                    onClick={handleAddCompetency}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
                  >
                    <span>+</span>
                    Add Learning Outcome
                  </button>
                )}
              </div>

              {!selectedSubStrand ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  Select a sub-strand to start mapping competencies
                </div>
              ) : (
                <div className="space-y-6">
                  {/* New Competency Form */}
                  {competencies.map((comp, index) => (
                    <div key={comp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          New Learning Outcome {index + 1}
                        </h3>
                        <button
                          onClick={() => handleRemoveCompetency(index)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          ×
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Competency Code *
                          </label>
                          <input
                            type="text"
                            value={comp.competencyCode}
                            onChange={(e) => handleCompetencyChange(index, 'competencyCode', e.target.value)}
                            placeholder="e.g., SCI-HBS-DIG-01"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Learning Outcome Description *
                          </label>
                          <textarea
                            value={comp.description}
                            onChange={(e) => handleCompetencyChange(index, 'description', e.target.value)}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Describe what the learner should be able to do..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Performance Indicator
                          </label>
                          <textarea
                            value={comp.performanceIndicator}
                            onChange={(e) => handleCompetencyChange(index, 'performanceIndicator', e.target.value)}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="How will success be measured?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Core Competencies
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {coreCompetencies.map(cc => (
                              <label key={cc.id} className="flex items-center space-x-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={comp.coreCompetencies?.includes(cc.code)}
                                  onChange={() => handleCoreCompetencyToggle(index, cc.code)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700 dark:text-gray-300">{cc.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Values
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {values.map(v => (
                              <label key={v.id} className="flex items-center space-x-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={comp.values?.includes(v.code)}
                                  onChange={() => handleValueToggle(index, v.code)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-gray-700 dark:text-gray-300">{v.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Save Button */}
                  {competencies.length > 0 && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {saving ? 'Saving...' : 'Save Competency Mapping'}
                      </button>
                    </div>
                  )}

                  {/* Existing Mappings */}
                  <div className="mt-8">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Existing Learning Outcomes
                    </h3>
                    <div className="space-y-4">
                      {mappedCompetencies
                        .filter(c => c.substrandId === parseInt(selectedSubStrand))
                        .map(comp => (
                          <div key={comp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mb-1">
                                  {comp.competencyCode}
                                </p>
                                <p className="text-gray-900 dark:text-white mb-2">{comp.description}</p>
                                {comp.performanceIndicator && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    <span className="font-medium">Indicator:</span> {comp.performanceIndicator}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-2">
                                  {comp.coreCompetencies?.map(cc => (
                                    <span key={cc} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                                      {coreCompetencies.find(c => c.code === cc)?.name || cc}
                                    </span>
                                  ))}
                                  {comp.values?.map(v => (
                                    <span key={v} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs">
                                      {values.find(val => val.code === v)?.name || v}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteMapped(comp.id)}
                                className="text-red-600 hover:text-red-700 dark:text-red-400"
                              >
                                ×
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

export default CompetencyMatrix;