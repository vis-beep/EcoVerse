import React, { useState } from 'react';
import { RECYCLING_SAMPLES } from '../data/mockData';
import { 
  Recycle, 
  Upload, 
  Camera, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Box, 
  Cpu, 
  Truck, 
  Factory, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const Track6SmartRecyclingPage: React.FC = () => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(RECYCLING_SAMPLES[0].id);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [isClassifying, setIsClassifying] = useState<boolean>(false);

  const selectedSample = RECYCLING_SAMPLES.find(s => s.id === selectedSampleId) || RECYCLING_SAMPLES[0];

  // Simulated material recycling flow metrics
  const materialDiversionData = [
    { material: 'PET Plastic', tons: 4.2, diverted: 3.8 },
    { material: 'Cardboard & Paper', tons: 8.5, diverted: 7.9 },
    { material: 'Aluminum Cans', tons: 1.8, diverted: 1.7 },
    { material: 'Glass Jars', tons: 2.1, diverted: 1.9 },
    { material: 'E-Waste Cells', tons: 0.6, diverted: 0.58 },
  ];

  const handleSelectSample = (id: string) => {
    setIsClassifying(true);
    setSelectedSampleId(id);
    setTimeout(() => {
      setIsClassifying(false);
    }, 450);
  };

  return (
    <div className="space-y-16 pb-24 text-left">
      
      {/* Hero */}
      <section className="relative pt-8 pb-12 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/50 text-pink-400 border border-pink-500/30 text-xs font-mono">
                <Recycle className="w-3.5 h-3.5" />
                <span>TRACK 06: COMPUTER VISION CLASSIFICATION & CIRCULAR FLOW</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-100">
                Smart Recycling Assistant <br />
                <span className="text-pink-400">& Optical Waste Classifier</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                Point, scan, and sort with confidence. Deep vision networks categorize plastics, fibers, composite packaging, and dangerous electronic waste, providing clear contamination prevention and upcycling guidelines.
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  Resin Identification: <strong className="text-pink-400">Resins #1 through #7</strong>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-300">
                  Hazardous Battery & Chemical Safety Protocol Active
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl p-6 border border-pink-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-mono text-pink-400 uppercase font-bold">Sorting Accuracy SLA</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">94.8% TEST ACC</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trained on diverse campus waste imagery. Flags multi-layer composites (e.g. coffee cups with plastic linings) that would otherwise ruin paper recycling vats.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-emerald-400">
                  Eliminates $850/batch municipal contamination fines.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Visual Scanning Lab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-100">
              Interactive Image Upload & Optical Classifier
            </h2>
            <p className="text-xs text-slate-400">
              Select one of the sample discarded items below to test simulated Computer Vision classification and safety warnings.
            </p>
          </div>
          <span className="text-xs font-mono text-pink-400 bg-pink-950/40 border border-pink-800/40 px-2.5 py-1 rounded">
            Realistic Simulated Inference
          </span>
        </div>

        {/* Sample Item Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {RECYCLING_SAMPLES.map(sample => {
            const isSelected = sample.id === selectedSampleId;
            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? 'border-pink-500 bg-pink-950/40 ring-2 ring-pink-500/30' 
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800'
                }`}
              >
                <div className="h-24 rounded-lg overflow-hidden mb-2 relative">
                  <img src={sample.imageUrl} alt={sample.name} className="w-full h-full object-cover" />
                  {sample.isHazardous && (
                    <span className="absolute top-1.5 right-1.5 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                      HAZARD
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{sample.name}</h4>
                <span className="text-[10px] text-slate-400 capitalize">{sample.category.split('(')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Classification Result Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Scanned Image Display */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-700 relative">
              <img 
                src={selectedSample.imageUrl} 
                alt={selectedSample.name} 
                className={`w-full h-72 object-cover transition-opacity duration-300 ${isClassifying ? 'opacity-40' : 'opacity-100'}`}
              />
              
              {/* Bounding box animation */}
              <div className="absolute inset-4 border-2 border-dashed border-pink-400 rounded-xl pointer-events-none flex items-start justify-between p-2">
                <span className="bg-slate-950/90 text-pink-300 border border-pink-500 text-[10px] font-mono px-2 py-0.5 rounded">
                  [CV SCAN: {(selectedSample.confidence * 100).toFixed(0)}% MATCH]
                </span>
                {selectedSample.isHazardous && (
                  <span className="bg-rose-950 text-rose-300 border border-rose-500 text-[10px] font-mono px-2 py-0.5 rounded font-bold animate-pulse">
                    ⚠️ FLAMMABLE / TOXIC
                  </span>
                )}
              </div>
            </div>

            {/* AI Guidance Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-pink-400 uppercase font-bold block">
                    Predicted Material Stream
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-100">
                    {selectedSample.category}
                  </h3>
                </div>
                <span className="text-xs font-mono bg-pink-950/60 border border-pink-800/60 px-3 py-1 rounded-full text-pink-300 font-bold">
                  {(selectedSample.confidence * 100).toFixed(0)}% Confidence
                </span>
              </div>

              {/* Hazardous Warning Banner (Crucial Safety Rule) */}
              {selectedSample.isHazardous ? (
                <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-300">
                    <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>HAZARDOUS ITEM DETECTED: CONSERVATIVE SAFETY DISPOSAL MANDATORY</span>
                  </div>
                  <p className="leading-relaxed">
                    <strong>Critical Protocol:</strong> Never dispose in general or recycling bins. Photo classification identifies high probability of volatile chemicals or thermal runaway hazard. Drop off at authorized campus e-waste intake (MakerSpace Room 102 EDC).
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Item verified safe for campus circular waste sorting stream.</span>
                </div>
              )}

              {/* Step-by-Step Instructions */}
              <div className="space-y-1.5 text-xs">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
                  Actionable Disposal Instructions
                </span>
                <p className="text-slate-200 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  {selectedSample.instructions}
                </p>
              </div>

              {/* Upcycle & Circular Tip */}
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-300">Circular Economy & Upcycling Tip: </strong>
                  {selectedSample.upcycleTip}
                </div>
              </div>

              {/* Material Composition */}
              <div className="text-[11px] text-slate-400 font-mono">
                Composition: <span className="text-slate-300">{selectedSample.materialComposition}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Material Flow Digital Twin: Collection to Reprocessing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            <Box className="w-3.5 h-3.5" />
            <span>CIRCULAR MATERIAL FLOW TWIN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-100">
            Lifecycle of Recycled Materials Across Campus
          </h2>
          <p className="text-xs text-slate-400">
            Track collected items through verification, segregation, shredding, and transformation into university circular assets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: 'Stage 01', title: 'Smart Bin Deposit', icon: <Recycle className="w-6 h-6 text-pink-400" />, desc: 'User scans item and deposits into color-coded campus bin.' },
            { step: 'Stage 02', title: 'Route Collection', icon: <Truck className="w-6 h-6 text-amber-400" />, desc: 'AI-routed electric cart transports segregated hoppers to Central Depot.' },
            { step: 'Stage 03', title: 'Mechanical Sorting', icon: <Factory className="w-6 h-6 text-cyan-400" />, desc: 'Optical NIR sorter verifies resin codes; contaminants pulled automatically.' },
            { step: 'Stage 04', title: 'Campus Repurposing', icon: <ShoppingBag className="w-6 h-6 text-emerald-400" />, desc: 'rPET spun into student gear; shredded cardboard pelleted for garden mulch.' }
          ].map(st => (
            <div key={st.step} className="glass-panel p-5 rounded-2xl border border-slate-800 text-left space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">{st.icon}</div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">{st.step}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">{st.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Diversion Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-200">
                Monthly Campus Material Diversion Rates (Metric Tons)
              </h3>
              <p className="text-xs text-slate-400">Total generated waste vs. certified diverted stream</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-1 rounded">
              91.4% Net Diversion
            </span>
          </div>

          <div className="h-60 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={materialDiversionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="material" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                <Bar dataKey="tons" fill="#475569" radius={[4, 4, 0, 0]} name="Total Generated (Tons)" />
                <Bar dataKey="diverted" fill="#ec4899" radius={[4, 4, 0, 0]} name="Successfully Diverted (Tons)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* Next CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-100">Explore Complete Campus Digital Twin</h4>
            <p className="text-xs text-slate-400 mt-0.5">Launch the full interactive 2D geospatial map of all buildings, bins, and active complaints.</p>
          </div>
          <a
            href="/digital-twin"
            className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
          >
            <span>Launch Campus Digital Twin</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
};
