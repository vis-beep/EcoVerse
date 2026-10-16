import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdminWorkflowReportModal } from '../components/AdminWorkflowReportModal';
import { 
  FileText, 
  Printer, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Filter, 
  Search, 
  Eye, 
  X,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

export const AdminReportingPage: React.FC = () => {
  const { reports, departments, currentUser, updateReportStatus } = useApp();

  // Filters for reporting
  const [filterMode, setFilterMode] = useState<'days' | 'month'>('days');
  const [daysLimit, setDaysLimit] = useState<number>(30);
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-10');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Order for Administrator Inspection
  const [inspectOrder, setInspectOrder] = useState<any | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filter reports according to selected time limits
  const filteredReports = reports.filter(r => {
    // Search query
    const matchesSearch = 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.building.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Department filter
    if (deptFilter !== 'all' && r.assignedDepartmentName !== deptFilter && r.assignedDepartmentId !== deptFilter) {
      return false;
    }

    // Date filtering (simulated reference date: Oct 15, 2026)
    const reportDate = new Date(r.dateReported.replace(' ', 'T'));
    const refDate = new Date('2026-10-15T23:59:59');

    if (filterMode === 'days') {
      const diffMs = refDate.getTime() - reportDate.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return diffDays <= daysLimit && diffDays >= -1;
    } else {
      // Month limit (e.g. '2026-10')
      const monthStr = r.dateReported.slice(0, 7);
      return monthStr === selectedMonth;
    }
  });

  // Categorize into workflow groups
  const notAssignedList = filteredReports.filter(r => r.status === 'submitted' || r.status === 'awaiting_assignment');
  const inProgressList = filteredReports.filter(r => r.status === 'assigned' || r.status === 'in_progress');
  const workDoneList = filteredReports.filter(r => r.status === 'awaiting_verification');
  const resolvedList = filteredReports.filter(r => r.status === 'resolved');

  // Administrator Actions: ONLY ensure that work is done or not based on technician proof!
  const handleEnsureWorkDone = (orderId: string) => {
    updateReportStatus(
      orderId, 
      'resolved', 
      `Work inspected and confirmed done by ${currentUser.name} (Administrator) based on technician proof.`
    );
    showToast(`Work verified as DONE. Order ${orderId} officially approved and closed.`);
    setInspectOrder(null);
  };

  const handleEnsureWorkNotDone = (orderId: string) => {
    updateReportStatus(
      orderId, 
      'in_progress', 
      `Administrator inspected proof and marked Work NOT Done: technician must rework issue and attach clear evidence.`
    );
    showToast(`Marked as Work NOT DONE. Order ${orderId} sent back to technician queue.`);
    setInspectOrder(null);
  };

  const timeLabel = filterMode === 'days' 
    ? `Last ${daysLimit} Days (Up to Oct 15, 2026)`
    : selectedMonth === '2026-10' ? 'October 2026 (Current Month)' : selectedMonth === '2026-09' ? 'September 2026' : 'August 2026';

  return (
    <div className="space-y-6 pb-20 text-left max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <section className="border-b border-slate-800 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 text-xs font-mono font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>ADMINISTRATOR REPORTING DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-100 mt-1">
              Workflow Reporting & Audit Center
            </h1>
            <p className="text-xs text-slate-400">
              Campus-wide lifecycle telemetry, technician proof inspection, and PDF workflow generation.
            </p>
          </div>

          {/* Action: Generate PDF Output */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 text-white shadow-lg shadow-purple-500/20 flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Generate & Take PDF Output</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Ribbon */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 mt-4 flex flex-wrap items-center gap-4 text-xs">
          
          {/* Days / Month Mode */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Time Limit:
            </span>
            <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800">
              <button
                onClick={() => setFilterMode('days')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  filterMode === 'days' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Days Limit
              </button>
              <button
                onClick={() => setFilterMode('month')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  filterMode === 'month' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Month Limit
              </button>
            </div>
          </div>

          {/* Days selector */}
          {filterMode === 'days' ? (
            <select
              value={daysLimit}
              onChange={e => setDaysLimit(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value={7}>Last 7 Days</option>
              <option value={14}>Last 14 Days</option>
              <option value={30}>Last 30 Days (1 Month)</option>
              <option value={60}>Last 60 Days (2 Months)</option>
              <option value={90}>Last 90 Days (Quarter)</option>
              <option value={365}>Full Academic Year (365 Days)</option>
            </select>
          ) : (
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="2026-10">October 2026 (Current)</option>
              <option value="2026-09">September 2026</option>
              <option value="2026-08">August 2026</option>
              <option value="2026-07">July 2026</option>
            </select>
          )}

          {/* Department selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Department:</span>
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-[180px]">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search keyword or building..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <span className="font-mono text-cyan-400 font-bold ml-auto">
            {filteredReports.length} Records In Limit
          </span>
        </div>

        {/* 4-Stage Workflow Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-rose-500/30">
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">1. Not Assigned</div>
            <div className="text-2xl font-black text-rose-300 mt-0.5">{notAssignedList.length}</div>
            <div className="text-[10px] text-slate-400 mt-1">Awaiting dispatch</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">2. Assigned & In Progress</div>
            <div className="text-2xl font-black text-amber-300 mt-0.5">{inProgressList.length}</div>
            <div className="text-[10px] text-slate-400 mt-1">Under technician repair</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30">
            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">3. Work Done (Need Inspection)</div>
            <div className="text-2xl font-black text-cyan-300 mt-0.5">{workDoneList.length}</div>
            <div className="text-[10px] text-slate-400 mt-1">Proof uploaded by tech</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">4. Verified & Resolved</div>
            <div className="text-2xl font-black text-emerald-300 mt-0.5">{resolvedList.length}</div>
            <div className="text-[10px] text-slate-400 mt-1">Admin audited & approved</div>
          </div>
        </div>
      </section>

      {/* Administrator Urgent Task Queue: Inspect Proof and Ensure Work Done or Not */}
      {workDoneList.length > 0 && (
        <section className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-800/40">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-cyan-300">
                Awaiting Administrator Inspection: Ensure Work Done or Not ({workDoneList.length})
              </h2>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Technician has submitted proof. Administrator review required.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {workDoneList.map(order => (
              <div key={order.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-amber-400">{order.id}</span>
                    <h3 className="font-bold text-xs text-slate-100">{order.title}</h3>
                    <div className="text-[10px] text-slate-400">{order.building} • {order.locationDetails}</div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Proof Attached
                  </span>
                </div>

                {/* Technician Proof Photo & Statement */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-slate-400 block mb-0.5 font-semibold">Reported Problem:</span>
                    <img 
                      src={order.imageUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'} 
                      alt="Before" 
                      className="h-24 w-full object-cover rounded border border-slate-800" 
                    />
                  </div>
                  <div>
                    <span className="text-emerald-400 block mb-0.5 font-semibold">Technician Repair Proof:</span>
                    <img 
                      src={order.resolutionEvidenceUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'} 
                      alt="After" 
                      className="h-24 w-full object-cover rounded border border-emerald-500/50" 
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 bg-slate-900 p-2 rounded border border-slate-800 italic">
                  "{order.resolutionNotes || 'Physical repair completed and tested under nominal pressure.'}"
                </div>

                {/* The 2 Direct Administrator Decisions: Work Done vs Work Not Done */}
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800">
                  <button
                    onClick={() => handleEnsureWorkNotDone(order.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 transition"
                  >
                    Work Not Done (Reject)
                  </button>
                  <button
                    onClick={() => handleEnsureWorkDone(order.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-sm transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ensure Work Done (Approve)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Complete Workflow Tables Section */}
      <section className="space-y-4">
        
        {/* Table 1: Not Assigned */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>1. Not Assigned ({notAssignedList.length})</span>
            </h3>
            <span className="text-[10px] text-slate-400">Indicated by Students / Faculty</span>
          </div>

          {notAssignedList.length === 0 ? (
            <div className="py-4 text-center text-xs text-slate-500">No unassigned items in this timeframe.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
                    <th className="py-2 px-2">ID</th>
                    <th className="py-2 px-2">Date Indicated</th>
                    <th className="py-2 px-2">Title</th>
                    <th className="py-2 px-2">Building</th>
                    <th className="py-2 px-2">Reporter</th>
                    <th className="py-2 px-2">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {notAssignedList.map(r => (
                    <tr key={r.id}>
                      <td className="py-2 px-2 font-mono font-bold text-slate-200">{r.id}</td>
                      <td className="py-2 px-2 text-slate-400">{r.dateReported}</td>
                      <td className="py-2 px-2 font-semibold text-slate-100">{r.title}</td>
                      <td className="py-2 px-2 text-slate-300">{r.building}</td>
                      <td className="py-2 px-2 text-slate-400">{r.reporterName}</td>
                      <td className="py-2 px-2 font-bold text-rose-400 uppercase text-[10px]">{r.urgency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Table 2: Assigned & In Progress */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>2. Assigned & In Progress ({inProgressList.length})</span>
            </h3>
            <span className="text-[10px] text-slate-400">Field Technician Operations</span>
          </div>

          {inProgressList.length === 0 ? (
            <div className="py-4 text-center text-xs text-slate-500">No active repairs in this timeframe.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
                    <th className="py-2 px-2">ID</th>
                    <th className="py-2 px-2">Assigned Department</th>
                    <th className="py-2 px-2">Title & Location</th>
                    <th className="py-2 px-2">Status</th>
                    <th className="py-2 px-2">Priority</th>
                    <th className="py-2 px-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {inProgressList.map(r => (
                    <tr key={r.id}>
                      <td className="py-2 px-2 font-mono font-bold text-slate-200">{r.id}</td>
                      <td className="py-2 px-2 text-cyan-400 font-semibold">{r.assignedDepartmentName}</td>
                      <td className="py-2 px-2">
                        <strong className="text-slate-100">{r.title}</strong>
                        <span className="block text-[10px] text-slate-400">{r.building} • {r.locationDetails}</span>
                      </td>
                      <td className="py-2 px-2 uppercase text-[10px] font-bold text-amber-400">{r.status.replace('_', ' ')}</td>
                      <td className="py-2 px-2 font-bold uppercase text-[10px]">{r.urgency}</td>
                      <td className="py-2 px-2 text-slate-400">{r.dateReported}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Table 3: Verified & Resolved */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>4. Verified & Resolved ({resolvedList.length})</span>
            </h3>
            <span className="text-[10px] text-slate-400">Admin Approved & Signed Off</span>
          </div>

          {resolvedList.length === 0 ? (
            <div className="py-4 text-center text-xs text-slate-500">No resolved items in this timeframe.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
                    <th className="py-2 px-2">ID</th>
                    <th className="py-2 px-2">Department</th>
                    <th className="py-2 px-2">Title</th>
                    <th className="py-2 px-2">Technician Proof & Statement</th>
                    <th className="py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {resolvedList.map(r => (
                    <tr key={r.id}>
                      <td className="py-2 px-2 font-mono font-bold text-slate-200">{r.id}</td>
                      <td className="py-2 px-2 text-slate-300">{r.assignedDepartmentName}</td>
                      <td className="py-2 px-2 font-semibold text-slate-100">{r.title}</td>
                      <td className="py-2 px-2 text-slate-300 text-[11px] max-w-xs truncate">
                        {r.resolutionNotes || 'Verified by Administrator.'}
                      </td>
                      <td className="py-2 px-2 font-bold uppercase text-[10px] text-emerald-400">VERIFIED RESOLVED</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </section>

      {/* Admin PDF Workflow Report Modal */}
      <AdminWorkflowReportModal 
        isOpen={isPdfModalOpen} 
        onClose={() => setIsPdfModalOpen(false)} 
      />

    </div>
  );
};
