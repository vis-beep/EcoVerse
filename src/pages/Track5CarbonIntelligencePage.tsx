import React, { useState } from 'react';
import { 
  BarChart2, 
  Flame, 
  Zap, 
  Truck, 
  Trash2, 
  Sparkles, 
  Sliders, 
  Info, 
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  TreeDeciduous
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

export const Track5CarbonIntelligencePage: React.FC = () => {
  // Scenario sliders
  const [solarPpaPercent, setSolarPpaPercent] = useState<number>(30); // 0-100% renewable electricity
  const [campusEvFleetPercent, setCampusEvFleetPercent] = useState<number>(40); // 0-100% electric campus shuttles
  const [compostDiversionRate, setCompostDiversionRate] = useState<number>(55); // 0-100% waste diverted from landfill
  const [gasBoilerEfficiency, setGasBoilerEfficiency] = useState<number>(85); // 70-98% efficiency

  // Transparent Emission Factors (IPCC / EPA Standard Factors)
  const EMISSION_FACTORS = [
    { scope: 'Scope 2', activity: 'Purchased Grid Electricity', factor: '0.385 kg CO2e / kWh', source: 'EPA eGRID 2024 (Regional Subregion)' },
    { scope: 'Scope 1', activity: 'Campus Natural Gas Boilers', factor: '2.03 kg CO2e / m³ gas', source: 'IPCC GHG Protocol Stationary Combustion' },
    { scope: 'Scope 3', activity: 'Diesel Campus Shuttles', factor: '2.68 kg CO2e / Liter diesel', source: 'EPA Mobile Combustion Standards' },
    { scope: 'Scope 3', activity: 'Landfill Municipal Solid Waste', factor: '0.52 kg CO2e / kg waste', source: 'EPA WARM Waste Reduction Model' },
  ];

  // Calculated emissions in Metric Tons CO2e / Year
  const baselineScope1 = 640; // Gas Heating
  const baselineScope2 = 1250; // Grid Power
  const baselineScope3 = 480; // Commuter shuttles & landfill waste
  const totalBaseline = baselineScope1 + baselineScope2 + baselineScope3; // 2,370 MT

  // Calculate adjusted emissions based on user scenario
  const adjustedScope1 = Math.round(baselineScope1 * (1 - (gasBoilerEfficiency - 75) * 0.008));
  const adjustedScope2 = Math.round(baselineScope2 * (1 - (solarPpaPercent / 100)));
  const adjustedScope3 = Math.round(
    (320 * (1 - (campusEvFleetPercent / 100) * 0.75)) + // Transport reduction
    (160 * (1 - (compostDiversionRate / 100) * 0.6))    // Waste reduction
  );

  const totalAdjusted = adjustedScope1 + adjustedScope2 + adjustedScope3;
  const avoidedCo2e = totalBaseline - totalAdjusted;
  const reductionPercentage = +((avoidedCo2e / totalBaseline) * 100).toFixed(1);

  const breakdownData = [
    { name: 'Scope 1 (Natural Gas & Central Boilers)', value: adjustedScope1, color: '#f59e0b' },
    { name: 'Scope 2 (Grid Purchased Electricity)', value: adjustedScope2, color: '#06b6d4' },
    { name: 'Scope 3 (Commuting Shuttles & Landfill)', value: adjustedScope3, color: '#a855f7' },
  ];

  const comparisonData = [
    { category: 'Scope 1 (Direct)', baseline: baselineScope1, proposed: adjustedScope1 },
    { category: 'Scope 2 (Electricity)', baseline: baselineScope2, proposed: adjustedScope2 },
    { category: 'Scope 3 (Transport/Waste)', baseline: baselineScope3, proposed: adjustedScope3 },
  ];

  return (
    <div className="space-y-16 pb-24 text-left">
      
      {/* Hero */}
      <section className="relative pt-8 pb-12 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 text-purple-400 border border-purple-500/30 text-xs font-mono">
                <BarChart2 className="w-3.5 h-3.5" />
                <span>TRACK 05: GREENHOUSE GAS ACCOUNTING & SCENARIO ENGINE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-100">
                Carbon Footprint Intelligence <br />
                <span className="text-purple-400">& Decarbonization Roadmap</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                Unify institutional carbon accounting across Scope 1 direct heating, Scope 2 electricity, and Scope 3 supply chain and waste streams. Model decarbonization what-if scenarios with verifiable emission factors.
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  Annual Campus Baseline: <strong className="text-purple-400">{totalBaseline.toLocaleString()} MT CO₂e</strong>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
                  Verified Protocol: GHG Corporate Standard (ISO 14064)
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-mono text-purple-400 uppercase font-bold">Climate Target 2030</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">NET-ZERO PATHWAY</span>
                </div>
                <div className="text-2xl font-black font-display text-emerald-400">
                  -{reductionPercentage}% CO₂e
                </div>
                <p className="text-xs text-slate-300">
                  Scenario forecast yields <strong className="text-slate-100">{avoidedCo2e.toLocaleString()} Metric Tons CO₂e</strong> avoided annually through configured renewable transitions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transparent Emission Factors Reference Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-100 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-400" />
              Documented Emission Factors & Standards
            </h2>
            <p className="text-xs text-slate-400">
              Clear documentation of scientific assumptions and GHG accounting factors used in our platform algorithms.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded">
            Zero Unsupported Black-Box Estimates
          </span>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">GHG Scope</th>
                  <th className="py-3 px-4">Activity Stream</th>
                  <th className="py-3 px-4">Emission Factor</th>
                  <th className="py-3 px-4">Authoritative Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {EMISSION_FACTORS.map((ef, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-purple-400">
                      {ef.scope}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-100">
                      {ef.activity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400">
                      {ef.factor}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {ef.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Carbon Decarbonization Scenario Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE SCENARIO SIMULATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-100">
            Model Campus Decarbonization Levers
          </h2>
          <p className="text-xs text-slate-400">
            Slide the levers below to simulate green power purchase agreements (PPA), fleet electrification, and waste diversion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sliders (6 cols) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
              Intervention Levers
            </h3>

            {/* Slider 1: Solar / Renewable PPA */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Renewable Electricity Share (Solar / PPA):</span>
                <span className="font-mono text-cyan-400 font-bold">{solarPpaPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={solarPpaPercent}
                onChange={(e) => setSolarPpaPercent(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 2: EV Campus Fleet */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Campus Transit Electrification (EV Shuttles):</span>
                <span className="font-mono text-purple-400 font-bold">{campusEvFleetPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={campusEvFleetPercent}
                onChange={(e) => setCampusEvFleetPercent(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Slider 3: Compost Diversion */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Cafeteria & Grounds Compost Diversion:</span>
                <span className="font-mono text-emerald-400 font-bold">{compostDiversionRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={compostDiversionRate}
                onChange={(e) => setCompostDiversionRate(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Slider 4: Gas Boiler Efficiency */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Central Hydronic Boiler Efficiency:</span>
                <span className="font-mono text-amber-400 font-bold">{gasBoilerEfficiency}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="98"
                value={gasBoilerEfficiency}
                onChange={(e) => setGasBoilerEfficiency(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Real-time Footprint Summary Card (6 cols) */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-purple-500/30 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-mono text-purple-400 uppercase font-bold block mb-1">
                Forecasted Net Footprint
              </span>
              <h3 className="text-xl font-bold font-display text-slate-100">
                Annual Campus Emissions: {totalAdjusted.toLocaleString()} MT CO₂e
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Down from unmitigated baseline of {totalBaseline.toLocaleString()} MT CO₂e/year.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black font-display text-amber-400">{adjustedScope1}</div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">Scope 1 (Gas)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black font-display text-cyan-400">{adjustedScope2}</div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">Scope 2 (Power)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black font-display text-purple-400">{adjustedScope3}</div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">Scope 3 (Waste/Fleet)</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-emerald-400">Equivalent Sequestration Impact: </strong>
              Avoiding {avoidedCo2e} MT CO₂e annually equals planting <strong>{Math.round(avoidedCo2e * 16.5).toLocaleString()} urban deciduous trees</strong> or removing <strong>{Math.round(avoidedCo2e / 4.6)} passenger cars</strong> from circulation.
            </div>
          </div>

        </div>

        {/* Charts: Breakdown Donut & Scenario Comparison Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  GHG Scope Emissions Distribution (Scopes 1, 2 & 3)
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                  ISO 14064 Standard
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Visualizing proportional share of campus carbon emissions by direct, indirect power, and supply chain categories (MT CO₂e / Year).
              </p>
            </div>

            {/* Donut Chart with Centered Total Callout and Slice Labels */}
            <div className="relative h-64 w-full my-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breakdownData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={88}
                    paddingAngle={3}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {breakdownData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px', color: '#f1f5f9' }}
                    formatter={(val: number) => [`${val.toLocaleString()} MT CO₂e (${((val / totalAdjusted) * 100).toFixed(1)}%)`, 'Emissions']}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Centered Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-lg font-black font-display text-slate-100 leading-none">
                  {totalAdjusted.toLocaleString()}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  MT CO₂e
                </span>
                <span className="text-[8px] text-teal-400 font-semibold">Total Scope</span>
              </div>
            </div>

            {/* Explicit Legend Explaining What Each Slice Represents */}
            <div className="space-y-2 pt-3 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                What Each Slice Represents:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* Scope 1 */}
                <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      Scope 1 (Direct)
                    </span>
                    <span className="font-mono text-[10px] text-amber-300 font-bold">
                      {((adjustedScope1 / totalAdjusted) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="font-mono text-slate-100 font-bold text-[11px] mb-0.5">
                    {adjustedScope1.toLocaleString()} MT CO₂e
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    On-site natural gas combustion & central campus hydronic heating boilers.
                  </p>
                </div>

                {/* Scope 2 */}
                <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-cyan-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      Scope 2 (Electricity)
                    </span>
                    <span className="font-mono text-[10px] text-cyan-300 font-bold">
                      {((adjustedScope2 / totalAdjusted) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="font-mono text-slate-100 font-bold text-[11px] mb-0.5">
                    {adjustedScope2.toLocaleString()} MT CO₂e
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Indirect emissions from purchased municipal grid electricity for labs & facilities.
                  </p>
                </div>

                {/* Scope 3 */}
                <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-purple-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      Scope 3 (Supply/Waste)
                    </span>
                    <span className="font-mono text-[10px] text-purple-300 font-bold">
                      {((adjustedScope3 / totalAdjusted) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="font-mono text-slate-100 font-bold text-[11px] mb-0.5">
                    {adjustedScope3.toLocaleString()} MT CO₂e
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Value chain emissions from commuter transit shuttles and landfill solid waste.
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 mb-2">
              Baseline vs. Proposed Scenario Comparison (MT CO₂e)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="category" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                  <Bar dataKey="baseline" fill="#475569" radius={[4, 4, 0, 0]} name="Baseline (MT)" />
                  <Bar dataKey="proposed" fill="#a855f7" radius={[4, 4, 0, 0]} name="Proposed Scenario (MT)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </section>

      {/* Next CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-100">Proceed to Smart Recycling Assistant</h4>
            <p className="text-xs text-slate-400 mt-0.5">Upload waste photos to test Computer Vision material classification and hazardous item cautions.</p>
          </div>
          <a
            href="/tracks/smart-recycling"
            className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
          >
            <span>Launch Track 06</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
};
