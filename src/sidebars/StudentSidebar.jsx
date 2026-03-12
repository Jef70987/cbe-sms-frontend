// UserSidebar.jsx
import React, { useState, useEffect } from 'react';
import StudentSidebarData from '../SidebarData/StudentSidebarData';
import { useNavigate } from 'react-router-dom';

function StudentSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Close any open dropdowns when collapsing
    if (!isCollapsed) {
      setOpenDropdown(null);
    }
  };

  const handleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigation = (path) => {
    navigate(path);
    // Auto-close sidebar on mobile after navigation
    if (isMobile) {
      setIsCollapsed(true);
      setOpenDropdown(null);
    }
  };

  return (
    <div className="relative h-full">
      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/85 to-blue-900/90 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Bottom Navigation - Always visible when on mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-800 shadow-2xl z-50 lg:hidden">
          <div className="flex justify-around items-center h-16 px-2 overflow-x-auto">
            {StudentSidebarData.slice(0, 15).map((val, key) => (
              <button
                key={key}
                onClick={() => handleNavigation(val.link)}
                className={`
                  flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-300
                  ${window.location.pathname === val.link 
                    ? 'text-white scale-110 bg-blue-600' 
                    : 'text-blue-100 hover:text-white hover:bg-blue-600/50'
                  }
                `}
              >
                <div className="text-xl mb-1 drop-shadow-lg">{val.icon}</div>
                <span className="text-xs font-bold whitespace-nowrap drop-shadow-md">{val.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Spacer for Mobile - Pushes content up above bottom nav */}
      {isMobile && <div className="pb-20"></div>}

      {/* Toggle Button - Hidden on mobile */}
      {!isMobile && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-xl border-2 border-blue-400/50 transition-all duration-300 hover:scale-110 hover:rotate-12 z-50"
          aria-label="Open sidebar"
        >
          <svg 
            className="w-5 h-5"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`
          h-screen bg-gradient-to-br from-blue-800 to-blue-700
          shadow-2xl border-r-0 transition-all duration-500 ease-in-out z-50
          ${isCollapsed ? 'w-20' : 'w-72'}
          /* Mobile styles */
          fixed lg:relative top-0 left-0
          ${isCollapsed && isMobile ? '-translate-x-full' : 'translate-x-0'}
          overflow-hidden flex flex-col
        `}
      >
        {/* Animated background pattern - like Login page */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Curved border effect - inspired by Login page */}
        <div className="absolute right-0 top-0 h-32 w-32 bg-white/5" 
             style={{ 
               clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
               opacity: '0.2'
             }}>
        </div>

        {/* Header Section */}
        <div className="relative z-10">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          
          <div className={`
            flex items-center p-5 border-b border-red-700 bg-red-800 backdrop-blur-sm
            ${isCollapsed ? 'justify-center' : 'justify-between'}
          `}>
            {/* Logo and Name */}
            <div className={`flex items-center ${isCollapsed ? 'flex-col' : 'space-x-4'}`}>
              <div className="relative group">
                <div className="bg-blue-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img 
                  src="/logo.jpeg" 
                  alt="Logo" 
                  className={`
                    relative rounded-xl object-cover border-2 border-white/40 shadow-2xl
                    ${isCollapsed ? 'w-12 h-12' : 'w-14 h-14'}
                  `}
                />
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
              </div>
              
              {!isCollapsed && (
                <div className="flex flex-col">
                  <h1 className="text-white font-black text-2xl drop-shadow-lg">Jawabu</h1>
                  <h2 className="text-blue-300 text-xs font-bold tracking-widest drop-shadow-md">school</h2>
                </div>
              )}
            </div>

            {/* Toggle Button - Only visible on desktop */}
            {!isMobile && (
              <button 
                onClick={toggleSidebar}
                className={`
                  bg-blue-600/50 hover:bg-blue-600 backdrop-blur-sm text-white rounded-full p-2 
                  shadow-lg border-2 border-blue-400/40 transition-all duration-300 hover:scale-110 hover:rotate-180
                  ${isCollapsed ? 'absolute -right-3 top-5' : ''}
                `}
                aria-label="Toggle sidebar"
              >
                <svg 
                  className="w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items - Scrollable */}
        <nav className="relative z-10 flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900/30">
          <ul className="space-y-2">
            {StudentSidebarData.map((val, key) => (
              <li key={key} className="relative">
                {/* Main Navigation Item */}
                <div
                  className={`
                    flex items-center w-full p-3 rounded-xl cursor-pointer transition-all duration-300 group
                    ${window.location.pathname === val.link 
                      ? 'bg-blue-600 text-white shadow-xl scale-105 border border-blue-400/50' 
                      : 'hover:bg-blue-700/50 text-blue-100 hover:text-white hover:scale-105 border border-transparent hover:border-blue-500/50'
                    }
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                    relative overflow-hidden
                  `}
                  onClick={() => {
                    if (val.subNav) {
                      handleDropdown(key);
                    } else {
                      handleNavigation(val.link);
                    }
                  }}
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  {/* Active indicator */}
                  {window.location.pathname === val.link && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-300 to-blue-500 rounded-r-full"></div>
                  )}

                  {/* Icon */}
                  <div className={`
                    flex-shrink-0 transition-all duration-300
                    ${isCollapsed ? 'text-2xl' : 'text-xl'}
                    drop-shadow-lg
                  `}>
                    {val.icon}
                  </div>

                  {/* Title */}
                  {!isCollapsed && (
                    <div className="ml-3 flex-1">
                      <span className={`
                        font-bold transition-colors duration-200 whitespace-nowrap drop-shadow-md
                      `}>
                        {val.title}
                      </span>
                    </div>
                  )}

                  {/* Dropdown Arrow */}
                  {!isCollapsed && val.subNav && (
                    <svg 
                      className={`
                        w-4 h-4 transition-all duration-300 flex-shrink-0 drop-shadow-md
                        ${openDropdown === key ? 'rotate-180' : ''}
                      `}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>

                {/* Sub Navigation */}
                {!isCollapsed && val.subNav && openDropdown === key && (
                  <ul className="ml-8 mt-2 space-y-1 animate-slideDown">
                    {val.subNav.map((subVal, subKey) => (
                      <li key={subKey}>
                        <div
                          className={`
                            flex items-center p-2.5 rounded-lg cursor-pointer transition-all duration-300 group
                            ${window.location.pathname === subVal.link 
                              ? 'bg-blue-600/80 text-white shadow-lg border border-blue-400/50' 
                              : 'hover:bg-blue-700/50 text-blue-200 hover:text-white border border-transparent hover:border-blue-500/50'
                            }
                          `}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation(subVal.link);
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          
                          <div className={`
                            text-sm transition-all duration-200 drop-shadow-md
                          `}>
                            {subVal.icon}
                          </div>
                          <span className={`
                            ml-2 text-sm font-semibold transition-all duration-200 drop-shadow-md
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

        {/* Footer */}
        <div className={`
          relative z-10 border-t border-blue-700/30 p-4 bg-blue-800/30 backdrop-blur-md
          ${isCollapsed ? 'text-center' : ''}
        `}>
          <div className={`
            text-white/80 transition-all duration-300 overflow-hidden drop-shadow-md
            ${isCollapsed ? 'text-xs' : 'text-sm'}
          `}>
            {!isCollapsed ? (
              <div className="space-y-1">
                <p className="font-bold">© {new Date().getFullYear()} jawabu</p>
                <p className="text-xs text-blue-300 font-semibold">powered by syntelsafe</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold rotate-0 whitespace-nowrap text-blue-300">
                  ©{new Date().getFullYear()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom scrollbar for navigation */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(30, 58, 138, 0.3); /* blue-900/30 */
          border-radius: 20px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #3b82f6; /* blue-500 */
          border-radius: 20px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #2563eb; /* blue-600 */
        }
      `}</style>
    </div>
  );
}

export default StudentSidebar;