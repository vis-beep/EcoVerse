import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Recycle, 
  Leaf, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

type TimeframeKey = '7d' | '30d' | 'all';

interface TimeframeDataset {
  label: string;
  badge: string;
  sublabel: string;
  totalIssues: number;
  inProgressIssues: number;
  resolvedIssues: number;
  openIssues: number;
  avgHours: string;
  slaCompliance: string;
  savings: {
    kwh: string;
    dollars: string;
    waste: string;
    co2: string;
  };
  trend: Array<{ day: string; reported: number; resolved: number }>;
  categories: Array<{ name: string; count: number; color: string }>;
  buildings: Array<{ name: string; fullName: string; issues: number; energyKw: number }>;
  departments: Array<{
    name: string;
    staff: number;
    open: number;
    completed: number;
    avgSla: string;
    compliance: string;
  }>;
}

const TIMEFRAME_DATA: Record<TimeframeKey, TimeframeDataset> = {
  '7d': {
    label: '7 Days',
    badge: 'Oct 9 – Oct 15, 2026 (Rolling 7-Day Window)',
    sublabel: '7-day daily ticket intake vs. verified maintenance resolution',
    totalIssues: 18,
    inProgressIssues: 4,
    resolvedIssues: 12,
    openIssues: 2,
    avgHours: '3.2 hrs',
    slaCompliance: '99.4%',
    savings: {
      kwh: '9,450 kWh',
      dollars: '~$1,323',
      waste: '3.6 Tons',
      co2: '6.5 MT'
    },
    trend: [
      { day: 'Mon', reported: 4, resolved: 3 },
      { day: 'Tue', reported: 6, resolved: 5 },
      { day: 'Wed', reported: 8, resolved: 7 },
      { day: 'Thu', reported: 5, resolved: 6 },
      { day: 'Fri', reported: 10, resolved: 8 },
      { day: 'Sat', reported: 3, resolved: 3 },
      { day: 'Sun', reported: 2, resolved: 2 },
    ],
    categories: [
      { name: 'Water Wastage', count: 6, color: '#06b6d4' },
      { name: 'Energy Inefficiencies', count: 4, color: '#f59e0b' },
      { name: 'Waste Stream', count: 4, color: '#10b981' },
      { name: 'Biodiversity & Flora', count: 2, color: '#8b5cf6' },
      { name: 'Facility Infrastructure', count: 2, color: '#ec4899' },
    ],
    buildings: [
      { name: 'CDSIMER', fullName: 'CDSIMER', issues: 2, energyKw: 215 },
      { name: 'School of Eng', fullName: 'School of Engineering', issues: 4, energyKw: 342 },
      { name: 'AI Block', fullName: 'Artificial Intelligence', issues: 3, energyKw: 295 },
      { name: 'Nursing', fullName: 'Nursing', issues: 3, energyKw: 260 },
      { name: 'EMERGENCY', fullName: 'EMERGENCY', issues: 3, energyKw: 410 },
      { name: 'Athletics', fullName: 'Eco-Athletics & Sports Pavilion', issues: 1, energyKw: 180 },
      { name: 'Waste Hub', fullName: 'Circular Waste & Utility Hub', issues: 1, energyKw: 140 },
      { name: 'Solar Lot', fullName: 'Solar Canopy Transit Hub & EV Lot', issues: 0, energyKw: 85 },
      { name: 'Gardens', fullName: 'Botanical Conservatory & Gardens', issues: 1, energyKw: 30 },
    ],
    departments: [
      { name: 'Plumbing & Water Resources', staff: 8, open: 1, completed: 8, avgSla: '3.2h', compliance: '99.2%' },
      { name: 'Electrical & Energy Optimization', staff: 12, open: 1, completed: 6, avgSla: '4.5h', compliance: '98.8%' },
      { name: 'Housekeeping & Circular Waste', staff: 15, open: 1, completed: 11, avgSla: '2.0h', compliance: '99.5%' },
      { name: 'Gardening & Campus Biodiversity', staff: 10, open: 0, completed: 4, avgSla: '4.8h', compliance: '99.0%' },
      { name: 'Integrated Facilities & Civil Infra', staff: 20, open: 1, completed: 9, avgSla: '7.4h', compliance: '98.1%' },
    ]
  },
  '30d': {
    label: '30 Days',
    badge: 'Sep 16 – Oct 15, 2026 (Monthly Operations Period)',
    sublabel: '30-day ticket intake vs. verified closure cadence across campus',
    totalIssues: 74,
    inProgressIssues: 9,
    resolvedIssues: 61,
    openIssues: 4,
    avgHours: '4.2 hrs',
    slaCompliance: '98.4%',
    savings: {
      kwh: '38,400 kWh',
      dollars: '~$5,376',
      waste: '14.8 Tons',
      co2: '26.4 MT'
    },
    trend: [
      { day: 'Sep 16-20', reported: 11, resolved: 10 },
      { day: 'Sep 21-25', reported: 14, resolved: 13 },
      { day: 'Sep 26-30', reported: 12, resolved: 11 },
      { day: 'Oct 1-5', reported: 15, resolved: 14 },
      { day: 'Oct 6-10', reported: 19, resolved: 16 },
      { day: 'Oct 11-15', reported: 16, resolved: 15 },
    ],
    categories: [
      { name: 'Water Wastage', count: 24, color: '#06b6d4' },
      { name: 'Energy Inefficiencies', count: 19, color: '#f59e0b' },
      { name: 'Waste Stream', count: 16, color: '#10b981' },
      { name: 'Biodiversity & Flora', count: 7, color: '#8b5cf6' },
      { name: 'Facility Infrastructure', count: 8, color: '#ec4899' },
    ],
    buildings: [
      { name: 'CDSIMER', fullName: 'CDSIMER', issues: 8, energyKw: 215 },
      { name: 'School of Eng', fullName: 'School of Engineering', issues: 16, energyKw: 342 },
      { name: 'AI Block', fullName: 'Artificial Intelligence', issues: 12, energyKw: 295 },
      { name: 'Nursing', fullName: 'Nursing', issues: 14, energyKw: 260 },
      { name: 'EMERGENCY', fullName: 'EMERGENCY', issues: 11, energyKw: 410 },
      { name: 'Athletics', fullName: 'Eco-Athletics & Sports Pavilion', issues: 4, energyKw: 180 },
      { name: 'Waste Hub', fullName: 'Circular Waste & Utility Hub', issues: 3, energyKw: 140 },
      { name: 'Solar Lot', fullName: 'Solar Canopy Transit Hub & EV Lot', issues: 2, energyKw: 85 },
      { name: 'Gardens', fullName: 'Botanical Conservatory & Gardens', issues: 4, energyKw: 30 },
    ],
    departments: [
      { name: 'Plumbing & Water Resources', staff: 8, open: 3, completed: 28, avgSla: '4.2h', compliance: '98.5%' },
      { name: 'Electrical & Energy Optimization', staff: 12, open: 2, completed: 24, avgSla: '6.8h', compliance: '97.9%' },
      { name: 'Housekeeping & Circular Waste', staff: 15, open: 2, completed: 38, avgSla: '2.5h', compliance: '99.0%' },
      { name: 'Gardening & Campus Biodiversity', staff: 10, open: 1, completed: 14, avgSla: '8.4h', compliance: '98.2%' },
      { name: 'Integrated Facilities & Civil Infra', staff: 20, open: 3, completed: 32, avgSla: '12.0h', compliance: '97.5%' },
    ]
  },
  'all': {
    label: 'Academic Year',
    badge: 'Academic Year 2025–2026 (Cumulative Annual Cycle)',
    sublabel: 'Full academic year semester progression & ticket resolution velocity',
    totalIssues: 542,
    inProgressIssues: 12,
    resolvedIssues: 524,
    openIssues: 6,
    avgHours: '4.9 hrs',
    slaCompliance: '97.2%',
    savings: {
      kwh: '412,800 kWh',
      dollars: '~$57,792',
      waste: '178.5 Tons',
      co2: '284.2 MT'
    },
    trend: [
      { day: 'Aug', reported: 38, resolved: 36 },
      { day: 'Sep', reported: 54, resolved: 51 },
      { day: 'Oct', reported: 68, resolved: 64 },
      { day: 'Nov', reported: 58, resolved: 56 },
      { day: 'Dec', reported: 24, resolved: 24 },
      { day: 'Jan', reported: 46, resolved: 45 },
      { day: 'Feb', reported: 62, resolved: 60 },
      { day: 'Mar', reported: 71, resolved: 68 },
      { day: 'Apr', reported: 65, resolved: 64 },
      { day: 'May', reported: 56, resolved: 56 },
    ],
    categories: [
      { name: 'Water Wastage', count: 178, color: '#06b6d4' },
      { name: 'Energy Inefficiencies', count: 146, color: '#f59e0b' },
      { name: 'Waste Stream', count: 118, color: '#10b981' },
      { name: 'Biodiversity & Flora', count: 48, color: '#8b5cf6' },
      { name: 'Facility Infrastructure', count: 52, color: '#ec4899' },
    ],
    buildings: [
      { name: 'CDSIMER', fullName: 'CDSIMER', issues: 58, energyKw: 215 },
      { name: 'School of Eng', fullName: 'School of Engineering', issues: 114, energyKw: 342 },
      { name: 'AI Block', fullName: 'Artificial Intelligence', issues: 86, energyKw: 295 },
      { name: 'Nursing', fullName: 'Nursing', issues: 98, energyKw: 260 },
      { name: 'EMERGENCY', fullName: 'EMERGENCY', issues: 82, energyKw: 410 },
      { name: 'Athletics', fullName: 'Eco-Athletics & Sports Pavilion', issues: 34, energyKw: 180 },
      { name: 'Waste Hub', fullName: 'Circular Waste & Utility Hub', issues: 26, energyKw: 140 },
      { name: 'Solar Lot', fullName: 'Solar Canopy Transit Hub & EV Lot', issues: 18, energyKw: 85 },
      { name: 'Gardens', fullName: 'Botanical Conservatory & Gardens', issues: 26, energyKw: 30 },
    ],
    departments: [
      { name: 'Plumbing & Water Resources', staff: 8, open: 3, completed: 175, avgSla: '4.6h', compliance: '98.4%' },
      { name: 'Electrical & Energy Optimization', staff: 12, open: 3, completed: 142, avgSla: '6.2h', compliance: '97.6%' },
      { name: 'Housekeeping & Circular Waste', staff: 15, open: 2, completed: 210, avgSla: '2.4h', compliance: '99.1%' },
      { name: 'Gardening & Campus Biodiversity', staff: 10, open: 1, completed: 68, avgSla: '7.8h', compliance: '96.8%' },
      { name: 'Integrated Facilities & Civil Infra', staff: 20, open: 3, completed: 194, avgSla: '10.5h', compliance: '96.2%' },
    ]
  }
};

