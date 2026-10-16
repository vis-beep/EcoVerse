import React, { useState } from 'react';
import { BUILDING_ENERGY_METRICS } from '../data/mockData';
import { 
  Zap, 
  TrendingDown, 
  Sliders, 
  AlertTriangle, 
  Eye, 
  Box, 
  Sparkles, 
  CheckCircle2, 
  Sun, 
  Building2, 
  ArrowRight,
  Flame,
  Activity
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

export const Track3EnergyOptimizationPage: React.FC = () => {
  // What-If Simulation Controls
  const [ledRetrofitPercent, setLedRetrofitPercent] = useState<number>(45);
  const [hvacSetpointShift, setHvacSetpointShift] = useState<number>(1.5); // +1.5 degrees C deadband
  const [motionSensorCoverage, setMotionSensorCoverage] = useState<number>(60); // %
  const [solarCapacityKw, setSolarCapacityKw] = useState<number>(250);

  // Baseline load vs simulated adjusted load
  const hourlyEnergyData = [
    { hour: '00:00', baseline: 180, current: 170, optimized: 130 },
    { hour: '04:00', baseline: 160, current: 155, optimized: 120 },
    { hour: '08:00', baseline: 420, current: 410, optimized: 320 },
    { hour: '12:00', baseline: 680, current: 650, optimized: 490 },
    { hour: '14:00', baseline: 740, current: 710, optimized: 520 },
    { hour: '16:00', baseline: 690, current: 670, optimized: 480 },
    { hour: '20:00', baseline: 380, current: 360, optimized: 260 },
    { hour: '23:00', baseline: 220, current: 210, optimized: 150 },
  ];

  // Dynamic calculations based on sliders
  const estimatedSavingsPercent = Math.min(
    38,
    +( (ledRetrofitPercent * 0.12) + (hvacSetpointShift * 4.2) + (motionSensorCoverage * 0.1) ).toFixed(1)
  );

  const estimatedMonthlyKwhSaved = Math.round(48000 * (estimatedSavingsPercent / 100));
  const estimatedCostSavedUsd = Math.round(estimatedMonthlyKwhSaved * 0.14);

  return (
    <div className="space-y-16 pb-24 text-left">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
                <Zap className="w-3.5 h-3.5" />
                <span>TRACK 03: ENERGY EFFICIENCY & GRID TWIN</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-100">
                Sustainable Energy Monitoring <br />
                <span className="text-cyan-400">& Optimization Engine</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                Eliminate ghost power draw and shave peak grid charges. Combine sub-meter telemetry, computer vision occupancy auditing, and a 2D thermal twin to optimize university heating, ventilation, and lighting.
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  Current Campus Demand: <strong className="text-cyan-400">1,447 kW</strong>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
                  Solar Offset: <strong>320 kW (22.1%)</strong>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold">Peak Alert Monitor</span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">1 ACTIVE SURGE</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  School of Engineering is currently drawing <strong>410 kW</strong> (approaching 510 kW contract peak). Non-essential chillers eligible for dynamic load shedding.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-emerald-400">
                  Recommended: Shed Chiller #2 for 30 mins to avoid $1,200 tariff multiplier.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Building Energy Breakdown Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-100">
              Real-Time Campus Building Sub-Meters
            </h2>
            <p className="text-xs text-slate-400">
              Simulated consumption telemetry cross-referenced with room occupancy sensors.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded">
            Updated every 15s (Simulated)
          </span>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Building Name</th>
                  <th className="py-3 px-4">Current Load</th>
                  <th className="py-3 px-4">Baseline Target</th>
                  <th className="py-3 px-4">Peak Limit</th>
                  <th className="py-3 px-4">Live Occupancy</th>
                  <th className="py-3 px-4">Grid Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {BUILDING_ENERGY_METRICS.map(b => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-100 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      {b.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                      {b.currentConsumptionKw} kW
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {b.baselineKw} kW
                    </td>
                    <td className="py-3.5 px-4 font-mono text-rose-400">
                      {b.peakKw} kW
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {b.occupancyPercent}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full border ${
                        b.status === 'optimal' 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Computer Vision Lighting Anomaly Detection Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-700 relative">
              <img 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80" 
                alt="Empty Studio Lighting Vision Feed" 
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"></div>
              
              {/* Bounding box visual overlay */}
              <div className="absolute top-8 left-12 right-12 bottom-8 border-2 border-dashed border-rose-500 bg-rose-500/10 rounded-lg flex items-center justify-center p-2">
                <span className="text-[10px] font-mono bg-rose-950/90 text-rose-300 border border-rose-500 px-2 py-1 rounded">
                  [ANOMALY: Lux &gt; 500, Occupancy: 0%]
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-mono">
                <Eye className="w-3.5 h-3.5" />
                <span>COMPUTER VISION USE CASE: VACANCY ILLUMINATION AUDIT</span>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-100">
                Automated Optical Detection of Wasted Studio Lighting
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Campus safety cameras equipped with privacy-preserving edge inference models calculate spatial luminosity versus actual occupant presence. When lights remain illuminated in empty lecture halls or architecture labs for over 15 minutes, automated commands signal the building management system to dim circuits.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Model Accuracy</span>
                  <span className="font-bold text-emerald-400">96.8% Detection Precision</span>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Daily Avoided Waste</span>
                  <span className="font-bold text-cyan-400">~140 kWh Campus-wide</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive What-If Scenario Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            <Sliders className="w-3.5 h-3.5" />
            <span>WHAT-IF SCENARIO OPTIMIZER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-100">
            Simulate Campus Efficiency Improvements
          </h2>
          <p className="text-xs text-slate-400">
            Adjust facility controls to calculate simulated reductions in electricity consumption and utility costs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sliders (6 cols) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
              Facility Control Parameters
            </h3>

            {/* Slider 1: LED Retrofit */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">LED Luminaire Retrofit Ratio:</span>
                <span className="font-mono text-cyan-400 font-bold">{ledRetrofitPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={ledRetrofitPercent}
                onChange={(e) => setLedRetrofitPercent(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 2: HVAC Setpoint Deadband */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">HVAC Off-Peak Temperature Drift (Deadband):</span>
                <span className="font-mono text-emerald-400 font-bold">+{hvacSetpointShift}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                step="0.5"
                value={hvacSetpointShift}
                onChange={(e) => setHvacSetpointShift(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Slider 3: Motion Sensor Auto-Shutoff */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Smart Sensor Vacancy Coverage:</span>
                <span className="font-mono text-purple-400 font-bold">{motionSensorCoverage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={motionSensorCoverage}
                onChange={(e) => setMotionSensorCoverage(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Slider 4: Rooftop Solar PV */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Solar Array Installed Capacity:</span>
                <span className="font-mono text-amber-400 font-bold">{solarCapacityKw} kWp</span>
              </div>
              <input
                type="range"
                min="50"
                max="600"
                step="25"
                value={solarCapacityKw}
                onChange={(e) => setSolarCapacityKw(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Forecasted Impact Card (6 cols) */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                Projected Model Outcome
              </span>
              <h3 className="text-xl font-bold font-display text-slate-100">
                Estimated Campus Electricity Savings
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Calculated in real-time using university baseline tariffs and ASHRAE standard 90.1 energy formulas.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-2xl font-black font-display text-emerald-400">
                  {estimatedSavingsPercent}%
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Demand Reduction</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-2xl font-black font-display text-cyan-400">
                  {estimatedMonthlyKwhSaved.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">kWh / Month</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-2xl font-black font-display text-amber-400">
                  ${estimatedCostSavedUsd.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Est. Utility Savings</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-emerald-400">GenAI Strategic Summary: </strong>
              Increasing motion sensor coverage to {motionSensorCoverage}% and shifting off-peak deadband by +{hvacSetpointShift}°C eliminates phantom cooling during low evening lab hours without impacting student thermal comfort.
            </div>
          </div>

        </div>

        {/* Load Curve Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-200">
                24-Hour Campus Electricity Load Profile: Baseline vs. Optimized (kW)
              </h3>
              <p className="text-xs text-slate-400">Visual comparison of unmanaged load vs scenario-optimized curve</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-0.5 bg-slate-500"></span> Baseline</span>
              <span className="flex items-center gap-1.5 text-cyan-400"><span className="w-3 h-0.5 bg-cyan-400"></span> Current</span>
              <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-3 h-0.5 bg-emerald-400"></span> Optimized</span>
            </div>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyEnergyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                <Area type="monotone" dataKey="baseline" stroke="#64748b" fillOpacity={1} fill="url(#colorBaseline)" name="Baseline Load (kW)" />
                <Area type="monotone" dataKey="optimized" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOptimized)" name="Optimized Load (kW)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* Next CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-100">Proceed to Green Building Digital Twin</h4>
            <p className="text-xs text-slate-400 mt-0.5">Explore 2D floor plans, HVAC ventilation balancing, and room occupancy heatmaps.</p>
          </div>
          <a
            href="/tracks/green-building"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
          >
            <span>Launch Track 04</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
};
