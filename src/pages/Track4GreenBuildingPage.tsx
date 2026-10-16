import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Layers, 
  Wind, 
  Sun, 
  Users, 
  Eye, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Thermometer, 
  Droplets,
  ArrowRight,
  Cpu,
  Activity,
  Zap,
  Shield,
  Gauge
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Cell 
} from 'recharts';

interface RoomData {
  id: string;
  name: string;
  occupancy: number;
  maxCapacity: number;
  tempC: number;
  humidityPercent: number;
  ventilationCfm: number;
  lightsActive: boolean;
  hvacStatus: 'cooling' | 'heating' | 'eco_standby';
}

interface BuildingProfile {
  id: string;
  name: string;
  shortName: string;
  code: string;
  category: string;
  areaSqFt: number;
  solarKwPeak: number;
  leedStatus: string;
  efficiencyPercent: number;
  description: string;
  image: string;
  floorsCount: number;
  energyData: { floor: string; kwh: number; baseline: number }[];
}

const BUILDINGS_CATALOG: Record<string, BuildingProfile> = {
  'AI Block': {
    id: 'bldg-ai',
    name: 'AI Block',
    shortName: 'AI & Robotics Hub',
    code: 'AIB',
    category: 'High-Performance AI & Supercomputing',
    areaSqFt: 120000,
    solarKwPeak: 80,
    leedStatus: 'LEED Platinum Dynamic',
    efficiencyPercent: 14.8,
    description: 'High-density computational research facility with GPU neural network suites, tensor pods, and automated liquid-to-air cooling modulation.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    floorsCount: 5,
    energyData: [
      { floor: 'Level 1: Robotics Arena', kwh: 640, baseline: 740 },
      { floor: 'Level 2: Neural Labs', kwh: 890, baseline: 1040 },
      { floor: 'Level 3: Tensor Cluster', kwh: 1120, baseline: 1300 },
      { floor: 'Level 4: Edge AI Suites', kwh: 780, baseline: 920 },
      { floor: 'Level 5: Supercomputing DC', kwh: 1450, baseline: 1720 },
    ]
  },
  'Emergency Block': {
    id: 'bldg-emg',
    name: 'Emergency Block',
    shortName: 'Emergency & Trauma Centre',
    code: 'EMG',
    category: 'Critical Healthcare & Rapid Response',
    areaSqFt: 175000,
    solarKwPeak: 130,
    leedStatus: 'LEED Gold Critical Healthcare',
    efficiencyPercent: 11.2,
    description: 'Continuous 24/7 acute healthcare operations with surgical cleanroom positive pressure air handling, trauma triage, and HEPA particulate filtering.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    floorsCount: 5,
    energyData: [
      { floor: 'Level 1: Triage & Resus', kwh: 920, baseline: 1020 },
      { floor: 'Level 2: Operating Theatres', kwh: 1240, baseline: 1390 },
      { floor: 'Level 3: Trauma Sim Hub', kwh: 680, baseline: 770 },
      { floor: 'Level 4: Diagnostic Imaging', kwh: 890, baseline: 1010 },
      { floor: 'Level 5: Helipad & Isolation', kwh: 530, baseline: 600 },
    ]
  },
  'Nursing': {
    id: 'bldg-nur',
    name: 'Nursing',
    shortName: 'Nursing & Allied Health',
    code: 'NUR',
    category: 'Clinical Training & Simulation',
    areaSqFt: 95000,
    solarKwPeak: 60,
    leedStatus: 'LEED Gold Dynamic',
    efficiencyPercent: 11.8,
    description: 'School of Nursing clinical ward simulation labs, student health facilities, and anatomy theaters with occupancy-based CFM modulation.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    floorsCount: 5,
    energyData: [
      { floor: 'Level 1: Clinical Atrium', kwh: 520, baseline: 580 },
      { floor: 'Level 2: Biotech Labs', kwh: 740, baseline: 820 },
      { floor: 'Level 3: Ward Simulation', kwh: 430, baseline: 510 },
      { floor: 'Level 4: Health Informatics', kwh: 610, baseline: 690 },
      { floor: 'Level 5: Research Suites', kwh: 490, baseline: 560 },
    ]
  },
  'School of Engineering': {
    id: 'bldg-soe',
    name: 'School of Engineering',
    shortName: 'Engineering & Applied Sciences',
    code: 'SOE',
    category: 'Heavy Labs & Prototyping',
    areaSqFt: 145000,
    solarKwPeak: 95,
    leedStatus: 'LEED Gold Dynamic',
    efficiencyPercent: 13.5,
    description: 'Engineering academic block housing wind tunnels, electronics cleanrooms, mechatronics workshops, and heavy machinery testing bays.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    floorsCount: 5,
    energyData: [
      { floor: 'Level 1: Fabrication Bay', kwh: 810, baseline: 930 },
      { floor: 'Level 2: VLSI Cleanrooms', kwh: 960, baseline: 1110 },
      { floor: 'Level 3: Aerodynamics Flume', kwh: 720, baseline: 840 },
      { floor: 'Level 4: Microgrid Labs', kwh: 580, baseline: 680 },
      { floor: 'Level 5: Research Cleanroom', kwh: 690, baseline: 790 },
    ]
  },
  'CDSIMER': {
    id: 'bldg-cds',
    name: 'CDSIMER',
    shortName: 'Central Administration & Research',
    code: 'CDS',
    category: 'Governance & Institutional Operations',
    areaSqFt: 110000,
    solarKwPeak: 75,
    leedStatus: 'LEED Platinum Executive',
    efficiencyPercent: 15.4,
    description: 'Iconic central rotunda and administrative dome featuring central governance, sustainability strategy suites, and smart campus dispatch center.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    floorsCount: 5,
    energyData: [
      { floor: 'Level 1: Central Rotunda', kwh: 380, baseline: 460 },
      { floor: 'Level 2: Executive Chambers', kwh: 490, baseline: 580 },
      { floor: 'Level 3: Operations Twin Hub', kwh: 440, baseline: 520 },
      { floor: 'Level 4: Climate Strategy', kwh: 360, baseline: 430 },
      { floor: 'Level 5: Rooftop Observatory', kwh: 310, baseline: 370 },
    ]
  }
};

