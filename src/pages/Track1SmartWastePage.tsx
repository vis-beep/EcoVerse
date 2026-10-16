import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WasteBin } from '../types';
import { 
  Trash2, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Sliders, 
  TrendingUp, 
  BarChart3, 
  Truck, 
  Camera, 
  Cpu, 
  Box, 
  Sparkles,
  ArrowRight,
  Layers,
  Eye,
  Navigation
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar 
} from 'recharts';

export const Track1SmartWastePage: React.FC = () => {
  const { wasteBins, updateBinFullness, emptyBin } = useApp();
  const [selectedBinId, setSelectedBinId] = useState<string>(wasteBins[0]?.id || 'bin-101');
  const [filterType, setFilterType] = useState<string>('all');
  const [wasteMapMode, setWasteMapMode] = useState<'aerial' | 'blueprint'>('aerial');
  const [showRoute, setShowRoute] = useState<boolean>(true);
  const [showZoneLabels, setShowZoneLabels] = useState<boolean>(true);

  const selectedBin = wasteBins.find(b => b.id === selectedBinId) || wasteBins[0];

  // Simulated historical waste trend
  const historicalData = [
    { day: 'Mon', plastic: 180, organic: 290, paper: 140, metal: 60 },
    { day: 'Tue', plastic: 210, organic: 340, paper: 160, metal: 75 },
    { day: 'Wed', plastic: 240, organic: 410, paper: 190, metal: 85 },
    { day: 'Thu', plastic: 195, organic: 380, paper: 155, metal: 70 },
    { day: 'Fri', plastic: 280, organic: 460, paper: 210, metal: 95 },
    { day: 'Sat', plastic: 150, organic: 220, paper: 110, metal: 45 },
    { day: 'Sun', plastic: 120, organic: 180, paper: 85, metal: 35 },
  ];

  const filteredBins = wasteBins.filter(b => filterType === 'all' || b.type === filterType);

  const urgentBins = wasteBins.filter(b => b.fullness >= 85);

  const getFullnessColor = (fullness: number) => {
    if (fullness >= 90) return 'text-rose-400 bg-rose-500/20 border-rose-500/40';
    if (fullness >= 75) return 'text-amber-400 bg-amber-500/20 border-amber-500/40';
    return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40';
  };

  const getProgressBarColor = (fullness: number) => {
    if (fullness >= 90) return 'bg-rose-500';
    if (fullness >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 text-amber-400 border border-amber-500/30 text-xs font-mono">
                <Trash2 className="w-3.5 h-3.5" />
                <span>TRACK 01: CIRCULAR INFRASTRUCTURE</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-100">
                Smart Waste Management <br />
                <span className="text-amber-400">Digital Twin Platform</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                An intelligent campus-wide waste intelligence network. Real-time optical level monitoring, automated segregation anomaly detection, and dynamic collection route dispatch synchronized with a live 2D virtual twin.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                  ⚡ <strong>Simulated Live Telemetry:</strong> 8 Active Campus Bins
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 font-mono">
                  {urgentBins.length} Bins Require Immediate Collection
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-amber-500/30 glass-card shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" 
                  alt="AI Waste Management System" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20"></div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] uppercase font-mono text-amber-400 block font-bold">
                    Computer Vision Fill-Level Verification
                  </span>
                  <span className="text-slate-200 font-medium">
                    Depth optical sensing detects bin capacity without mechanical floats.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem & Solution Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="glass-card rounded-2xl p-6 border border-rose-500/20 text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-100 mb-2">The Problem</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Overflowing receptacles:</strong> High traffic areas like dining halls experience mid-day overflows before scheduled sweeps.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Compost contamination:</strong> Non-compostable plastics mixed into organic waste ruin entire batches for campus gardens.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Rigid collection rounds:</strong> Custodial trucks drive fixed routes regardless of whether bins are 10% or 100% full.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-100 mb-2">The EcoVerse Solution</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Computer Vision level detection:</strong> Edge cameras verify volume and identify misplaced materials.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Digital Twin campus sync:</strong> Facilities view real-time fullness heatmap overlaid on campus blueprint.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Dynamic collection dispatch:</strong> Priority routes are generated only for bins surpassing the 80% threshold.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Architecture Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>5-STAGE TELEMETRY PIPELINE</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-slate-100 mb-8">
            How The Smart Waste Digital Twin Operates
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            {[
              { step: '01', title: 'Optical Capture', icon: <Camera className="w-5 h-5 text-amber-400" />, desc: 'Bin camera captures periodic RGB frames upon lid trigger.' },
              { step: '02', title: 'Computer Vision', icon: <Cpu className="w-5 h-5 text-cyan-400" />, desc: 'Convolutional neural net analyzes surface volume and detects contamination.' },
              { step: '03', title: 'Fill-Level Estimation', icon: <Sliders className="w-5 h-5 text-emerald-400" />, desc: 'Depth triangulation outputs capacity percentage (0–100%).' },
              { step: '04', title: 'Digital Twin Sync', icon: <Box className="w-5 h-5 text-purple-400" />, desc: 'Virtual campus node updates marker color and status in real-time.' },
              { step: '05', title: 'Route Optimization', icon: <Truck className="w-5 h-5 text-pink-400" />, desc: 'AI schedules shortest route dispatch for custodial electric vehicle.' }
            ].map(stage => (
              <div key={stage.step} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-800/80">{stage.icon}</div>
                  <span className="text-xs font-mono font-bold text-slate-500">STAGE {stage.step}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{stage.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demonstration: Live Campus Waste Digital Twin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE SIMULATION LAB</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-100">
            Live Virtual Waste Dashboard & Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select any virtual bin on the campus map below. Adjust its simulated fullness slider or dispatch a collection sweep to watch the Digital Twin update dynamically.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs text-slate-400 py-1.5 font-medium">Filter Waste Stream:</span>
          {['all', 'plastic', 'organic', 'paper', 'metal', 'glass'].map(stream => (
            <button
              key={stream}
              onClick={() => setFilterType(stream)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition ${
                filterType === stream
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {stream}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2D Interactive Campus Map (8 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  CAMPUS BLUEPRINT: 2D BIN LOCATION TWIN
                </span>
                <span className="text-[11px] text-slate-400">Click any receptacle on the blueprint to inspect optical telemetry & control volume</span>
              </div>

              {/* Blueprint Mode Switcher & Layer Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setWasteMapMode('aerial')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                      wasteMapMode === 'aerial'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Campus Blueprint
                  </button>
                  <button
                    type="button"
                    onClick={() => setWasteMapMode('blueprint')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                      wasteMapMode === 'blueprint'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    CAD Blueprint
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRoute(!showRoute)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border flex items-center gap-1 transition ${
                    showRoute 
                      ? 'bg-amber-950/70 text-amber-300 border-amber-500/60' 
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                  title="Toggle dynamic EV collection route"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Route</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowZoneLabels(!showZoneLabels)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border flex items-center gap-1 transition ${
                    showZoneLabels 
                      ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/60' 
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                  title="Toggle campus building labels"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Zones</span>
                </button>
              </div>
            </div>

            {/* Virtual Campus Map Canvas */}
            <div className="relative w-full h-[520px] bg-slate-950 rounded-xl my-4 overflow-hidden border border-slate-800 shadow-2xl select-none flex items-center justify-center">
              
              {/* Campus Blueprint Backdrop */}
              {wasteMapMode === 'aerial' ? (
                <>
                  <img 
                    src="/campus_blueprint.jpg" 
                    alt="Campus Blueprint - Smart Waste Digital Twin" 
                    className="w-full h-full object-cover brightness-[0.92] contrast-[1.05]"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/30 pointer-events-none" />
                </>
              ) : (
                /* CAD Blueprint Vector */
                <div 
                  className="w-full h-full bg-[#061122]"
                  style={{
                    backgroundImage: `
                      radial-gradient(rgba(245, 158, 11, 0.25) 1px, transparent 1px),
                      linear-gradient(to right, rgba(6, 182, 212, 0.08) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(6, 182, 212, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px, 120px 120px, 120px 120px'
                  }}
                >
                  <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-500/60">
                    CAD-DWG // SMART WASTE DIGITAL TWIN // BLUEPRINT GRID
                  </div>
                </div>
              )}

              {/* Dynamic Collection Route SVG */}
              {showRoute && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  {/* Route path from Central Waste Depot (53, 17) -> bin-102 (28, 40) -> bin-101 (24, 45) -> bin-105 (67, 68) -> Depot */}
                  <path 
                    d="M 53% 17% L 28% 40% L 24% 45% L 67% 68% Z" 
                    fill="none" 
                    stroke="url(#routeGradient)" 
                    strokeWidth="2.5" 
                    strokeDasharray="6 4" 
                    className="animate-pulse"
                  />
                  {/* Vehicle icon marker */}
                  <g style={{ transform: 'translate(28%, 40%)' }}>
                    <circle cx="0" cy="0" r="14" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" />
                  </g>
                </svg>
              )}

              {/* Campus Building Zones */}
              {showZoneLabels && (
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="absolute top-[34%] left-[26%] -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/80 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 font-bold backdrop-blur-sm shadow">
                    School of Engineering
                  </div>
                  <div className="absolute top-[37%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/80 border border-amber-500/40 text-[9px] font-mono text-amber-300 font-bold backdrop-blur-sm shadow">
                    CDSIMER Central
                  </div>
                  <div className="absolute top-[34%] left-[74%] -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/80 border border-rose-500/40 text-[9px] font-mono text-rose-300 font-bold backdrop-blur-sm shadow">
                    EMERGENCY Wing
                  </div>
                  <div className="absolute top-[71%] left-[34%] -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/80 border border-purple-500/40 text-[9px] font-mono text-purple-300 font-bold backdrop-blur-sm shadow">
                    AI & Robotics
                  </div>
                  <div className="absolute top-[69%] left-[66%] -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 font-bold backdrop-blur-sm shadow">
                    Nursing Block
                  </div>
                  <div className="absolute top-[12%] left-[24%] -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 font-bold backdrop-blur-sm shadow">
                    Eco-Athletics Turf
                  </div>
                  <div className="absolute top-[11%] left-[52%] -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/80 border border-amber-500/40 text-[9px] font-mono text-amber-300 font-bold backdrop-blur-sm shadow">
                    Waste Utility Hub
                  </div>
                  <div className="absolute top-[85%] left-[80%] -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/80 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 font-bold backdrop-blur-sm shadow">
                    Solar EV Transit Lot
                  </div>
                </div>
              )}

              {/* Interactive Receptacle Markers Overlay */}
              {filteredBins.map(bin => {
                const isSelected = bin.id === selectedBinId;
                const isUrgent = bin.fullness >= 85;

                return (
                  <button
                    key={bin.id}
                    onClick={() => setSelectedBinId(bin.id)}
                    style={{ left: `${bin.coordinates.x}%`, top: `${bin.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all group z-20 flex flex-col items-center cursor-pointer`}
                  >
                    <div 
                      className={`relative p-2 rounded-full border shadow-xl transition-all ${
                        isSelected 
                          ? 'ring-4 ring-amber-400 scale-125 bg-amber-500 text-slate-950 border-white shadow-amber-500/50' 
                          : isUrgent 
                          ? 'bg-rose-950/90 border-rose-500 text-rose-300 hover:scale-125 animate-bounce' 
                          : 'bg-slate-900/90 border-slate-600 text-slate-200 hover:scale-115 hover:border-amber-400'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      {isUrgent && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                      )}
                    </div>
                    
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border mt-1 shadow-md whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-500/50 scale-105'
                        : isUrgent
                        ? 'bg-rose-950 text-rose-200 border-rose-600/80'
                        : 'bg-slate-950/90 text-slate-200 border-slate-700'
                    }`}>
                      {bin.fullness}% • {bin.type}
                    </span>
                  </button>
                );
              })}

            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 gap-2">
              <span className="font-mono text-[11px]">
                Showing {filteredBins.length} smart receptacles on Campus Blueprint
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> &lt;75% Normal</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> 75-89% Near Full</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400"></span> 90%+ Overflow Risk</span>
                {showRoute && (
                  <span className="flex items-center gap-1 text-amber-400 font-mono">
                    <span className="w-2 h-0.5 bg-amber-400 inline-block"></span> EV Dispatch Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Selected Bin Control Inspector (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-amber-500/30 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    Bin Inspector • {selectedBin.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100">{selectedBin.location}</h3>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold border ${getFullnessColor(selectedBin.fullness)}`}>
                  {selectedBin.fullness}% Capacity
                </span>
              </div>

              <div className="space-y-4 mt-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Building Zone:</span>
                  <span className="text-slate-200 font-semibold">{selectedBin.building}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block">Waste Stream:</span>
                    <span className="text-amber-300 font-semibold uppercase">{selectedBin.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Collection Priority:</span>
                    <span className={`font-semibold uppercase ${
                      selectedBin.collectionPriority === 'urgent' ? 'text-rose-400 font-bold' : 'text-slate-300'
                    }`}>
                      {selectedBin.collectionPriority}
                    </span>
                  </div>
                </div>

                {/* Simulated Fullness Slider */}
                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Simulate Volume Shift:</span>
                    <span className="font-mono text-cyan-400 font-bold">{selectedBin.fullness}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedBin.fullness}
                    onChange={(e) => updateBinFullness(selectedBin.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getProgressBarColor(selectedBin.fullness)}`}
                      style={{ width: `${selectedBin.fullness}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    Drag slider to test live virtual twin response & alarm thresholds.
                  </span>
                </div>

                {/* Empty Bin Action Button */}
                <button
                  onClick={() => emptyBin(selectedBin.id)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 shadow-glow-emerald flex items-center justify-center gap-2 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Dispatch Sweep & Reset Fullness to 0%</span>
                </button>
              </div>
            </div>

            {/* AI Automated Recommendation Card */}
            <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 text-left">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>GENAI COLLECTION RECOMMENDATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedBin.fullness >= 85 
                  ? `CRITICAL NOTICE: Bin ${selectedBin.id} at ${selectedBin.location} is above safe threshold. Automated route optimization recommends dispatching Route Unit #2 (Electric Cart) to empty within 25 minutes.`
                  : `Optimal telemetry recorded. Current volume does not justify off-cycle sweep. Predicted next emptying window: Tomorrow 08:30 AM.`
                }
              </p>
            </div>

          </div>

        </div>

        {/* Historical Waste Volume Trend Chart */}
        <div className="mt-8 glass-panel p-6 rounded-2xl border border-slate-800 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                Historical Campus Waste Volume (kg / Day)
              </h3>
              <p className="text-xs text-slate-400">Simulated 7-day trend by classified material category</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-1 rounded">
              Total Monitored: 3,745 kg
            </span>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="organic" stroke="#10b981" fillOpacity={1} fill="url(#colorOrganic)" name="Organic Waste (kg)" />
                <Area type="monotone" dataKey="plastic" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPlastic)" name="Plastic Stream (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-8 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-lg font-bold text-slate-100">Proceed to Primary Campus Workflow</h4>
            <p className="text-xs text-slate-400 mt-0.5">Explore Track 02 to test student problem reporting and multi-department resolution.</p>
          </div>
          <a
            href="/tracks/sustainable-campus"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
          >
            <span>Launch Track 02 Prototype</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
};
