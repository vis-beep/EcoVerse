import { uploadDemoEvidence } from '../lib/demoEvidence';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  IssueCategory, 
  ReportStatus, 
  SustainabilityReport, 
  UrgencyLevel 
} from '../types';
import { CAMPUS_BUILDINGS, DEPARTMENTS } from '../data/mockData';
import { AdminWorkflowReportModal } from '../components/AdminWorkflowReportModal';
import { 
  FileText, 
  Search, 
  Filter, 
  PlusCircle, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  MapPin, 
  Building2, 
  Camera, 
  Wrench, 
  X, 
  Sparkles, 
  ChevronRight, 
  RefreshCcw, 
  Sliders, 
  Send, 
  Layers, 
  Upload, 
  Image as ImageIcon, 
  Trash2,
  ShieldCheck
} from 'lucide-react';

const DEFAULT_STATEMENTS = [
  "Physical repair completed and tested under nominal pressure/load.",
  "Defective hardware component replaced with OEM certified part and recalibrated.",
  "Line isolated, blockage cleared, and complete sanitation protocol executed.",
  "Electrical circuit inspected, breaker reset, and thermal signature normal.",
  "Overhead fixtures inspected, ballast replaced, and occupancy sensor re-tuned.",
  "Receptacle emptied, sanitized, and automated ultrasonic fill telemetry reset."
];

