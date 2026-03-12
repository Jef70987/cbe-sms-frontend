import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrincipalSidebarData } from '../SidebarData/PrincipalSidebarData';

function PrincipalSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false); // Start expanded
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigation = (path) => {
    navigate(path);
    // Auto-close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  };

  return (
    <div className="relative h-full">
      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Toggle Button for Mobile when sidebar is collapsed */}
      {isCollapsed && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-blue-700 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg border border-blue-600 transition-all duration-200 hover:scale-110 z-50 lg:hidden"
          aria-label="Open sidebar"
        >
          <svg 
            className="w-5 h-5"
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`
          h-screen bg-gradient-to-b from-blue-700 to-blue-800 
          shadow-2xl border-r border-blue-600 transition-all duration-300 ease-in-out z-50
          ${isCollapsed ? 'w-20' : 'w-64'}
          /* Mobile styles */
          fixed lg:relative top-0 left-0
          ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        `}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b border-blue-600 relative">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.jpeg" 
              alt="School Logo" 
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                <h1 className="text-white font-extrabold text-lg leading-tight">PRINCIPAL</h1>
                <h2 className="text-blue-200 text-xs font-bold">PORTAL</h2>
                <p className="text-sm font-extrabold text-white truncate">Dr. John Smith</p>
              </div>
            )}
          </div>

          {/* Toggle Button inside sidebar - Always visible */}
          <button 
            onClick={toggleSidebar}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 shadow-lg border border-blue-500 transition-all duration-200 hover:scale-110 flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-800">
          <ul className="space-y-1 px-3">
            {PrincipalSidebarData.map((val, key) => (
              <li key={key} className="relative">
                {/* Main Navigation Item */}
                <div
                  className={`
                    flex items-center w-full p-3 rounded-xl cursor-pointer transition-all duration-200 group
                    ${window.location.pathname === val.path ? 'bg-blue-600 shadow-lg' : 'hover:bg-blue-600'}
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                  `}
                  onClick={() => {
                    if (val.submenu) {
                      handleDropdown(key);
                    } else {
                      handleNavigation(val.path);
                    }
                  }}
                >
                  {/* Icon - Made bold with strokeWidth and text styling */}
                  <div className={`
                    flex-shrink-0 transition-colors duration-200
                    ${window.location.pathname === val.path ? 'text-white' : 'text-blue-200 group-hover:text-white'}
                    ${isCollapsed ? 'text-3xl' : 'text-2xl'}
                    filter drop-shadow-lg
                    [&>svg]:stroke-[2.5] [&>svg]:stroke-current
                  `}>
                    {val.icon}
                  </div>

                  {/* Title and Badge */}
                  {!isCollapsed && (
                    <div className="ml-3 flex-1 flex items-center justify-between min-w-0">
                      <span className={`
                        font-extrabold transition-colors duration-200 text-base tracking-wide
                        ${window.location.pathname === val.path ? 'text-white' : 'text-blue-100 group-hover:text-white'}
                      `}>
                        {val.title}
                      </span>
                      {val.badge && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full ml-2 flex-shrink-0">
                          {val.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Badge when collapsed */}
                  {isCollapsed && val.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                      {val.badge}
                    </span>
                  )}

                  {/* Dropdown Arrow */}
                  {!isCollapsed && val.submenu && (
                    <svg 
                      className={`
                        w-5 h-5 transition-transform duration-200 flex-shrink-0 ml-2
                        ${openDropdown === key ? 'rotate-180' : ''}
                        ${window.location.pathname === val.path ? 'text-white' : 'text-blue-200'}
                        filter drop-shadow-md
                      `}
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>

                {/* Sub Navigation */}
                {!isCollapsed && val.submenu && openDropdown === key && (
                  <ul className="ml-11 mt-1 space-y-1 animate-fadeIn">
                    {val.submenu.map((subVal, subKey) => (
                      <li key={subKey}>
                        <div
                          className={`
                            flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 group
                            ${window.location.pathname === subVal.path ? 'bg-blue-500 shadow-md' : 'hover:bg-blue-600'}
                          `}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation(subVal.path);
                          }}
                        >
                          <span className={`
                            text-sm font-extrabold transition-colors duration-200 tracking-wide
                            ${window.location.pathname === subVal.path ? 'text-white' : 'text-blue-100 group-hover:text-white'}
                          `}>
                            {subVal.title}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Version Footer */}
        <div className="border-t border-blue-600 p-4">
          <div className={`
            text-blue-300 transition-all duration-300 overflow-hidden
            ${isCollapsed ? 'text-center text-xs' : 'text-xs text-center'}
          `}>
            {!isCollapsed ? (
              <p className="font-bold">Version 2.1.0</p>
            ) : (
              <div className="rotate-90 whitespace-nowrap mt-8">
                <span className="font-bold">v2.1.0</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add animation style */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        /* Make all icons bold */
        svg {
          stroke-width: 2.5 !important;
        }
        
        /* Make dropdown arrows even bolder */
        .dropdown-arrow {
          stroke-width: 3 !important;
        }
      `}</style>
    </div>
  );
}

export default PrincipalSidebar;