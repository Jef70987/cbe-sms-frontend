import React, { useState, useEffect } from 'react';

const TeacherDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [teacherData, setTeacherData] = useState(null);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [activeAssessments, setActiveAssessments] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [error, setError] = useState(null);

  // Define fetchTeacherDashboardData before useEffect
  const fetchTeacherDashboardData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API call
      setTimeout(() => {
        setTeacherData({
          name: 'Jane Mwangi',
          staffId: 'TSC/2024/1234',
          department: 'Science Department'
        });

        setAssignedClasses([
          { id: 1, className: 'Grade 7 East', stream: 'East', students: 42, subjects: ['Integrated Science', 'Agriculture'] },
          { id: 2, className: 'Grade 8 West', stream: 'West', students: 38, subjects: ['Integrated Science'] },
          { id: 3, className: 'Grade 7 North', stream: 'North', students: 40, subjects: ['Agriculture'] }
        ]);

        setActiveAssessments([
          { id: 1, type: 'Opener', term: 'Term 1', dueDate: '2024-02-15', class: 'Grade 7 East', subject: 'Integrated Science', status: 'pending' },
          { id: 2, type: 'Midterm', term: 'Term 1', dueDate: '2024-03-20', class: 'Grade 8 West', subject: 'Integrated Science', status: 'in-progress' },
          { id: 3, type: 'Endterm', term: 'Term 1', dueDate: '2024-04-10', class: 'Grade 7 North', subject: 'Agriculture', status: 'not-started' }
        ]);

        setPendingTasks([
          { id: 1, task: 'Upload Portfolio Evidence', count: 8, priority: 'high' },
          { id: 2, task: 'Complete Competency Mapping', count: 12, priority: 'medium' },
          { id: 3, task: 'Submit Termly Summary', count: 3, priority: 'high' }
        ]);

        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
      if (err){
        return ;
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTeacherDashboardData();
  }, []);

  const getPriorityClasses = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getAssessmentStatusClasses = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6" role="main" aria-label="Teacher Dashboard Loading">
        <div className="flex flex-col items-center justify-center h-64" aria-live="polite">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-6" role="alert">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchTeacherDashboardData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6" role="main" aria-label="Teacher Dashboard">
      {/* Header Section */}
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome back, {teacherData?.name}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {teacherData?.staffId}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
            {teacherData?.department}
          </span>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" aria-label="Quick Statistics">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900">{assignedClasses.length}</span>
            <span className="text-sm text-gray-600">Assigned Classes</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900">{activeAssessments.length}</span>
            <span className="text-sm text-gray-600">Active Assessments</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900">
              {assignedClasses.reduce((acc, cls) => acc + cls.students, 0)}
            </span>
            <span className="text-sm text-gray-600">Total Students</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-orange-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900">
              {pendingTasks.reduce((acc, task) => acc + task.count, 0)}
            </span>
            <span className="text-sm text-gray-600">Pending Tasks</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Classes Section */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6" aria-label="Assigned Classes">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Classes</h2>
          <div className="space-y-4">
            {assignedClasses.map((cls) => (
              <article key={cls.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">{cls.className}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {cls.stream}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="text-gray-900 font-medium">{cls.students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subjects:</span>
                    <span className="text-gray-900 font-medium">{cls.subjects.join(', ')}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    View Details
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Enter Marks
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Active Assessments Section */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6" aria-label="Active Assessments">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Assessments</h2>
          <div className="space-y-4">
            {activeAssessments.map((assessment) => (
              <article key={assessment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">{assessment.type}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${getAssessmentStatusClasses(assessment.status)}`}>
                    {assessment.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Class:</span>
                    <span className="text-gray-900">{assessment.class}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subject:</span>
                    <span className="text-gray-900">{assessment.subject}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="text-gray-900">
                      {new Date(assessment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pending Tasks Section - Full Width */}
        <section className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm p-6" aria-label="Pending Tasks">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-900">{task.task}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityClasses(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{task.count}</span>
                  <span className="text-sm text-gray-600">pending</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;