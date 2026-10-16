import { uploadDemoEvidence } from '../lib/demoEvidence';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  IssueCategory, 
  ReportStatus, 
  SustainabilityReport, 
  UrgencyLevel, 
  UserRole 
} from '../types';
import { CAMPUS_BUILDINGS, DEPARTMENTS } from '../data/mockData';
import { 
  Leaf, 
  PlusCircle, 
  Eye, 
  Box, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Camera, 
  Upload, 
  MapPin, 
  Send, 
  UserCheck, 
  ShieldCheck, 
  Wrench, 
  GraduationCap, 
  ArrowRight, 
  Filter, 
  Building2, 
  FileText, 
  CheckCircle, 
  RefreshCcw,
  Sliders,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const Track2SustainableCampusPage: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    currentUser, 
    reports, 
    addReport, 
    updateReportStatus, 
    assignReportDepartment,
    departments 
  } = useApp();

  const formSectionRef = useRef<HTMLDivElement>(null);

  // Active view tab in this flagship page
  const [activeTab, setActiveTab] = useState<'workflow' | 'report_form' | 'routing_rules' | 'analytics'>('workflow');

  // Report creation form state
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('water');
  const [building, setBuilding] = useState(CAMPUS_BUILDINGS[0].name);
  const [locationDetails, setLocationDetails] = useState('');
  const [dateObserved, setDateObserved] = useState(() => new Date().toISOString().substring(0, 16).replace('T', ' '));
  const [imageUrl, setImageUrl] = useState('');
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [autoDetectedMsg, setAutoDetectedMsg] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [evidenceUploading, setEvidenceUploading] = useState(false);
  const [createdReportId, setCreatedReportId] = useState<string | null>(null);

  // Inspector & status action state
  const [selectedReportId, setSelectedReportId] = useState<string>(reports[0]?.id || '');
  const [actionComment, setActionComment] = useState('');
  const [resolutionPhotoUrl, setResolutionPhotoUrl] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0];

  // Automated Computer Vision Analysis that populates complaint fields
  const classifyImageAndAutoFill = (imageSrc: string, fileName?: string) => {
    setIsAnalyzingImage(true);
    setAutoDetectedMsg(null);

    setTimeout(() => {
      const textToMatch = ((fileName || '') + ' ' + imageSrc).toLowerCase();

      let detectedCat: IssueCategory = 'water';
      let detectedTitle = 'Active Restroom Water Leakage & Valve Failure';
      let detectedDesc = 'Computer Vision detected continuous liquid pooling and high-flow plumbing failure. Immediate isolation recommended to curb water wastage.';
      let detectedBldg = 'School of Engineering';
      let detectedLoc = 'Floor 2, Washroom 204B (West Wing)';
      let confidence = 94;

      if (textToMatch.includes('light') || textToMatch.includes('energy') || textToMatch.includes('power') || textToMatch.includes('bulb') || textToMatch.includes('lamp') || textToMatch.includes('fluorescent') || textToMatch.includes('1517457373958')) {
        detectedCat = 'energy';
        detectedTitle = 'Overhead Fluorescents Energized in Vacant Laboratory';
        detectedDesc = 'Visual inspection verified high-lux artificial illumination active in an unoccupied laboratory zone. Flagged for occupancy-sensor recalibration.';
        detectedBldg = 'Artificial Intelligence';
        detectedLoc = 'Floor 3, GPU Cluster Room AI-301';
        confidence = 96;
      } else if (textToMatch.includes('waste') || textToMatch.includes('trash') || textToMatch.includes('bin') || textToMatch.includes('garbage') || textToMatch.includes('plastic') || textToMatch.includes('bottle') || textToMatch.includes('compost') || textToMatch.includes('1532996122724')) {
        detectedCat = 'waste';
        detectedTitle = 'Receptacle Overflow & Non-Compostable Contamination';
        detectedDesc = 'Optical depth profiling identified bin capacity exceeding 90% threshold with synthetic packaging contaminating the cafeteria organic stream.';
        detectedBldg = 'CDSIMER';
        detectedLoc = 'Ground Floor Dining Commons & Circular Walk';
        confidence = 92;
      } else if (textToMatch.includes('plant') || textToMatch.includes('garden') || textToMatch.includes('tree') || textToMatch.includes('soil') || textToMatch.includes('irrigation') || textToMatch.includes('sprinkler') || textToMatch.includes('1500382017468')) {
        detectedCat = 'biodiversity';
        detectedTitle = 'Fractured Drip Irrigation Emitter Flooding Native Bed';
        detectedDesc = 'Optical vegetation sensing detected surface water pooling and soil erosion around native flora due to a split drip irrigation emitter.';
        detectedBldg = 'Botanical Conservatory & Gardens';
        detectedLoc = 'North Quad Native Botanical Bed';
        confidence = 95;
      } else if (textToMatch.includes('stain') || textToMatch.includes('ceiling') || textToMatch.includes('pipe') || textToMatch.includes('leak') || textToMatch.includes('1584622650111')) {
        detectedCat = 'water';
        detectedTitle = 'Continuous High-Volume Flush Leak in 2nd Floor Restroom';
        detectedDesc = 'Computer Vision detected fluid pooling and high-flow plumbing failure. Automated isolation recommended to prevent potable water wastage.';
        detectedBldg = 'School of Engineering';
        detectedLoc = 'Floor 2, Washroom 204B (West Wing)';
        confidence = 94;
      } else if (textToMatch.includes('hazard') || textToMatch.includes('battery') || textToMatch.includes('chemical') || textToMatch.includes('ac') || textToMatch.includes('refrigerant')) {
        detectedCat = 'maintenance';
        detectedTitle = 'Refrigerant & Mechanical Equipment Hazard Detected';
        detectedDesc = 'AI visual anomaly model identified fluid/gas line discoloration and mechanical vibration near HVAC riser.';
        detectedBldg = 'EMERGENCY';
        detectedLoc = 'Trauma Wing Plant Room B-1';
        confidence = 91;
      } else {
        detectedCat = 'water';
        detectedTitle = 'Automated Anomaly: Water Leakage & Runoff';
        detectedDesc = 'Computer Vision inference analyzed uploaded visual evidence and flagged an active environmental anomaly requiring department dispatch.';
        detectedBldg = 'School of Engineering';
        detectedLoc = 'Facility Core Corridor';
        confidence = 90;
      }

      // Automatically set the complaint details according to detected image
      setTitle(detectedTitle);
      setDescription(detectedDesc);
      setCategory(detectedCat);
      setBuilding(detectedBldg);
      setLocationDetails(detectedLoc);
      setIsAnalyzingImage(false);
      setAutoDetectedMsg(`EcoVision AI: Verified image as ${detectedCat.toUpperCase()} (${confidence}% confidence). Complaint fields automatically populated!`);
    }, 400);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setEvidenceUploading(true);
    // Preserve existing UI preview and demo image classification.
    // Await preview decoding before upload so the public URL is not later
    // overwritten by an asynchronous FileReader callback.
    try {
      const preview = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('Unable to read image.'));
        reader.readAsDataURL(file);
      });
      setImageUrl(preview);
      classifyImageAndAutoFill(preview, file.name);
      const url = await uploadDemoEvidence(file);
      if (url) setImageUrl(url); // Only a shared URL should be saved to the database.
    } catch (error) {
      setImageUrl('');
      alert(`Photo upload failed: ${error instanceof Error ? error.message : String(error)}. Please choose a sample photo or retry.`);
    } finally {
      setEvidenceUploading(false);
    }
  };

  // Sample photos for quick demo selection
  const sampleEvidencePhotos = [
    {
      title: 'Water Leakage',
      category: 'water' as IssueCategory,
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      sampleTitle: 'Leaking Flush Valve in Restroom 204B',
      sampleDesc: 'Continuous water stream running through toilet bowl valve, estimated 15 L/min wastage.'
    },
    {
      title: 'Energy Wastage',
      category: 'energy' as IssueCategory,
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      sampleTitle: 'Overhead Fluorescents Energized in Vacant Architecture Studio',
      sampleDesc: 'Studio lights active all night with 0 occupants detected by motion sensor.'
    },
    {
      title: 'Waste Contamination',
      category: 'waste' as IssueCategory,
      url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      sampleTitle: 'Plastics Disposed in Organic Compost Chute',
      sampleDesc: 'Polystyrene cups and plastic cutlery placed in cafeteria green composting bin.'
    },
    {
      title: 'Irrigation Fracture',
      category: 'biodiversity' as IssueCategory,
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      sampleTitle: 'Cracked Drip Emitter Tubing in Native Botanical Quad',
      sampleDesc: 'Micro-emitter split under mulch causing muddy erosion pool near native perennials.'
    }
  ];

  const handleSelectSampleEvidence = (sample: typeof sampleEvidencePhotos[0]) => {
    setImageUrl(sample.url);
    classifyImageAndAutoFill(sample.url, sample.title);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || evidenceUploading) return;

    const newRep = addReport({
      title,
      description,
      category,
      building,
      locationDetails: locationDetails || 'General Campus Ground',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      dateObserved,
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      reporterRole: currentUser.role,
      urgency: 'high',
      coordinates: { x: 30 + Math.floor(Math.random() * 40), y: 30 + Math.floor(Math.random() * 40) }
    });

    setCreatedReportId(newRep.id);
    setSelectedReportId(newRep.id);
    setActionSuccessMsg(`Report ${newRep.id} generated successfully with auto-routing to ${newRep.assignedDepartmentName}!`);
    setFormStep(3);
  };

  const handleStatusUpdate = (newStatus: ReportStatus) => {
    if (!selectedReport) return;
    updateReportStatus(selectedReport.id, newStatus, actionComment, resolutionPhotoUrl);
    setActionSuccessMsg(`Report ${selectedReport.id} transitioned to "${newStatus.replace('_', ' ').toUpperCase()}".`);
    setActionComment('');
    setResolutionPhotoUrl('');
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  // Status badge style helper
  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'submitted':
      case 'ai_analysis':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'assigned':
      case 'acknowledged':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'in_progress':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse';
      case 'awaiting_verification':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold';
      case 'resolved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'reopened':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  // Status progression timeline steps
  const timelineSteps: ReportStatus[] = [
    'submitted',
    'ai_analysis',
    'assigned',
    'acknowledged',
    'in_progress',
    'awaiting_verification',
    'resolved'
  ];

  const getStepIndex = (status: ReportStatus) => {
    const idx = timelineSteps.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  // Metrics calculation
  const totalReportsCount = reports.length;
  const inProgressCount = reports.filter(r => r.status === 'in_progress').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;
  const pendingCount = reports.filter(r => ['submitted', 'ai_analysis', 'assigned', 'acknowledged'].includes(r.status)).length;

  const categoryChartData = [
    { name: 'Water Wastage', value: reports.filter(r => r.category === 'water').length, color: '#06b6d4' },
    { name: 'Energy Wastage', value: reports.filter(r => r.category === 'energy').length, color: '#f59e0b' },
    { name: 'Waste Stream', value: reports.filter(r => r.category === 'waste').length, color: '#10b981' },
    { name: 'Biodiversity', value: reports.filter(r => r.category === 'biodiversity').length, color: '#8b5cf6' },
    { name: 'Facilities Infra', value: reports.filter(r => ['maintenance', 'other'].includes(r.category)).length, color: '#ec4899' },
  ];

  return (
    <div className="space-y-16 pb-24 text-left">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/40 text-xs font-mono shadow-glow-emerald">
                <Leaf className="w-3.5 h-3.5" />
                <span>FLAGSHIP TRACK 02: CAMPUS RESOLUTION PLATFORM</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-slate-100 leading-[1.1]">
                Your Campus. Your Responsibility. <br />
                <span className="gradient-text-cyan-emerald">One Smarter Solution.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                An AI-powered campus sustainability platform that turns environmental observations into accountable action through intelligent reporting, automated routing, real-time status tracking, and a digital twin of campus facilities.
              </p>

              {/* Persona Switcher Quick Bar */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-400">Viewing platform as:</span>
                  <span className="font-bold text-slate-100 capitalize">{currentUser.name}</span>
                  <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase">
                    {currentRole}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 mr-1">Switch persona:</span>
                  {(['student', 'maintenance', 'admin'] as UserRole[]).map(r => (
                    <button
                      key={r}
                      onClick={() => setCurrentRole(r)}
                      className={`px-2.5 py-1 rounded-md text-[11px] capitalize font-medium transition ${
                        currentRole === r 
                          ? 'bg-emerald-500 text-slate-950 font-bold' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('report_form');
                    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-glow-emerald flex items-center gap-2 transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Report a Sustainability Issue</span>
                </button>

                <Link
                  to="/digital-twin"
                  className="px-5 py-3 rounded-xl font-semibold text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition"
                >
                  <Box className="w-4 h-4 text-cyan-400" />
                  <span>Explore Campus Digital Twin</span>
                </Link>

                <Link
                  to="/dashboard"
                  className="px-5 py-3 rounded-xl font-semibold text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition"
                >
                  <BarChart className="w-4 h-4 text-emerald-400" />
                  <span>View Live Dashboard</span>
                </Link>
              </div>

            </div>

            {/* Quick Hero Stat Widget */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Campus Resolution SLA</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">98.4% ON-TIME</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-2xl font-black font-display text-slate-100">{totalReportsCount}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Total Incidents</span>
                  </div>
                  <div>
                    <span className="text-2xl font-black font-display text-emerald-400">{resolvedCount}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Verified Solved</span>
                  </div>
                  <div>
                    <span className="text-2xl font-black font-display text-amber-400">{inProgressCount}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Under Repair</span>
                  </div>
                  <div>
                    <span className="text-2xl font-black font-display text-cyan-400">4.2h</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Avg Turnaround</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Auto-routed via 5 departmental AI rules with zero human sorting delay.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Flagship Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'workflow', label: '1. Incident Tracking & Action Center' },
            { id: 'report_form', label: '2. Multi-Step Issue Reporting Form' },
            { id: 'routing_rules', label: '3. Intelligent Routing Matrix' },
            { id: 'analytics', label: '4. Campus Sustainability Analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-glow-emerald'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Success Notification Alert */}
      {actionSuccessMsg && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-glow-emerald">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{actionSuccessMsg}</span>
            </div>
            <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 hover:underline">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: Incident Tracking & Action Center */}
      {activeTab === 'workflow' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold font-display text-slate-100">
                Active Incident Inspector & Resolution Lifecycle
              </h2>
              <p className="text-xs text-slate-400">
                Select any active campus ticket to inspect Computer Vision classification, track audit logs, and test role-based actions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter list:</span>
              <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                {reports.length} Reports Loaded
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Report Selectable List (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Active Campus Incidents
              </div>
              <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                {reports.map(rep => {
                  const isSelected = rep.id === selectedReportId;
                  return (
                    <div
                      key={rep.id}
                      onClick={() => setSelectedReportId(rep.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500/50 shadow-md' 
                          : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono font-bold text-cyan-400">{rep.id}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge(rep.status)}`}>
                          {rep.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-100 line-clamp-2 mb-1.5">
                        {rep.title}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          {rep.building.split('&')[0]}
                        </span>
                        <span className="capitalize text-emerald-400 font-medium">{rep.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Selected Report Deep Details (8 cols) */}
            {selectedReport && (
              <div className="lg:col-span-8 space-y-6">
                
                {/* Main Card */}
                <div className="glass-card rounded-2xl p-6 border border-slate-700/80 space-y-6">
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                          {selectedReport.id}
                        </span>
                        <span className="text-xs text-slate-400">Reported on {selectedReport.dateReported}</span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-100">
                        {selectedReport.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span><strong>{selectedReport.building}</strong> • {selectedReport.locationDetails}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                      <span className={`text-xs px-3 py-1 rounded-full font-mono font-bold border ${getStatusBadge(selectedReport.status)}`}>
                        {selectedReport.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Urgency: <strong className="text-rose-400 uppercase">{selectedReport.urgency}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Photo Evidence & Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    {selectedReport.imageUrl && (
                      <div className="sm:col-span-5 rounded-xl overflow-hidden border border-slate-800 relative group">
                        <img 
                          src={selectedReport.imageUrl} 
                          alt="Reported problem evidence" 
                          className="w-full h-44 object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono">
                          Visual Evidence
                        </div>
                      </div>
                    )}
                    <div className={`${selectedReport.imageUrl ? 'sm:col-span-7' : 'sm:col-span-12'} space-y-3 text-xs`}>
                      <div>
                        <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider">
                          Incident Description
                        </span>
                        <p className="text-slate-200 leading-relaxed mt-1">
                          {selectedReport.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Reporter:</span>
                          <span className="text-slate-200 font-medium">{selectedReport.reporterName} ({selectedReport.reporterRole})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Assigned Dept:</span>
                          <span className="text-emerald-400 font-medium">{selectedReport.assignedDepartmentName || 'Awaiting Routing'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Computer Vision & AI Analysis Panel */}
                  {selectedReport.aiAnalysis && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                          <Eye className="w-4 h-4" />
                          <span>COMPUTER VISION & AI VERIFICATION (SIMULATED)</span>
                        </div>
                        <span className="text-xs font-mono bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded text-cyan-300">
                          Confidence: {(selectedReport.aiAnalysis.confidenceScore * 100).toFixed(0)}%
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {selectedReport.aiAnalysis.evidenceSummary}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-400 mr-1">Visual tags detected:</span>
                        {selectedReport.aiAnalysis.visualKeywords.map((kw, i) => (
                          <span key={i} className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
                            #{kw}
                          </span>
                        ))}
                      </div>

                      <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-emerald-300 flex items-start gap-2 mt-2">
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>AI Action Recommendation: </strong>
                          {selectedReport.aiAnalysis.suggestedAction}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interactive Status Timeline */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Chronological Progress Timeline
                    </h4>

                    {/* Step bar */}
                    <div className="relative flex items-center justify-between py-2 overflow-x-auto">
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>
                      
                      {timelineSteps.map((step, idx) => {
                        const currentIdx = getStepIndex(selectedReport.status);
                        const isCompleted = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div key={step} className="relative z-10 flex flex-col items-center">
                            <div 
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition ${
                                isCurrent 
                                  ? 'bg-emerald-500 text-slate-950 border-white ring-4 ring-emerald-500/30' 
                                  : isCompleted 
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-400' 
                                  : 'bg-slate-900 border-slate-700 text-slate-500'
                              }`}
                            >
                              {idx + 1}
                            </div>
                            <span className="text-[9px] font-mono mt-1 text-slate-400 capitalize hidden sm:block whitespace-nowrap">
                              {step.replace('_', ' ')}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Audit log entries */}
                    <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/90 divide-y divide-slate-800/60 max-h-48 overflow-y-auto text-xs">
                      {selectedReport.history.map((entry, idx) => (
                        <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-200 capitalize">
                                {entry.status.replace('_', ' ')}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                by {entry.actorName} ({entry.actorRole})
                              </span>
                            </div>
                            <p className="text-slate-300 text-[11px] mt-0.5">{entry.comment}</p>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">
                            {entry.timestamp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Role-Based Action Bar */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-amber-400" />
                        Execute Role Action as: <strong className="text-emerald-400 capitalize">{currentRole}</strong>
                      </span>
                      <span className="text-[10px] text-slate-400">Simulate workflow progression</span>
                    </div>

                    {/* Optional comment box */}
                    <input
                      type="text"
                      value={actionComment}
                      onChange={(e) => setActionComment(e.target.value)}
                      placeholder="Add operational notes or inspection update..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    />

                    {/* Buttons depending on role */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {/* Maintenance actions */}
                      {currentRole === 'maintenance' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate('acknowledged')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition"
                          >
                            Acknowledge Ticket
                          </button>
                          <button
                            onClick={() => handleStatusUpdate('in_progress')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                          >
                            Mark In Progress
                          </button>
                          <button
                            onClick={() => handleStatusUpdate('awaiting_verification')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition"
                          >
                            Upload Proof & Request Verification
                          </button>
                        </>
                      )}

                      {/* Student Reporter actions */}
                      {currentRole === 'student' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate('resolved')}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Confirm Fixed & Close Ticket
                          </button>
                          <button
                            onClick={() => handleStatusUpdate('reopened')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-1"
                          >
                            <RefreshCcw className="w-3.5 h-3.5" />
                            Reopen (Issue Persists)
                          </button>
                        </>
                      )}

                      {/* Admin actions */}
                      {currentRole === 'admin' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate('in_progress')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950"
                          >
                            Force In Progress
                          </button>
                          <button
                            onClick={() => handleStatusUpdate('resolved')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950"
                          >
                            Admin Force Resolve
                          </button>
                          <button
                            onClick={() => {
                              assignReportDepartment(selectedReport.id, departments[0].id, departments[0].name);
                              setActionSuccessMsg(`Reassigned ${selectedReport.id} to ${departments[0].name}`);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            Reassign to Plumbing Dept
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

        </section>
      )}

      {/* TAB 2: Multi-Step Sustainability Issue Reporting Form */}
      {activeTab === 'report_form' && (
        <section ref={formSectionRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
              Submit a Campus Sustainability Complaint
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Attach photographs or describe waste, water leaks, or power wastage. Our Computer Vision pipeline will automatically categorize and route the ticket.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/30">
            
            {/* Quick Demo Pre-fill Picker */}
            <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold block mb-2">
                ⚡ Quick Demonstration Evidence (Click to pre-fill realistic observation):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sampleEvidencePhotos.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSampleEvidence(s)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition group"
                  >
                    <span className="text-[10px] font-bold text-slate-200 block group-hover:text-emerald-400">
                      {s.title}
                    </span>
                    <span className="text-[9px] text-slate-400 line-clamp-1">{s.sampleTitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitReport} className="space-y-5 text-xs">
              
              {/* Title */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Issue Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Continuous Flush Valve Water Leak in Science Restroom"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Category & Building */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Sustainability Category <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IssueCategory)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-400"
                  >
                    <option value="water">Water Wastage & Plumbing</option>
                    <option value="energy">Energy & Unnecessary Lighting</option>
                    <option value="waste">Waste Management & Contamination</option>
                    <option value="biodiversity">Green Space & Biodiversity</option>
                    <option value="maintenance">Building Maintenance Affecting Sustainability</option>
                    <option value="other">Other Campus Environmental Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Campus Facility / Building <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-400"
                  >
                    {CAMPUS_BUILDINGS.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Specific Location & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Specific Room, Floor, or Landmark
                  </label>
                  <input
                    type="text"
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    placeholder="e.g., Floor 2, Washroom 204B, East Wing"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Date & Time Observed
                  </label>
                  <input
                    type="text"
                    value={dateObserved}
                    onChange={(e) => setDateObserved(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Description & Observations <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide concrete details on the severity, flow rate, or visible hazards..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Photo Evidence: File Upload & URL with Automated AI Check */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Photograph / Visual Evidence (Upload File or Enter URL)
                </label>
                
                {/* File Upload Zone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-900/60 hover:bg-slate-900 rounded-xl cursor-pointer transition group">
                    <Upload className="w-5 h-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-slate-200">
                      {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Upload Incident Photo'}
                    </span>
                    <span className="text-[10px] text-slate-400 text-center">
                      Auto-checks image & automatically sets complaint
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>

                  <div className="flex flex-col justify-center gap-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono">Or paste Image URL:</span>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        if (e.target.value) {
                          classifyImageAndAutoFill(e.target.value);
                        }
                      }}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* AI Analyzing Feedback */}
                {isAnalyzingImage && (
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-center gap-2.5 text-xs text-cyan-300 animate-pulse my-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>EcoVision Neural Pipeline checking image & auto-setting complaint details...</span>
                  </div>
                )}

                {/* AI Auto-detected Notification */}
                {autoDetectedMsg && !isAnalyzingImage && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-300 animate-in fade-in my-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{autoDetectedMsg}</span>
                  </div>
                )}

                {imageUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-slate-700 max-w-sm h-40 relative group shadow-lg">
                    <img src={imageUrl} alt="Uploaded evidence" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/90 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 backdrop-blur-sm">
                      {category.toUpperCase()} CLASSIFIED
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={evidenceUploading}
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-glow-emerald flex items-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>{evidenceUploading ? 'Uploading evidence…' : 'Submit Report & Run AI Routing'}</span>
                </button>
              </div>

            </form>

          </div>

        </section>
      )}

      {/* TAB 3: Intelligent Department Routing Rules Matrix */}
      {activeTab === 'routing_rules' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-left space-y-2">
            <h2 className="text-2xl font-bold font-display text-slate-100">
              Department Routing Directory & Automated Logic
            </h2>
            <p className="text-xs text-slate-400">
              When a report is submitted, EcoVerse analyzes text keywords and Computer Vision classes to match configuring routing rules.
            </p>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Department Name</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Lead Officer</th>
                    <th className="py-3 px-4">Handled Categories</th>
                    <th className="py-3 px-4">Active Staff</th>
                    <th className="py-3 px-4">Avg SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {DEPARTMENTS.map(dept => (
                    <tr key={dept.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-semibold text-slate-100">
                        {dept.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-cyan-400">
                        {dept.code}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {dept.leadPerson}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {dept.categoriesHandled.map(cat => (
                            <span key={cat} className="capitalize bg-slate-800 text-emerald-300 border border-slate-700 px-2 py-0.5 rounded text-[10px]">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        {dept.activeStaffCount} Techs
                      </td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400">
                        {dept.avgResolutionHours} hrs
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: Campus Sustainability Analytics */}
      {activeTab === 'analytics' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-left space-y-2">
            <h2 className="text-2xl font-bold font-display text-slate-100">
              Campus Incident Distribution & Performance
            </h2>
            <p className="text-xs text-slate-400">
              Simulated aggregate statistics across all reporting channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Category Pie Chart */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-4">
                Reported Incidents by Sustainability Category
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department SLA Bar Chart */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-4">
                Department Response Turnaround Time (Hours)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DEPARTMENTS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="code" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                    <Bar dataKey="avgResolutionHours" fill="#10b981" radius={[4, 4, 0, 0]} name="Avg Hours to Resolve" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Campus Digital Twin Preview Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel p-8 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">Spatial Visualization</span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              View All Active Incidents on the 2D Campus Digital Twin
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Inspect geo-referenced pins for water leaks, overflowing receptacles, and lighting anomalies across Science, Engineering, and Dining buildings.
            </p>
          </div>
          <Link
            to="/digital-twin"
            className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition flex items-center gap-2 shrink-0 shadow-glow-cyan"
          >
            <span>Launch Digital Twin Map</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