export const DashboardPage: React.FC = () => {
  const { reports } = useApp();
  const [timeframe, setTimeframe] = useState<TimeframeKey>('30d');

  // Active dataset based on timeframe selection
  const current = TIMEFRAME_DATA[timeframe];

  // Dynamically incorporate any real-time user-added reports into current timeframe view
  const userAddedCount = Math.max(0, reports.length - 6);
  const displayTotal = current.totalIssues + userAddedCount;
  const displayInProgress = current.inProgressIssues + Math.floor(userAddedCount * 0.4);
  const displayResolved = current.resolvedIssues;
  const displayOpen = current.openIssues + Math.ceil(userAddedCount * 0.6);
  const closureRate = ((displayResolved / displayTotal) * 100).toFixed(1);

  return (
    <div className="space-y-10 pb-24 text-left">
      
      {/* Header */}
      <section className="border-b border-slate-800 pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>EXECUTIVE SUSTAINABILITY OVERVIEW</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-100">
                Campus Sustainability Intelligence Dashboard
              </h1>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  Campus SLA: 98.4%
                </span>
                <span className="text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Telemetry Aggregation: Live
                </span>
              </div>
            </div>

            {/* Timeframe selector with active range badge */}
            <div className="flex flex-col sm:items-end gap-2">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs self-start sm:self-auto shadow-inner">
                <Calendar className="w-3.5 h-3.5 text-slate-500 ml-2" />
                {(['7d', '30d', 'all'] as const).map(tf => {
                  const label = tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : 'Academic Year';
                  const isActive = timeframe === tf;
                  return (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTimeframe(tf)}
                      className={`px-3.5 py-1.5 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-[1.02]' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {current.badge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary KPI Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="glass-card rounded-2xl p-5 border border-slate-800 transition-all duration-300 hover:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Total Reported Issues</span>
              <span className="p-1.5 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-500/20">
                <AlertTriangle className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-slate-100 transition-all">
              {displayTotal}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>{displayOpen} active / awaiting review</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 transition-all duration-300 hover:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Issues In Progress</span>
              <span className="p-1.5 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-amber-400 transition-all">
              {displayInProgress}
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono">
              Dispatched to maintenance units
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 transition-all duration-300 hover:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Verified Resolved</span>
              <span className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-emerald-400 transition-all">
              {displayResolved}
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono">
              <span className="text-emerald-400 font-bold">{closureRate}%</span> verified closure rate
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 transition-all duration-300 hover:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Avg Turnaround Time</span>
              <span className="p-1.5 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-cyan-400 transition-all">
              {current.avgHours}
            </div>
            <div className="text-[11px] text-emerald-400 mt-2 font-mono">
              SLA Compliance: {current.slaCompliance}
            </div>
          </div>

        </div>
      </section>

      {/* Simulated Environmental Savings Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                Simulated Environmental Impact ({current.label} Window)
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                Estimated Campus Conservation Savings
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
              Verified by IoT Digital Twin
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black font-display text-slate-100 block transition-all">
                  {current.savings.kwh}
                </span>
                <span className="text-xs text-slate-400 block">
                  Electricity Conserved ({current.savings.dollars})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-400 shrink-0">
                <Recycle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black font-display text-slate-100 block transition-all">
                  {current.savings.waste}
                </span>
                <span className="text-xs text-slate-400 block">
                  Diverted from Municipal Landfills
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-400 shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black font-display text-slate-100 block transition-all">
                  {current.savings.co2}
                </span>
                <span className="text-xs text-slate-400 block">
                  CO₂e Greenhouse Emissions Avoided
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Charts: Trends and Category Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Resolution Velocity Area Chart (7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Incident Volume vs. Resolution Velocity
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{current.sublabel}</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Reported
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Resolved
                </span>
              </div>
            </div>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={current.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="reported" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorReported)" name="Reported" />
                  <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Issue Categories Pie Chart (5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-slate-800">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">
                Issues by Sustainability Category
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribution across {current.label} period</p>
            </div>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={current.categories}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name.split(' ')[0]} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {current.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>

      {/* Building Comparison & Department Workload */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Building Incident Frequency (6 cols) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">
                Active Incidents by Campus Facility
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Volume across {current.label} — School of Engineering, Nursing, CDSIMER, AI, EMERGENCY
              </p>
            </div>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={current.buildings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} interval={0} angle={-15} textAnchor="end" height={40} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                  <Bar dataKey="issues" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Logged Incidents" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Workload Table (6 cols) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">
                Departmental Workload & SLA Performance
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Assigned teams and resolution efficiency in {current.label}</p>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Staff</th>
                    <th className="py-2.5 px-3">Open</th>
                    <th className="py-2.5 px-3">Completed</th>
                    <th className="py-2.5 px-3">Avg SLA</th>
                    <th className="py-2.5 px-3">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {current.departments.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition">
                      <td className="py-2.5 px-3 font-semibold text-slate-100">{d.name}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-300">{d.staff}</td>
                      <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">{d.open}</td>
                      <td className="py-2.5 px-3 font-mono text-cyan-300 font-semibold">{d.completed}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-300">{d.avgSla}</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">{d.compliance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
