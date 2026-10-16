import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Eye, 
  Box, 
  Sparkles, 
  Database, 
  Server, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  GitBranch,
  Terminal,
  Code2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const databaseEntities = [
    { name: 'users', desc: 'Accounts, password hashes, campus ID, role associations.' },
    { name: 'roles', desc: 'Student Reporter, Maintenance/Facilities Tech, Campus Administrator.' },
    { name: 'departments', desc: 'Plumbing, Electrical, Waste, Biodiversity, Civil Facilities.' },
    { name: 'campus_buildings', desc: 'Sector codes, floor counts, gross sq footage, solar capacity.' },
    { name: 'campus_locations', desc: 'Floors, washrooms, laboratories, lecture halls, quad sectors.' },
    { name: 'sustainability_reports', desc: 'Unique ECO-ID, visual evidence URL, category, status, urgency.' },
    { name: 'evidence_files', desc: 'RGB photographs, video clips, inspection documents.' },
    { name: 'assignments', desc: 'Department routing, assigned technician, dispatch timestamps.' },
    { name: 'report_status_history', desc: 'Immutable chronological audit log of all transitions.' },
    { name: 'comments', desc: 'Discussion notes, verification remarks, technician explanations.' },
    { name: 'notifications', desc: 'User notifications with unread state, actionable ticket links.' },
    { name: 'sensor_readings', desc: 'Sub-meter kW, ultrasonic bin fullness %, lux levels, CFM airflow.' },
    { name: 'digital_twin_objects', desc: '2D coordinates, zone polygons, status colors, SVG geometry.' },
    { name: 'ai_analysis_logs', desc: 'Model confidence scores, detected visual classes, human-review flags.' },
    { name: 'sustainability_metrics', desc: 'Historical aggregations of kWh saved, waste diverted, avoided CO2e.' },
  ];

  return (
    <div className="space-y-16 pb-24 text-left">
      
      {/* Hero */}
      <section className="border-b border-slate-800 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
              <Leaf className="w-3.5 h-3.5" />
              <span>PROJECT OVERVIEW & SYSTEM ARCHITECTURE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-100">
              EcoVerse AI — Mission & Engineering
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              EcoVerse AI was engineered as an enterprise-grade sustainability intelligence platform for university campuses. By unifying Computer Vision perception, Digital Twin spatial modeling, and Generative AI reasoning, the system turns passive environmental complaints into verifiable, closed-loop decarbonization actions.
            </p>
          </div>
        </div>
      </section>

      {/* Tri-Pillar Architecture Diagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase font-bold">System Blueprint</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-100">
            Tri-Pillar AI Integration Pipeline
          </h2>
          <p className="text-xs text-slate-400">
            How optical inputs, physical telemetry, and automated reasoning communicate across the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1 */}
          <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
              <Eye className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-100">1. Computer Vision</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Perception layer processing raw optical frames and user-uploaded photographs. Extracts material signatures, fluid flow rates, unmanaged lux levels, and occupant counts with calibrated confidence intervals.
            </p>
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
              • ResNet / YOLOv8 Object Classification<br />
              • Privacy-Preserving Luminance Heatmapping<br />
              • Optical Fill-Level Triangulation
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
              <Box className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-100">2. Digital Twins</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Spatial virtualization layer translating campus buildings, smart receptacles, and sub-meters into interactive 2D models. Synchronizes live physical telemetry with virtual state markers and heatmaps.
            </p>
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
              • Geospatial 2D Campus Topology Coordinates<br />
              • Sub-Meter Power Draw Telemetry<br />
              • Dynamic Ventilation & CFM Balancing
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-100">3. Generative AI</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reasoning and routing engine synthesizing historical facility tickets, calculating IPCC greenhouse gas scenarios, and generating contextual conversational guidance through the floating Copilot.
            </p>
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400">
              • Automated Department Routing Rules Engine<br />
              • What-If Decarbonization Scenario Modeling<br />
              • EcoVerse Copilot Contextual Assistant
            </div>
          </div>

        </div>
      </section>

      {/* Backend-Ready Architecture & PostgreSQL Database Entities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 text-xs font-mono">
            <Database className="w-3.5 h-3.5" />
            <span>ENTERPRISE BACKEND ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-100">
            FastAPI Backend & Relational PostgreSQL Schema
          </h2>
          <p className="text-xs text-slate-400">
            The platform is engineered with clean separation between the React frontend UI and the Python FastAPI REST API. The relational database schema contains 15 relational tables.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-slate-200">15 Relational Database Tables (`backend/schema.sql`)</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
              PostgreSQL 15+ DDL Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {databaseEntities.map(entity => (
              <div key={entity.name} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="font-mono font-bold text-cyan-300 text-xs">{entity.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{entity.desc}</p>
              </div>
            ))}
          </div>

          {/* FastAPI endpoints preview */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Core REST API Endpoints Provided in `backend/main.py`:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-emerald-400 font-bold">GET /api/reports</span>
                <span className="text-slate-400">List reports with category/status filters</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-cyan-400 font-bold">POST /api/reports</span>
                <span className="text-slate-400">Submit issue & run AI classification</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-amber-400 font-bold">PATCH /api/reports/{'{id}'}/status</span>
                <span className="text-slate-400">Transition status & append audit history</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-purple-400 font-bold">GET /api/digital-twin/telemetry</span>
                <span className="text-slate-400">Fetch sub-meter kW, bins, & sensors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Presentation & Competition Ready Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              University Presentation & Academic Integrity Note
            </h4>
            <p className="text-xs text-slate-400 max-w-2xl">
              All demonstrated metric values (kWh saved, tons diverted, CO2e avoided) and sensor readings are realistic simulated demonstration datasets. The platform architecture is production-ready for live IoT and hardware integration.
            </p>
          </div>
          <Link
            to="/tracks/sustainable-campus"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition shrink-0"
          >
            Launch Primary Prototype
          </Link>
        </div>
      </section>

    </div>
  );
};
