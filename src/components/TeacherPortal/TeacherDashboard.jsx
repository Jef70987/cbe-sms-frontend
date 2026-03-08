import React, { useState, useEffect } from 'react';

const TeacherDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [teacherData, setTeacherData] = useState(null);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [activeAssessments, setActiveAssessments] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeacherDashboardData();
  }, []);

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
    }
  };

  const getPriorityClasses = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    }
  };

  const getAssessmentStatusClasses = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" role="main" aria-label="Teacher Dashboard Loading">
        <div className="flex flex-col items-center justify-center h-64" aria-live="polite">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" role="alert">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" role="main" aria-label="Teacher Dashboard">
      {/* Header Section */}
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {teacherData?.name}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
            {teacherData?.staffId}
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
            {teacherData?.department}
          </span>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" aria-label="Quick Statistics">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-2xl mr-4" aria-hidden="true">
            📚
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900 dark:text-white">{assignedClasses.length}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Assigned Classes</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-2xl mr-4" aria-hidden="true">
            📝
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900 dark:text-white">{activeAssessments.length}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Active Assessments</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-2xl mr-4" aria-hidden="true">
            👥
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900 dark:text-white">
              {assignedClasses.reduce((acc, cls) => acc + cls.students, 0)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Students</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-2xl mr-4" aria-hidden="true">
            ⏳
          </div>
          <div>
            <span className="block text-2xl font-bold text-gray-900 dark:text-white">
              {pendingTasks.reduce((acc, task) => acc + task.count, 0)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Pending Tasks</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Classes Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" aria-label="Assigned Classes">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Classes</h2>
          <div className="space-y-4">
            {assignedClasses.map((cls) => (
              <article key={cls.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{cls.className}</h3>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                    {cls.stream}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Students:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{cls.students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subjects:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{cls.subjects.join(', ')}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
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
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" aria-label="Active Assessments">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Assessments</h2>
          <div className="space-y-4">
            {activeAssessments.map((assessment) => (
              <article key={assessment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{assessment.type}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${getAssessmentStatusClasses(assessment.status)}`}>
                    {assessment.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Class:</span>
                    <span className="text-gray-900 dark:text-white">{assessment.class}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subject:</span>
                    <span className="text-gray-900 dark:text-white">{assessment.subject}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Due Date:</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(assessment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pending Tasks Section - Full Width */}
        <section className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" aria-label="Pending Tasks">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{task.task}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityClasses(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{task.count}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">pending</span>
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