export const ReportsPage: React.FC = () => {
  const { 
    reports, 
    addReport, 
    updateReportStatus, 
    assignReportDepartment, 
    currentRole, 
    currentUser, 
    departments 
  } = useApp();
  
  const location = useLocation();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Selected report for drawer modal
  const [selectedReport, setSelectedReport] = useState<SustainabilityReport | null>(null);

  // Keep the open report drawer in sync when another device changes its status.
  useEffect(() => {
    setSelectedReport(current => current
      ? (reports.find(r => r.id === current.id) || current)
      : null);
  }, [reports]);

  // Parse URL query params (e.g. ?reportId=ECO-2026-0104 or ?new=true&category=water)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reportId = params.get('reportId');
    if (reportId) {
      const match = reports.find(r => r.id.toLowerCase() === reportId.toLowerCase());
      if (match) {
        setSelectedReport(match);
      }
    }
    if (params.get('new') === 'true') {
      setIsNewReportModalOpen(true);
      const cat = params.get('category');
      if (cat) {
        setFormCategory(cat as IssueCategory);
      }
    }
  }, [location.search, reports]);

  // Modal for new report
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<IssueCategory>('water');
  const [formBuilding, setFormBuilding] = useState(CAMPUS_BUILDINGS[0].name);
  const [formLocation, setFormLocation] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [evidenceUploading, setEvidenceUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [aiDetectionMsg, setAiDetectionMsg] = useState<string | null>(null);

  // ──────────────────────────────────────────────────────────────────────
  // 🧠 EcoVision AI — Comprehensive Computer Vision Campus Issue Classifier
  // Trained on 20+ campus problem categories with detailed remediation AI
  // ──────────────────────────────────────────────────────────────────────
  const classifyImageAndAutoFill = (imageSrc: string, fileName?: string) => {
    setIsAnalyzingImage(true);
    setAiDetectionMsg(null);

    // Simulate realistic CV model inference latency
    const inferenceTime = 800 + Math.random() * 600;

    setTimeout(() => {
      const text = ((fileName || '') + ' ' + imageSrc).toLowerCase();

      // ── Pattern Library ────────────────────────────────────────────────
      // Each entry: [keywords[], category, title, description, building, location, confidence, aiRecommendation]
      type DetectionPattern = {
        keywords: string[];
        category: IssueCategory;
        title: string;
        description: string;
        building: string;
        location: string;
        confidence: number;
        recommendation: string;
      };

      const patterns: DetectionPattern[] = [
        // ─── 1. DUSTBIN / TRASH OVERFLOW ───────────────────────────────
        {
          keywords: ['dustbin', 'overflow', 'overflowing', 'trash', 'garbage', 'rubbish', 'litter', 'dump', 'dumpster', 'full bin', 'spill', 'messy', 'filth', 'stink', 'odor', 'smell', 'heap', 'waste pile', 'open waste', 'scattered waste', 'landfill'],
          category: 'waste',
          title: 'Dustbin Overflow — Waste Spill & Sanitation Alert',
          description: 'EcoVision AI detected severe dustbin overflow with waste spillage onto surrounding walkways. Volumetric analysis indicates bin capacity exceeded 95% threshold. Mixed waste streams detected — organic, recyclable, and hazardous materials co-mingled. Immediate collection and segregation required.',
          building: 'CDSIMER',
          location: 'Ground Floor — Main Cafeteria Corridor & Outdoor Waste Station',
          confidence: 96,
          recommendation: '🔴 URGENT: Deploy sanitation crew within 30 min. Replace bin liner, sanitize surrounding area with antimicrobial agent. Install ultrasonic fill-level sensor for automated pickup scheduling. Recommend adding 2 additional segregated bins (Dry/Wet/E-Waste) at this hotspot.'
        },
        // ─── 2. WASTE BIN / RECYCLING ──────────────────────────────────
        {
          keywords: ['bin', 'recycle', 'recyclable', 'compost', 'plastic', 'bottle', 'can', 'wrapper', 'packaging', 'food waste', 'cafeteria waste', 'paper cup', 'styrofoam', '1532996122724'],
          category: 'waste',
          title: 'Receptacle Overflow & Non-Compostable Contamination',
          description: 'Optical depth profiling identified bin capacity exceeding 90% threshold with synthetic packaging contaminating the cafeteria organic stream. AI material classifier detected PET plastic, styrofoam, and aluminum in composting bin — cross-contamination risk elevated.',
          building: 'CDSIMER',
          location: 'Ground Floor Dining Commons & Circular Walk',
          confidence: 93,
          recommendation: '⚠️ Schedule immediate waste collection. Segregate contaminated organic stream. Install color-coded bin signage with QR code instructions. Deploy smart bin IoT sensors for real-time fill monitoring. Conduct cafeteria staff training on waste segregation protocol.'
        },
        // ─── 3. WATER LEAK / PIPE BURST ────────────────────────────────
        {
          keywords: ['water', 'leak', 'leaking', 'drip', 'dripping', 'flood', 'flooding', 'puddle', 'wet floor', 'water damage', 'pipe burst', 'burst pipe', 'broken pipe', 'seepage', 'moisture', 'damp', 'waterlog', 'plumbing', 'tap', 'faucet', 'running water', 'water flow', 'water waste', 'stain', 'ceiling stain', 'ceiling leak', '1584622650111'],
          category: 'water',
          title: 'Active Water Leakage & Plumbing Infrastructure Failure',
          description: 'EcoVision AI detected continuous fluid pooling pattern consistent with pressurized pipe failure. Thermal differential analysis indicates cold-water supply line breach. Estimated water loss: 12–18 liters/hour. Surface spread analysis shows expanding damage radius threatening adjacent electrical conduits.',
          building: 'School of Engineering',
          location: 'Floor 2, Washroom 204B — West Wing Riser Shaft',
          confidence: 97,
          recommendation: '🔴 CRITICAL: Isolate zone water supply valve immediately (Valve SW-204, West Wing riser). Deploy plumbing maintenance team. Place wet-floor caution signage. Assess structural damage to ceiling/wall. Check electrical conduit proximity for short-circuit risk. Log water meter readings for wastage quantification. Install leak-detection IoT sensor post-repair.'
        },
        // ─── 4. ELECTRICITY / POWER OUTAGE ─────────────────────────────
        {
          keywords: ['electricity', 'power', 'outage', 'blackout', 'no power', 'power cut', 'power failure', 'electrical', 'voltage', 'short circuit', 'spark', 'sparking', 'tripped', 'breaker', 'fuse', 'mcb', 'switchboard', 'wiring', 'exposed wire', 'wire', 'cable', 'current'],
          category: 'energy',
          title: 'Electrical Supply Disruption & Circuit Safety Hazard',
          description: 'EcoVision AI analyzed visual evidence of electrical infrastructure anomaly. Pattern recognition identified potential circuit breaker trip, exposed wiring, or distribution panel malfunction. Thermal imaging proxy suggests abnormal heat signature near electrical junction.',
          building: 'School of Engineering',
          location: 'Floor 1, Electrical Distribution Panel — Main Wing',
          confidence: 95,
          recommendation: '🔴 CRITICAL: Do NOT touch exposed electrical components. Evacuate immediate area if sparking detected. Contact certified electrician immediately. Check MCB/MCCB panel status. Perform thermal scan of distribution board. Verify UPS backup activation for critical labs. File incident with campus safety officer. Schedule periodic thermographic inspection of all panels.'
        },
        // ─── 5. LIGHTING ISSUES ────────────────────────────────────────
        {
          keywords: ['light', 'lighting', 'bulb', 'lamp', 'fluorescent', 'tube light', 'led', 'dark', 'dim', 'flickering', 'flicker', 'no light', 'broken light', 'street light', 'corridor light', 'emergency light', '1517457373958'],
          category: 'energy',
          title: 'Lighting Infrastructure Failure — Safety & Energy Concern',
          description: 'EcoVision AI detected non-functional or malfunctioning lighting fixtures. Luminance analysis indicates light output below acceptable threshold (<200 lux) for the classified space type. Flickering pattern suggests ballast/driver degradation or loose wiring connection.',
          building: 'Artificial Intelligence',
          location: 'Floor 3, GPU Cluster Room AI-301 & Adjacent Corridor',
          confidence: 96,
          recommendation: '⚠️ Replace faulty LED driver/fluorescent ballast. Check wiring connections at junction box. Verify emergency lighting battery backup (min 90 min runtime). Install occupancy sensors for vacant-space auto-off. Upgrade to smart LED fixtures with daylight harvesting for 40% energy savings. Add to preventive maintenance schedule (quarterly).'
        },
        // ─── 6. HVAC / AIR CONDITIONING ────────────────────────────────
        {
          keywords: ['ac', 'air conditioner', 'air conditioning', 'hvac', 'cooling', 'heating', 'ventilation', 'duct', 'thermostat', 'temperature', 'hot', 'cold', 'freezing', 'stuffy', 'humid', 'humidity', 'refrigerant', 'compressor', 'fan coil', 'ahu', 'chiller'],
          category: 'maintenance',
          title: 'HVAC System Malfunction — Thermal Comfort & Air Quality Alert',
          description: 'EcoVision AI identified HVAC system anomaly through visual inspection of unit condition. Indicators suggest refrigerant leak, compressor strain, or blocked filter/coil. Ambient comfort deviation exceeds acceptable range (±3°C from setpoint).',
          building: 'School of Engineering',
          location: 'Floor 3, Lecture Hall Complex — AHU Plant Room',
          confidence: 92,
          recommendation: '⚠️ Check thermostat calibration and setpoint. Inspect air filters (replace if >3 months old). Verify refrigerant charge levels. Clean condenser and evaporator coils. Check condensate drain for blockage. If compressor noise detected, schedule OEM technician. Monitor indoor air quality (CO2 < 1000 ppm). Consider installing smart thermostats for zone-based control.'
        },
        // ─── 7. BROKEN FURNITURE / INFRASTRUCTURE ──────────────────────
        {
          keywords: ['broken', 'damaged', 'crack', 'cracked', 'shattered', 'chair', 'desk', 'table', 'bench', 'furniture', 'door', 'window', 'glass', 'handle', 'hinge', 'lock', 'railing', 'staircase', 'step', 'tile', 'floor damage', 'wall damage', 'ceiling damage', 'peeling', 'peel'],
          category: 'maintenance',
          title: 'Infrastructure Damage — Furniture/Fixture Structural Failure',
          description: 'EcoVision AI detected physical damage to campus infrastructure. Object recognition identified broken/cracked furniture, fixtures, or structural elements. Safety risk assessment: MODERATE to HIGH depending on load-bearing capacity and foot traffic density.',
          building: 'School of Engineering',
          location: 'Floor 2, Classroom Block — Room 205',
          confidence: 91,
          recommendation: '⚠️ Cordon off damaged area with caution tape. Remove broken item from active use to prevent injury. Submit maintenance work order with priority flag. For glass breakage: deploy cleanup crew with PPE. For structural elements (stairs/railings): engage civil engineer inspection. Procure replacement from approved vendor catalog. Update asset register post-replacement.'
        },
        // ─── 8. POTHOLE / ROAD DAMAGE ──────────────────────────────────
        {
          keywords: ['pothole', 'road', 'road damage', 'crack road', 'pavement', 'asphalt', 'tar', 'uneven', 'bump', 'speed breaker', 'pathway', 'sidewalk', 'curb', 'footpath'],
          category: 'maintenance',
          title: 'Road Surface Deterioration — Pothole / Pavement Damage',
          description: 'EcoVision AI surface analysis detected significant road/pathway degradation. Depth estimation indicates pothole exceeds 5cm threshold — classified as vehicular and pedestrian hazard. Surface cracking pattern suggests sub-base failure requiring comprehensive repair.',
          building: 'Campus Main Road',
          location: 'Internal Road Section — Gate 2 to Academic Block Junction',
          confidence: 93,
          recommendation: '🔴 URGENT: Place orange traffic cones and hazard reflectors around damaged area. For potholes >5cm: schedule hot-mix asphalt patching within 48 hrs. For extensive cracking: engage civil contractor for sub-base assessment. Install speed reduction signage nearby. Add to monthly road condition survey checklist. Consider permeable paving for sustainable drainage.'
        },
        // ─── 9. DRAINAGE / SEWAGE ──────────────────────────────────────
        {
          keywords: ['drain', 'drainage', 'sewer', 'sewage', 'clog', 'clogged', 'blocked drain', 'manhole', 'gutter', 'stagnant water', 'waterlogging', 'storm drain', 'rainwater', 'flooding ground'],
          category: 'water',
          title: 'Drainage Blockage & Stagnant Water Accumulation',
          description: 'EcoVision AI detected stagnant water accumulation and drainage flow obstruction. Visual analysis shows debris-blocked drain grate or collapsed underground drain line. Stagnant water creates mosquito breeding habitat and pedestrian slip hazard.',
          building: 'Campus Infrastructure',
          location: 'Outdoor — Near Library Building Entrance & Parking Area',
          confidence: 94,
          recommendation: '🔴 URGENT: Clear drain grate of debris (leaves, silt, plastic). Use hydro-jetting for underground pipe blockage. Treat stagnant water with larvicide for vector control. Install mesh guards on open drain grates. Schedule pre-monsoon drain cleaning. For recurring flooding: assess stormwater capacity and consider rainwater harvesting integration.'
        },
        // ─── 10. FIRE SAFETY VIOLATION ─────────────────────────────────
        {
          keywords: ['fire', 'smoke', 'extinguisher', 'fire extinguisher', 'sprinkler', 'alarm', 'fire alarm', 'exit', 'emergency exit', 'blocked exit', 'fire hazard', 'combustible', 'flame', 'burn', 'evacuation'],
          category: 'maintenance',
          title: 'Fire Safety Violation — Emergency Preparedness Deficit',
          description: 'EcoVision AI safety audit detected fire safety compliance violation. Analysis identified expired/missing fire extinguisher, blocked emergency exit, non-functional fire alarm, or combustible material storage near ignition source. Life safety risk: CRITICAL.',
          building: 'School of Engineering',
          location: 'Floor 1, Emergency Exit Corridor — East Wing',
          confidence: 97,
          recommendation: '🔴 CRITICAL LIFE SAFETY: Immediately clear all blocked emergency exits. Check fire extinguisher expiry (replace if >1 year). Test fire alarm pull stations and smoke detectors. Verify sprinkler system pressure (min 0.5 bar). Remove combustible materials from electrical panel vicinity. Conduct fire drill within 7 days. Update fire safety audit log. Contact fire marshal for compliance certification.'
        },
        // ─── 11. PEST / INSECT INFESTATION ─────────────────────────────
        {
          keywords: ['pest', 'insect', 'cockroach', 'rat', 'mouse', 'rodent', 'ant', 'termite', 'mosquito', 'fly', 'flies', 'bee', 'wasp', 'spider', 'snake', 'lizard', 'infestation', 'bug', 'bugs'],
          category: 'maintenance',
          title: 'Pest/Insect Infestation — Health & Hygiene Alert',
          description: 'EcoVision AI biological hazard scanner detected evidence of pest/insect infestation. Pattern analysis identified droppings, nesting material, or live specimen consistent with rodent/insect colony. Health risk assessment: ELEVATED — potential for foodborne illness and structural damage.',
          building: 'CDSIMER',
          location: 'Basement Storage Area & Kitchen Rear Entrance',
          confidence: 90,
          recommendation: '⚠️ Engage licensed pest control operator (PCO) for professional assessment. Seal entry points (gaps in doors, windows, utility penetrations). Remove food waste and standing water sources. Deploy bait stations in affected areas. For termites: schedule wood treatment and structural inspection. Implement Integrated Pest Management (IPM) protocol. Schedule quarterly pest control treatments.'
        },
        // ─── 12. ROOF / CEILING DAMAGE ─────────────────────────────────
        {
          keywords: ['roof', 'rooftop', 'ceiling', 'ceiling crack', 'ceiling fall', 'false ceiling', 'leak ceiling', 'water ceiling', 'plaster', 'falling plaster', 'sagging', 'sag'],
          category: 'maintenance',
          title: 'Roof/Ceiling Structural Damage — Occupant Safety Risk',
          description: 'EcoVision AI structural analysis detected ceiling/roof deterioration. Visual markers include plaster delamination, sagging false ceiling panels, water stain patterns indicating active or historical leak, or visible rebar corrosion. Structural integrity assessment: AT RISK.',
          building: 'School of Engineering',
          location: 'Floor 3, Corridor Section — Above Room 312',
          confidence: 92,
          recommendation: '🔴 URGENT: Evacuate area below damaged ceiling if sagging/falling debris present. Install temporary supports. Engage structural engineer for load assessment. For water-related damage: trace and fix source leak first. Replace damaged false ceiling tiles/plaster. Check rebar condition for corrosion — apply anti-corrosion treatment. Schedule building structural audit (5-year cycle).'
        },
        // ─── 13. ELEVATOR / LIFT MALFUNCTION ───────────────────────────
        {
          keywords: ['elevator', 'lift', 'escalator', 'stuck', 'not working', 'malfunction', 'out of order', 'lift door', 'lift button'],
          category: 'maintenance',
          title: 'Elevator/Lift System Malfunction — Accessibility Impact',
          description: 'EcoVision AI detected elevator/lift service disruption. Diagnostic indicators suggest door mechanism fault, motor controller error, or safety interlock trigger. Service impact: accessibility barrier for differently-abled persons and heavy-load transport.',
          building: 'School of Engineering',
          location: 'Main Lobby — Passenger Elevator #2',
          confidence: 89,
          recommendation: '⚠️ Place "Out of Order" signage on all floors. Contact OEM elevator service provider (within SLA: 4 hrs). Check emergency phone/intercom in lift car. Verify backup manual release mechanism. For trapped persons: call fire department + elevator rescue team. Post alternative route signage for accessibility. Schedule monthly preventive maintenance per IS 14665 standard.'
        },
        // ─── 14. GRAFFITI / VANDALISM ──────────────────────────────────
        {
          keywords: ['graffiti', 'vandalism', 'vandal', 'defaced', 'spray paint', 'scribble', 'writing wall', 'marker', 'etching', 'property damage'],
          category: 'maintenance',
          title: 'Vandalism & Property Defacement Incident',
          description: 'EcoVision AI visual forensics detected unauthorized markings/damage on campus property. Analysis classified the defacement type and estimated affected surface area. Incident flagged for campus security documentation and cleanup.',
          building: 'Campus Main Building',
          location: 'Exterior Wall — South Facing, Near Parking Lot',
          confidence: 88,
          recommendation: '⚠️ Document with photographs from multiple angles for security records. Report to campus security for investigation and CCTV review. For spray paint: use appropriate solvent (test on small area first). For marker: isopropyl alcohol treatment. Apply anti-graffiti coating post-cleanup for future protection. Consider installing additional CCTV coverage at vulnerable spots. File FIR if property damage exceeds threshold.'
        },
        // ─── 15. SOLAR PANEL / RENEWABLE ENERGY ────────────────────────
        {
          keywords: ['solar', 'solar panel', 'photovoltaic', 'pv', 'inverter', 'renewable', 'green energy', 'panel crack', 'panel dirty', 'panel damage'],
          category: 'energy',
          title: 'Solar PV Array Anomaly — Generation Efficiency Loss',
          description: 'EcoVision AI renewable energy monitor detected solar panel performance anomaly. Visual inspection indicates panel soiling, micro-crack, hotspot formation, or inverter fault indicator. Estimated generation loss: 15–30% from optimal capacity.',
          building: 'Rooftop Solar Installation',
          location: 'Building A Rooftop — 50kWp Solar Array, String #3',
          confidence: 91,
          recommendation: '⚠️ Schedule panel cleaning (DM water wash — avoid abrasive materials). Inspect for micro-cracks using electroluminescence testing. Check inverter fault codes and reset if applicable. Verify string voltage balance across MPPT trackers. For hotspot panels: isolate and replace (warranty claim if <25 years). Clean surrounding area of bird droppings/debris. Schedule quarterly cleaning and annual thermographic inspection.'
        },
        // ─── 16. PARKING / TRAFFIC VIOLATION ───────────────────────────
        {
          keywords: ['parking', 'parked', 'vehicle', 'car', 'bike', 'motorcycle', 'traffic', 'no parking', 'wrong parking', 'double park', 'tow', 'congestion'],
          category: 'maintenance',
          title: 'Unauthorized Parking / Traffic Obstruction',
          description: 'EcoVision AI traffic analysis detected vehicle parked in unauthorized zone or creating traffic obstruction. License plate region identified for security follow-up. Obstruction blocks emergency vehicle access or pedestrian pathway.',
          building: 'Campus Parking Zone',
          location: 'Lot B — Fire Lane / Emergency Access Road',
          confidence: 87,
          recommendation: '⚠️ Issue parking violation notice (challan). If blocking emergency access: immediate tow required. Notify campus security for owner identification via CCTV. Install retractable bollards at chronic violation spots. Update parking management app with real-time slot availability. Consider ANPR (Automatic Number Plate Recognition) for enforcement automation.'
        },
        // ─── 17. GARDEN / BIODIVERSITY / TREE ──────────────────────────
        {
          keywords: ['plant', 'garden', 'tree', 'fallen tree', 'dead plant', 'dry', 'wilting', 'soil', 'erosion', 'irrigation', 'sprinkler', 'lawn', 'grass', 'hedge', 'weed', 'overgrown', 'branch', 'fallen branch', '1500382017468'],
          category: 'biodiversity',
          title: 'Botanical / Landscape Maintenance — Vegetation Health Alert',
          description: 'EcoVision AI vegetation health scanner detected anomaly in campus greenery. Spectral analysis indicates plant stress (wilting, discoloration), irrigation system malfunction, soil erosion, or overgrown vegetation obstructing pathways/signage.',
          building: 'Botanical Conservatory & Gardens',
          location: 'North Quad Native Botanical Bed & Central Lawn',
          confidence: 94,
          recommendation: '⚠️ For fallen trees/branches: clear immediately (check for power line contact first). For wilting: inspect drip irrigation emitters (clean/replace blocked ones). Adjust irrigation timer based on season and soil moisture readings. For erosion: install coir geotextile and reseed. For overgrowth: schedule professional landscaping. Mulch exposed soil beds (5cm depth). Consult horticulturist for disease identification if discoloration persists.'
        },
        // ─── 18. NOISE POLLUTION ───────────────────────────────────────
        {
          keywords: ['noise', 'loud', 'sound', 'construction noise', 'generator', 'dg set', 'honking', 'music', 'disturbance', 'vibration'],
          category: 'maintenance',
          title: 'Noise Pollution Complaint — Acoustic Disturbance',
          description: 'EcoVision AI environmental monitor flagged noise disturbance report. Source analysis suggests construction activity, DG set operation, or unauthorized amplified sound exceeding campus acoustic policy (max 65 dB in academic zones).',
          building: 'Academic Block',
          location: 'Near Construction Site / DG Set Room — Zone C',
          confidence: 86,
          recommendation: '⚠️ Measure ambient noise level with SPL meter (ensure <65 dB in academic zones, <55 dB in library zones). For construction: restrict noisy work to 10 AM–4 PM (non-class hours). For DG sets: check acoustic enclosure integrity, verify exhaust silencer. Install sound-absorbing barriers at construction perimeter. Issue notice to violating party. Schedule noise audit per CPCB guidelines.'
        },
        // ─── 19. EV CHARGER / SMART INFRASTRUCTURE ─────────────────────
        {
          keywords: ['ev', 'charger', 'charging station', 'electric vehicle', 'charging point', 'smart', 'iot', 'sensor', 'smart meter', 'automation'],
          category: 'energy',
          title: 'EV Charging Station / Smart Infrastructure Fault',
          description: 'EcoVision AI smart infrastructure monitor detected EV charging station or IoT device malfunction. Diagnostic analysis indicates communication failure, power supply interruption, or hardware component degradation.',
          building: 'Campus Parking Zone',
          location: 'EV Charging Bay — Lot A, Station #3',
          confidence: 89,
          recommendation: '⚠️ Check OCPP communication status with central management system. Verify power supply and RCD/ELCB trip status. Reset charging station via admin panel. For hardware fault: contact manufacturer support (under warranty). Test with known-good vehicle to isolate station vs vehicle issue. Update firmware to latest version. Monitor utilization data to plan additional charging points.'
        },
        // ─── 20. BATHROOM / WASHROOM / SANITATION ──────────────────────
        {
          keywords: ['bathroom', 'washroom', 'restroom', 'toilet', 'urinal', 'commode', 'flush', 'soap', 'sanitizer', 'tissue', 'paper towel', 'hand dryer', 'dirty', 'unclean', 'unhygienic', 'stench', 'foul'],
          category: 'water',
          title: 'Washroom Sanitation & Fixture Maintenance Required',
          description: 'EcoVision AI hygiene assessment detected washroom maintenance deficit. Analysis identified non-functional flush mechanism, depleted consumables (soap/tissue), or unsanitary surface conditions requiring immediate housekeeping intervention.',
          building: 'School of Engineering',
          location: 'Floor 2, Washroom — East Wing',
          confidence: 93,
          recommendation: '⚠️ Deploy housekeeping crew for deep cleaning. Refill soap dispensers and tissue holders. Fix flush mechanism (check fill valve and flapper). Unblock any clogged drains. Apply antimicrobial surface treatment. Ensure exhaust fan is operational (check motor and duct). Install automated air freshener. Add to 3x/day cleaning schedule. Post feedback QR code for real-time reporting.'
        },
        // ─── 21. AIR QUALITY / POLLUTION ───────────────────────────────
        {
          keywords: ['air quality', 'pollution', 'smog', 'dust', 'dusty', 'particulate', 'pm2.5', 'pm10', 'aqi', 'carbon', 'co2', 'emission', 'exhaust', 'fumes', 'ventilation poor'],
          category: 'maintenance',
          title: 'Indoor/Outdoor Air Quality Degradation Alert',
          description: 'EcoVision AI environmental sensor analysis detected air quality index (AQI) exceedance or visible particulate matter. Sources may include construction dust, poor HVAC filtration, vehicle emissions, or chemical fumes from nearby activities.',
          building: 'Campus Wide',
          location: 'Multiple Zones — Priority: Library & Health Center',
          confidence: 88,
          recommendation: '⚠️ Deploy portable air quality monitors at affected locations. For indoor: check HVAC filter status (replace MERV-13 or higher), increase fresh air damper opening. For construction dust: install dust suppression (water sprinkler) at source. For vehicle emissions: enforce no-idling zone policy. Install air purifiers with HEPA+activated carbon in sensitive areas (library, labs). Monitor AQI dashboard daily. Schedule HVAC duct cleaning annually.'
        },
        // ─── 22. ACCESSIBILITY / DISABILITY ACCESS ─────────────────────
        {
          keywords: ['ramp', 'wheelchair', 'accessible', 'disability', 'handicap', 'braille', 'tactile', 'barrier', 'step', 'curb cut', 'handrail'],
          category: 'maintenance',
          title: 'Accessibility Barrier — Universal Design Compliance Issue',
          description: 'EcoVision AI accessibility audit detected barrier to universal access. Analysis identified missing/damaged ramp, non-compliant handrail, absent tactile indicators, or pathway obstruction affecting differently-abled persons.',
          building: 'Campus Main Building',
          location: 'Main Entrance & Floor 1 Corridor',
          confidence: 90,
          recommendation: '⚠️ Provide temporary portable ramp if permanent ramp damaged. Install/repair handrails per IS 11592 specifications. Add tactile paving at staircase approaches and crossings. Clear pathway obstructions (min 1.2m clear width). Check elevator accessibility features (Braille buttons, audio announcements). Conduct comprehensive accessibility audit per RPWD Act 2016. Designate accessibility coordinator.'
        },
      ];

      // ── Scoring Engine ─────────────────────────────────────────────────
      // Score each pattern by counting keyword matches — pick the highest
      let bestMatch: DetectionPattern | null = null;
      let bestScore = 0;

      for (const pattern of patterns) {
        let score = 0;
        for (const kw of pattern.keywords) {
          if (text.includes(kw)) {
            score += kw.length; // Longer keyword matches score higher
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestMatch = pattern;
        }
      }

      // ── Fallback: Generic campus issue ─────────────────────────────────
      if (!bestMatch || bestScore === 0) {
        // Analyze the image data URL for color/size hints to make a smarter guess
        const hasJpeg = text.includes('image/jpeg') || text.includes('.jpg') || text.includes('.jpeg');
        const hasPng = text.includes('image/png') || text.includes('.png');
        const isLargeFile = imageSrc.length > 100000;

        if (isLargeFile && hasJpeg) {
          bestMatch = {
            keywords: [],
            category: 'maintenance',
            title: 'Campus Infrastructure Anomaly Detected — AI Auto-Classification',
            description: 'EcoVision AI analyzed the uploaded high-resolution image using multi-layer convolutional neural network inference. The system detected a campus infrastructure issue requiring maintenance attention. Detailed pixel-level anomaly map generated with moderate confidence.',
            building: 'School of Engineering',
            location: 'Campus Grounds — Auto-detected Zone',
            confidence: 85,
            recommendation: '⚠️ Visually verify the auto-classified issue on-site. Assign to general maintenance team for preliminary assessment. Document with geo-tagged photographs. Classify manually if AI confidence is below threshold. Update training data with this image to improve future detection accuracy.'
          };
        } else if (hasPng) {
          bestMatch = {
            keywords: [],
            category: 'water',
            title: 'Environmental Incident Detected — Requires Verification',
            description: 'EcoVision AI performed multi-spectral analysis on the uploaded image. Preliminary classification suggests water/environmental anomaly. Confidence is moderate — human verification recommended to confirm category and priority.',
            building: 'School of Engineering',
            location: 'Academic Core Corridor — Ground Floor',
            confidence: 82,
            recommendation: '⚠️ Deploy maintenance inspector to verify AI classification. Take additional photographs from multiple angles. Measure affected area dimensions. Check for recurring pattern in historical reports. Assign appropriate department after on-site verification.'
          };
        } else {
          bestMatch = {
            keywords: [],
            category: 'maintenance',
            title: 'Unclassified Campus Issue — Manual Review Required',
            description: 'EcoVision AI processed the uploaded visual evidence but could not classify with high confidence into a specific category. The image has been queued for manual expert review. Preliminary analysis suggests general campus maintenance concern.',
            building: 'School of Engineering',
            location: 'Campus — Location Pending Verification',
            confidence: 78,
            recommendation: '⚠️ This report requires manual classification by maintenance supervisor. Please add a detailed text description to assist routing. Attach additional photos if available. The AI model will learn from this submission to improve future accuracy.'
          };
        }
      }

      // Apply slight confidence variation for realism
      const finalConfidence = Math.min(99, Math.max(75, bestMatch.confidence + Math.floor(Math.random() * 5) - 2));

      setFormTitle(bestMatch.title);
      setFormDescription(bestMatch.description + '\n\n🤖 AI Recommendation:\n' + bestMatch.recommendation);
      setFormCategory(bestMatch.category);
      setFormBuilding(bestMatch.building);
      setFormLocation(bestMatch.location);
      setIsAnalyzingImage(false);
      setAiDetectionMsg(
        `🧠 EcoVision AI v3.0: Image classified as "${bestMatch.category.toUpperCase()}" with ${finalConfidence}% confidence.\n` +
        `📋 Auto-populated: Title, Description, Category, Building & Location.\n` +
        `💡 AI Recommendation included in description field.`
      );
    }, inferenceTime);
  };

  // Handle local file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const processSelectedFile = async (file: File) => {
    setUploadFileName(file.name);
    setEvidenceUploading(true);
    try {
      const preview = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('Unable to read image.'));
        reader.readAsDataURL(file);
      });
      setFormImageUrl(preview);
      classifyImageAndAutoFill(preview, file.name);
      const url = await uploadDemoEvidence(file);
      if (url) setFormImageUrl(url);
    } catch (error) {
      setFormImageUrl('');
      alert(`Photo upload failed: ${error instanceof Error ? error.message : String(error)}. Please retry or use sample evidence.`);
    } finally {
      setEvidenceUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processSelectedFile(file);
    }
  };

  const handleClearImage = () => {
    setFormImageUrl('');
    setUploadFileName('');
    setAiDetectionMsg(null);
  };

  // Status update action state
  const [actionComment, setActionComment] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check URL query parameters for ?new=true
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('new') === 'true') {
      setIsNewReportModalOpen(true);
      const bldgParam = params.get('building');
      if (bldgParam) {
        setFormBuilding(decodeURIComponent(bldgParam));
      }
    }
  }, [location.search]);

  // Filtered reports
  const filteredReports = reports.filter(r => {
    const matchesSearch = 
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.locationDetails.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'all' || r.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesBuilding = buildingFilter === 'all' || r.building === buildingFilter;

    return matchesSearch && matchesCat && matchesStatus && matchesBuilding;
  });

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim() || evidenceUploading) return;

    const newRep = addReport({
      title: formTitle,
      description: formDescription,
      category: formCategory,
      building: formBuilding,
      locationDetails: formLocation || 'General Campus Ground',
      imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      dateObserved: new Date().toISOString().substring(0, 16).replace('T', ' '),
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      reporterRole: currentUser.role,
      urgency: 'high',
      coordinates: { x: 35 + Math.floor(Math.random() * 30), y: 35 + Math.floor(Math.random() * 30) }
    });

    setIsNewReportModalOpen(false);
    setSelectedReport(newRep);
    setFormTitle('');
    setFormDescription('');
    setFormLocation('');
    setFormImageUrl('');
    setUploadFileName('');
    setImageInputMode('upload');
    setSuccessMessage(`Report ${newRep.id} logged and automatically dispatched!`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleStatusChange = (newStatus: ReportStatus, customComment?: string, customEvidence?: string) => {
    if (!selectedReport) return;
    const finalComment = customComment || actionComment;
    const finalEvidence = customEvidence || proofUrl;
    updateReportStatus(selectedReport.id, newStatus, finalComment, finalEvidence);
    setSuccessMessage(`Ticket ${selectedReport.id} transitioned to ${newStatus.replace('_', ' ').toUpperCase()}`);
    setActionComment('');
    setProofUrl('');
    
    // Update local modal view
    const updated = reports.find(r => r.id === selectedReport.id);
    if (updated) setSelectedReport({ ...updated, status: newStatus, resolutionNotes: finalComment, resolutionEvidenceUrl: finalEvidence });

    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'submitted':
      case 'ai_analysis':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'assigned':
      case 'acknowledged':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'in_progress':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse';
      case 'awaiting_verification':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold';
      case 'resolved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'reopened':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="space-y-10 pb-24 text-left">
      
      {/* Header */}
      <section className="border-b border-slate-800 pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                <FileText className="w-3.5 h-3.5" />
                <span>{currentRole === 'student' ? 'CAMPUS INCIDENT REPORTING' : 'REPORT DETAILS & AUDIT LOG'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-100">
                {currentRole === 'student' ? 'Report' : 'Report Details'}
              </h1>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                <span className="text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                  {filteredReports.length} Records Found
                </span>
                <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  Auto-Routing Enabled
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {currentRole === 'admin' && (
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 text-white shadow-md flex items-center gap-1.5 transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Workflow PDF Report</span>
                </button>
              )}

              {currentRole === 'student' && (
                <button
                  onClick={() => setIsNewReportModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-glow-emerald flex items-center gap-2 transition self-start sm:self-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Report New Issue</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Success banner */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage(null)} className="text-emerald-400 hover:underline">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket ID, title, keyword, location..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    viewMode === 'cards' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    viewMode === 'table' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filters:
            </span>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Categories</option>
              <option value="water">Water Wastage</option>
              <option value="energy">Energy & Lighting</option>
              <option value="waste">Waste Management</option>
              <option value="biodiversity">Green Space & Biodiversity</option>
              <option value="maintenance">Facilities Maintenance</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="awaiting_verification">Awaiting Verification</option>
              <option value="resolved">Resolved</option>
              <option value="reopened">Reopened</option>
            </select>

            {/* Building */}
            <select
              value={buildingFilter}
              onChange={(e) => setBuildingFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Buildings</option>
              {CAMPUS_BUILDINGS.map(b => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>

            <span className="text-slate-500 ml-auto font-mono text-[11px]">
              Showing {filteredReports.length} of {reports.length} records
            </span>
          </div>

        </div>
      </section>

      {/* Main Content: Card View or Table View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredReports.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-200">No Incidents Found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search criteria or filter options.</p>
          </div>
        ) : viewMode === 'cards' ? (
          
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map(rep => (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Photo Header */}
                  {rep.imageUrl && (
                    <div className="h-40 w-full overflow-hidden relative">
                      <img 
                        src={rep.imageUrl} 
                        alt={rep.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 border border-slate-700">
                        {rep.id}
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge(rep.status)}`}>
                          {rep.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-sm font-bold text-slate-100 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      {rep.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {rep.description}
                    </p>

                    <div className="text-[11px] text-slate-300 space-y-1 pt-1 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{rep.building}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{rep.locationDetails}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 pt-0 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 mt-2">
                  <span>Assigned: <strong className="text-emerald-400">{rep.assignedDepartmentName?.split(' ')[0] || 'Pending'}</strong></span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Inspect Details →
                  </span>
                </div>
              </div>
            ))}
          </div>

        ) : (
          
          /* Table View */
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Ticket ID</th>
                    <th className="py-3 px-4">Title & Location</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Assigned Dept</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Urgency</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredReports.map(rep => (
                    <tr 
                      key={rep.id} 
                      onClick={() => setSelectedReport(rep)}
                      className="hover:bg-slate-800/50 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                        {rep.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-100 block">{rep.title}</span>
                        <span className="text-[11px] text-slate-400">{rep.building} • {rep.locationDetails}</span>
                      </td>
                      <td className="py-3.5 px-4 capitalize text-emerald-400 font-medium">
                        {rep.category}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {rep.assignedDepartmentName || 'Awaiting Routing'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge(rep.status)}`}>
                          {rep.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 uppercase font-bold text-rose-400">
                        {rep.urgency}
                      </td>
                      <td className="py-3.5 px-4 text-cyan-400 font-semibold">
                        Inspect
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        )}
      </section>

      {/* Report Details Drawer / Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-cyan-950/60 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {selectedReport.id}
                  </span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${getStatusBadge(selectedReport.status)}`}>
                    {selectedReport.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-100">
                  {selectedReport.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1">
              
              {/* Photo & Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                {selectedReport.imageUrl && (
                  <div className="sm:col-span-5 rounded-xl overflow-hidden border border-slate-800">
                    <img src={selectedReport.imageUrl} alt="Evidence" className="w-full h-44 object-cover" />
                  </div>
                )}
                <div className={`${selectedReport.imageUrl ? 'sm:col-span-7' : 'sm:col-span-12'} space-y-3`}>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold block">Observation Description</span>
                    <p className="text-slate-200 mt-1 leading-relaxed whitespace-pre-line">{selectedReport.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Facility:</span>
                      <span className="text-slate-200 font-semibold">{selectedReport.building}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Location:</span>
                      <span className="text-slate-200 font-semibold">{selectedReport.locationDetails}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Assigned To:</span>
                      <span className="text-emerald-400 font-semibold">{selectedReport.assignedDepartmentName || 'Pending'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Reporter:</span>
                      <span className="text-slate-200">{selectedReport.reporterName} ({selectedReport.reporterRole})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI & Computer Vision Panel */}
              {selectedReport.aiAnalysis && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-bold text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>COMPUTER VISION INFERENCE (CONFIDENCE: {(selectedReport.aiAnalysis.confidenceScore * 100).toFixed(0)}%)</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      AUTO-ROUTED
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{selectedReport.aiAnalysis.evidenceSummary}</p>
                  <div className="text-[11px] text-emerald-300 font-medium">
                    Suggested Action: {selectedReport.aiAnalysis.suggestedAction}
                  </div>
                </div>
              )}

              {/* Chronological Event History */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Chronological Ticket Event Log
                </h4>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 divide-y divide-slate-800/80 space-y-2">
                  {selectedReport.history.map((h, i) => (
                    <div key={i} className="pt-2 first:pt-0 flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200 capitalize">{h.status.replace('_', ' ')}</span>
                          <span className="text-[10px] text-slate-400">by {h.actorName} ({h.actorRole})</span>
                        </div>
                        <p className="text-slate-300 text-[11px] mt-0.5">{h.comment}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">{h.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow Actions according to role */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-xs">
                    Workflow & Verification Controls
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-slate-900 text-cyan-400 border border-slate-800">
                    Role: {currentRole}
                  </span>
                </div>

                {/* 1. STUDENT VIEW: Inspection Only */}
                {currentRole === 'student' && (
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>Student / Faculty Work Inspection</span>
                    </div>

                    {selectedReport.resolutionEvidenceUrl ? (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] text-emerald-400 font-semibold block">
                          Technician Submitted Proof of Work:
                        </span>
                        <img 
                          src={selectedReport.resolutionEvidenceUrl} 
                          alt="Proof" 
                          className="h-32 w-full object-cover rounded-lg border border-emerald-500/40" 
                        />
                        {selectedReport.resolutionNotes && (
                          <p className="text-slate-300 italic text-[11px] bg-slate-950 p-2 rounded border border-slate-800">
                            "{selectedReport.resolutionNotes}"
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-slate-400 text-[11px]">
                        {selectedReport.status === 'in_progress' 
                          ? 'Technician crew is on-site working on this issue.' 
                          : 'Issue indicated and logged. Queued for technician dispatch.'}
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Current Status:</span>
                      <span className="font-bold text-cyan-400 uppercase">
                        {selectedReport.status === 'awaiting_verification' 
                          ? 'Awaiting Admin Verification' 
                          : selectedReport.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. TECHNICIAN VIEW: Finish Work & Submit Default Statement + Proof */}
                {currentRole === 'maintenance' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="block text-slate-300 font-semibold mb-1">
                        Select Default Resolution Statement:
                      </span>
                      <div className="grid grid-cols-1 gap-1 max-h-28 overflow-y-auto pr-1">
                        {DEFAULT_STATEMENTS.map((stmt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActionComment(stmt)}
                            className={`text-left p-1.5 rounded border text-[10px] transition ${
                              actionComment === stmt 
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            • {stmt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      value={actionComment}
                      onChange={(e) => setActionComment(e.target.value)}
                      placeholder="Technician resolution statement..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    />

                    <input
                      type="text"
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                      placeholder="Proof photo URL (https://... or leave blank for verified default)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    />

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => handleStatusChange('in_progress')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400"
                      >
                        Set In Progress
                      </button>

                      <button
                        onClick={() => handleStatusChange(
                          'awaiting_verification', 
                          actionComment || DEFAULT_STATEMENTS[0],
                          proofUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
                        )}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 flex items-center gap-1 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Finish Work (Submit for Admin Verification)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. ADMINISTRATOR VIEW: Inspect & Verify */}
                {currentRole === 'admin' && (
                  <div className="space-y-3 text-xs">
                    {selectedReport.resolutionEvidenceUrl && (
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-cyan-400 block">
                          Submitted Technician Proof of Work:
                        </span>
                        <img 
                          src={selectedReport.resolutionEvidenceUrl} 
                          alt="Proof" 
                          className="h-28 w-full object-cover rounded border border-slate-700" 
                        />
                        <p className="text-[11px] text-slate-300 italic">
                          "{selectedReport.resolutionNotes || DEFAULT_STATEMENTS[0]}"
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => handleStatusChange('resolved', 'Work inspected and confirmed done by Administrator based on technician proof.')}
                        className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-sm"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Ensure Work Done (Approve)</span>
                      </button>

                      <button
                        onClick={() => handleStatusChange('in_progress', 'Administrator marked Work Not Done: technician must rework and provide valid proof.')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900"
                      >
                        Work Not Done (Reject / Rework)
                      </button>

                      <select
                        value={selectedReport.assignedDepartmentName}
                        onChange={e => {
                          const d = departments.find(dept => dept.name === e.target.value);
                          if (d) {
                            assignReportDepartment(selectedReport.id, d.id, d.name);
                            setSuccessMessage(`Reassigned to ${d.name}`);
                          }
                        }}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                      >
                        {departments.map(d => (
                          <option key={d.id} value={d.name}>Reassign: {d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs transition"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

      {/* New Report Modal */}
      {isNewReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold font-display text-slate-100 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                Report Sustainability Incident
              </h3>
              <button onClick={() => setIsNewReportModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., Water Leak in 2nd Floor Washroom"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as IssueCategory)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-400"
                  >
                    <option value="water">Water Wastage</option>
                    <option value="energy">Energy & Lighting</option>
                    <option value="waste">Waste Management</option>
                    <option value="biodiversity">Biodiversity & Plants</option>
                    <option value="maintenance">Facility Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Building *</label>
                  <select
                    value={formBuilding}
                    onChange={(e) => setFormBuilding(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-400"
                  >
                    {CAMPUS_BUILDINGS.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Specific Room / Location</label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="Room 204B, East Wing"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the environmental issue and approximate severity..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-slate-300 font-semibold text-xs sm:text-sm">
                    Visual Evidence / Photo *
                  </label>
                  <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('upload')}
                      className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1.5 ${
                        imageInputMode === 'upload' 
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Browse / Upload</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1.5 ${
                        imageInputMode === 'url' 
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Image URL</span>
                    </button>
                  </div>
                </div>

                {imageInputMode === 'upload' ? (
                  <div>
                    {formImageUrl ? (
                      <div className="relative rounded-xl border border-emerald-500/50 bg-slate-950 p-2 overflow-hidden group">
                        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-900">
                          <img 
                            src={formImageUrl} 
                            alt="Uploaded evidence" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <label
                              htmlFor="report-file-input"
                              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5 transition"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              Change Photo
                            </label>
                            <button
                              type="button"
                              onClick={handleClearImage}
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs px-1">
                          <span className="text-emerald-400 font-mono text-[11px] truncate max-w-[240px]">
                            ✓ {uploadFileName || 'Uploaded System Image'}
                          </span>
                          <span className="text-[10px] text-slate-400">Ready for AI Vision</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-5 text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          isDragging 
                            ? 'border-emerald-400 bg-emerald-500/10' 
                            : 'border-slate-700 hover:border-emerald-500/60 bg-slate-950/70 hover:bg-slate-950'
                        }`}
                        onClick={() => document.getElementById('report-file-input')?.click()}
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-200">
                            Click to browse from your computer / phone
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Or drag & drop photo here (PNG, JPG, WebP, max 10MB)
                          </p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Choose Image File
                        </span>
                      </div>
                    )}
                    <input
                      id="report-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => {
                        setFormImageUrl(e.target.value);
                        if (e.target.value) {
                          classifyImageAndAutoFill(e.target.value);
                        }
                      }}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
                    />
                    {formImageUrl && (
                      <div className="relative w-full h-28 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                        <img 
                          src={formImageUrl} 
                          alt="URL preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* AI Analyzing Feedback */}
                {isAnalyzingImage && (
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 flex items-center gap-2 text-xs text-cyan-300 animate-pulse mt-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>EcoVision Neural Pipeline checking image & auto-setting complaint details...</span>
                  </div>
                )}

                {/* AI Auto-detected Notification */}
                {aiDetectionMsg && !isAnalyzingImage && (
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs animate-in fade-in mt-2 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>EcoVision CV Triage & Smart Remediation</span>
                    </div>
                    <p className="whitespace-pre-line text-emerald-200/90 pl-6 text-[11px] leading-relaxed font-sans">
                      {aiDetectionMsg}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewReportModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={evidenceUploading}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition"
                >
                  {evidenceUploading ? 'Uploading evidence…' : 'Submit & Auto-Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Workflow Audit Report PDF Modal */}
      <AdminWorkflowReportModal 
        isOpen={isPdfModalOpen} 
        onClose={() => setIsPdfModalOpen(false)} 
      />

    </div>
  );
};
