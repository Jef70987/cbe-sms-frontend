import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [pathwayRecommendations, setPathwayRecommendations] = useState([]);
  const [interestAnalysis, setInterestAnalysis] = useState([]);
  const [performanceTrends, setPerformanceTrends] = useState([]);
  const [competencyRadar, setCompetencyRadar] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('pathway');
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [interestForm, setInterestForm] = useState({
    interests: [],
    talents: [],
    aspirations: '',
    preferredSubjects: [],
    careerGoals: ''
  });

  // Career Pathways for Senior School (G10-G12)
  const careerPathways = [
    {
      id: 1,
      name: 'STEM (Science, Technology, Engineering & Mathematics)',
      code: 'STEM',
      description: 'For learners with strong performance in Sciences and Mathematics',
      requiredSubjects: ['Mathematics', 'Integrated Science', 'Physics', 'Chemistry'],
      recommendedCareers: ['Engineering', 'Medicine', 'Computer Science', 'Architecture', 'Research'],
      averageSalary: 'KES 50,000 - 200,000',
      universities: ['University of Nairobi', 'JKUAT', 'KU', 'Strathmore']
    },
    {
      id: 2,
      name: 'Humanities & Social Sciences',
      code: 'HUSS',
      description: 'For learners excelling in languages, history, and social studies',
      requiredSubjects: ['English', 'Kiswahili', 'History', 'Geography', 'CRE/IRE'],
      recommendedCareers: ['Law', 'Journalism', 'Teaching', 'Social Work', 'Public Administration'],
      averageSalary: 'KES 40,000 - 150,000',
      universities: ['University of Nairobi', 'Kenyatta University', 'Moi University']
    },
    {
      id: 3,
      name: 'Creative Arts & Sports',
      code: 'ARTS',
      description: 'For learners with talents in arts, music, drama, and sports',
      requiredSubjects: ['Creative Arts', 'Physical Education', 'Music', 'Theatre'],
      recommendedCareers: ['Musician', 'Athlete', 'Actor', 'Graphic Designer', 'Coach'],
      averageSalary: 'KES 30,000 - 500,000',
      universities: ['Kenyatta University', 'Technical University of Kenya', 'Sports Academy']
    },
    {
      id: 4,
      name: 'Technical & Vocational',
      code: 'TVET',
      description: 'For learners with practical skills in technical and vocational areas',
      requiredSubjects: ['Agriculture', 'Business Studies', 'Computer Science', 'Home Science'],
      recommendedCareers: ['Entrepreneur', 'Technician', 'Chef', 'Fashion Designer', 'Electrician'],
      averageSalary: 'KES 35,000 - 180,000',
      universities: ['Technical University', 'TVET Institutes', 'Polytechnics']
    }
  ];

  // Core Competencies
  const coreCompetencies = [
    'Communication',
    'Critical Thinking',
    'Creativity',
    'Citizenship',
    'Digital Literacy',
    'Learning to Learn',
    'Self-efficacy'
  ];

  // Interest Categories
  const interestCategories = [
    { id: 1, name: 'Science & Research', icon: '🔬' },
    { id: 2, name: 'Technology & Computing', icon: '💻' },
    { id: 3, name: 'Engineering & Building', icon: '🏗️' },
    { id: 4, name: 'Arts & Design', icon: '🎨' },
    { id: 5, name: 'Music & Performance', icon: '🎵' },
    { id: 6, name: 'Sports & Athletics', icon: '⚽' },
    { id: 7, name: 'Business & Entrepreneurship', icon: '💼' },
    { id: 8, name: 'Teaching & Education', icon: '📚' },
    { id: 9, name: 'Healthcare & Medicine', icon: '🏥' },
    { id: 10, name: 'Agriculture & Environment', icon: '🌱' },
    { id: 11, name: 'Law & Politics', icon: '⚖️' },
    { id: 12, name: 'Media & Communication', icon: '📺' }
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
          { id: 3, name: 'Grade 8 East', level: 8, stream: 'East' },
          { id: 4, name: 'Grade 8 West', level: 8, stream: 'West' },
          { id: 5, name: 'Grade 9 East', level: 9, stream: 'East' },
          { id: 6, name: 'Grade 9 West', level: 9, stream: 'West' }
        ]);

        setStudents([
          {
            id: 1,
            admissionNo: '2024/001',
            name: 'John Kamau',
            className: 'Grade 9 East',
            gender: 'M',
            upi: '1234567890',
            photo: '/photos/john.jpg'
          },
          {
            id: 2,
            admissionNo: '2024/002',
            name: 'Mary Wanjiku',
            className: 'Grade 9 East',
            gender: 'F',
            upi: '1234567891',
            photo: '/photos/mary.jpg'
          },
          {
            id: 3,
            admissionNo: '2024/003',
            name: 'Peter Omondi',
            className: 'Grade 9 West',
            gender: 'M',
            upi: '1234567892',
            photo: '/photos/peter.jpg'
          },
          {
            id: 4,
            admissionNo: '2024/004',
            name: 'Sarah Akinyi',
            className: 'Grade 8 East',
            gender: 'F',
            upi: '1234567893',
            photo: '/photos/sarah.jpg'
          }
        ]);

        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const fetchStudentProfile = async (studentId) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock student profile data
      const profile = {
        id: parseInt(studentId),
        name: studentId === '1' ? 'John Kamau' : studentId === '2' ? 'Mary Wanjiku' : 'Peter Omondi',
        admissionNo: studentId === '1' ? '2024/001' : studentId === '2' ? '2024/002' : '2024/003',
        className: studentId === '1' ? 'Grade 9 East' : studentId === '2' ? 'Grade 9 East' : 'Grade 9 West',
        upi: studentId === '1' ? '1234567890' : studentId === '2' ? '1234567891' : '1234567892',
        gender: studentId === '1' ? 'M' : studentId === '2' ? 'F' : 'M',
        dateOfBirth: '2010-05-15',
        interests: studentId === '1' 
          ? ['Science & Research', 'Technology & Computing', 'Sports & Athletics']
          : studentId === '2'
          ? ['Arts & Design', 'Music & Performance', 'Teaching & Education']
          : ['Business & Entrepreneurship', 'Agriculture & Environment', 'Sports & Athletics'],
        talents: studentId === '1'
          ? ['Problem Solving', 'Leadership', 'Analytical Thinking']
          : studentId === '2'
          ? ['Creativity', 'Communication', 'Empathy']
          : ['Practical Skills', 'Negotiation', 'Teamwork'],
        aspirations: studentId === '1'
          ? 'I want to become an engineer and solve real-world problems'
          : studentId === '2'
          ? 'I want to be a teacher and inspire young minds'
          : 'I want to start my own agribusiness and create jobs',
        careerGoals: studentId === '1'
          ? 'Software Engineer or Mechanical Engineer'
          : studentId === '2'
          ? 'Teacher or Artist'
          : 'Entrepreneur or Farmer',
        preferredSubjects: studentId === '1'
          ? ['Mathematics', 'Integrated Science', 'Computer Science']
          : studentId === '2'
          ? ['English', 'Creative Arts', 'Kiswahili']
          : ['Agriculture', 'Business Studies', 'Mathematics'],
        performance: {
          grade7: {
            term1: { Mathematics: 78, Science: 82, English: 65, Kiswahili: 70, Agriculture: 75 },
            term2: { Mathematics: 80, Science: 85, English: 68, Kiswahili: 72, Agriculture: 78 },
            term3: { Mathematics: 82, Science: 88, English: 70, Kiswahili: 75, Agriculture: 80 }
          },
          grade8: {
            term1: { Mathematics: 83, Science: 86, English: 72, Kiswahili: 76, Agriculture: 82 },
            term2: { Mathematics: 85, Science: 89, English: 74, Kiswahili: 78, Agriculture: 84 },
            term3: { Mathematics: 87, Science: 91, English: 75, Kiswahili: 80, Agriculture: 86 }
          },
          grade9: {
            term1: { Mathematics: 88, Science: 92, English: 77, Kiswahili: 82, Agriculture: 88 },
            term2: { Mathematics: 90, Science: 94, English: 79, Kiswahili: 84, Agriculture: 90 }
          }
        },
        competencies: {
          Communication: 85,
          'Critical Thinking': 92,
          Creativity: 78,
          Citizenship: 88,
          'Digital Literacy': 90,
          'Learning to Learn': 86,
          'Self-efficacy': 82
        },
        values: {
          Respect: 90,
          Responsibility: 88,
          Integrity: 92,
          Honesty: 94,
          Love: 85,
          Tolerance: 82,
          Peace: 88
        },
        attendance: {
          grade7: { present: 180, absent: 5, total: 185 },
          grade8: { present: 185, absent: 3, total: 188 },
          grade9: { present: 125, absent: 2, total: 127 }
        },
        projects: [
          { name: 'Kitchen Garden Project', subject: 'Agriculture', score: 'EE1', year: 2024 },
          { name: 'Science Fair - Water Purification', subject: 'Science', score: 'EE2', year: 2024 },
          { name: 'School Debate Competition', subject: 'English', score: 'ME1', year: 2023 }
        ]
      };

      setStudentProfile(profile);
      
      // Generate pathway recommendations based on profile
      generatePathwayRecommendations(profile);
      
      // Generate interest analysis
      generateInterestAnalysis(profile);
      
      // Generate performance trends
      generatePerformanceTrends(profile);
      
      // Generate competency radar data
      generateCompetencyRadar(profile);

    } catch (err) {
      setError('Failed to fetch student profile');
    } finally {
      setLoading(false);
    }
  };

  const generatePathwayRecommendations = (profile) => {
    // Calculate subject averages
    const mathAvg = calculateSubjectAverage(profile, 'Mathematics');
    const scienceAvg = calculateSubjectAverage(profile, 'Science');
    const englishAvg = calculateSubjectAverage(profile, 'English');
    const kiswahiliAvg = calculateSubjectAverage(profile, 'Kiswahili');
    const agriAvg = calculateSubjectAverage(profile, 'Agriculture');

    // Calculate competency scores
    const criticalThinkingScore = profile.competencies['Critical Thinking'];
    const creativityScore = profile.competencies['Creativity'];
    const digitalScore = profile.competencies['Digital Literacy'];

    // Determine pathway scores
    const recommendations = careerPathways.map(pathway => {
      let score = 0;
      let matchFactors = [];

      // STEM Pathway
      if (pathway.code === 'STEM') {
        score = (mathAvg * 0.3 + scienceAvg * 0.3 + criticalThinkingScore * 0.2 + digitalScore * 0.2);
        if (mathAvg > 80) matchFactors.push('Strong Mathematics performance');
        if (scienceAvg > 80) matchFactors.push('Excellent Science scores');
        if (criticalThinkingScore > 85) matchFactors.push('High critical thinking ability');
        if (profile.interests.includes('Science & Research')) matchFactors.push('Interest in Science');
        if (profile.interests.includes('Technology & Computing')) matchFactors.push('Interest in Technology');
      }

      // Humanities Pathway
      if (pathway.code === 'HUSS') {
        score = (englishAvg * 0.3 + kiswahiliAvg * 0.3 + profile.competencies['Communication'] * 0.2 + profile.competencies['Citizenship'] * 0.2);
        if (englishAvg > 75) matchFactors.push('Strong English performance');
        if (kiswahiliAvg > 75) matchFactors.push('Strong Kiswahili performance');
        if (profile.competencies['Communication'] > 80) matchFactors.push('Excellent communication skills');
        if (profile.interests.includes('Law & Politics')) matchFactors.push('Interest in Law/Politics');
        if (profile.interests.includes('Teaching & Education')) matchFactors.push('Interest in Teaching');
      }

      // Creative Arts Pathway
      if (pathway.code === 'ARTS') {
        score = (creativityScore * 0.4 + profile.competencies['Communication'] * 0.3 + englishAvg * 0.3);
        if (creativityScore > 80) matchFactors.push('High creativity score');
        if (profile.interests.includes('Arts & Design')) matchFactors.push('Interest in Arts');
        if (profile.interests.includes('Music & Performance')) matchFactors.push('Interest in Music/Performance');
        if (profile.interests.includes('Sports & Athletics')) matchFactors.push('Interest in Sports');
        if (profile.talents.includes('Creativity')) matchFactors.push('Creative talent');
      }

      // TVET Pathway
      if (pathway.code === 'TVET') {
        score = (agriAvg * 0.25 + mathAvg * 0.2 + profile.competencies['Self-efficacy'] * 0.3 + digitalScore * 0.25);
        if (agriAvg > 70) matchFactors.push('Strong Agriculture performance');
        if (profile.interests.includes('Business & Entrepreneurship')) matchFactors.push('Interest in Business');
        if (profile.interests.includes('Agriculture & Environment')) matchFactors.push('Interest in Agriculture');
        if (profile.talents.includes('Practical Skills')) matchFactors.push('Practical skills talent');
      }

      return {
        ...pathway,
        matchScore: Math.round(score),
        matchFactors: matchFactors.slice(0, 3),
        confidence: score > 85 ? 'High' : score > 70 ? 'Medium' : 'Low'
      };
    });

    // Sort by match score
    const sorted = recommendations.sort((a, b) => b.matchScore - a.matchScore);
    setPathwayRecommendations(sorted);
  };

  const generateInterestAnalysis = (profile) => {
    const analysis = profile.interests.map(interest => {
      const category = interestCategories.find(c => c.name === interest);
      return {
        subject: interest,
        value: Math.floor(Math.random() * 30) + 70, // Mock strength score
        icon: category?.icon || '📌'
      };
    });
    setInterestAnalysis(analysis);
  };

  const generatePerformanceTrends = (profile) => {
    const trends = [];
    const subjects = ['Mathematics', 'Science', 'English', 'Kiswahili', 'Agriculture'];
    
    subjects.forEach(subject => {
      const data = [];
      if (profile.performance.grade7) {
        data.push({
          term: 'G7 T1',
          score: profile.performance.grade7.term1[subject] || 0
        });
        data.push({
          term: 'G7 T2',
          score: profile.performance.grade7.term2[subject] || 0
        });
        data.push({
          term: 'G7 T3',
          score: profile.performance.grade7.term3[subject] || 0
        });
      }
      if (profile.performance.grade8) {
        data.push({
          term: 'G8 T1',
          score: profile.performance.grade8.term1[subject] || 0
        });
        data.push({
          term: 'G8 T2',
          score: profile.performance.grade8.term2[subject] || 0
        });
        data.push({
          term: 'G8 T3',
          score: profile.performance.grade8.term3[subject] || 0
        });
      }
      if (profile.performance.grade9) {
        data.push({
          term: 'G9 T1',
          score: profile.performance.grade9.term1[subject] || 0
        });
        data.push({
          term: 'G9 T2',
          score: profile.performance.grade9.term2[subject] || 0
        });
      }
      
      trends.push({
        subject,
        data
      });
    });
    
    setPerformanceTrends(trends);
  };

  const generateCompetencyRadar = (profile) => {
    const data = coreCompetencies.map(comp => ({
      competency: comp,
      score: profile.competencies[comp] || 0,
      fullMark: 100
    }));
    setCompetencyRadar(data);
  };

  const calculateSubjectAverage = (profile, subject) => {
    let total = 0;
    let count = 0;
    
    if (profile.performance.grade9) {
      if (profile.performance.grade9.term1[subject]) {
        total += profile.performance.grade9.term1[subject];
        count++;
      }
      if (profile.performance.grade9.term2[subject]) {
        total += profile.performance.grade9.term2[subject];
        count++;
      }
    }
    
    return count > 0 ? Math.round(total / count) : 70;
  };

  const handleStudentSelect = (e) => {
    setSelectedStudent(e.target.value);
    if (e.target.value) {
      fetchStudentProfile(e.target.value);
    } else {
      setStudentProfile(null);
      setPathwayRecommendations([]);
    }
  };

  const handleClassSelect = (e) => {
    setSelectedClass(e.target.value);
    // Filter students by class
  };

  const handleAddInterest = () => {
    setShowInterestModal(true);
  };

  const handleInterestSubmit = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Interests updated successfully');
      setShowInterestModal(false);
      
      // Refresh profile
      if (selectedStudent) {
        fetchStudentProfile(selectedStudent);
      }
    } catch (err) {
      setError('Failed to update interests');
    } finally {
      setLoading(false);
    }
  };

  const handleInterestToggle = (interest) => {
    setInterestForm(prev => {
      const current = prev.interests || [];
      if (current.includes(interest)) {
        return { ...prev, interests: current.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...current, interest] };
      }
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading && !studentProfile) {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Career Pathway Recommendations</h1>
          <p className="text-gray-600 dark:text-gray-400">Track student progress and get AI-powered career recommendations</p>
        </header>

        {/* Student Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Class/Grade
              </label>
              <select
                value={selectedClass}
                onChange={handleClassSelect}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Class</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Student
              </label>
              <select
                value={selectedStudent}
                onChange={handleStudentSelect}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.admissionNo})</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleAddInterest}
                disabled={!selectedStudent}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Update Interests & Talents
              </button>
            </div>
          </div>
        </div>

        {studentProfile && (
          <>
            {/* Student Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-3xl text-blue-600 dark:text-blue-400">
                  {studentProfile.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{studentProfile.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {studentProfile.admissionNo} • {studentProfile.className} • UPI: {studentProfile.upi}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                      Grade {studentProfile.className.split(' ')[1]} • Age 14
                    </span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Interests</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {studentProfile.interests.map((interest, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Talents</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {studentProfile.talents.map((talent, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">
                            {talent}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Career Goal</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {studentProfile.careerGoals}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('pathway')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'pathway'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Career Pathway
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'performance'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Performance Trends
                </button>
                <button
                  onClick={() => setActiveTab('competencies')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'competencies'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Competency Profile
                </button>
                <button
                  onClick={() => setActiveTab('interests')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'interests'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Interests & Talents
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              {/* Career Pathway Tab */}
              {activeTab === 'pathway' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Career Pathway Recommendations - Grade 9 Exit
                  </h2>
                  
                  {/* Top Recommendation */}
                  {pathwayRecommendations.length > 0 && (
                    <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                          TOP RECOMMENDATION
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          pathwayRecommendations[0].confidence === 'High'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {pathwayRecommendations[0].confidence} Confidence
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {pathwayRecommendations[0].name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {pathwayRecommendations[0].description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Match Score</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {pathwayRecommendations[0].matchScore}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Recommended Careers</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {pathwayRecommendations[0].recommendedCareers.slice(0, 3).join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Average Salary Range</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {pathwayRecommendations[0].averageSalary}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Matching Factors:</p>
                        <div className="flex flex-wrap gap-2">
                          {pathwayRecommendations[0].matchFactors.map((factor, i) => (
                            <span key={i} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* All Pathways Comparison */}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">All Pathways Comparison</h3>
                  <div className="space-y-4">
                    {pathwayRecommendations.map((pathway, index) => (
                      <div key={pathway.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                              {index + 1}.
                            </span>
                            <h4 className="font-medium text-gray-900 dark:text-white">{pathway.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              pathway.confidence === 'High'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : pathway.confidence === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }`}>
                              {pathway.confidence}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {pathway.matchScore}%
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${pathway.matchScore}%` }}
                          ></div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {pathway.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Required Subjects</p>
                            <div className="flex flex-wrap gap-1">
                              {pathway.requiredSubjects.map((subj, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                  {subj}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Career Options</p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {pathway.recommendedCareers.slice(0, 4).join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Grade 9 Exit Summary */}
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                      Grade 9 Exit - Career Pathway Selection
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Based on the learner's performance in Grade 7-9 and their interests, 
                      the recommended pathway for Senior School is{' '}
                      <span className="font-bold">{pathwayRecommendations[0]?.name}</span>.
                      This recommendation will be presented to the learner and parents for 
                      final selection before Grade 10 placement.
                    </p>
                  </div>
                </div>
              )}

              {/* Performance Trends Tab */}
              {activeTab === 'performance' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Performance Trends - Junior School (Grade 7-9)
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Line Chart for each subject */}
                    {performanceTrends.map((trend, idx) => (
                      <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">{trend.subject}</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={trend.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="term" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ))}
                  </div>

                  {/* Subject Performance Summary */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-600 dark:text-green-400">Strongest Subjects</p>
                      <p className="text-lg font-bold text-green-700 dark:text-green-300">
                        Science, Mathematics
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">Improvement Needed</p>
                      <p className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                        Kiswahili, English
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-600 dark:text-blue-400">Overall Trend</p>
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                        +12% Improvement
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Competency Profile Tab */}
              {activeTab === 'competencies' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Core Competencies & Values Profile
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Radar Chart */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Competency Radar</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencyRadar}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="competency" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Competency List */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Competency Scores</h3>
                      <div className="space-y-3">
                        {competencyRadar.map((comp, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-700 dark:text-gray-300">{comp.competency}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{comp.score}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${comp.score}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Values Assessment */}
                    <div className="lg:col-span-2 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Values Assessment</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(studentProfile.values).map(([value, score], idx) => (
                          <div key={idx} className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full border-4 border-blue-200 dark:border-blue-800 flex items-center justify-center mb-2">
                              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{score}%</span>
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interests & Talents Tab */}
              {activeTab === 'interests' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Interests & Talents Analysis
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Interest Categories */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Interest Areas</h3>
                      <div className="space-y-3">
                        {interestAnalysis.map((interest, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-sm mb-1">
                              <div className="flex items-center gap-2">
                                <span>{interest.icon}</span>
                                <span className="text-gray-700 dark:text-gray-300">{interest.subject}</span>
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">{interest.value}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${interest.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Talents */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Identified Talents</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {studentProfile.talents.map((talent, idx) => (
                          <div key={idx} className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg text-center">
                            <div className="text-2xl mb-2">✨</div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{talent}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects Portfolio */}
                    <div className="lg:col-span-2 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Project Portfolio Evidence</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {studentProfile.projects.map((project, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <p className="font-medium text-gray-900 dark:text-white mb-1">{project.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.subject} • {project.year}</p>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              project.score === 'EE1' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {project.score}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Interest Update Modal */}
        {showInterestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Update Interests & Talents
                  </h2>
                  <button
                    onClick={() => setShowInterestModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleInterestSubmit(); }}>
                  {/* Interests */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Select Interest Areas
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interestCategories.map(category => (
                        <label key={category.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={interestForm.interests.includes(category.name)}
                            onChange={() => handleInterestToggle(category.name)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {category.icon} {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Talents */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Talents (comma separated)
                    </label>
                    <input
                      type="text"
                      value={interestForm.talents.join(', ')}
                      onChange={(e) => setInterestForm({
                        ...interestForm,
                        talents: e.target.value.split(',').map(t => t.trim())
                      })}
                      placeholder="e.g., Drawing, Public Speaking, Sports"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  {/* Aspirations */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Career Aspirations
                    </label>
                    <textarea
                      value={interestForm.aspirations}
                      onChange={(e) => setInterestForm({ ...interestForm, aspirations: e.target.value })}
                      rows="3"
                      placeholder="What do you want to become in future?"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>

                  {/* Preferred Subjects */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Subjects
                    </label>
                    <select
                      multiple
                      value={interestForm.preferredSubjects}
                      onChange={(e) => setInterestForm({
                        ...interestForm,
                        preferredSubjects: Array.from(e.target.selectedOptions, option => option.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      size="4"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Integrated Science</option>
                      <option value="English">English</option>
                      <option value="Kiswahili">Kiswahili</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Creative Arts">Creative Arts</option>
                      <option value="Business Studies">Business Studies</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowInterestModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
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

export default Analytics;