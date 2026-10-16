import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  GraduationCap, 
  Wrench, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Sparkles,
  Key
} from 'lucide-react';

interface Props {
  onSuccess?: () => void;
}

export const LoginPage: React.FC<Props> = ({ onSuccess }) => {
  const { login, isDarkMode, toggleDarkMode } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  const roleConfigs: {
    role: UserRole;
    title: string;
    personName: string;
    department: string;
    email: string;
    badge: string;
    badgeLightColor: string;
    badgeDarkColor: string;
    iconLightBox: string;
    iconDarkBox: string;
    iconLight: React.ReactNode;
    iconDark: React.ReactNode;
    buttonLightColor: string;
    buttonDarkColor: string;
    buttonLabel: string;
    features: string[];
    description: string;
  }[] = [
    {
      role: 'student',
      title: 'Student / Faculty Reporter',
      personName: 'Aria Sharma',
      department: 'Environmental Science & Engineering',
      email: 'aria.sharma@ecoverse.edu',
      badge: 'Civic Reporter',
      badgeLightColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      badgeDarkColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      iconLightBox: 'bg-emerald-50 border-emerald-100',
      iconDarkBox: 'bg-slate-800/90 border-slate-700/80',
      iconLight: <GraduationCap className="w-6 h-6 text-emerald-500" />,
      iconDark: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      buttonLightColor: 'bg-[#00c48c] hover:bg-[#00b07d] text-white shadow-md shadow-emerald-500/20',
      buttonDarkColor: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white shadow-lg shadow-emerald-600/30',
      buttonLabel: '1-Click Enter as Aria',
      description: 'Submit campus environmental incidents with Computer Vision photo evidence, monitor AI auto-routing, and verify completed repairs.',
      features: [
        'Report leaks, energy waste & overflowing bins',
        'Computer Vision automated classification',
        'Track personal complaint resolution history',
        'Direct resolution sign-off / reopen access'
      ]
    },
    {
      role: 'maintenance',
      title: 'Maintenance & Facilities Team',
      personName: 'Marcus Vance',
      department: 'Plumbing, HVAC & Facilities Ops',
      email: 'marcus.vance@ecoverse.edu',
      badge: 'Operational Crew',
      badgeLightColor: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeDarkColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      iconLightBox: 'bg-amber-50 border-amber-100',
      iconDarkBox: 'bg-slate-800/90 border-slate-700/80',
      iconLight: <Wrench className="w-6 h-6 text-amber-500" />,
      iconDark: <Wrench className="w-6 h-6 text-amber-400" />,
      buttonLightColor: 'bg-[#f59e0b] hover:bg-[#d97706] text-white shadow-md shadow-amber-500/20',
      buttonDarkColor: 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white shadow-lg shadow-amber-600/30',
      buttonLabel: '1-Click Enter as Marcus',
      description: 'Review assigned departmental work orders, update repair statuses, record operational logs, and upload verification proof.',
      features: [
        'Acknowledge & claim department tickets',
        'Live status transitions (In-Progress / Resolved)',
        'Upload before & after repair photo evidence',
        'Technician dispatch note logs & turnaround SLA'
      ]
    },
    {
      role: 'admin',
      title: 'Campus Sustainability Administrator',
      personName: 'Dr. Sophia Vance',
      department: 'Chief Sustainability Officer',
      email: 'sophia.vance@ecoverse.edu',
      badge: 'Executive Admin',
      badgeLightColor: 'bg-purple-50 text-purple-700 border-purple-200',
      badgeDarkColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      iconLightBox: 'bg-purple-50 border-purple-100',
      iconDarkBox: 'bg-slate-800/90 border-slate-700/80',
      iconLight: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      iconDark: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      buttonLightColor: 'bg-[#a855f7] hover:bg-[#9333ea] text-white shadow-md shadow-purple-600/20',
      buttonDarkColor: 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-600/30',
      buttonLabel: '1-Click Enter as Dr. Sophia',
      description: 'University-wide executive analytics, automated department routing rule governance, 2D digital twin telemetry, and SLA monitoring.',
      features: [
        'Cross-campus ESG & Scope 1-3 GHG metrics',
        'Configure AI auto-routing department rules',
        'Interactive 2D Digital Twin facility oversight',
        'Audit logs, confidence thresholds & ticket overrides'
      ]
    }
  ];

  const handleSelectRole = (cfg: typeof roleConfigs[0]) => {
    setSelectedRole(cfg.role);
  };

  const handleDirectLogin = (role: UserRole) => {
    setIsLoading(true);
    const cfg = roleConfigs.find(r => r.role === role)!;
    setLoginSuccess(`Signed in as ${cfg.title}`);
    
    setTimeout(() => {
      login(role);
      setIsLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate to role-appropriate landing page
        if (role === 'admin') {
          navigate('/admin-reporting');
        } else if (role === 'maintenance') {
          navigate('/orders');
        } else {
          navigate('/');
        }
      }
    }, 600);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white' 
        : 'bg-[#fcfdfd] text-slate-900 selection:bg-emerald-500 selection:text-white'
    }`}>
      
      {/* Ambient Glow Orbs */}
      {isDarkMode ? (
        <>
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-float-slow" />
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-float-reverse" />
          <div className="absolute top-1/3 right-12 w-[420px] h-[420px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse-soft" />
        </>
      ) : (
        <>
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-100/40 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/3 right-8 w-[450px] h-[450px] bg-purple-100/30 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      {/* Modern Grid Overlay Pattern (Dark mode subtle) */}
      {isDarkMode && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      )}

      {/* Top Header */}
      <header className={`relative z-20 w-full border-b px-6 py-4 transition-colors duration-300 ${
        isDarkMode 
          ? 'border-slate-800/80 bg-slate-900/75 backdrop-blur-xl shadow-sm' 
          : 'border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center shadow-md shadow-emerald-500/20 transition-transform hover:scale-105 duration-200">
              <Leaf className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-display font-extrabold text-xl tracking-tight ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent' 
                    : 'text-slate-900'
                }`}>
                  EcoVerse<span className="text-cyan-500">.AI</span>
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold border ${
                  isDarkMode
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}>
                  Campus SSO
                </span>
              </div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                Intelligent Sustainability Solutions & Digital Twin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl border transition-all duration-200 shadow-sm ${
                isDarkMode 
                  ? 'bg-slate-800/90 border-slate-700/80 text-slate-200 hover:text-white' 
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={() => handleDirectLogin('student')}
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-bold rounded-xl border transition-all duration-200 shadow-sm ${
                isDarkMode
                  ? 'bg-slate-800/90 border-slate-700/80 text-slate-100 hover:text-white hover:border-cyan-500'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              Quick Guest Demo
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-auto w-full">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wide border shadow-sm ${
            isDarkMode 
              ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300' 
              : 'bg-[#155e75] text-cyan-200 border-cyan-500/40'
          }`}>
            <Key className="w-3.5 h-3.5" />
            <span>ROLE-BASED ACCESS CONTROL (RBAC)</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>Sign In to </span>
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">EcoVerse AI</span>
          </h1>
          
          <p className={`text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Select your operational role below to access dedicated university sustainability workflows, digital twins, and AI triage tools.
          </p>
        </div>

        {/* Success Alert */}
        {loginSuccess && (
          <div className="max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-100 text-sm font-semibold flex items-center gap-3 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{loginSuccess} — Entering workspace...</span>
          </div>
        )}

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {roleConfigs.map((cfg) => {
            const isSelected = selectedRole === cfg.role;
            return (
              <div
                key={cfg.role}
                onClick={() => handleSelectRole(cfg)}
                className={`relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border cursor-pointer group hover:-translate-y-1.5 ${
                  isDarkMode
                    ? isSelected
                      ? 'bg-slate-900/95 border-cyan-400 ring-2 ring-cyan-400/50 shadow-2xl shadow-cyan-500/15 scale-[1.01]'
                      : 'bg-slate-900/75 border-slate-800/90 hover:bg-slate-900/90 hover:border-slate-700 hover:shadow-xl'
                    : isSelected
                      ? 'bg-white border-2 border-cyan-400 ring-2 ring-cyan-400/20 shadow-xl shadow-cyan-100/80 scale-[1.01]'
                      : 'bg-white border border-slate-200/80 hover:border-slate-300 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Header of card */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border transition-transform duration-200 group-hover:scale-105 ${
                      isDarkMode ? cfg.iconDarkBox : cfg.iconLightBox
                    }`}>
                      {isDarkMode ? cfg.iconDark : cfg.iconLight}
                    </div>
                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                      isDarkMode ? cfg.badgeDarkColor : cfg.badgeLightColor
                    }`}>
                      {cfg.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold font-display transition-colors ${
                    isDarkMode ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
                  }`}>
                    {cfg.title}
                  </h3>
                  
                  {/* Persona Identifier Line (Matches reference image) */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3">
                    <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                      {cfg.personName}
                    </span>
                    <span>•</span>
                    <span className={`truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {cfg.department}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 min-h-[44px] ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {cfg.description}
                  </p>

                  <div className={`space-y-2 pt-3 border-t mb-6 ${
                    isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
                  }`}>
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider block">
                      Role Privileges & Scope:
                    </span>
                    {cfg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={`text-xs leading-snug ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDirectLogin(cfg.role);
                  }}
                  disabled={isLoading}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
                    isDarkMode ? cfg.buttonDarkColor : cfg.buttonLightColor
                  }`}
                >
                  <span className="text-white font-bold">{cfg.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className={`relative z-10 w-full border-t py-4 px-6 text-center text-xs transition-colors duration-300 ${
        isDarkMode 
          ? 'border-slate-800/80 bg-slate-950/60 text-slate-400' 
          : 'border-slate-200/80 bg-white/95 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium">EcoVerse AI — Intelligent Campus Sustainability Platform</span>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px]">
            <span className={`px-2 py-0.5 rounded border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              ISO 14064 Compliance
            </span>
            <span>•</span>
            <span className={`px-2 py-0.5 rounded border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              PostgreSQL Ready
            </span>
            <span>•</span>
            <span className={`px-2 py-0.5 rounded border ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              Zero-Trust RBAC
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};
