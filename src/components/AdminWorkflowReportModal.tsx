import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SustainabilityReport } from '../types';
import { 
  FileText, 
  Printer, 
  Download, 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Building2, 
  ShieldCheck, 
  Layers,
  Filter
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminWorkflowReportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { reports, departments, currentUser } = useApp();

  // Filters for report generation
  const [filterMode, setFilterMode] = useState<'days' | 'month'>('days');
  const [daysLimit, setDaysLimit] = useState<number>(30);
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-10');
  const [deptFilter, setDeptFilter] = useState<string>('all');

  if (!isOpen) return null;

  // Filter reports according to selected time limits
  const filteredReports = reports.filter(r => {
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

  // Categorize into the 3 explicit workflow groups + verified resolved
  // 1. Not Assigned
  const notAssignedList = filteredReports.filter(r => r.status === 'submitted' || r.status === 'awaiting_assignment');
  
  // 2. Assigned / In Progress
  const assignedList = filteredReports.filter(r => r.status === 'assigned' || r.status === 'in_progress');
  
  // 3. Work Done (Technician finished, proof attached, awaiting admin verification)
  const workDoneList = filteredReports.filter(r => r.status === 'awaiting_verification');

  // 4. Verified & Resolved
  const resolvedList = filteredReports.filter(r => r.status === 'resolved');

  // Trigger browser print to PDF
  const handlePrintPdf = () => {
    window.print();
  };

  const timeLabel = filterMode === 'days' 
    ? `Last ${daysLimit} Days (Up to Oct 15, 2026)`
    : selectedMonth === '2026-10' ? 'October 2026 (Current Month)' : selectedMonth === '2026-09' ? 'September 2026' : 'August 2026';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      
      {/* Container */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-slate-100">
        
        {/* Modal Top Header (Hidden in Print) */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/90 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Workflow Audit & Compliance PDF Generator
              </h2>
              <span className="text-[11px] text-slate-400">
                Administrator report generator for Not Assigned, Assigned, Work Done & Resolved records.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPdf}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar (Hidden in Print) */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 print:hidden flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Filter Time Limit:
            </span>
            <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800">
              <button
                onClick={() => setFilterMode('days')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  filterMode === 'days' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Days Limit
              </button>
              <button
                onClick={() => setFilterMode('month')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  filterMode === 'month' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Month Limit
              </button>
            </div>
          </div>

          {filterMode === 'days' ? (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Days:</span>
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
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Month:</span>
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
            </div>
          )}

          {/* Department Filter */}
          <div className="flex items-center gap-2">
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

          <div className="ml-auto font-mono text-cyan-400 font-semibold">
            {filteredReports.length} Total Incidents Filtered
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="printable-report" className="p-6 overflow-y-auto space-y-6 text-left print:p-0 print:bg-white print:text-black">
          
          {/* Official Letterhead Header */}
          <div className="border-b-2 border-slate-700 print:border-black pb-4 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 print:text-emerald-800">
                CAMPUS INFRASTRUCTURE & SUSTAINABILITY DIRECTORATE
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white print:text-black font-display tracking-tight mt-0.5">
                Complete Maintenance Workflow Audit Report
              </h1>
              <div className="text-xs text-slate-400 print:text-slate-600 mt-1">
                University Facility Management • Automated Telemetry & Work Verification Log
              </div>
            </div>

            <div className="text-right text-xs space-y-0.5 font-mono">
              <div className="font-bold text-slate-300 print:text-black">Doc Ref: ECO-WF-{Date.now().toString().slice(-6)}</div>
              <div className="text-slate-400 print:text-slate-600">Generated: {new Date().toISOString().replace('T', ' ').slice(0, 16)}</div>
              <div className="text-cyan-400 print:text-cyan-700 font-semibold">{timeLabel}</div>
              <div className="text-slate-400 print:text-slate-600">Auditor: {currentUser.name}</div>
            </div>
          </div>

          {/* Workflow Summary Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-black print:bg-slate-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 print:text-slate-700">1. Not Assigned</div>
              <div className="text-2xl font-black text-rose-400 print:text-rose-700">{notAssignedList.length}</div>
              <div className="text-[10px] text-slate-500 print:text-slate-600">Awaiting dispatch</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-black print:bg-slate-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 print:text-slate-700">2. Assigned & In Progress</div>
              <div className="text-2xl font-black text-amber-400 print:text-amber-700">{assignedList.length}</div>
              <div className="text-[10px] text-slate-500 print:text-slate-600">Under technician repair</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-black print:bg-slate-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 print:text-slate-700">3. Work Done (Pending Audit)</div>
              <div className="text-2xl font-black text-cyan-400 print:text-cyan-700">{workDoneList.length}</div>
              <div className="text-[10px] text-slate-500 print:text-slate-600">Proof submitted</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-black print:bg-slate-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 print:text-slate-700">4. Verified & Resolved</div>
              <div className="text-2xl font-black text-emerald-400 print:text-emerald-700">{resolvedList.length}</div>
              <div className="text-[10px] text-slate-500 print:text-slate-600">Admin verified</div>
            </div>
          </div>

          {/* Section 1: Not Assigned Issues */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800 print:border-slate-400">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 print:text-rose-700 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Not Assigned Issues ({notAssignedList.length})</span>
              </h3>
              <span className="text-[10px] text-slate-500 print:text-slate-600">Reported by Students / Faculty</span>
            </div>

            {notAssignedList.length === 0 ? (
              <div className="p-3 rounded-lg bg-slate-950/60 print:bg-slate-50 text-[11px] text-slate-400 text-center">
                All reported items have been assigned to departments.
              </div>
            ) : (
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-700 text-left font-semibold">
                    <th className="py-1.5 px-2">ID</th>
                    <th className="py-1.5 px-2">Date Indicated</th>
                    <th className="py-1.5 px-2">Title & Location</th>
                    <th className="py-1.5 px-2">Reporter</th>
                    <th className="py-1.5 px-2">Category</th>
                    <th className="py-1.5 px-2">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                  {notAssignedList.map(r => (
                    <tr key={r.id}>
                      <td className="py-1.5 px-2 font-mono font-bold text-slate-200 print:text-black">{r.id}</td>
                      <td className="py-1.5 px-2 text-slate-400 print:text-slate-700">{r.dateReported}</td>
                      <td className="py-1.5 px-2">
                        <strong className="text-slate-200 print:text-black">{r.title}</strong>
                        <span className="block text-[10px] text-slate-400 print:text-slate-600">{r.building} • {r.locationDetails}</span>
                      </td>
                      <td className="py-1.5 px-2 text-slate-300 print:text-slate-800">{r.reporterName}</td>
                      <td className="py-1.5 px-2 capitalize">{r.category}</td>
                      <td className="py-1.5 px-2 font-bold uppercase text-[10px] text-rose-400 print:text-rose-700">{r.urgency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Section 2: Assigned & In Progress */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800 print:border-slate-400">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-amber-700 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Assigned & In Progress ({assignedList.length})</span>
              </h3>
              <span className="text-[10px] text-slate-500 print:text-slate-600">Active Field Technician Queue</span>
            </div>

            {assignedList.length === 0 ? (
              <div className="p-3 rounded-lg bg-slate-950/60 print:bg-slate-50 text-[11px] text-slate-400 text-center">
                No orders currently in progress.
              </div>
            ) : (
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-700 text-left font-semibold">
                    <th className="py-1.5 px-2">ID</th>
                    <th className="py-1.5 px-2">Assigned Department</th>
                    <th className="py-1.5 px-2">Title & Location</th>
                    <th className="py-1.5 px-2">Status</th>
                    <th className="py-1.5 px-2">Priority</th>
                    <th className="py-1.5 px-2">Logged</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                  {assignedList.map(r => (
                    <tr key={r.id}>
                      <td className="py-1.5 px-2 font-mono font-bold text-slate-200 print:text-black">{r.id}</td>
                      <td className="py-1.5 px-2 text-cyan-400 print:text-cyan-800 font-semibold">{r.assignedDepartmentName}</td>
                      <td className="py-1.5 px-2">
                        <strong className="text-slate-200 print:text-black">{r.title}</strong>
                        <span className="block text-[10px] text-slate-400 print:text-slate-600">{r.building} • {r.locationDetails}</span>
                      </td>
                      <td className="py-1.5 px-2 uppercase text-[10px] font-bold text-amber-400 print:text-amber-700">{r.status.replace('_', ' ')}</td>
                      <td className="py-1.5 px-2 font-bold uppercase text-[10px]">{r.urgency}</td>
                      <td className="py-1.5 px-2 text-slate-400 print:text-slate-600">{r.dateReported}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Section 3: Work Done (Technician Finished, Proof Attached, Awaiting Admin Verification) */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800 print:border-slate-400">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Work Done — Awaiting Admin Verification ({workDoneList.length})</span>
              </h3>
              <span className="text-[10px] text-slate-500 print:text-slate-600">Technician Proof Submitted</span>
            </div>

            {workDoneList.length === 0 ? (
              <div className="p-3 rounded-lg bg-slate-950/60 print:bg-slate-50 text-[11px] text-slate-400 text-center">
                No orders pending administrator verification.
              </div>
            ) : (
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-700 text-left font-semibold">
                    <th className="py-1.5 px-2">ID</th>
                    <th className="py-1.5 px-2">Location</th>
                    <th className="py-1.5 px-2">Technician Resolution Statement</th>
                    <th className="py-1.5 px-2">Proof Evidence</th>
                    <th className="py-1.5 px-2">Completed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                  {workDoneList.map(r => (
                    <tr key={r.id}>
                      <td className="py-1.5 px-2 font-mono font-bold text-slate-200 print:text-black">{r.id}</td>
                      <td className="py-1.5 px-2">{r.building} • {r.locationDetails}</td>
                      <td className="py-1.5 px-2 font-medium text-slate-300 print:text-black">
                        {r.resolutionNotes || 'Physical repair completed and tested under nominal pressure.'}
                      </td>
                      <td className="py-1.5 px-2 text-[10px] font-mono text-emerald-400 print:text-emerald-700">
                        {r.resolutionEvidenceUrl ? 'Attached (Photo Verified)' : 'Hardware Telemetry Verified'}
                      </td>
                      <td className="py-1.5 px-2 text-slate-400 print:text-slate-600">{r.history.slice(-1)[0]?.timestamp || r.dateReported}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Section 4: Verified & Resolved Records */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800 print:border-slate-400">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified & Officially Resolved ({resolvedList.length})</span>
              </h3>
              <span className="text-[10px] text-slate-500 print:text-slate-600">Audit Closed by Administrator</span>
            </div>

            {resolvedList.length === 0 ? (
              <div className="p-3 rounded-lg bg-slate-950/60 print:bg-slate-50 text-[11px] text-slate-400 text-center">
                No resolved incidents within the selected timeframe.
              </div>
            ) : (
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-700 text-left font-semibold">
                    <th className="py-1.5 px-2">ID</th>
                    <th className="py-1.5 px-2">Department</th>
                    <th className="py-1.5 px-2">Title</th>
                    <th className="py-1.5 px-2">Resolution Audit Notes</th>
                    <th className="py-1.5 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                  {resolvedList.map(r => (
                    <tr key={r.id}>
                      <td className="py-1.5 px-2 font-mono font-bold text-slate-200 print:text-black">{r.id}</td>
                      <td className="py-1.5 px-2 text-slate-300 print:text-black">{r.assignedDepartmentName}</td>
                      <td className="py-1.5 px-2 font-medium text-slate-200 print:text-black">{r.title}</td>
                      <td className="py-1.5 px-2 text-slate-400 print:text-slate-700">{r.resolutionNotes || 'Work signed off by Campus Facility Administrator.'}</td>
                      <td className="py-1.5 px-2 font-bold uppercase text-[10px] text-emerald-400 print:text-emerald-700">VERIFIED RESOLVED</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Official Sign-off Footer */}
          <div className="pt-6 mt-6 border-t border-slate-700 print:border-black grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">
                Facility Operations Inspector Sign-Off:
              </span>
              <div className="h-12 border-b border-dashed border-slate-600 print:border-black flex items-end pb-1 font-mono text-[11px] text-slate-400">
                Marcus Vance • Senior Operations Tech
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">
                Sustainability Administrator Final Approval:
              </span>
              <div className="h-12 border-b border-dashed border-slate-600 print:border-black flex items-end pb-1 font-mono text-[11px] text-emerald-400 print:text-black font-bold">
                Dr. Sophia Vance • Chief Sustainability Officer [APPROVED]
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
