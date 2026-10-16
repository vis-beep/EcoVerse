import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SustainabilityReport } from '../types';
import { 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  BarChart2, 
  Zap, 
  Recycle, 
  Building2, 
  AlertTriangle,
  PlusCircle,
  Camera,
  MapPin,
  Clock,
  Wrench,
  ShieldAlert,
  ShieldCheck,
  Droplets,
  Flame,
  ClipboardList,
  Sparkles,
  Layers,
  ChevronRight,
  FileText,
  X
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { currentRole, currentUser, reports, isDarkMode, departments, updateReportStatus } = useApp();
  const navigate = useNavigate();

  // Selected report for interactive tracking modal in student portal
  const [trackingReport, setTrackingReport] = useState<SustainabilityReport | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // If student: render way simpler student UI
  if (currentRole === 'student') {
    const studentReports = reports.filter(r => r.reporterName === currentUser.name || r.reporterRole === 'student');
    const activeStudentReports = studentReports.filter(r => r.status !== 'resolved');

    return (
      <div className="space-y-8 pb-16 text-left max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Simple Welcoming Hero */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-4 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-emerald-950/60 via-slate-900 to-cyan-950/40 border-emerald-500/30' 
            : 'bg-gradient-to-br from-emerald-50/90 via-white to-cyan-50/80 border-emerald-200/90 shadow-md'
        }`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
            isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-300'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student & Campus Reporter Portal</span>
          </div>

          <div className="space-y-2">
            <h1 className={`text-3xl sm:text-4xl font-black font-display tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Welcome back, {currentUser.name.split(' ')[0]} 👋
            </h1>
            <p className={`text-sm sm:text-base max-w-2xl ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Spot a water leak, overflowing bin, or unneeded lights on campus? Report it in seconds and track until fixed.
            </p>
          </div>

          {/* Direct Simple Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/reports?new=true"
              className="px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report an Issue Now</span>
            </Link>

            <Link
              to="/dashboard"
              className={`px-5 py-3 rounded-xl text-sm font-semibold border flex items-center gap-2 transition ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-cyan-500" />
              <span>View Campus Dashboard</span>
            </Link>
          </div>
        </div>

        {/* 1-Click Quick Issue Category Triggers */}
        <div className="space-y-3">
          <h2 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Quick Report by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/reports?new=true&category=water"
              className={`p-4 rounded-2xl border transition flex flex-col items-center text-center gap-2 group ${
                isDarkMode 
                  ? 'bg-slate-900 hover:bg-cyan-950/40 border-slate-800 hover:border-cyan-500/50' 
                  : 'bg-white hover:bg-cyan-50/70 border-slate-200/90 hover:border-cyan-400 shadow-sm hover:shadow'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Water Leak</div>
                <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Restrooms, taps, pipes</div>
              </div>
            </Link>

            <Link
              to="/reports?new=true&category=energy"
              className={`p-4 rounded-2xl border transition flex flex-col items-center text-center gap-2 group ${
                isDarkMode 
                  ? 'bg-slate-900 hover:bg-amber-950/40 border-slate-800 hover:border-amber-500/50' 
                  : 'bg-white hover:bg-amber-50/70 border-slate-200/90 hover:border-amber-400 shadow-sm hover:shadow'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center group-hover:scale-110 transition">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Power & Lights</div>
                <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Empty room lights, AC</div>
              </div>
            </Link>

            <Link
              to="/reports?new=true&category=waste"
              className={`p-4 rounded-2xl border transition flex flex-col items-center text-center gap-2 group ${
                isDarkMode 
                  ? 'bg-slate-900 hover:bg-emerald-950/40 border-slate-800 hover:border-emerald-500/50' 
                  : 'bg-white hover:bg-emerald-50/70 border-slate-200/90 hover:border-emerald-400 shadow-sm hover:shadow'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Waste Bin</div>
                <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Overflowing, sorted waste</div>
              </div>
            </Link>

            <Link
              to="/reports?new=true&category=maintenance"
              className={`p-4 rounded-2xl border transition flex flex-col items-center text-center gap-2 group ${
                isDarkMode 
                  ? 'bg-slate-900 hover:bg-teal-950/40 border-slate-800 hover:border-teal-500/50' 
                  : 'bg-white hover:bg-teal-50/70 border-slate-200/90 hover:border-teal-400 shadow-sm hover:shadow'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-500 flex items-center justify-center group-hover:scale-110 transition">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-bold text-xs ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Facility Repair</div>
                <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Broken door, bench, fan</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Simple Stats for Student */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-4 rounded-2xl border space-y-1 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className={`text-[11px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your Eco Points</span>
            <div className="text-2xl font-black text-emerald-500">340 Pts</div>
            <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Tier: Campus Eco Guardian</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className={`text-[11px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Average Fix Time</span>
            <div className="text-2xl font-black text-cyan-500">3.2 Hours</div>
            <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Fast maintenance response</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className={`text-[11px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Campus Resolution Rate</span>
            <div className="text-2xl font-black text-teal-500">98.4%</div>
            <span className={`text-[10px] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Verified by university team</span>
          </div>
        </div>

        {/* My Active Reports Status Tracker */}
        <div className={`p-5 rounded-2xl border space-y-4 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between pb-2 border-b ${
            isDarkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-500" />
              <h2 className={`text-sm font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>My Reported Issues</h2>
            </div>
            <Link to="/reports" className="text-xs text-cyan-500 hover:underline font-semibold flex items-center gap-1">
              <span>View All Reports</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeStudentReports.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400 space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="font-semibold text-slate-200">All your reported issues are resolved!</div>
              <div>Found a new leak or waste problem? Use the button above to report.</div>
            </div>
          ) : (
            <div className="space-y-3">
              {activeStudentReports.slice(0, 3).map(rep => (
                <div 
                  key={rep.id} 
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDarkMode 
                      ? 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700' 
                      : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        {rep.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        rep.status === 'in_progress'
                          ? 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30'
                          : rep.status === 'awaiting_verification'
                          ? 'bg-purple-500/15 text-purple-500 border-purple-500/30'
                          : rep.status === 'resolved'
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                      }`}>
                        {rep.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400">{rep.building} • {rep.locationDetails}</span>
                    </div>
                    <div className={`font-bold text-xs sm:text-sm ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{rep.title}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setTrackingReport(rep);
                      setActionFeedback(null);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 self-start sm:self-center ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white border border-slate-700'
                        : 'bg-slate-100 hover:bg-cyan-50 text-slate-800 hover:text-cyan-800 border border-slate-200 hover:border-cyan-300'
                    }`}
                  >
                    <span>Track Status</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Track Status Modal */}
        {trackingReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-700/80 text-slate-100' 
                : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            }`}>
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-700/60 dark:border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                      {trackingReport.id}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      trackingReport.status === 'in_progress'
                        ? 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30'
                        : trackingReport.status === 'awaiting_verification'
                        ? 'bg-purple-500/15 text-purple-500 border-purple-500/30'
                        : trackingReport.status === 'resolved'
                        ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                    }`}>
                      {trackingReport.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Urgency: {trackingReport.urgency.toUpperCase()}</span>
                  </div>
                  <h2 className={`text-lg sm:text-xl font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {trackingReport.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{trackingReport.building} • {trackingReport.locationDetails}</span>
                  </p>
                </div>

                <button
                  onClick={() => setTrackingReport(null)}
                  className={`p-2 rounded-xl transition ${
                    isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action feedback banner */}
              {actionFeedback && (
                <div className="my-3 p-3 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{actionFeedback}</span>
                </div>
              )}

              {/* Progress Lifecycle Stepper */}
              <div className="py-4">
                <h3 className={`text-xs font-bold font-mono uppercase tracking-wider mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Incident Resolution Lifecycle
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { key: 'submitted', label: '1. Submitted', done: true },
                    { key: 'ai_analysis', label: '2. AI Triage', done: true },
                    { 
                      key: 'assigned', 
                      label: '3. Dispatched', 
                      done: trackingReport.status !== 'submitted' && trackingReport.status !== 'awaiting_assignment' 
                    },
                    { 
                      key: 'in_progress', 
                      label: '4. Repairing', 
                      done: trackingReport.status === 'in_progress' || trackingReport.status === 'awaiting_verification' || trackingReport.status === 'resolved' 
                    },
                    { 
                      key: 'resolved', 
                      label: '5. Resolved', 
                      done: trackingReport.status === 'resolved' 
                    }
                  ].map((st, i) => (
                    <div 
                      key={i} 
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        st.done
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-1">
                        {st.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="text-[11px] leading-tight">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department & Technician Info Card */}
              <div className={`p-4 rounded-2xl border mb-5 space-y-2.5 ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Assigned Department:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {trackingReport.assignedDepartmentName || 'Plumbing & Water Resources'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Lead Dispatch Technician:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {trackingReport.assignedStaffName || 'Tech. Marcus Vance'}
                    </span>
                  </div>
                </div>

                {trackingReport.aiAnalysis && (
                  <div className="pt-2 border-t border-slate-700/30 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Computer Vision Confidence: <strong className="text-cyan-600 dark:text-cyan-400">{Math.round(trackingReport.aiAnalysis.confidenceScore * 100)}%</strong></span>
                    <span>Category: <strong className="text-emerald-600 dark:text-emerald-400 uppercase">{trackingReport.category}</strong></span>
                  </div>
                )}
              </div>

              {/* History Activity Timeline */}
              <div className="space-y-3 mb-6">
                <h3 className={`text-xs font-bold font-mono uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Live Activity & Dispatch Audit Log
                </h3>

                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {trackingReport.history.map((entry, idx) => (
                    <div 
                      key={entry.id || idx} 
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>{entry.actorName}</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {entry.actorRole}
                          </span>
                        </div>
                        <span className="text-slate-400 text-[10px]">{entry.timestamp}</span>
                      </div>
                      <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{entry.comment || 'Status updated.'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Actions for Student */}
              {trackingReport.status === 'awaiting_verification' && (
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-300">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Technician Completed Repair — Student Sign-off Requested</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Please confirm that the problem at {trackingReport.locationDetails} has been resolved.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        updateReportStatus(trackingReport.id, 'resolved', 'Confirmed and officially verified by student reporter.');
                        setActionFeedback('Report confirmed as RESOLVED! Thank you for keeping campus sustainable.');
                        setTrackingReport(prev => prev ? { ...prev, status: 'resolved' } : null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow transition"
                    >
                      ✅ Confirm & Close Issue
                    </button>
                    <button
                      onClick={() => {
                        updateReportStatus(trackingReport.id, 'in_progress', 'Student reporter marked repair incomplete; issue reopened for rework.');
                        setActionFeedback('Issue sent back to technician queue for rework.');
                        setTrackingReport(prev => prev ? { ...prev, status: 'in_progress' } : null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    >
                      🔄 Reopen (Problem Persists)
                    </button>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-700/60 dark:border-slate-800">
                <button
                  onClick={() => {
                    const id = trackingReport.id;
                    setTrackingReport(null);
                    navigate(`/reports?reportId=${id}`);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center gap-1.5 transition shadow"
                >
                  <span>Open Full Inspection in Reports Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setTrackingReport(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
                >
                  Close Tracking
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // If Technician or Administrator:
  // "for technician digital mapping,order of working,report details and for administrator keep it same for technician and administrator erase the explaination about individual topics dont provides statemnet provide necessary options"
  const pendingOrders = reports.filter(r => r.status === 'submitted' || r.status === 'assigned');
  const criticalOrders = reports.filter(r => r.urgency === 'critical');

  return (
    <div className="space-y-6 pb-20 text-left max-w-6xl mx-auto px-4 sm:px-6 pt-6">
      
      {/* Crisp Operational Header - No Essays */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
        isDarkMode ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono font-bold border ${
            isDarkMode ? 'bg-cyan-950/60 text-cyan-400 border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
          }`}>
            <Wrench className="w-3.5 h-3.5" />
            <span>OPERATIONAL COMMAND HUB • {currentRole.toUpperCase()}</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-black mt-1 ${
            isDarkMode ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Campus Operations Center
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Direct action dispatches, spatial digital mapping, and facility repair execution.
          </p>
        </div>

        {/* Direct Action Hub */}
        <div className="flex flex-wrap items-center gap-2">
          {currentRole === 'admin' && (
            <Link
              to="/admin-reporting"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-500 hover:bg-purple-400 text-white shadow-sm flex items-center gap-1.5 transition"
            >
              <FileText className="w-4 h-4" />
              <span>Reporting Dashboard</span>
            </Link>
          )}

          <Link
            to="/orders"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1.5 transition"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Order of Working ({pendingOrders.length})</span>
          </Link>

          <Link
            to="/digital-twin"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm flex items-center gap-1.5 transition"
          >
            <MapPin className="w-4 h-4" />
            <span>Digital Mapping</span>
          </Link>

          <Link
            to="/reports"
            className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm'
            }`}
          >
            <span>{currentRole === 'admin' ? 'Work Inspection' : 'Report Details'}</span>
          </Link>
        </div>
      </div>

      {/* Primary Operational Action Cards (Pristine white in light mode!) */}
      <div className={`grid grid-cols-1 ${currentRole === 'admin' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4`}>
        {currentRole === 'admin' && (
          <Link
            to="/admin-reporting"
            className={`p-5 rounded-2xl border transition group flex flex-col justify-between space-y-4 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 hover:border-purple-500/50' 
                : 'bg-white border-slate-200/90 hover:border-purple-400 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center group-hover:scale-105 transition">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className={`text-base font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Reporting Dashboard
              </h2>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Complete workflow breakdown (Not Assigned, In Progress, Work Done, Resolved) with date limits and PDF generation.
              </div>
            </div>
            <div className={`flex items-center justify-between text-xs font-bold text-purple-500 pt-2 border-t ${
              isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
            }`}>
              <span>Open Reporting</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        )}
        
        {/* Card 1: Digital Mapping */}
        <Link
          to="/digital-twin"
          className={`p-5 rounded-2xl border transition group flex flex-col justify-between space-y-4 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 hover:border-cyan-500/50' 
              : 'bg-white border-slate-200/90 hover:border-cyan-400 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center group-hover:scale-105 transition">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className={`text-base font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Digital Mapping
            </h2>
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Interactive 2D/3D spatial twin with aerial photogrammetry, building telemetry pins, and live incident locations.
            </div>
          </div>
          <div className={`flex items-center justify-between text-xs font-bold text-cyan-500 pt-2 border-t ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}>
            <span>Launch Spatial Mapping</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        {/* Card 2: Order of Working */}
        <Link
          to="/orders"
          className={`p-5 rounded-2xl border transition group flex flex-col justify-between space-y-4 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 hover:border-amber-500/50' 
              : 'bg-white border-slate-200/90 hover:border-amber-400 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center group-hover:scale-105 transition">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h2 className={`text-base font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Order of Working
            </h2>
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Action work order board: acknowledge tickets, dispatch crews, upload repair proof, and execute equipment overrides.
            </div>
          </div>
          <div className={`flex items-center justify-between text-xs font-bold text-amber-500 pt-2 border-t ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}>
            <span>Open Work Orders ({pendingOrders.length} Pending)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        {/* Card 3: Report Details */}
        <Link
          to="/reports"
          className={`p-5 rounded-2xl border transition group flex flex-col justify-between space-y-4 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/50' 
              : 'bg-white border-slate-200/90 hover:border-emerald-400 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center group-hover:scale-105 transition">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className={`text-base font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Report Details
            </h2>
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Comprehensive ticket audit log, department assignment records, resolution verification, and historical telemetry data.
            </div>
          </div>
          <div className={`flex items-center justify-between text-xs font-bold text-emerald-500 pt-2 border-t ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-100'
          }`}>
            <span>Inspect All Records ({reports.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

      </div>

      {/* Immediate Triage & Critical Alerts - Pure Action */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className={`flex items-center justify-between pb-3 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h2 className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}>
              Critical Dispatches & High Priority Queue
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-rose-500 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded">
            {criticalOrders.length} Urgent Incidents
          </span>
        </div>

        <div className="space-y-2">
          {reports.slice(0, 4).map(item => (
            <div key={item.id} className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                  item.urgency === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  item.urgency === 'high' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' :
                  isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                }`}>
                  {item.urgency.toUpperCase()}
                </span>
                <div>
                  <div className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{item.title}</div>
                  <div className={`text-[11px] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{item.building} • {item.assignedDepartmentName}</div>
                </div>
              </div>

              <Link
                to="/orders"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border-slate-700' 
                    : 'bg-white hover:bg-slate-100 text-cyan-600 border-slate-300 shadow-sm'
                }`}
              >
                Execute
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