const INITIAL_ROOMS_DATA: Record<string, Record<number, RoomData[]>> = {
  'AI Block': {
    1: [
      { id: 'rm-ai-101', name: 'Robotics Arena & Flight Cage', occupancy: 14, maxCapacity: 30, tempC: 22.0, humidityPercent: 45, ventilationCfm: 560, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-102', name: 'Machine Learning Sandbox', occupancy: 24, maxCapacity: 35, tempC: 21.4, humidityPercent: 42, ventilationCfm: 820, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-103', name: 'Autonomous Rover Bay', occupancy: 0, maxCapacity: 20, tempC: 23.6, humidityPercent: 50, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-ai-104', name: 'AI Exhibition Gallery', occupancy: 8, maxCapacity: 40, tempC: 22.5, humidityPercent: 47, ventilationCfm: 380, lightsActive: true, hvacStatus: 'cooling' },
    ],
    2: [
      { id: 'rm-ai-201', name: 'GPU Cluster Pod Alpha', occupancy: 6, maxCapacity: 15, tempC: 19.8, humidityPercent: 38, ventilationCfm: 940, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-202', name: 'Computer Vision Lab', occupancy: 18, maxCapacity: 28, tempC: 21.2, humidityPercent: 44, ventilationCfm: 680, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-203', name: 'NLP & Audio Synthesis Suite', occupancy: 0, maxCapacity: 16, tempC: 23.5, humidityPercent: 51, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-ai-204', name: 'AI Postgrad Incubator', occupancy: 12, maxCapacity: 25, tempC: 22.1, humidityPercent: 46, ventilationCfm: 500, lightsActive: true, hvacStatus: 'cooling' },
    ],
    3: [
      { id: 'rm-ai-301', name: 'Tensor Computing Studio', occupancy: 16, maxCapacity: 25, tempC: 20.2, humidityPercent: 40, ventilationCfm: 860, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-302', name: 'Quantum Simulation Pod', occupancy: 2, maxCapacity: 10, tempC: 19.0, humidityPercent: 36, ventilationCfm: 720, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-303', name: 'Bio-Cybernetics Suite', occupancy: 9, maxCapacity: 20, tempC: 21.8, humidityPercent: 45, ventilationCfm: 410, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-304', name: 'AI Ethics Boardroom', occupancy: 0, maxCapacity: 30, tempC: 23.5, humidityPercent: 50, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    4: [
      { id: 'rm-ai-401', name: 'Edge AI IoT Prototyping', occupancy: 10, maxCapacity: 22, tempC: 22.0, humidityPercent: 47, ventilationCfm: 440, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-402', name: 'Reinforcement Learning Bay', occupancy: 17, maxCapacity: 30, tempC: 21.0, humidityPercent: 43, ventilationCfm: 650, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-403', name: 'Cognitive Architecture Studio', occupancy: 5, maxCapacity: 15, tempC: 22.4, humidityPercent: 48, ventilationCfm: 290, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-404', name: 'Faculty AI Workspace', occupancy: 0, maxCapacity: 18, tempC: 23.8, humidityPercent: 52, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    5: [
      { id: 'rm-ai-501', name: 'Supercomputing Core DC-1', occupancy: 3, maxCapacity: 8, tempC: 18.5, humidityPercent: 35, ventilationCfm: 1250, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-502', name: 'Liquid Immersion Vault', occupancy: 1, maxCapacity: 6, tempC: 17.8, humidityPercent: 32, ventilationCfm: 1100, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-ai-503', name: 'High-Density Server Racks', occupancy: 0, maxCapacity: 4, tempC: 18.2, humidityPercent: 34, ventilationCfm: 950, lightsActive: false, hvacStatus: 'cooling' },
      { id: 'rm-ai-504', name: 'DC Operations & Control Hub', occupancy: 4, maxCapacity: 12, tempC: 21.5, humidityPercent: 44, ventilationCfm: 350, lightsActive: true, hvacStatus: 'cooling' },
    ]
  },
  'Emergency Block': {
    1: [
      { id: 'rm-emg-101', name: 'Triage Bay & Trauma Intake', occupancy: 16, maxCapacity: 20, tempC: 20.8, humidityPercent: 45, ventilationCfm: 880, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-102', name: 'Resuscitation Suite 1A', occupancy: 6, maxCapacity: 10, tempC: 20.5, humidityPercent: 48, ventilationCfm: 950, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-103', name: 'Rapid Paramedic Dispatch', occupancy: 9, maxCapacity: 15, tempC: 22.0, humidityPercent: 50, ventilationCfm: 430, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-104', name: 'Decontamination Airlock', occupancy: 0, maxCapacity: 8, tempC: 21.8, humidityPercent: 52, ventilationCfm: 250, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    2: [
      { id: 'rm-emg-201', name: 'Surgical Operating Theatre 1', occupancy: 8, maxCapacity: 12, tempC: 18.8, humidityPercent: 52, ventilationCfm: 1300, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-202', name: 'Surgical Operating Theatre 2', occupancy: 0, maxCapacity: 12, tempC: 20.0, humidityPercent: 50, ventilationCfm: 350, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-emg-203', name: 'Intensive Care Unit (ICU-A)', occupancy: 11, maxCapacity: 14, tempC: 21.2, humidityPercent: 46, ventilationCfm: 920, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-204', name: 'Post-Anesthesia Recovery', occupancy: 5, maxCapacity: 10, tempC: 22.2, humidityPercent: 48, ventilationCfm: 500, lightsActive: true, hvacStatus: 'cooling' },
    ],
    3: [
      { id: 'rm-emg-301', name: 'Trauma Simulation Centre', occupancy: 19, maxCapacity: 25, tempC: 21.6, humidityPercent: 45, ventilationCfm: 710, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-302', name: 'Disaster Management Hub', occupancy: 12, maxCapacity: 20, tempC: 21.8, humidityPercent: 47, ventilationCfm: 550, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-303', name: 'Clinical Airway Skill Lab', occupancy: 0, maxCapacity: 15, tempC: 23.2, humidityPercent: 50, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-emg-304', name: 'Sterile Supply Depot', occupancy: 2, maxCapacity: 6, tempC: 20.5, humidityPercent: 40, ventilationCfm: 320, lightsActive: true, hvacStatus: 'cooling' },
    ],
    4: [
      { id: 'rm-emg-401', name: 'CT / MRI Diagnostic Suite', occupancy: 4, maxCapacity: 8, tempC: 19.5, humidityPercent: 42, ventilationCfm: 820, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-402', name: 'Urgent Blood Bank & Cold Chain', occupancy: 2, maxCapacity: 6, tempC: 18.0, humidityPercent: 38, ventilationCfm: 600, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-403', name: 'Point-of-Care Pathology Lab', occupancy: 7, maxCapacity: 12, tempC: 21.4, humidityPercent: 44, ventilationCfm: 490, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-404', name: 'Radiologist Reading Room', occupancy: 0, maxCapacity: 10, tempC: 23.0, humidityPercent: 49, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    5: [
      { id: 'rm-emg-501', name: 'Helipad Air Crew Quarters', occupancy: 3, maxCapacity: 8, tempC: 22.5, humidityPercent: 48, ventilationCfm: 320, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-502', name: 'Airborne Infection Isolation', occupancy: 1, maxCapacity: 4, tempC: 20.2, humidityPercent: 55, ventilationCfm: 990, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-emg-503', name: 'Negative Pressure Cleanroom', occupancy: 0, maxCapacity: 6, tempC: 20.5, humidityPercent: 50, ventilationCfm: 450, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-emg-504', name: 'Emergency Roof Logistics', occupancy: 2, maxCapacity: 10, tempC: 23.0, humidityPercent: 52, ventilationCfm: 280, lightsActive: true, hvacStatus: 'cooling' },
    ]
  },
  'Nursing': {
    1: [
      { id: 'rm-nur-101', name: 'Patient Simulation Clinic', occupancy: 15, maxCapacity: 25, tempC: 22.0, humidityPercent: 48, ventilationCfm: 580, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-102', name: 'Community Health Reception', occupancy: 10, maxCapacity: 30, tempC: 22.5, humidityPercent: 50, ventilationCfm: 450, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-103', name: 'Anatomy Demonstration Hall', occupancy: 0, maxCapacity: 35, tempC: 23.6, humidityPercent: 52, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-nur-104', name: 'Nurse Station Call Center', occupancy: 6, maxCapacity: 12, tempC: 22.2, humidityPercent: 46, ventilationCfm: 320, lightsActive: true, hvacStatus: 'cooling' },
    ],
    2: [
      { id: 'rm-nur-201', name: 'Biotech Lab A', occupancy: 18, maxCapacity: 25, tempC: 22.4, humidityPercent: 48, ventilationCfm: 650, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-202', name: 'Microscopy Suite', occupancy: 4, maxCapacity: 12, tempC: 21.8, humidityPercent: 44, ventilationCfm: 280, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-203', name: 'Faculty Conference 2A', occupancy: 0, maxCapacity: 20, tempC: 23.5, humidityPercent: 50, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-nur-204', name: 'Graduate Seminar 204', occupancy: 12, maxCapacity: 35, tempC: 22.8, humidityPercent: 46, ventilationCfm: 440, lightsActive: true, hvacStatus: 'cooling' },
    ],
    3: [
      { id: 'rm-nur-301', name: 'Pediatric Simulation Ward', occupancy: 14, maxCapacity: 20, tempC: 22.2, humidityPercent: 49, ventilationCfm: 540, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-302', name: 'Clinical Skills Lab 3B', occupancy: 20, maxCapacity: 25, tempC: 21.9, humidityPercent: 47, ventilationCfm: 710, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-303', name: 'Intravenous Infusion Suite', occupancy: 3, maxCapacity: 10, tempC: 22.5, humidityPercent: 45, ventilationCfm: 240, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-304', name: 'Faculty Briefing Room', occupancy: 0, maxCapacity: 15, tempC: 23.8, humidityPercent: 51, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    4: [
      { id: 'rm-nur-401', name: 'Health Informatics Hub', occupancy: 16, maxCapacity: 30, tempC: 21.8, humidityPercent: 44, ventilationCfm: 590, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-402', name: 'Rehabilitation Therapy Lab', occupancy: 8, maxCapacity: 18, tempC: 22.4, humidityPercent: 48, ventilationCfm: 380, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-403', name: 'Nursing Research Library', occupancy: 5, maxCapacity: 20, tempC: 22.8, humidityPercent: 46, ventilationCfm: 290, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-404', name: 'Dean Research Executive Room', occupancy: 0, maxCapacity: 12, tempC: 23.6, humidityPercent: 50, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    5: [
      { id: 'rm-nur-501', name: 'Bio-Containment Training Lab', occupancy: 6, maxCapacity: 12, tempC: 20.8, humidityPercent: 42, ventilationCfm: 520, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-502', name: 'Equipment Calibration Suite', occupancy: 2, maxCapacity: 8, tempC: 21.4, humidityPercent: 40, ventilationCfm: 280, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-nur-503', name: 'Sterile Prep Area 503', occupancy: 0, maxCapacity: 6, tempC: 21.0, humidityPercent: 45, ventilationCfm: 200, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-nur-504', name: 'Postgraduate Study Loft', occupancy: 7, maxCapacity: 15, tempC: 22.6, humidityPercent: 47, ventilationCfm: 340, lightsActive: true, hvacStatus: 'cooling' },
    ]
  },
  'School of Engineering': {
    1: [
      { id: 'rm-soe-101', name: 'Heavy Machinery Workshop', occupancy: 12, maxCapacity: 25, tempC: 22.5, humidityPercent: 50, ventilationCfm: 720, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-102', name: 'Materials Tensile Testing', occupancy: 6, maxCapacity: 15, tempC: 21.8, humidityPercent: 46, ventilationCfm: 420, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-103', name: 'Fluid Dynamics Flume Hub', occupancy: 0, maxCapacity: 20, tempC: 23.4, humidityPercent: 52, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-soe-104', name: 'FabLab 3D Rapid Prototype', occupancy: 15, maxCapacity: 30, tempC: 22.0, humidityPercent: 44, ventilationCfm: 600, lightsActive: true, hvacStatus: 'cooling' },
    ],
    2: [
      { id: 'rm-soe-201', name: 'VLSI & Silicon Cleanroom', occupancy: 5, maxCapacity: 10, tempC: 19.8, humidityPercent: 36, ventilationCfm: 980, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-202', name: 'Embedded Systems Testbed', occupancy: 18, maxCapacity: 25, tempC: 21.4, humidityPercent: 44, ventilationCfm: 660, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-203', name: 'Mechatronics Prototyping', occupancy: 8, maxCapacity: 18, tempC: 22.2, humidityPercent: 48, ventilationCfm: 390, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-204', name: 'Faculty Engineering Lounge', occupancy: 0, maxCapacity: 15, tempC: 23.6, humidityPercent: 50, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    3: [
      { id: 'rm-soe-301', name: 'Aerodynamics Wind Tunnel', occupancy: 4, maxCapacity: 12, tempC: 20.6, humidityPercent: 42, ventilationCfm: 820, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-302', name: 'CAD/CAM Simulation Studio', occupancy: 22, maxCapacity: 35, tempC: 21.8, humidityPercent: 45, ventilationCfm: 780, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-303', name: 'Structural Acoustics Suite', occupancy: 0, maxCapacity: 14, tempC: 23.4, humidityPercent: 51, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-soe-304', name: 'Thermal Systems Testbed', occupancy: 7, maxCapacity: 16, tempC: 22.0, humidityPercent: 47, ventilationCfm: 380, lightsActive: true, hvacStatus: 'cooling' },
    ],
    4: [
      { id: 'rm-soe-401', name: 'Microgrid & Power Electronics', occupancy: 11, maxCapacity: 20, tempC: 21.5, humidityPercent: 43, ventilationCfm: 520, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-402', name: 'Nano-Engineering Clean Bay', occupancy: 3, maxCapacity: 8, tempC: 19.5, humidityPercent: 35, ventilationCfm: 850, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-403', name: 'Industrial Automation Lab', occupancy: 14, maxCapacity: 24, tempC: 22.1, humidityPercent: 46, ventilationCfm: 550, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-404', name: 'Engineering Seminar 404', occupancy: 0, maxCapacity: 30, tempC: 23.5, humidityPercent: 50, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    5: [
      { id: 'rm-soe-501', name: 'Advanced Materials Synthesis', occupancy: 4, maxCapacity: 10, tempC: 20.4, humidityPercent: 39, ventilationCfm: 710, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-502', name: 'Precision Metrology Lab', occupancy: 2, maxCapacity: 6, tempC: 20.0, humidityPercent: 38, ventilationCfm: 590, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-soe-503', name: 'High-Vacuum Deposition Bay', occupancy: 0, maxCapacity: 6, tempC: 21.2, humidityPercent: 42, ventilationCfm: 320, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-soe-504', name: 'Engineering Dean Boardroom', occupancy: 5, maxCapacity: 18, tempC: 22.4, humidityPercent: 48, ventilationCfm: 290, lightsActive: true, hvacStatus: 'cooling' },
    ]
  },
  'CDSIMER': {
    1: [
      { id: 'rm-cds-101', name: 'Central Rotunda & Exhibition', occupancy: 28, maxCapacity: 60, tempC: 22.4, humidityPercent: 48, ventilationCfm: 920, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-102', name: 'Public Relations & Reception', occupancy: 12, maxCapacity: 25, tempC: 22.8, humidityPercent: 50, ventilationCfm: 480, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-103', name: 'University Council Chamber', occupancy: 0, maxCapacity: 45, tempC: 23.5, humidityPercent: 52, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-cds-104', name: 'Sustainability Showcase Wing', occupancy: 9, maxCapacity: 30, tempC: 22.6, humidityPercent: 47, ventilationCfm: 390, lightsActive: true, hvacStatus: 'cooling' },
    ],
    2: [
      { id: 'rm-cds-201', name: 'Executive Council Boardroom', occupancy: 16, maxCapacity: 24, tempC: 21.8, humidityPercent: 46, ventilationCfm: 650, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-202', name: 'Chief Sustainability Officer', occupancy: 3, maxCapacity: 8, tempC: 22.2, humidityPercent: 48, ventilationCfm: 250, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-203', name: 'Academic Senate Chamber', occupancy: 0, maxCapacity: 40, tempC: 23.8, humidityPercent: 51, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-cds-204', name: 'University Secretariat Office', occupancy: 8, maxCapacity: 15, tempC: 22.5, humidityPercent: 49, ventilationCfm: 360, lightsActive: true, hvacStatus: 'cooling' },
    ],
    3: [
      { id: 'rm-cds-301', name: 'Digital Twin Central Ops', occupancy: 10, maxCapacity: 18, tempC: 21.0, humidityPercent: 43, ventilationCfm: 560, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-302', name: 'Institutional Analytics Hub', occupancy: 14, maxCapacity: 22, tempC: 21.5, humidityPercent: 45, ventilationCfm: 580, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-303', name: 'Grant Development Studio', occupancy: 0, maxCapacity: 16, tempC: 23.6, humidityPercent: 50, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-cds-304', name: 'Global Partnerships Desk', occupancy: 4, maxCapacity: 12, tempC: 22.8, humidityPercent: 48, ventilationCfm: 260, lightsActive: true, hvacStatus: 'cooling' },
    ],
    4: [
      { id: 'rm-cds-401', name: 'Climate Strategy Policy Room', occupancy: 8, maxCapacity: 20, tempC: 22.0, humidityPercent: 47, ventilationCfm: 410, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-402', name: 'Campus Facilities Dispatch', occupancy: 11, maxCapacity: 16, tempC: 21.8, humidityPercent: 46, ventilationCfm: 490, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-403', name: 'Vice-Chancellor Protocol Suite', occupancy: 2, maxCapacity: 8, tempC: 22.4, humidityPercent: 48, ventilationCfm: 220, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-404', name: 'Executive Press & Briefing', occupancy: 0, maxCapacity: 35, tempC: 23.8, humidityPercent: 52, ventilationCfm: 90, lightsActive: false, hvacStatus: 'eco_standby' },
    ],
    5: [
      { id: 'rm-cds-501', name: 'Rooftop Solar & Weather DC', occupancy: 3, maxCapacity: 8, tempC: 21.2, humidityPercent: 44, ventilationCfm: 310, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-502', name: 'Dome Observatory Lounge', occupancy: 6, maxCapacity: 25, tempC: 22.6, humidityPercent: 49, ventilationCfm: 380, lightsActive: true, hvacStatus: 'cooling' },
      { id: 'rm-cds-503', name: 'University Archive Safe Room', occupancy: 0, maxCapacity: 6, tempC: 20.0, humidityPercent: 40, ventilationCfm: 180, lightsActive: false, hvacStatus: 'eco_standby' },
      { id: 'rm-cds-504', name: 'Provost Executive Terraces', occupancy: 4, maxCapacity: 15, tempC: 23.0, humidityPercent: 50, ventilationCfm: 250, lightsActive: true, hvacStatus: 'cooling' },
    ]
  }
};

export const Track4GreenBuildingPage: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('AI Block');
  const [selectedFloor, setSelectedFloor] = useState<number>(2);

  // Deep clone of rooms so modifications are maintained per building and floor
  const [roomsData, setRoomsData] = useState<Record<string, Record<number, RoomData[]>>>(() => {
    return JSON.parse(JSON.stringify(INITIAL_ROOMS_DATA));
  });

  const activeBuildingProfile = BUILDINGS_CATALOG[selectedBuilding] || BUILDINGS_CATALOG['AI Block'];
  const currentFloorRooms = roomsData[selectedBuilding]?.[selectedFloor] || [];
  
  const [selectedRoomId, setSelectedRoomId] = useState<string>(() => {
    return currentFloorRooms[0]?.id || 'rm-ai-201';
  });

  // Whenever building or floor changes, synchronize active room
  useEffect(() => {
    const rooms = roomsData[selectedBuilding]?.[selectedFloor] || [];
    if (rooms.length > 0) {
      const match = rooms.find(r => r.id === selectedRoomId);
      if (!match) {
        setSelectedRoomId(rooms[0].id);
      }
    }
  }, [selectedBuilding, selectedFloor, roomsData, selectedRoomId]);

  const activeRoom = currentFloorRooms.find(r => r.id === selectedRoomId) || currentFloorRooms[0] || {
    id: 'unknown',
    name: 'Zone Monitoring',
    occupancy: 0,
    maxCapacity: 20,
    tempC: 22.0,
    humidityPercent: 45,
    ventilationCfm: 90,
    lightsActive: false,
    hvacStatus: 'eco_standby' as const
  };

  const handleUpdateOccupancy = (newCount: number) => {
    setRoomsData(prev => {
      const bldgRooms = prev[selectedBuilding] || {};
      const flRooms = bldgRooms[selectedFloor] || [];
      const updated = flRooms.map(r => {
        if (r.id !== activeRoom.id) return r;
        const isVacant = newCount === 0;
        
        // Dynamic formula: minimum baseline CFM when vacant (90 CFM), scales based on building type
        let baseCfm = 140;
        let perHead = 30;
        if (selectedBuilding === 'Emergency Block') {
          baseCfm = 280;
          perHead = 45;
        } else if (selectedBuilding === 'AI Block') {
          baseCfm = 220;
          perHead = 35;
        }

        const calculatedCfm = isVacant ? 90 : Math.round(baseCfm + newCount * perHead);
        const calculatedTemp = isVacant ? 23.8 : 21.6;

        const updatedRoom: RoomData = {
          ...r,
          occupancy: newCount,
          ventilationCfm: calculatedCfm,
          tempC: calculatedTemp,
          lightsActive: !isVacant,
          hvacStatus: isVacant ? 'eco_standby' : 'cooling'
        };
        return updatedRoom;
      });

      return {
        ...prev,
        [selectedBuilding]: {
          ...bldgRooms,
          [selectedFloor]: updated
        }
      };
    });
  };

  // Generate contextual AI recommendation
  const getAiRecommendation = () => {
    const pct = activeRoom.maxCapacity > 0 ? ((activeRoom.occupancy / activeRoom.maxCapacity) * 100).toFixed(0) : '0';
    if (activeRoom.occupancy === 0) {
      return `${activeRoom.name} in ${selectedBuilding} is currently vacant. Automated logic curtailed ventilation to standby baseline (90 CFM) and shifted the thermal setpoint to +1.8°C, eliminating approximately 4.8 kWh/hour in unneeded fan and chiller load.`;
    }
    if (selectedBuilding === 'AI Block') {
      return `${activeRoom.name} is operating at ${pct}% capacity (${activeRoom.occupancy} heads). GPU rack thermal dissipation detected; ventilation dynamically boosted to ${activeRoom.ventilationCfm} CFM to balance ambient airflow and maintain rack inlet temperature below 22°C.`;
    }
    if (selectedBuilding === 'Emergency Block') {
      return `${activeRoom.name} has ${activeRoom.occupancy} active personnel. Clinical positive-pressure air balancing engaged at ${activeRoom.ventilationCfm} CFM to ensure strict particulate dilution (>15 air changes/hour) compliant with healthcare ISO cleanroom standards.`;
    }
    if (selectedBuilding === 'School of Engineering') {
      return `${activeRoom.name} headcount is ${activeRoom.occupancy} occupants. Airflow modulated to ${activeRoom.ventilationCfm} CFM to handle particulate dissipation from lab instrumentation and maintain optimal IAQ setpoints.`;
    }
    return `${activeRoom.name} has ${activeRoom.occupancy} occupants (${pct}% capacity). Dynamic damper control boosted ventilation to ${activeRoom.ventilationCfm} CFM, keeping ambient CO2 under 650 ppm for cognitive productivity.`;
  };

  const buildingNames = Object.keys(BUILDINGS_CATALOG);

  return (
    <div className="space-y-16 pb-24 text-left">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 text-teal-400 border border-teal-500/30 text-xs font-mono">
                <Building2 className="w-3.5 h-3.5" />
                <span>TRACK 04: INDOOR ENVIRONMENT & 2D DIGITAL TWIN</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-100">
                Green Building Digital Twin <br />
                <span className="text-teal-400">& Micro-Climate Optimizer</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                {activeBuildingProfile.description}
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                  Target Facility: <strong className="text-teal-400">{activeBuildingProfile.name}</strong> ({activeBuildingProfile.code})
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 font-semibold">
                  {activeBuildingProfile.leedStatus}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-300">
                  ⚡ {activeBuildingProfile.solarKwPeak} kWp Rooftop Solar
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-purple-950/50 border border-purple-500/30 text-purple-300">
                  🌱 -{activeBuildingProfile.efficiencyPercent}% Load Reduction
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-teal-500/30 glass-card shadow-2xl relative">
                <img 
                  src={activeBuildingProfile.image} 
                  alt={activeBuildingProfile.name} 
                  className="w-full h-56 object-cover transition-all duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] uppercase font-mono text-teal-400 block font-bold">
                    Spatial Airflow & Telemetry Balancing
                  </span>
                  <span className="text-slate-200 font-medium">
                    {activeBuildingProfile.shortName} • {activeBuildingProfile.areaSqFt.toLocaleString()} sq.ft
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Building & Floor Selector Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border border-slate-800 shadow-xl">
          
          {/* Building Selector (Tabs & Dropdown) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-400" />
              Campus Block:
            </span>

            {/* Quick-Select Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {buildingNames.map((bldg) => {
                const isSelected = selectedBuilding === bldg;
                const isAiOrEmg = bldg === 'AI Block' || bldg === 'Emergency Block';
                return (
                  <button
                    key={bldg}
                    type="button"
                    onClick={() => {
                      setSelectedBuilding(bldg);
                      setSelectedFloor(2);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md font-bold scale-[1.02]'
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {bldg === 'AI Block' && <Cpu className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-purple-400'}`} />}
                    {bldg === 'Emergency Block' && <Activity className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-rose-400'}`} />}
                    <span>{bldg}</span>
                    {isAiOrEmg && (
                      <span className={`text-[9px] px-1 rounded uppercase font-mono ${
                        isSelected ? 'bg-slate-950 text-teal-300' : 'bg-slate-800 text-teal-400'
                      }`}>
                        New
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floor Level Selector */}
          <div className="flex items-center gap-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Floor:
            </span>
            {Array.from({ length: activeBuildingProfile.floorsCount }, (_, i) => i + 1).map(fl => (
              <button
                key={fl}
                type="button"
                onClick={() => setSelectedFloor(fl)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition border ${
                  selectedFloor === fl 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                L{fl}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2D Interactive Floor Plan & Room Telemetry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-100 flex items-center gap-2">
              <span>{activeBuildingProfile.name} Floor Plan — Level {selectedFloor}</span>
              <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-normal">
                {activeBuildingProfile.code}-FL{selectedFloor}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any room zone to inspect live ventilation CFM, temperature setpoints, and simulate headcount modulation.
            </p>
          </div>
          <span className="text-xs font-mono text-teal-400 bg-teal-950/40 border border-teal-800/40 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Dynamic Twin Node Online
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2D Floor Plan Layout (8 cols) */}
          <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-teal-400" />
                Floor Spatial Blueprint ({selectedBuilding} Level {selectedFloor})
              </span>
              <span className="font-mono text-[11px] text-teal-400">{currentFloorRooms.length} Monitored Zones</span>
            </div>

            {/* Room Blueprint Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[360px] bg-slate-950/90 p-4 rounded-xl border border-slate-800 relative">
              {currentFloorRooms.map(room => {
                const isSelected = room.id === activeRoom.id;
                const isEco = room.hvacStatus === 'eco_standby';

                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`rounded-xl p-4 cursor-pointer border flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-teal-400 bg-teal-950/40 ring-2 ring-teal-400/50 shadow-xl scale-[1.01]'
                        : isEco
                        ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                        : 'border-slate-700/80 bg-slate-900/80 hover:border-teal-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold font-display text-slate-100 block">
                          {room.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{room.id}</span>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${
                        isEco 
                          ? 'bg-slate-800/80 text-slate-400 border-slate-700' 
                          : 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                      }`}>
                        {room.hvacStatus.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 my-3 text-center text-xs">
                      <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                        <Users className="w-3.5 h-3.5 text-cyan-400 mx-auto mb-0.5" />
                        <span className="text-slate-100 font-bold block">{room.occupancy}</span>
                        <span className="text-[9px] text-slate-500">Heads</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                        <Thermometer className="w-3.5 h-3.5 text-amber-400 mx-auto mb-0.5" />
                        <span className="text-slate-100 font-bold block">{room.tempC}°C</span>
                        <span className="text-[9px] text-slate-500">Temp</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                        <Wind className="w-3.5 h-3.5 text-teal-400 mx-auto mb-0.5" />
                        <span className="text-slate-100 font-bold block">{room.ventilationCfm}</span>
                        <span className="text-[9px] text-slate-500">CFM</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>Lighting: <strong className={room.lightsActive ? 'text-amber-400 font-semibold' : 'text-slate-500'}>{room.lightsActive ? 'ACTIVE (450 Lux)' : 'STANDBY'}</strong></span>
                      <span className="font-mono text-[10px] text-slate-400">Cap: {room.maxCapacity}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 gap-2">
              <span>Rooms automatically transition to Eco Standby when zero occupants are confirmed.</span>
              <span className="text-teal-400 font-mono text-[11px]">ASHRAE 62.1 & LEED IEQ Compliance</span>
            </div>
          </div>

          {/* Room Control Inspector (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-teal-500/30 text-left space-y-4">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-mono text-teal-400 uppercase font-bold block">
                  Room Twin Controller • {activeRoom.id}
                </span>
                <h3 className="text-lg font-bold text-slate-100">{activeRoom.name}</h3>
                <span className="text-xs text-slate-400">
                  {selectedBuilding} — Floor {selectedFloor} (Max {activeRoom.maxCapacity} Occupants)
                </span>
              </div>

              {/* Occupancy slider */}
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Simulate Headcount:</span>
                  <span className="font-mono text-teal-400 font-bold">{activeRoom.occupancy} occupants</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={activeRoom.maxCapacity}
                  value={activeRoom.occupancy}
                  onChange={(e) => handleUpdateOccupancy(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0 (Vacant)</span>
                  <span>{activeRoom.maxCapacity} (Max Full)</span>
                </div>
              </div>

              {/* Dynamic telemetry output */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Ventilation Demand:</span>
                  <span className="font-mono font-bold text-teal-400">{activeRoom.ventilationCfm} CFM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Indoor Temp Setpoint:</span>
                  <span className="font-mono font-bold text-amber-300">{activeRoom.tempC}°C</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">HVAC Operational State:</span>
                  <span className="font-mono font-bold capitalize text-slate-200">{activeRoom.hvacStatus.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Illumination State:</span>
                  <span className={`font-mono font-bold ${activeRoom.lightsActive ? 'text-amber-400' : 'text-slate-500'}`}>
                    {activeRoom.lightsActive ? 'Active (Lux 450)' : 'Dormant (Lux 0)'}
                  </span>
                </div>
              </div>
            </div>

            {/* GenAI Explanatory Recommendation */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 text-xs text-slate-300 space-y-1.5 shadow-lg">
              <div className="flex items-center gap-1.5 text-purple-400 font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GENAI MICRO-CLIMATE RECOMMENDATION</span>
              </div>
              <p className="leading-relaxed text-[11px] text-slate-300">
                {getAiRecommendation()}
              </p>
            </div>

          </div>

        </div>

        {/* Floor Energy Chart for Selected Building */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 mt-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <span>{selectedBuilding} — Electric Power Draw by Floor Level (kWh / Day)</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Live Building Profile
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing current dynamic twin managed load against unmanaged historical baseline across all {activeBuildingProfile.floorsCount} floors
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
              -{activeBuildingProfile.efficiencyPercent}% Load Reduction
            </span>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeBuildingProfile.energyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="floor" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                <Bar dataKey="baseline" fill="#475569" radius={[4, 4, 0, 0]} name="Baseline (kWh)" />
                <Bar dataKey="kwh" radius={[4, 4, 0, 0]} name="Dynamic Twin Managed (kWh)">
                  {activeBuildingProfile.energyData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === selectedFloor - 1 ? '#14b8a6' : '#0d9488'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* Next CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-100">Proceed to Carbon Footprint Intelligence</h4>
            <p className="text-xs text-slate-400 mt-0.5">Explore Scope 1, 2, and 3 accounting with interactive emissions scenario modeling.</p>
          </div>
          <a
            href="/tracks/carbon-intelligence"
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
          >
            <span>Launch Track 05</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
};
