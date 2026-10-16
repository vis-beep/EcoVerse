import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CAMPUS_BUILDINGS, BUILDING_ENERGY_METRICS } from '../data/mockData';
import { 
  Box, 
  MapPin, 
  Layers, 
  AlertTriangle, 
  Trash2, 
  Zap, 
  Sun, 
  Wind, 
  PlusCircle, 
  Eye, 
  Sliders, 
  CheckCircle2, 
  Building2, 
  Filter, 
  ArrowRight,
  Info,
  Maximize2,
  Sparkles,
  Compass,
  Activity,
  Flame,
  Droplets,
  Radio,
  ShieldAlert
} from 'lucide-react';

export const DigitalTwinPage: React.FC = () => {
  const { reports, wasteBins } = useApp();

  // Active Map Layers
  const [showIssues, setShowIssues] = useState(true);
  const [showBins, setShowBins] = useState(true);
  const [showEnergy, setShowEnergy] = useState(false);
  const [showSensors, setShowSensors] = useState(true);
  const [mapMode, setMapMode] = useState<'aerial' | 'blueprint'>('aerial');
  const [simulationMode, setSimulationMode] = useState(true);

  // Selected Building / Block
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>(CAMPUS_BUILDINGS[0].id);

  // Filter issues on twin
  const [issueFilter, setIssueFilter] = useState<string>('all');

  const selectedBuilding = CAMPUS_BUILDINGS.find(b => b.id === selectedBuildingId) || CAMPUS_BUILDINGS[0];
  const selectedEnergy = BUILDING_ENERGY_METRICS.find(e => e.id === selectedBuildingId);
  const buildingReports = reports.filter(r => r.building === selectedBuilding.name);
  const buildingBins = wasteBins.filter(b => b.building === selectedBuilding.name);

  // Filtered reports for map display
  const displayedReports = reports.filter(r => {
    if (issueFilter === 'all') return true;
    return r.category === issueFilter;
  });

  return (
    <div className="space-y-8 pb-24 text-left">
      
      {/* Header */}
      <section className="border-b border-slate-800 dark:border-slate-800 pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
                <Box className="w-3.5 h-3.5" />
                <span>SPATIAL FACILITY TWIN</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-slate-100">
                Digital Mapping
              </h1>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  7 Campus Zones Online
                </span>
                <span className="text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Telemetry Active
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs mr-2">
                <button
                  onClick={() => setMapMode('aerial')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    mapMode === 'aerial' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Aerial Photo Twin
                </button>
                <button
                  onClick={() => setMapMode('blueprint')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    mapMode === 'blueprint' ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Schematic Blueprint
                </button>
              </div>

              <Link
                to="/reports?new=true"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-glow-emerald flex items-center gap-1.5 transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Pin New Issue</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Twin Interface */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Layer Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold mr-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Telemetry Layers:
            </span>

            <button
              onClick={() => setShowIssues(!showIssues)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 ${
                showIssues 
                  ? 'bg-rose-950/70 text-rose-300 border-rose-500 shadow-sm' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Active Issues ({reports.length})</span>
            </button>

            <button
              onClick={() => setShowBins(!showBins)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 ${
                showBins 
                  ? 'bg-amber-950/70 text-amber-300 border-amber-500 shadow-sm' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Bins ({wasteBins.length})</span>
            </button>

            <button
              onClick={() => setShowEnergy(!showEnergy)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 ${
                showEnergy 
                  ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500 shadow-sm' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Energy Heatmap</span>
            </button>

            <button
              onClick={() => setShowSensors(!showSensors)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 ${
                showSensors 
                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500 shadow-sm' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
              <span>Solar Arrays & AQI</span>
            </button>
          </div>

          {/* Issue filter dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Filter Incidents:</span>
            <select
              value={issueFilter}
              onChange={(e) => setIssueFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Incident Categories</option>
              <option value="water">Water Wastage</option>
              <option value="energy">Energy & Lighting</option>
              <option value="waste">Waste & Contamination</option>
              <option value="biodiversity">Biodiversity & Gardens</option>
            </select>
          </div>

        </div>

        {/* Central Photorealistic Map Canvas & Building Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Spatial Canvas (8 cols) */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-4 sm:p-5 border border-slate-800 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  CAMPUS SPATIAL GEOMETRY & SIMULATION BLOCKS
                </span>
                <span className="text-[11px] text-slate-500 font-mono block">
                  Click any block to inspect real-time IoT telemetry and problem reports
                </span>
              </div>
              
              {/* Simulation Quick Filter / Mode */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSimulationMode(!simulationMode)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border flex items-center gap-1.5 transition ${
                    simulationMode
                      ? 'bg-rose-950/70 text-rose-300 border-rose-500/60 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  <span>Problem Simulation: {simulationMode ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Quick Simulation Jumper Bar */}
            <div className="pt-2 pb-1 flex flex-wrap items-center gap-1.5 text-[11px] overflow-x-auto">
              <span className="text-slate-400 font-mono text-[10px] shrink-0 mr-1 flex items-center gap-1">
                <Radio className="w-3 h-3 text-cyan-400" />
                SIMULATE SECTOR:
              </span>
              {[
                { id: 'bldg-sci', label: 'School of Eng.', icon: '🚰', issue: 'Flush Leak' },
                { id: 'bldg-eng', label: 'EMERGENCY', icon: '⚡', issue: 'Overnight Lights' },
                { id: 'bldg-bio', label: 'AI Block', icon: '❄️', issue: 'Refrigerant Leak' },
                { id: 'bldg-stu', label: 'Nursing', icon: '♻️', issue: 'Compost Mix' },
                { id: 'bldg-admin', label: 'CDSIMER', icon: '💧', issue: 'Ceiling Stain' }
              ].map(sec => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSelectedBuildingId(sec.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition flex items-center gap-1.5 border shrink-0 ${
                    selectedBuildingId === sec.id
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
                  }`}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.label}</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${selectedBuildingId === sec.id ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    {sec.issue}
                  </span>
                </button>
              ))}
            </div>

            {/* Photorealistic Campus Map Canvas */}
            <div className="relative w-full h-[580px] sm:h-[620px] bg-slate-950 rounded-2xl my-3 overflow-hidden border border-slate-800 shadow-2xl select-none">
              
              {/* Aerial Image Backdrop */}
              {mapMode === 'aerial' ? (
                <img 
                  src="/campus_aerial.jpg" 
                  alt="Aerial Campus Digital Twin Map" 
                  className="w-full h-full object-cover brightness-[0.92] contrast-[1.05]"
                />
              ) : (
                /* Blueprint Vector Fallback */
                <div 
                  className="w-full h-full bg-[#0a1120]"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.25) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />
              )}

              {/* Energy Heatmap Layer Overlay */}
              {showEnergy && (
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-cyan-500/20 to-rose-500/20 pointer-events-none transition-opacity duration-500 mix-blend-overlay"></div>
              )}

              {/* DYNAMIC CAMPUS BLOCKS WITH LIVE PROBLEM & REPORT SIMULATION OVERLAYS */}
              {CAMPUS_BUILDINGS.map(bldg => {
                const bldgReports = reports.filter(r => r.building === bldg.name);
                const activeReports = bldgReports.filter(r => r.status !== 'resolved');
                const isSelected = selectedBuildingId === bldg.id;
                const hasIssues = activeReports.length > 0;
                const hasUrgent = activeReports.some(r => r.urgency === 'high');
                const energy = BUILDING_ENERGY_METRICS.find(e => e.id === bldg.id);
                const primaryIssue = activeReports[0];

                return (
                  <button
                    key={bldg.id}
                    type="button"
                    onClick={() => setSelectedBuildingId(bldg.id)}
                    className={`campus-block ${isSelected ? 'selected' : ''} ${hasIssues ? 'has-issues' : ''}`}
                    style={{
                      left: `${bldg.coordinates.x}%`,
                      top: `${bldg.coordinates.y}%`,
                      background: isSelected 
                        ? (hasUrgent ? 'rgba(190, 18, 60, 0.94)' : hasIssues ? 'rgba(180, 83, 9, 0.94)' : 'rgba(8, 145, 178, 0.94)')
                        : (hasUrgent ? 'rgba(38, 10, 20, 0.88)' : hasIssues ? 'rgba(42, 22, 10, 0.88)' : 'rgba(10, 24, 46, 0.84)'),
                      borderColor: isSelected 
                        ? (hasUrgent ? '#f43f5e' : hasIssues ? '#fbbf24' : '#22d3ee')
                        : (hasUrgent ? '#e11d48' : hasIssues ? '#d97706' : '#0e7490'),
                    }}
                  >
                    {/* Block Title Row */}
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center min-w-0">
                        <span 
                          className={`block-dot shrink-0 ${hasUrgent ? 'animate-pulse' : ''}`}
                          style={{ 
                            background: hasUrgent ? '#f43f5e' : hasIssues ? '#fbbf24' : '#22d3ee' 
                          }}
                        />
                        <span className="campus-block-label text-slate-100 font-extrabold truncate">
                          {bldg.name}
                        </span>
                      </div>
                      
                      {/* Simulation Problem Pill */}
                      {simulationMode && hasIssues ? (
                        <span className="shrink-0 px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold bg-rose-500/30 text-rose-300 border border-rose-500/50 flex items-center gap-0.5 shadow-sm">
                          <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                          <span>{activeReports.length}</span>
                        </span>
                      ) : (
                        <span className="shrink-0 px-1 py-0.2 rounded text-[8px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                          OK
                        </span>
                      )}
                    </div>

                    {/* Simulation Problem Teaser & Live Power Load */}
                    {simulationMode && hasIssues && primaryIssue ? (
                      <div className="campus-block-sublabel mt-1">
                        <div className="text-[9px] font-semibold text-rose-200 truncate flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping shrink-0" />
                          <span className="truncate">
                            {primaryIssue.category === 'water' ? 'Water Leak' :
                             primaryIssue.category === 'energy' ? 'Energy Surge' :
                             primaryIssue.category === 'waste' ? 'Waste Contamination' :
                             primaryIssue.category === 'biodiversity' ? 'Irrigation Fault' :
                             'Plumbing Anomaly'}
                          </span>
                        </div>
                        <span className="text-[8.5px] text-slate-300/80 font-mono block truncate mt-0.5">
                          {energy?.currentConsumptionKw || 140} kW · Floor {bldg.floors}
                        </span>
                      </div>
                    ) : (
                      <div className="campus-block-sublabel mt-0.5 text-cyan-200/80 font-mono text-[8.5px] truncate">
                        {bldg.blockType.split('&')[0].trim()} · {energy?.currentConsumptionKw || bldg.solarKwPeak} kW
                      </div>
                    )}
                  </button>
                );
              })}

              {/* ACTIVE ISSUE PINS (If enabled) */}
              {showIssues && displayedReports.map(rep => {
                if (!rep.coordinates) return null;
                const isWater = rep.category === 'water';
                const isEnergy = rep.category === 'energy';

                return (
                  <div
                    key={rep.id}
                    style={{ left: `${rep.coordinates.x}%`, top: `${rep.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                  >
                    <div className={`p-1.5 rounded-full border-2 shadow-2xl flex items-center justify-center transition-transform hover:scale-125 ${
                      isWater ? 'bg-cyan-950 border-cyan-400 text-cyan-300 animate-pulse' :
                      isEnergy ? 'bg-amber-950 border-amber-400 text-amber-300 animate-pulse' :
                      'bg-rose-950 border-rose-400 text-rose-300 animate-bounce'
                    }`}>
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>

                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-xl bg-slate-950/95 border border-slate-700 text-[10px] text-slate-200 shadow-2xl z-30">
                      <span className="font-mono text-cyan-400 font-bold block">{rep.id}</span>
                      <span className="font-semibold block line-clamp-1">{rep.title}</span>
                      <span className="text-emerald-400 capitalize">{rep.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                );
              })}

              {/* SMART RECEPTACLES PINS (If enabled) */}
              {showBins && wasteBins.map(bin => (
                <div
                  key={bin.id}
                  style={{ left: `${bin.coordinates.x}%`, top: `${bin.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-15 group cursor-pointer"
                >
                  <div className={`px-1.5 py-0.5 rounded-md border text-[9px] font-mono font-bold flex items-center gap-1 shadow-lg ${
                    bin.fullness >= 90 ? 'bg-rose-950/90 border-rose-400 text-rose-200 animate-bounce' :
                    bin.fullness >= 75 ? 'bg-amber-950/90 border-amber-400 text-amber-200' :
                    'bg-slate-950/80 border-slate-600 text-slate-200'
                  }`}>
                    <Trash2 className="w-3 h-3 text-amber-400" />
                    <span>{bin.fullness}%</span>
                  </div>
                </div>
              ))}

              {/* SENSORS & SOLAR NODES (If enabled) */}
              {showSensors && (
                <>
                  <div className="absolute top-4 left-4 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-xl">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Campus Solar Grid: 880 kWp Total</span>
                  </div>
                  <div className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-xl">
                    <Wind className="w-3.5 h-3.5 text-teal-400" />
                    <span>Air Quality: AQI 28 (Pristine)</span>
                  </div>
                </>
              )}

            </div>

            {/* Bottom Map Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Incident Pin
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-md bg-amber-500"></span> Smart Bin
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-md bg-emerald-500"></span> Clean Energy / Sensor
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-500 dark:text-cyan-400 font-semibold">
                Central Plaza Coordinates: 12.9716° N, 77.5946° E
              </span>
            </div>
          </div>

          {/* Building Inspector Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 text-left space-y-4">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                  Campus Sector • {selectedBuilding.code}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedBuilding.name}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">{selectedBuilding.blockType}</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {selectedBuilding.description}
                </p>
              </div>

              {/* Energy sub-meter telemetry */}
              {selectedEnergy && (
                <div className="p-3.5 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-300 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Sub-Meter Power Draw:</span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{selectedEnergy.currentConsumptionKw} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Live Occupancy:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">{selectedEnergy.occupancyPercent}% capacity</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Rooftop Solar Peak:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{selectedBuilding.solarKwPeak} kWp</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Floor Space:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{selectedBuilding.areaSqFt.toLocaleString()} sq ft</span>
                  </div>
                </div>
              )}

              {/* Active reports in this building */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Active Issues in Sector:</span>
                  <span className="text-[11px] font-mono text-rose-500 font-bold">{buildingReports.length}</span>
                </span>
                
                {buildingReports.length === 0 ? (
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                    No active issues logged in this block.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {buildingReports.map(r => (
                      <div key={r.id} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 text-xs">
                        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-600 dark:text-cyan-400 mb-0.5">
                          <span>{r.id}</span>
                          <span className="text-emerald-500 capitalize">{r.status.replace('_', ' ')}</span>
                        </div>
                        <h5 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{r.title}</h5>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{r.locationDetails}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Monitored waste bins in this building */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Smart Bins in Sector:</span>
                  <span className="text-[11px] font-mono text-amber-500 font-bold">{buildingBins.length}</span>
                </span>
                
                <div className="space-y-1.5 text-xs">
                  {buildingBins.map(b => (
                    <div key={b.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 capitalize">{b.type} Stream</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{b.location}</span>
                      </div>
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        b.fullness >= 85 ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {b.fullness}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/reports?new=true&building=${encodeURIComponent(selectedBuilding.name)}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Log Issue for {selectedBuilding.name.split(' ')[0]}</span>
                </Link>
              </div>

            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
