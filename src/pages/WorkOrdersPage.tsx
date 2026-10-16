import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReportStatus, UrgencyLevel, SustainabilityReport } from '../types';
import { CAMPUS_BUILDINGS, DEPARTMENTS } from '../data/mockData';
import { AdminWorkflowReportModal } from '../components/AdminWorkflowReportModal';
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Flame, 
  Wrench, 
  Building2, 
  MapPin, 
  Filter, 
  Search, 
  Upload, 
  Check, 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  Zap, 
  Droplets, 
  Camera, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  FileText,
  Eye,
  Sparkles
} from 'lucide-react';

const DEFAULT_STATEMENTS = [
  "Physical repair completed and tested under nominal pressure/load.",
  "Defective hardware component replaced with OEM certified part and recalibrated.",
  "Line isolated, blockage cleared, and complete sanitation protocol executed.",
  "Electrical circuit inspected, breaker reset, and thermal signature normal.",
  "Overhead fixtures inspected, ballast replaced, and occupancy sensor re-tuned.",
  "Receptacle emptied, sanitized, and automated ultrasonic fill telemetry reset."
];

const DEFAULT_PROOF_PHOTOS = [
  { label: 'Plumbing Valve Seal', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { label: 'Electrical Control Panel', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
  { label: 'Waste Station Clean', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80' }
];

export const WorkOrdersPage: React.FC = () => {
  const { 
    reports, 
    updateReportStatus, 
    assignReportDepartment, 
    currentRole, 
    currentUser, 
    departments 
  } = useApp();

  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Order for Technician Work Completion / Inspection Modal
  const [activeOrder, setActiveOrder] = useState<SustainabilityReport | null>(null);
  const [modalMode, setModalMode] = useState<'technician_complete' | 'inspect'>('technician_complete');
  const [workNotes, setWorkNotes] = useState(DEFAULT_STATEMENTS[0]);
  const [proofImage, setProofImage] = useState(DEFAULT_PROOF_PHOTOS[0].url);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleProofFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProofImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Admin PDF Workflow Report Modal state
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Field Equipment Simulation Overrides
  const [valves, setValves] = useState({
    plumbingMain: true,
    chillerPump: true,
    solarArray: true,
    exhaustFan: false
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filter reports as work orders
  const workOrders = reports.filter(r => {
    const matchesUrgency = urgencyFilter === 'all' || r.urgency === urgencyFilter;
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesDept = deptFilter === 'all' || r.assignedDepartmentName === deptFilter || r.assignedDepartmentId === deptFilter;
    const matchesBldg = buildingFilter === 'all' || r.building === buildingFilter;
    const matchesSearch = 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.locationDetails.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUrgency && matchesStatus && matchesDept && matchesBldg && matchesSearch;
  });

  // KPI Metrics
  const notAssignedCount = reports.filter(r => r.status === 'submitted' || r.status === 'awaiting_assignment').length;
  const inProgressCount = reports.filter(r => r.status === 'assigned' || r.status === 'in_progress').length;
  const awaitingVerificationCount = reports.filter(r => r.status === 'awaiting_verification').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;

  // Operational Actions
  const handleAcknowledge = (orderId: string) => {
    updateReportStatus(orderId, 'assigned', `Order acknowledged by ${currentUser.name}. Field technician queued.`);
    showToast(`Order ${orderId} acknowledged and assigned.`);
  };

  const handleStartWork = (orderId: string) => {
    updateReportStatus(orderId, 'in_progress', `Technician on-site at location. Commencing repair.`);
    showToast(`Order ${orderId} marked IN PROGRESS.`);
  };

  // Technician submits finished work with proof and statement -> AWAITING ADMIN VERIFICATION
  const handleTechnicianSubmitWork = (orderId: string) => {
    updateReportStatus(
      orderId, 
      'awaiting_verification', 
      workNotes || DEFAULT_STATEMENTS[0],
      proofImage || DEFAULT_PROOF_PHOTOS[0].url
    );
    showToast(`Work finished with proof. Order ${orderId} submitted for Admin Verification.`);
    setActiveOrder(null);
  };

  // Administrator officially verifies and approves work -> RESOLVED
  const handleAdminVerifyWork = (orderId: string) => {
    updateReportStatus(
      orderId, 
      'resolved', 
      `Work officially audited, proof inspected, and verified by ${currentUser.name} (Administrator).`
    );
    showToast(`Order ${orderId} verified and officially resolved by Admin.`);
    setActiveOrder(null);
  };

  // Administrator requests rework if proof is unsatisfactory -> IN PROGRESS
  const handleAdminRequestRework = (orderId: string) => {
    updateReportStatus(
      orderId, 
      'in_progress', 
      `Rework requested by Administrator: Please re-test repair and provide clear photographic evidence.`
    );
    showToast(`Rework requested for Order ${orderId}. Status returned to In Progress.`);
    setActiveOrder(null);
  };

  const handleReassign = (orderId: string, newDeptName: string) => {
    const deptObj = departments.find(d => d.name === newDeptName);
    if (deptObj) {
      assignReportDepartment(orderId, deptObj.id, deptObj.name);
      showToast(`Order ${orderId} reassigned to ${deptObj.name}.`);
    }
  };

  return (
    <div className="space-y-6 pb-20 text-left">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Operational Header Bar - Pure Action, Zero Essays */}
      <section className="border-b border-slate-800 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>DISPATCH & MAINTENANCE LOG</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-slate-100 mt-1">
              Order of Working
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Field technician dispatch pipeline: Indicate Issue → Execute & Upload Proof → Admin Verification.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Admin PDF Workflow Generator Option */}
            {currentRole === 'admin' && (
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 text-white shadow-md flex items-center gap-1.5 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Workflow PDF Report</span>
              </button>
            )}

            <button
              onClick={() => {
                const pending = workOrders.filter(w => w.status === 'submitted');
                pending.forEach(p => handleAcknowledge(p.id));
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Batch Acknowledge ({workOrders.filter(w => w.status === 'submitted').length})</span>
            </button>
          </div>
        </div>

        {/* Operational Lifecycle Pipeline Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-xl bg-slate-900 border border-rose-500/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400">1. Not Assigned</div>
              <div className="text-2xl font-black text-rose-300">{notAssignedCount}</div>
            </div>
            <Flame className="w-6 h-6 text-rose-400" />
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">2. In Progress</div>
              <div className="text-2xl font-black text-amber-300">{inProgressCount}</div>
            </div>
            <Wrench className="w-6 h-6 text-amber-400" />
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">3. Work Done (Audit)</div>
              <div className="text-2xl font-black text-cyan-300">{awaitingVerificationCount}</div>
            </div>
            <Clock className="w-6 h-6 text-cyan-400" />
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">4. Admin Verified</div>
              <div className="text-2xl font-black text-emerald-300">{resolvedCount}</div>
            </div>
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </section>

      {/* Field Equipment Hardware Overrides Panel */}
      <section className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Facility Equipment Direct Overrides (Physical Control Bus)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
            SCADA Link Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Override 1 */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="font-semibold text-slate-200">Main Water Isolation</div>
                <div className="text-[10px] text-slate-500">Riser 4 • AI Block</div>
              </div>
            </div>
            <button
              onClick={() => {
                setValves(v => ({ ...v, plumbingMain: !v.plumbingMain }));
                showToast(`Water valve set to ${!valves.plumbingMain ? 'OPEN' : 'ISOLATED'}`);
              }}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition ${
                valves.plumbingMain ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
            >
              {valves.plumbingMain ? 'OPEN' : 'ISOLATED'}
            </button>
          </div>

          {/* Override 2 */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-teal-400" />
              <div>
                <div className="font-semibold text-slate-200">HVAC Chiller Loop</div>
                <div className="text-[10px] text-slate-500">Pump #2 • CDSIMER</div>
              </div>
            </div>
            <button
              onClick={() => {
                setValves(v => ({ ...v, chillerPump: !v.chillerPump }));
                showToast(`Chiller pump set to ${!valves.chillerPump ? 'RUNNING' : 'STOPPED'}`);
              }}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition ${
                valves.chillerPump ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}
            >
              {valves.chillerPump ? 'RUNNING' : 'STOPPED'}
            </button>
          </div>

          {/* Override 3 */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <div>
                <div className="font-semibold text-slate-200">Solar Inverter Bank</div>
                <div className="text-[10px] text-slate-500">Rooftop AI Block</div>
              </div>
            </div>
            <button
              onClick={() => {
                setValves(v => ({ ...v, solarArray: !v.solarArray }));
                showToast(`Solar array set to ${!valves.solarArray ? 'GRID TIE' : 'ISLAND'}`);
              }}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition ${
                valves.solarArray ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {valves.solarArray ? 'GRID TIE' : 'ISLAND'}
            </button>
          </div>

          {/* Override 4 */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <div>
                <div className="font-semibold text-slate-200">Emergency Exhaust</div>
                <div className="text-[10px] text-slate-500">Emergency Block</div>
              </div>
            </div>
            <button
              onClick={() => {
                setValves(v => ({ ...v, exhaustFan: !v.exhaustFan }));
                showToast(`Emergency exhaust set to ${!valves.exhaustFan ? 'MAX BOOST' : 'AUTO'}`);
              }}
              className={`px-2.5 py-1 rounded font-bold text-[11px] transition ${
                valves.exhaustFan ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              {valves.exhaustFan ? 'BOOSTING' : 'AUTO'}
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Operational Search Controls */}
      <section className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, building, room or equipment keyword..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto text-xs">
            {/* Priority */}
            <select
              value={urgencyFilter}
              onChange={e => setUrgencyFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical / Emergency</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Workflow Stages</option>
              <option value="submitted">1. Not Assigned</option>
              <option value="assigned">2. Assigned / Queued</option>
              <option value="in_progress">2. In Progress</option>
              <option value="awaiting_verification">3. Work Done (Audit)</option>
              <option value="resolved">4. Admin Verified & Resolved</option>
            </select>

            {/* Department */}
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>

            {/* Building */}
            <select
              value={buildingFilter}
              onChange={e => setBuildingFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Buildings</option>
              {CAMPUS_BUILDINGS.map(b => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Work Orders List - Operational Table / Cards */}
      <section className="space-y-3">
        {workOrders.length === 0 ? (
          <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
            No work orders match the selected filters.
          </div>
        ) : (
          workOrders.map(order => {
            const isCritical = order.urgency === 'critical';
            const isHigh = order.urgency === 'high';

            return (
              <div 
                key={order.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCritical 
                    ? 'bg-rose-950/20 border-rose-500/50 hover:border-rose-400' 
                    : isHigh 
                    ? 'bg-amber-950/15 border-amber-500/40 hover:border-amber-400'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded">
                        {order.id}
                      </span>

                      {/* Urgency Badge */}
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        order.urgency === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        order.urgency === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {order.urgency}
                      </span>

                      {/* Lifecycle Status Badge */}
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        order.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        order.status === 'awaiting_verification' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse' :
                        order.status === 'in_progress' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {order.status === 'awaiting_verification' ? 'Work Done (Awaiting Admin Verification)' : order.status.replace('_', ' ')}
                      </span>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <strong className="text-slate-200">{order.building}</strong> • {order.locationDetails}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      {order.title}
                    </h3>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                      <span>Assigned Dept: <strong className="text-cyan-400">{order.assignedDepartmentName}</strong></span>
                      <span>Indicated by: <strong className="text-slate-300">{order.reporterName}</strong></span>
                      <span>Date: <strong className="text-slate-300">{order.dateReported}</strong></span>
                    </div>
                  </div>

                  {/* Right: Operational Action Buttons according to role */}
                  <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                    
                    {/* 1. Acknowledge Button */}
                    {order.status === 'submitted' && (
                      <button
                        onClick={() => handleAcknowledge(order.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Acknowledge Order</span>
                      </button>
                    )}

                    {/* 2. Start Work Button */}
                    {order.status === 'assigned' && (
                      <button
                        onClick={() => handleStartWork(order.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Start Work</span>
                      </button>
                    )}

                    {/* 3. Technician Finishes Work -> Submit Proof & Default Statement */}
                    {order.status === 'in_progress' && (
                      <button
                        onClick={() => {
                          setActiveOrder(order);
                          setModalMode('technician_complete');
                          setUploadedFileName(null);
                          setProofImage(DEFAULT_PROOF_PHOTOS[0].url);
                        }}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-sm"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Finish Work & Provide Proof</span>
                      </button>
                    )}

                    {/* 4. Awaiting Verification: Administrator Actions */}
                    {order.status === 'awaiting_verification' && currentRole === 'admin' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleAdminVerifyWork(order.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1 shadow-sm"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Ensure Work Done (Approve)</span>
                        </button>
                        <button
                          onClick={() => handleAdminRequestRework(order.id)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 transition"
                        >
                          Work Not Done (Reject)
                        </button>
                      </div>
                    )}

                    {/* Inspection Button for Student or Technician */}
                    {(order.status === 'awaiting_verification' || order.status === 'resolved') && (
                      <button
                        onClick={() => {
                          setActiveOrder(order);
                          setModalMode('inspect');
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Work</span>
                      </button>
                    )}

                    {/* Admin Department Reassignment */}
                    {currentRole === 'admin' && (
                      <select
                        value={order.assignedDepartmentName}
                        onChange={e => handleReassign(order.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                        title="Reassign Department"
                      >
                        {departments.map(d => (
                          <option key={d.id} value={d.name}>Reassign: {d.name}</option>
                        ))}
                      </select>
                    )}

                  </div>

                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Technician Completion & Proof Modal */}
      {activeOrder && modalMode === 'technician_complete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-amber-400">{activeOrder.id}</span>
                <h3 className="text-lg font-bold">Technician Work Completion & Proof</h3>
              </div>
              <button 
                onClick={() => setActiveOrder(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Location:</span> <strong>{activeOrder.building}</strong> • {activeOrder.locationDetails}
              </div>

              {/* Default Statements Quick Selectors */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Select Default Resolution Statement (or customize below):</span>
                </label>
                <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {DEFAULT_STATEMENTS.map((stmt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setWorkNotes(stmt)}
                      className={`text-left p-2 rounded-lg border text-[11px] transition ${
                        workNotes === stmt 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-medium' 
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      • {stmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea for Statement */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Technician Resolution Statement:
                </label>
                <textarea
                  value={workNotes}
                  onChange={e => setWorkNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 h-16"
                />
              </div>

              {/* Proof Photo Selection */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Attach Proof of Repair (Photo / Evidence):
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {DEFAULT_PROOF_PHOTOS.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setProofImage(p.url);
                        setUploadedFileName(null);
                      }}
                      className={`cursor-pointer rounded-lg overflow-hidden border p-1 text-center transition ${
                        proofImage === p.url && !uploadedFileName ? 'border-emerald-500 bg-emerald-950/40' : 'border-slate-800 bg-slate-950'
                      }`}
                    >
                      <img src={p.url} alt={p.label} className="h-14 w-full object-cover rounded mb-1" />
                      <span className="text-[10px] block truncate">{p.label}</span>
                    </div>
                  ))}
                </div>

                {/* Upload Image from Device */}
                <div className="space-y-2">
                  <input
                    id="proof-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProofFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="proof-image-upload"
                    className="cursor-pointer flex items-center justify-center gap-2 w-full p-2.5 rounded-lg border border-dashed border-cyan-500/50 bg-cyan-950/30 hover:bg-cyan-950/60 text-cyan-300 hover:text-cyan-200 transition text-xs font-semibold shadow-sm"
                  >
                    <Upload className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>
                      {uploadedFileName ? 'Change Image from Device' : 'Upload Proof Image from Device'}
                    </span>
                  </label>

                  {/* Device Upload Preview & Active Status */}
                  {uploadedFileName && proofImage.startsWith('data:') && (
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/50 flex items-center gap-3">
                      <img 
                        src={proofImage} 
                        alt="Uploaded Proof Preview" 
                        className="w-12 h-12 object-cover rounded-md border border-emerald-500/40 shrink-0" 
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          Device Image Selected
                        </span>
                        <p className="text-xs text-slate-200 font-medium truncate mt-0.5">
                          {uploadedFileName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setUploadedFileName(null);
                          setProofImage(DEFAULT_PROOF_PHOTOS[0].url);
                        }}
                        className="text-xs text-slate-400 hover:text-rose-400 px-2.5 py-1 rounded border border-slate-800 hover:border-rose-900/60 transition"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <span className="text-[11px] text-slate-400">
                Moves status to <strong>Awaiting Admin Verification</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveOrder(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleTechnicianSubmitWork(activeOrder.id)}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit for Admin Verification</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inspection Modal (For Student and Admin) */}
      {activeOrder && modalMode === 'inspect' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-cyan-400">{activeOrder.id}</span>
                <h3 className="text-lg font-bold">Work Inspection & Verification Details</h3>
              </div>
              <button 
                onClick={() => setActiveOrder(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div><span className="text-slate-400">Title:</span> <strong className="text-slate-100">{activeOrder.title}</strong></div>
                <div><span className="text-slate-400">Location:</span> {activeOrder.building} • {activeOrder.locationDetails}</div>
                <div><span className="text-slate-400">Indicated by:</span> {activeOrder.reporterName} ({activeOrder.reporterRole})</div>
              </div>

              {/* Before / After Photos */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block text-[11px]">1. Reported Problem Photo:</span>
                  <img 
                    src={activeOrder.imageUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'} 
                    alt="Problem" 
                    className="h-32 w-full object-cover rounded-lg border border-slate-800" 
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-emerald-400 font-semibold block text-[11px]">2. Technician Proof of Work:</span>
                  <img 
                    src={activeOrder.resolutionEvidenceUrl || DEFAULT_PROOF_PHOTOS[0].url} 
                    alt="Proof of Repair" 
                    className="h-32 w-full object-cover rounded-lg border border-emerald-500/40" 
                  />
                </div>
              </div>

              {/* Resolution Statement */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">
                  Technician Resolution Statement:
                </span>
                <p className="text-slate-200 text-xs italic">
                  "{activeOrder.resolutionNotes || DEFAULT_STATEMENTS[0]}"
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between">
                <span className="text-cyan-300 font-semibold">Workflow Status:</span>
                <span className="font-mono text-cyan-400 font-bold uppercase">
                  {activeOrder.status === 'awaiting_verification' ? 'Awaiting Admin Verification' : 'Verified & Resolved'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              {currentRole === 'admin' && activeOrder.status === 'awaiting_verification' ? (
                <>
                  <button
                    onClick={() => handleAdminRequestRework(activeOrder.id)}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900"
                  >
                    Work Not Done (Reject / Rework)
                  </button>
                  <button
                    onClick={() => handleAdminVerifyWork(activeOrder.id)}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Ensure Work Done (Approve)</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setActiveOrder(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Close Inspection
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin Workflow Audit Report Modal */}
      <AdminWorkflowReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

    </div>
  );
};
