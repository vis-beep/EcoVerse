import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  RotateCcw,
  Database,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Droplets,
  Zap,
  Trash2,
  MapPin,
  Layers
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  chips?: string[];
  actionLink?: { label: string; path: string };
}

export const FloatingCopilot: React.FC = () => {
  const { 
    isCopilotOpen, 
    setIsCopilotOpen, 
    reports, 
    wasteBins, 
    departments,
    currentRole,
    currentUser,
    isDarkMode 
  } = useApp();
  const navigate = useNavigate();

  const getInitialMessage = (): ChatMessage => ({
    id: 'm-init',
    sender: 'ai',
    text: `Hello ${currentUser?.name ? currentUser.name.split(' ')[0] : 'there'}! 👋 I am your **EcoVerse Copilot**, powered by real-time campus telemetry and Computer Vision triage.\n\nI can analyze active incidents, building energy consumption, smart waste bin fullness, digital twin maps, and department workflows. How can I assist you today?`,
    timestamp: 'Just now',
    chips: [
      "📊 Campus sustainability summary",
      "💧 Check active water leakages",
      "⚡ How to reduce peak power waste?",
      "🏢 Which building has the most issues?",
      "📝 How do I submit a report?"
    ]
  });

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleClearHistory = () => {
    setMessages([getInitialMessage()]);
  };

  // Comprehensive AI intelligence reasoning engine
  const generateAnswer = (query: string): { text: string; chips: string[]; actionLink?: { label: string; path: string } } => {
    const q = query.toLowerCase().trim();

    // 1. Live statistics computed from AppContext
    const totalCount = reports.length;
    const openCount = reports.filter(r => r.status === 'submitted' || r.status === 'awaiting_assignment').length;
    const inProgressCount = reports.filter(r => r.status === 'assigned' || r.status === 'in_progress').length;
    const verificationCount = reports.filter(r => r.status === 'awaiting_verification').length;
    const resolvedCount = reports.filter(r => r.status === 'resolved').length;

    const waterReports = reports.filter(r => r.category === 'water' && r.status !== 'resolved');
    const energyReports = reports.filter(r => r.category === 'energy' && r.status !== 'resolved');
    const wasteReports = reports.filter(r => r.category === 'waste' && r.status !== 'resolved');

    const totalWaterLoss = waterReports.length * 15;
    const totalEnergyWaste = energyReports.length * 42;
    const totalCo2 = Math.round(waterReports.length * 3.2 + energyReports.length * 18.5 + wasteReports.length * 4.8);

    const fullBins = wasteBins.filter(b => b.fullness >= 80);

    // Identify top hotspot buildings dynamically
    const buildingCounts: Record<string, number> = {};
    reports.filter(r => r.status !== 'resolved').forEach(r => {
      buildingCounts[r.building] = (buildingCounts[r.building] || 0) + 1;
    });
    const sortedBuildings = Object.entries(buildingCounts).sort((a, b) => b[1] - a[1]);
    const topBuilding = sortedBuildings[0] ? sortedBuildings[0][0] : 'School of Engineering';
    const topBuildingCount = sortedBuildings[0] ? sortedBuildings[0][1] : 3;

    // Check specific report match (e.g. ECO-2026-0104 or any other ID)
    const reportMatch = query.match(/ECO-2026-\d{4}(?:-[a-z0-9]+)?/i);
    if (reportMatch) {
      const rep = reports.find(r => r.id.toLowerCase() === reportMatch[0].toLowerCase());
      if (rep) {
        return {
          text: `📋 **Incident Record: ${rep.id}**\n\n- **Title**: "${rep.title}"\n- **Status**: **${rep.status.replace('_', ' ').toUpperCase()}**\n- **Building**: ${rep.building} (${rep.locationDetails})\n- **Category**: ${rep.category.toUpperCase()} (Urgency: ${rep.urgency.toUpperCase()})\n- **Department**: ${rep.assignedDepartmentName || 'Awaiting assignment'}\n- **Latest Log**: ${rep.history[rep.history.length - 1]?.comment || 'Ticket registered in system.'}\n\n*Computer Vision Confidence*: ${rep.aiAnalysis?.confidenceScore ? `${Math.round(rep.aiAnalysis.confidenceScore * 100)}%` : '94%'}`,
          chips: [
            "View all open reports",
            "Which building has most issues?",
            "Inspect digital twin map"
          ],
          actionLink: { label: "Open Incident in Reports", path: "/reports" }
        };
      } else {
        return {
          text: `🔍 Report reference **${reportMatch[0]}** was not found in the active datastore.\n\nCurrently active incident tickets include:\n${reports.slice(0, 3).map(r => `• **${r.id}** — ${r.title.slice(0, 45)}...`).join('\n')}`,
          chips: [
            reports[0] ? `Check status of ${reports[0].id}` : "Show all reports",
            "Campus sustainability summary",
            "How to submit a report"
          ],
          actionLink: { label: "Go to Reports Portal", path: "/reports" }
        };
      }
    }

    // 2. Greetings & Salutations
    if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('good morning') || q.includes('good afternoon') || q.includes('who are you')) {
      return {
        text: `Greetings! I am **EcoVerse Copilot**, your real-time campus operational assistant.\n\nHere is your live campus snapshot:\n• **${totalCount} total incidents** registered\n• **${openCount + inProgressCount} active maintenance tasks** across campus\n• **${resolvedCount} resolved & verified issues**\n• Current role: **${currentRole.toUpperCase()}** (${currentUser?.name || 'Authorized User'})\n\nWhat would you like to explore or optimize right now?`,
        chips: [
          "📊 Campus sustainability summary",
          "💧 Water leaks & fluid loss",
          "⚡ Energy optimization recommendations",
          "🗺️ Explore Digital Twin"
        ]
      };
    }

    // 3. Campus Summary / Overview / Stats / KPIs / Metrics
    if (q.includes('summary') || q.includes('stat') || q.includes('overview') || q.includes('metric') || q.includes('kpi') || q.includes('how many') || q.includes('dashboard')) {
      return {
        text: `📊 **Live Campus Sustainability Telemetry**:\n\n• **Total Tickets**: ${totalCount} recorded\n• **Pending/Open**: ${openCount} awaiting dispatch\n• **In Progress**: ${inProgressCount} active maintenance teams deployed\n• **Awaiting Sign-off**: ${verificationCount} repair completed & proof attached\n• **Resolved**: ${resolvedCount} officially verified\n\n🌍 **Environmental Impact Run-Rate**:\n• Fluid loss: **~${totalWaterLoss} L/min** across active leaks\n• Electricity waste: **~${totalEnergyWaste} kWh/day** in unoccupied zones\n• Daily GHG footprint: **~${Math.round(totalCo2)} kg CO₂e/day**`,
        chips: [
          "💧 Check active water leakages",
          "🏢 Which building has the most issues?",
          "🗑️ View smart waste bin fullness",
          "Open executive dashboard"
        ],
        actionLink: { label: "Open Executive Dashboard", path: "/dashboard" }
      };
    }

    // 4. Water / Plumbing / Leaks
    if (q.includes('water') || q.includes('leak') || q.includes('pipe') || q.includes('plumb') || q.includes('faucet') || q.includes('toilet') || q.includes('flush') || q.includes('restroom')) {
      return {
        text: `💧 **Campus Water Resources Telemetry**:\n\n• **Active Water Tickets**: ${waterReports.length} issues ongoing\n• **Estimated Fluid Wastage**: **~${totalWaterLoss} Liters/minute**\n• **Key Hotspots**:\n  1. **School of Engineering (Washroom 204B)**: Stuck solenoid flush valve (15 L/min)\n  2. **Central Quad Irrigation**: Low-pressure line fracture\n\n🔧 **Remediation Actions**:\n• Isolating secondary line shutoffs reduces continuous pressure strain.\n• Computer Vision triage auto-alerts the Plumbing & Water Resources team within 60 seconds.`,
        chips: [
          "Check report ECO-2026-0104",
          "How to report a water leak",
          "Show campus summary"
        ],
        actionLink: { label: "View Water Incidents", path: "/reports" }
      };
    }

    // 5. Energy / Electricity / HVAC / Solar / Power
    if (q.includes('energy') || q.includes('electric') || q.includes('power') || q.includes('kwh') || q.includes('solar') || q.includes('hvac') || q.includes('light') || q.includes('cooling') || q.includes('ac')) {
      return {
        text: `⚡ **Campus Energy Grid & HVAC Telemetry**:\n\n• **Active Inefficiencies**: ${energyReports.length} tickets open\n• **Potential Daily Savings**: **~${totalEnergyWaste} kWh/day**\n\n🌱 **Optimization Recommendations**:\n1. **Automated Daylight Harvesting**: Deploy PIR ambient dimmers in Engineering Studio C (saves ~42 kWh/day).\n2. **HVAC Deadband Adjustment**: Shifting baseline cooling setpoints from 21°C to 23.5°C during unoccupied hours yields a **14.2% power reduction**.\n3. **Solar PV Generation**: Rooftop arrays across Nursing & Central dome currently offset **28.4% of baseline campus daytime load**.`,
        chips: [
          "Energy Optimization Track",
          "Which building has highest power use?",
          "Campus sustainability summary"
        ],
        actionLink: { label: "Open Energy Optimization", path: "/tracks/energy-optimization" }
      };
    }

    // 6. Waste / Recycling / Bins / Trash
    if (q.includes('waste') || q.includes('trash') || q.includes('bin') || q.includes('recycl') || q.includes('garbage') || q.includes('compost') || q.includes('fullness')) {
      return {
        text: `🗑️ **Smart Waste & Circular Recycling Status**:\n\n• **Total Connected Bins**: ${wasteBins.length} IoT monitored containers\n• **Urgent Collection Needed**: **${fullBins.length} bins** currently exceed 80% capacity\n• **Critical Locations**:\n${fullBins.slice(0, 3).map(b => `  • **${b.building}** (${b.type}): **${b.fullness}% full**`).join('\n')}\n\n🤖 **AI Recycling Classifier**: Students and staff can upload trash photos to the Smart Recycling AI tool to get instant zero-waste sorting guidance.`,
        chips: [
          "Smart Waste Digital Twin",
          "Try Smart Recycling AI",
          "How to report overflowing bin"
        ],
        actionLink: { label: "View Smart Waste Twin", path: "/tracks/smart-waste-management" }
      };
    }

    // 7. Building Hotspots / Locations
    if (q.includes('building') || q.includes('where') || q.includes('hotspot') || q.includes('location') || q.includes('most') || q.includes('engineering') || q.includes('nursing') || q.includes('library')) {
      return {
        text: `🏢 **Building Incident Distribution**:\n\n• **Primary Hotspot**: **${topBuilding}** (${topBuildingCount} active tickets)\n• **Secondary Sector**: **Nursing** (2 active tickets)\n• **Central Administration (CDSIMER)**: 1 open telemetry audit\n\n🗺️ **2D Spatial Digital Twin**: Visual heatmaps indicate restroom supply valves and dining hall recycling stations require physical inspection today.`,
        chips: [
          "Open Digital Twin 2D Map",
          "View reports in Engineering",
          "Campus sustainability summary"
        ],
        actionLink: { label: "Explore Digital Twin", path: "/digital-twin" }
      };
    }

    // 8. How to Report an Incident
    if (q.includes('how to report') || q.includes('submit') || q.includes('file') || q.includes('complaint') || q.includes('upload') || q.includes('photo') || q.includes('camera')) {
      return {
        text: `📸 **How to Submit a Campus Incident**:\n\n1. **Navigate to Reports**: Click the *Issue Reporting* menu or the + button.\n2. **Capture Photo Evidence**: Upload or snap a picture of the leak, trash overflow, or energy waste.\n3. **Computer Vision Classification**: EcoVerse AI will automatically detect the category, assign an urgency level, and estimate loss rates.\n4. **Automated Dispatch**: The ticket is routed immediately to the responsible team (Plumbing, Electrical, or Waste).\n5. **Sign-Off**: Once repaired with photo proof, you can verify and close the ticket!`,
        chips: [
          "Open Reporting Form",
          "Check report ECO-2026-0104",
          "Who are the maintenance technicians?"
        ],
        actionLink: { label: "Go to Report Page", path: "/reports" }
      };
    }

    // 9. Digital Twin Telemetry
    if (q.includes('twin') || q.includes('digital twin') || q.includes('telemetry') || q.includes('sensor') || q.includes('map') || q.includes('2d')) {
      return {
        text: `🌐 **EcoVerse 2D Digital Twin Overview**:\n\n• The Digital Twin synthesizes live telemetry from **10 campus facilities**, IoT ultrasonic water meters, smart bin weight sensors, and rooftop solar inverters.\n• Clicking any building reveals real-time ESG metrics, power curves, and active localized complaints.\n• Color-coded pulsing radar nodes signal urgent anomalies requiring staff intervention.`,
        chips: [
          "Launch Digital Twin Map",
          "Which building has most issues?",
          "Campus sustainability summary"
        ],
        actionLink: { label: "Open Campus Digital Twin", path: "/digital-twin" }
      };
    }

    // 10. Roles & Permissions / Who Am I
    if (q.includes('role') || q.includes('permission') || q.includes('who am i') || q.includes('admin') || q.includes('technician') || q.includes('student')) {
      const roleDescription = currentRole === 'admin'
        ? 'Campus Sustainability Administrator — You have executive analytics, AI auto-routing rule overrides, digital twin controls, and final audit sign-off permissions.'
        : currentRole === 'maintenance'
        ? 'Maintenance Technician — You have access to assigned department work orders, live status updates (In-Progress / Resolved), and repair photo proof uploads.'
        : 'Student / Faculty Reporter — You can submit environmental incident photos, monitor automated classification, and verify completed repairs.';

      return {
        text: `👤 **Your Operational Persona**:\n\n• **Active Role**: **${currentRole.toUpperCase()}**\n• **User**: ${currentUser?.name || 'Aria Sharma'}\n• **Department**: ${currentUser?.department || 'Environmental Science & Engineering'}\n\n📌 **Privileges**:\n${roleDescription}\n\n*Tip: Use the role selector in the top bar to test other roles at any time.*`,
        chips: [
          "Switch role persona",
          "What can I do as this role?",
          "Show campus summary"
        ]
      };
    }

    // 11. Carbon / ESG / Scope 1-3
    if (q.includes('carbon') || q.includes('co2') || q.includes('ghg') || q.includes('esg') || q.includes('scope') || q.includes('emissions')) {
      return {
        text: `🌱 **Campus Carbon & ESG Framework (ISO 14064)**:\n\n• **Scope 1 (Direct)**: Natural gas heating & maintenance vehicle fleet.\n• **Scope 2 (Indirect)**: University grid electricity consumption.\n• **Scope 3 (Supply Chain & Commute)**: Campus waste diversion & student transit.\n\n📈 **Decarbonization Progress**: Active sensor optimization and solar canopy offset have reduced campus monthly GHG emissions by an estimated **18.6 metric tons CO₂e**.`,
        chips: [
          "Carbon Intelligence Track",
          "Campus sustainability summary",
          "How to reduce peak power waste?"
        ],
        actionLink: { label: "Open Carbon Intelligence", path: "/tracks/carbon-intelligence" }
      };
    }

    // 12. Departments & Teams
    if (q.includes('department') || q.includes('team') || q.includes('staff') || q.includes('who handles')) {
      return {
        text: `🏛️ **Campus Operational Departments**:\n\n${departments.map(d => `• **${d.name}** (${d.code}): ${d.openTickets} open tickets | Lead: ${d.leadPerson}`).join('\n')}\n\nAll incoming tickets are automatically classified by Computer Vision and dispatched based on department routing rules.`,
        chips: [
          "Campus sustainability summary",
          "How to report an issue",
          "View all open reports"
        ],
        actionLink: { label: "View Reports", path: "/reports" }
      };
    }

    // 13. Smart Fallback for Open-ended Queries
    return {
      text: `🤖 **EcoVerse AI Analysis**:\n\nRegarding "${query}":\nOur intelligence pipeline monitors all active campus operations in real-time. Currently tracking **${totalCount} sustainability records**, **${openCount + inProgressCount} active maintenance tasks**, and **${fullBins.length} overflowing smart bins**.\n\nYou can query specific ticket IDs (e.g. *ECO-2026-0104*), check water or power wastage, inspect building hotspots, or explore the 2D digital twin.`,
      chips: [
        "📊 Campus sustainability summary",
        "💧 Check water leakages",
        "⚡ Energy & HVAC optimization",
        "🏢 Which building has most issues?"
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(query);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: 'Just now',
        chips: response.chips,
        actionLink: response.actionLink
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isCopilotOpen && (
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group"
          aria-label="Open EcoVerse AI Copilot"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-slate-950 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping"></span>
          </div>
          <span className="text-sm font-display tracking-tight">EcoVerse Copilot</span>
          <span className="text-[10px] bg-slate-950/20 px-1.5 py-0.5 rounded font-mono font-bold">AI</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isCopilotOpen && (
        <div className={`fixed bottom-6 right-4 sm:right-6 z-50 w-[95vw] sm:w-[460px] h-[600px] max-h-[85vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
          isDarkMode 
            ? 'bg-slate-900/95 border-cyan-500/30 text-slate-100 shadow-[0_0_50px_rgba(6,182,212,0.15)]' 
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-2xl backdrop-blur-xl'
        }`}>
          
          {/* Header */}
          <div className={`p-4 border-b flex items-center justify-between transition-colors ${
            isDarkMode 
              ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950/80 border-slate-700/80' 
              : 'bg-gradient-to-r from-slate-50 via-white to-cyan-50/50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-sm font-display ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    EcoVerse Copilot
                  </h3>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 px-1.5 py-0.2 rounded-full font-mono font-bold">
                    ONLINE
                  </span>
                </div>
                <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Campus Intelligence & Triage Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className={`p-2 rounded-xl transition ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsCopilotOpen(false)}
                className={`p-2 rounded-xl transition ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Close Copilot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Telemetry Bar */}
          <div className={`px-4 py-1.5 text-[11px] border-b flex items-center justify-between font-mono ${
            isDarkMode 
              ? 'bg-slate-950/70 border-slate-800 text-slate-400' 
              : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <span className="flex items-center gap-1.5 truncate">
              <Database className="w-3 h-3 text-cyan-500 shrink-0" />
              <span>Live Campus Telemetry Synced</span>
            </span>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-1.5 py-0.5 rounded">
              {currentRole.toUpperCase()}
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none font-medium'
                      : isDarkMode
                      ? 'bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-tl-none'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}

                  {/* Optional Action Button Link */}
                  {msg.actionLink && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/40 dark:border-slate-700/60">
                      <button
                        onClick={() => {
                          navigate(msg.actionLink!.path);
                          setIsCopilotOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <span className={`text-[10px] mt-1 px-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {msg.timestamp}
                </span>

                {/* Quick Action Suggestion Chips */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        className={`text-[11px] text-left px-2.5 py-1.5 rounded-xl border transition-all ${
                          isDarkMode
                            ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border-slate-700/80 hover:border-cyan-500/50'
                            : 'bg-slate-100 hover:bg-cyan-50 text-cyan-800 border-slate-200 hover:border-cyan-300'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className={`flex items-center gap-2 p-3 rounded-2xl border w-fit ${
                isDarkMode 
                  ? 'bg-slate-800/80 border-slate-700/80 text-slate-300' 
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] font-medium ml-1">Analyzing campus telemetry...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className={`p-3.5 border-t transition-colors ${
            isDarkMode 
              ? 'bg-slate-900/90 border-slate-800' 
              : 'bg-white border-slate-200'
          }`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about reports, water leaks, energy, bins..."
                className={`flex-1 rounded-xl px-3.5 py-2.5 text-xs transition focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
                  isDarkMode
                    ? 'bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
                }`}
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
