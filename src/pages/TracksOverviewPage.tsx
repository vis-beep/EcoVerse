import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Search, 
  ArrowRight, 
  Eye, 
  Box, 
  Sparkles, 
  Filter, 
  CheckCircle2,
  Trash2,
  Leaf,
  Zap,
  Building2,
  BarChart2,
  Recycle
} from 'lucide-react';

export const TracksOverviewPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<'all' | 'vision' | 'twin' | 'genai'>('all');

  const tracks = [
    {
      id: 'smart-waste-management',
      number: '01',
      title: 'Smart Waste Management Digital Twin',
      route: '/tracks/smart-waste-management',
      color: 'border-amber-500/40 text-amber-400 bg-amber-950/20',
      tagColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      icon: <Trash2 className="w-6 h-6 text-amber-400" />,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      problem: 'Overflowing bins, high contamination in dining hall organics, and static collection routes wasting university labor.',
      solution: 'Ultrasonic and optical bin fullness detection synchronized with campus 2D map to auto-route collection staff.',
      tech: ['Computer Vision', 'Digital Twin', 'Generative AI'],
      techTypes: ['vision', 'twin', 'genai'],
      expectedBenefit: '40% reduction in custodial vehicle mileage & real-time overflow alerts.'
    },
    {
      id: 'sustainable-campus',
      number: '02',
      title: 'AI-Powered Sustainable Campus',
      subtitle: 'Primary Flagship Track',
      route: '/tracks/sustainable-campus',
      color: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/25',
      tagColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/40',
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
      problem: 'Unreported water leaks, lighting waste in vacant labs, and zero transparency between student reports and department action.',
      solution: 'End-to-end multi-role reporting platform with AI classification, automated department routing, and live status verification.',
      tech: ['Computer Vision', 'Digital Twin', 'Generative AI'],
      techTypes: ['vision', 'twin', 'genai'],
      expectedBenefit: '4.2h avg resolution time, complete accountability timeline, and verified repair evidence.',
      featured: true
    },
    {
      id: 'energy-optimization',
      number: '03',
      title: 'Sustainable Energy Monitoring & Optimization',
      route: '/tracks/energy-optimization',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20',
      tagColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
      problem: 'Peak electricity demand surcharges, unnecessary HVAC operation during low occupancy, and lack of what-if scenario forecasting.',
      solution: 'Smart meter telemetry paired with optical occupancy verification to run what-if scenario simulations for facility managers.',
      tech: ['Computer Vision', 'Digital Twin', 'Generative AI'],
      techTypes: ['vision', 'twin', 'genai'],
      expectedBenefit: '18.5% campus electricity reduction and peak demand shaving.'
    },
    {
      id: 'green-building',
      number: '04',
      title: 'Green Building Digital Twin',
      route: '/tracks/green-building',
      color: 'border-teal-500/40 text-teal-400 bg-teal-950/20',
      tagColor: 'text-teal-300 bg-teal-500/10 border-teal-500/30',
      icon: <Building2 className="w-6 h-6 text-teal-400" />,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      problem: 'Static heating and ventilation schedules that ignore room-by-room occupancy shifts across academic departments.',
      solution: 'Interactive 2D floor plan model displaying room thermal comfort, ventilation CFM, and occupancy metrics.',
      tech: ['Computer Vision', 'Digital Twin', 'Generative AI'],
      techTypes: ['vision', 'twin', 'genai'],
      expectedBenefit: 'Dynamic airflow balancing matching real-time occupants.'
    },
    {
      id: 'carbon-intelligence',
      number: '05',
      title: 'Carbon Footprint Intelligence Platform',
      route: '/tracks/carbon-intelligence',
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/20',
      tagColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
      icon: <BarChart2 className="w-6 h-6 text-purple-400" />,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      problem: 'Opaque greenhouse gas spreadsheets lacking clear emission factor transparency or scenario comparison tools.',
      solution: 'Enterprise Scope 1, 2, and 3 accounting with interactive sliders for solar adoption, electric shuttle fleets, and waste composting.',
      tech: ['Digital Twin', 'Generative AI'],
      techTypes: ['twin', 'genai'],
      expectedBenefit: 'Verifiable audit trails and automated climate action playbooks.'
    },
    {
      id: 'smart-recycling',
      number: '06',
      title: 'Smart Recycling Assistant',
      route: '/tracks/smart-recycling',
      color: 'border-pink-500/40 text-pink-400 bg-pink-950/20',
      tagColor: 'text-pink-300 bg-pink-500/10 border-pink-500/30',
      icon: <Recycle className="w-6 h-6 text-pink-400" />,
      image: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?auto=format&fit=crop&w=800&q=80',
      problem: 'High recycling stream contamination due to confusion over composite containers, resin codes, and battery disposal risks.',
      solution: 'Instant optical classification providing step-by-step cleaning instructions, upcycling ideas, and hazardous e-waste warnings.',
      tech: ['Computer Vision', 'Generative AI'],
      techTypes: ['vision', 'genai'],
      expectedBenefit: '90%+ sorting accuracy and diversion of dangerous lithium cells.'
    }
  ];

  const filteredTracks = tracks.filter(t => {
    const matchesQuery = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.solution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'all' || t.techTypes.includes(selectedTech);
    return matchesQuery && matchesTech;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>SUSTAINABILITY INITIATIVE TRACKS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-100">
          Six AI-Powered Green Technology Tracks
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Explore dedicated solutions targeting university campus waste, energy, buildings, carbon footprint, and community engagement. Each track features an interactive digital demonstration.
        </p>
      </div>

      {/* Controls & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks, problems, keywords..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Technology Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'vision', label: 'Computer Vision' },
            { id: 'twin', label: 'Digital Twins' },
            { id: 'genai', label: 'Generative AI' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedTech(pill.id as any)}
              className={`text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                selectedTech === pill.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Track Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTracks.map(track => (
          <div
            key={track.id}
            className={`glass-card rounded-2xl overflow-hidden border flex flex-col justify-between group ${
              track.featured ? 'border-emerald-500/60 shadow-glow-emerald ring-1 ring-emerald-500/30' : 'border-slate-800'
            }`}
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={track.image} 
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>
                
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-mono font-bold text-slate-200 border border-slate-700">
                    Track {track.number}
                  </span>
                  {track.featured && (
                    <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      Flagship Prototype
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 text-left">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {track.title}
                  </h3>
                  {track.subtitle && (
                    <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                      {track.subtitle}
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">The Challenge:</span>
                    <p className="text-slate-300 leading-relaxed mt-0.5">{track.problem}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">The Solution:</span>
                    <p className="text-slate-300 leading-relaxed mt-0.5">{track.solution}</p>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {track.tech.map((t, idx) => (
                    <span key={idx} className={`text-[10px] font-mono px-2 py-0.5 rounded border ${track.tagColor}`}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expected Benefit */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200">Demonstrated Benefit: </strong>
                    {track.expectedBenefit}
                  </div>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="p-6 pt-0">
              <Link
                to={track.route}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-2 transition group/btn"
              >
                <span>Launch Track Demonstration</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
