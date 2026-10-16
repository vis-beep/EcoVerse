import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Leaf, 
  Menu, 
  X, 
  Bell, 
  Sun, 
  Moon, 
  UserCheck, 
  AlertCircle, 
  ChevronDown,
  Layers,
  BarChart3,
  MapPin,
  PlusCircle,
  HelpCircle,
  CheckCircle2,
  Trash2,
  LogIn,
  LogOut
} from 'lucide-react';
import { RoleSwitcherModal } from './RoleSwitcherModal';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    currentUser, 
    isDarkMode, 
    toggleDarkMode, 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications, 
    unreadCount,
    isAuthenticated,
    logout
  } = useApp();
  
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [tracksDropdownOpen, setTracksDropdownOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Theme-derived class helpers
  const navText   = isDarkMode ? 'text-slate-300' : 'text-slate-600';
  const navHover  = isDarkMode ? 'hover:text-white hover:bg-slate-800/50' : 'hover:text-slate-900 hover:bg-slate-100';
  const navActive = isDarkMode ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' : 'text-cyan-700 bg-cyan-50 border border-cyan-300';
  const dropBg    = isDarkMode ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xl';
  const dropItem  = isDarkMode ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50';
  const dropDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';
  const mobileBg  = isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-100';
  const notifCard = isDarkMode ? 'bg-slate-900 border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xl';
  const notifItem = isDarkMode
    ? '!bg-cyan-950/20 border-l-2 border-cyan-400'
    : '!bg-cyan-50 border-l-2 border-cyan-500';
  const rolePill  = isDarkMode
    ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
    : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Digital Twin', path: '/digital-twin' },
    { name: 'Campus Tracker', path: '/tracks/sustainable-campus' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Reports', path: '/reports' },
    { name: 'About', path: '/about' },
  ];

  const trackLinks = [
    { name: '1. Smart Waste Digital Twin', path: '/tracks/smart-waste-management', color: isDarkMode ? 'text-amber-400' : 'text-amber-600' },
    { name: '2. Sustainable Campus (Flagship)', path: '/tracks/sustainable-campus', color: isDarkMode ? 'text-emerald-400 font-semibold' : 'text-emerald-600 font-semibold' },
    { name: '3. Energy Optimization', path: '/tracks/energy-optimization', color: isDarkMode ? 'text-cyan-400' : 'text-cyan-700' },
    { name: '4. Green Building Twin', path: '/tracks/green-building', color: isDarkMode ? 'text-teal-400' : 'text-teal-600' },
    { name: '5. Carbon Intelligence', path: '/tracks/carbon-intelligence', color: isDarkMode ? 'text-purple-400' : 'text-purple-600' },
    { name: '6. Smart Recycling AI', path: '/tracks/smart-recycling', color: isDarkMode ? 'text-pink-400' : 'text-pink-600' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center shadow-glow-cyan transform group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-slate-950 fill-slate-950" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-display font-extrabold text-lg tracking-tight ${isDarkMode ? 'bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent' : 'text-slate-800'}`}>
                    EcoVerse<span className="text-cyan-500">.AI</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">
                    v2.4
                  </span>
                </div>
                <span className={`text-[10px] tracking-wide hidden sm:block font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Intelligent Sustainability Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  location.pathname === '/' ? navActive : `${navText} ${navHover}`
                }`}
              >
                Home
              </Link>

              {/* Tracks Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTracksDropdownOpen(!tracksDropdownOpen)}
                  onMouseEnter={() => setTracksDropdownOpen(true)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    location.pathname.startsWith('/tracks') ? navActive : `${navText} ${navHover}`
                  }`}
                >
                  <span>Explore Tracks</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {tracksDropdownOpen && (
                  <div 
                    onMouseLeave={() => setTracksDropdownOpen(false)}
                    className={`absolute left-0 mt-1 w-64 rounded-xl border shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 ${dropBg}`}
                  >
                    <div className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider border-b mb-1 ${isDarkMode ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-slate-100'}`}>
                      Six Sustainability Tracks
                    </div>
                    {trackLinks.map(track => (
                      <Link
                        key={track.path}
                        to={track.path}
                        onClick={() => setTracksDropdownOpen(false)}
                        className={`block px-3 py-2 text-xs rounded-lg transition ${dropItem} ${
                          location.pathname === track.path ? (isDarkMode ? 'bg-slate-800 font-semibold' : 'bg-slate-100 font-semibold') : track.color
                        }`}
                      >
                        {track.name}
                      </Link>
                    ))}
                    <div className={`mt-1 pt-1 border-t ${dropDivider}`}>
                      <Link
                        to="/tracks"
                        onClick={() => setTracksDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs text-center text-cyan-500 hover:underline"
                      >
                        View All Tracks Grid →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.slice(1).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    location.pathname === link.path ? navActive : `${navText} ${navHover}`
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              
              {/* Role Switcher Pill / Login Button */}
              {isAuthenticated ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsRoleModalOpen(true)}
                    className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${rolePill}`}
                    title="Switch demo persona (Student / Maintenance / Admin)"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="capitalize text-emerald-500 font-semibold">{currentRole}</span>
                    <span className={`text-[11px] hidden xl:inline ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>({currentUser.name.split(' ')[0]})</span>
                  </button>
                  <Link
                    to="/login"
                    onClick={() => logout()}
                    className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition hover:border-rose-500/50 hover:text-rose-400 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                    title="Sign Out to Login Portal"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline">Sign Out</span>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Notification Center */}
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className={`relative p-2 rounded-lg transition ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                  aria-label="View notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border shadow-2xl p-3 z-50 ${notifCard}`}>
                    <div className={`flex items-center justify-between pb-2 border-b ${dropDivider}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">Notifications</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded text-cyan-500 font-mono ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                          {notifications.length}
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={clearAllNotifications}
                          className="text-xs text-cyan-500 hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className={`max-h-72 overflow-y-auto divide-y my-2 ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                      {notifications.length === 0 ? (
                        <div className={`py-6 text-center text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          No notifications at this time.
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div 
                            key={n.id}
                            onClick={() => markNotificationAsRead(n.id)}
                            className={`py-2.5 px-2 rounded-lg cursor-pointer transition ${dropItem} ${!n.read ? notifItem : ''}`}
                          >
                            <div className="flex items-center justify-between text-xs font-medium">
                              <span className={!n.read ? 'text-cyan-500 font-semibold' : (isDarkMode ? 'text-slate-300' : 'text-slate-700')}>
                                {n.title}
                              </span>
                              <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{n.timestamp}</span>
                            </div>
                            <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition flex items-center gap-1 ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                id="theme-toggle-btn"
              >
                {isDarkMode
                  ? <Sun className="w-4 h-4 text-amber-400" />
                  : <Moon className="w-4 h-4 text-slate-600" />
                }
              </button>

              {/* Report Issue CTA Button */}
              <Link
                to="/reports?new=true"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-glow-emerald transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Report Issue</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b backdrop-blur-xl px-4 pt-2 pb-6 space-y-3 ${mobileBg}`}>
            <div className={`flex items-center justify-between py-2 border-b gap-2 ${dropDivider}`}>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setIsRoleModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg ${isDarkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}
                  >
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                    <span>Role: <strong className="text-emerald-500 capitalize">{currentRole}</strong></span>
                  </button>
                  <Link
                    to="/login"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Sign In to EcoVerse AI
                </Link>
              )}
            </div>

            <div className="grid gap-1 pt-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    location.pathname === link.path 
                      ? (isDarkMode ? 'text-cyan-400 bg-cyan-950/40' : 'text-cyan-700 bg-cyan-50')
                      : (isDarkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/tracks"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold text-cyan-500 transition ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                Explore All Tracks
              </Link>
              {trackLinks.map(t => (
                <Link
                  key={t.path}
                  to={t.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`pl-6 py-1.5 text-xs rounded transition ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'} ${t.color}`}
                >
                  {t.name}
                </Link>
              ))}
            </div>

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => { toggleDarkMode(); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium border transition ${isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
              <span>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};