import { Department, SustainabilityReport, WasteBin, BuildingEnergyMetric, AppNotification } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-plumbing',
    name: 'Plumbing & Water Resources',
    code: 'PWR',
    leadPerson: 'Eng. Sarah Jenkins',
    contactEmail: 'water.ops@cdsimer.edu',
    activeStaffCount: 8,
    openTickets: 3,
    avgResolutionHours: 4.2,
    categoriesHandled: ['water'],
  },
  {
    id: 'dept-electrical',
    name: 'Electrical & Energy Optimization',
    code: 'EEO',
    leadPerson: 'Dr. Michael Chen',
    contactEmail: 'energy.grid@cdsimer.edu',
    activeStaffCount: 12,
    openTickets: 5,
    avgResolutionHours: 6.8,
    categoriesHandled: ['energy'],
  },
  {
    id: 'dept-waste',
    name: 'Housekeeping & Circular Waste',
    code: 'HCW',
    leadPerson: 'Elena Rodriguez',
    contactEmail: 'waste.circle@cdsimer.edu',
    activeStaffCount: 15,
    openTickets: 4,
    avgResolutionHours: 2.5,
    categoriesHandled: ['waste'],
  },
  {
    id: 'dept-grounds',
    name: 'Gardening & Campus Biodiversity',
    code: 'GCB',
    leadPerson: 'Prof. Ananya Patel',
    contactEmail: 'biodiversity@cdsimer.edu',
    activeStaffCount: 10,
    openTickets: 2,
    avgResolutionHours: 8.4,
    categoriesHandled: ['biodiversity'],
  },
  {
    id: 'dept-facilities',
    name: 'Integrated Facilities & Civil Infra',
    code: 'IFC',
    leadPerson: 'David Ross, PE',
    contactEmail: 'facilities@cdsimer.edu',
    activeStaffCount: 20,
    openTickets: 7,
    avgResolutionHours: 12.0,
    categoriesHandled: ['maintenance', 'other'],
  },
];

export const CAMPUS_BUILDINGS = [
  { 
    id: 'bldg-admin', 
    name: 'CDSIMER', 
    code: 'CDS', 
    floors: 4, 
    areaSqFt: 110000, 
    solarKwPeak: 75,
    coordinates: { x: 50, y: 44 },
    blockType: 'Central Administration & Governance',
    description: 'Centre for Development of Sustainable Intelligent Management and Engineering Research — the iconic administrative dome and central rotunda of campus.'
  },
  { 
    id: 'bldg-sci', 
    name: 'School of Engineering', 
    code: 'SOE', 
    floors: 5, 
    areaSqFt: 145000, 
    solarKwPeak: 95,
    coordinates: { x: 26, y: 42 },
    blockType: 'Engineering & Applied Sciences',
    description: 'Multi-story academic block housing civil, mechanical, electronics and computer engineering departments with state-of-art labs.'
  },
  { 
    id: 'bldg-bio', 
    name: 'Artificial Intelligence', 
    code: 'AIB', 
    floors: 4, 
    areaSqFt: 120000, 
    solarKwPeak: 80,
    coordinates: { x: 34, y: 68 },
    blockType: 'AI, Data Science & Robotics',
    description: 'Dedicated AI & ML research block with GPU cluster labs, computer vision suites, and the EcoVerse AI research center.'
  },
  { 
    id: 'bldg-stu', 
    name: 'Nursing', 
    code: 'NUR', 
    floors: 3, 
    areaSqFt: 95000, 
    solarKwPeak: 60,
    coordinates: { x: 66, y: 66 },
    blockType: 'Nursing & Allied Health Sciences',
    description: 'School of Nursing featuring simulation labs, clinical skill rooms, anatomy theatres, and student health services.'
  },
  { 
    id: 'bldg-eng', 
    name: 'EMERGENCY', 
    code: 'EMG', 
    floors: 5, 
    areaSqFt: 175000, 
    solarKwPeak: 130,
    coordinates: { x: 74, y: 42 },
    blockType: 'Emergency Medicine & Trauma Centre',
    description: 'Campus Emergency and Disaster Response Centre housing paramedic training, trauma simulation, and 24x7 campus health emergency services.'
  },
  { 
    id: 'bldg-athl', 
    name: 'Eco-Athletics & Sports Pavilion', 
    code: 'EASP', 
    floors: 2, 
    areaSqFt: 130000, 
    solarKwPeak: 110,
    coordinates: { x: 24, y: 16 },
    blockType: 'Sports & Wellness',
    description: 'North sports zone featuring full running track, soccer turf, tennis courts, and a wellness centre.'
  },
  { 
    id: 'bldg-waste', 
    name: 'Circular Waste & Utility Hub', 
    code: 'CWEH', 
    floors: 2, 
    areaSqFt: 60000, 
    solarKwPeak: 140,
    coordinates: { x: 52, y: 15 },
    blockType: 'Circular Infrastructure',
    description: 'Northern utility logistics facility handling campus-wide composting, compaction, and recycling operations.'
  },
  { 
    id: 'bldg-solar', 
    name: 'Solar Canopy Transit Hub & EV Lot', 
    code: 'STEV', 
    floors: 1, 
    areaSqFt: 85000, 
    solarKwPeak: 180,
    coordinates: { x: 80, y: 82 },
    blockType: 'Clean Transit & EV Infrastructure',
    description: 'Southeast paved parking facility covered with high-efficiency bifacial solar canopies and 24 EV chargers.'
  },
  { 
    id: 'bldg-quad', 
    name: 'Botanical Conservatory & Gardens', 
    code: 'BCPG', 
    floors: 1, 
    areaSqFt: 45000, 
    solarKwPeak: 30,
    coordinates: { x: 50, y: 84 },
    blockType: 'Biodiversity & Native Flora',
    description: 'Geometric parterre gardens cultivated with drought-tolerant indigenous flora and automated drip irrigation systems.'
  },
];

export const INITIAL_REPORTS: SustainabilityReport[] = [
  {
    id: 'ECO-2026-0104',
    title: 'Continuous High-Volume Flush Leak in 2nd Floor Restroom',
    description: 'The automated flush sensor valve in Washroom 204B is stuck open, causing an estimated 15 liters of fresh water loss per minute.',
    category: 'water',
    building: 'School of Engineering',
    locationDetails: 'Floor 2, Washroom 204B (West Wing)',
    coordinates: { x: 26, y: 42 },
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    dateObserved: '2026-10-14 09:15',
    dateReported: '2026-10-14 09:22',
    reporterId: 'usr-student-1',
    reporterName: 'Aria Sharma',
    reporterRole: 'student',
    status: 'in_progress',
    assignedDepartmentId: 'dept-plumbing',
    assignedDepartmentName: 'Plumbing & Water Resources',
    assignedStaffName: 'Tech. Marcus Vance',
    urgency: 'high',
    isSimulated: true,
    aiAnalysis: {
      detectedCategory: 'water',
      confidenceScore: 0.94,
      urgency: 'high',
      suggestedDepartment: 'Plumbing & Water Resources',
      suggestedAction: 'Isolate secondary supply valve; inspect solenoid sensor switch.',
      evidenceSummary: 'Computer Vision detected continuous fluid flow and valve miscalibration with 94% visual confidence.',
      requiresHumanReview: false,
      visualKeywords: ['water flow', 'flush valve', 'porcelain fixture', 'pooling liquid']
    },
    history: [
      { id: 'h-1', status: 'submitted', timestamp: '2026-10-14 09:22', actorName: 'Aria Sharma', actorRole: 'student', comment: 'Report created via EcoVerse Campus portal with photo evidence.' },
      { id: 'h-2', status: 'ai_analysis', timestamp: '2026-10-14 09:23', actorName: 'EcoVision AI Pipeline', actorRole: 'admin', comment: 'Visual classification confirmed water leak. Urgency: High. Routed to PWR.' },
      { id: 'h-3', status: 'assigned', timestamp: '2026-10-14 09:25', actorName: 'Auto-Routing Engine', actorRole: 'admin', comment: 'Assigned to Plumbing & Water Resources team.' },
      { id: 'h-4', status: 'acknowledged', timestamp: '2026-10-14 09:30', actorName: 'Tech. Marcus Vance', actorRole: 'maintenance', comment: 'Acknowledged ticket. Dispatched maintenance technician with replacement seal.' },
      { id: 'h-5', status: 'in_progress', timestamp: '2026-10-14 09:45', actorName: 'Tech. Marcus Vance', actorRole: 'maintenance', comment: 'Arrived at site. Main supply shutoff engaged. Rebuilding diaphragm assembly.' }
    ]
  },
  {
    id: 'ECO-2026-0098',
    title: 'High-Intensity Studio Lights Active in Empty Lab Overnight',
    description: 'Row 3 through 8 daylight halogen fixtures remained energized in Architecture Hall 301 while room was completely vacant for 7+ hours.',
    category: 'energy',
    building: 'EMERGENCY',
    locationDetails: 'Floor 3, Studio C (East Block)',
    coordinates: { x: 74, y: 42 },
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    dateObserved: '2026-10-13 23:40',
    dateReported: '2026-10-14 08:10',
    reporterId: 'usr-student-2',
    reporterName: 'Liam Chen',
    reporterRole: 'student',
    status: 'assigned',
    assignedDepartmentId: 'dept-electrical',
    assignedDepartmentName: 'Electrical & Energy Optimization',
    urgency: 'medium',
    isSimulated: true,
    aiAnalysis: {
      detectedCategory: 'energy',
      confidenceScore: 0.91,
      urgency: 'medium',
      suggestedDepartment: 'Electrical & Energy Optimization',
      suggestedAction: 'Verify PIR motion sensor schedule override; recalibrate 15-min auto shutoff.',
      evidenceSummary: 'Visual analysis shows full luminosity in 0% occupancy space.',
      requiresHumanReview: false,
      visualKeywords: ['overhead illumination', 'zero occupancy', 'unattended workspace']
    },
    history: [
      { id: 'h-10', status: 'submitted', timestamp: '2026-10-14 08:10', actorName: 'Liam Chen', actorRole: 'student', comment: 'Noticed lights blazing all morning before studio opened.' },
      { id: 'h-11', status: 'ai_analysis', timestamp: '2026-10-14 08:11', actorName: 'EcoVision AI Pipeline', actorRole: 'admin', comment: 'Classified as Unnecessary Energy Draw. Digital twin occupancy confirmed 0%.' },
      { id: 'h-12', status: 'assigned', timestamp: '2026-10-14 08:15', actorName: 'Admin Routing Rule #4', actorRole: 'admin', comment: 'Assigned to Electrical & Energy Optimization.' }
    ]
  },
  {
    id: 'ECO-2026-0089',
    title: 'Compost Contamination with Non-Recyclable Plastics',
    description: 'Central cafeteria organic bin received multiple plastic clamshell food containers and polystyrene cups, risking whole compost batch rejection.',
    category: 'waste',
    building: 'Nursing',
    locationDetails: 'Ground Floor, North Exit Sort Station',
    coordinates: { x: 66, y: 66 },
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    dateObserved: '2026-10-13 13:30',
    dateReported: '2026-10-13 13:45',
    reporterId: 'usr-fac-1',
    reporterName: 'Prof. Elena Rostova',
    reporterRole: 'student',
    status: 'awaiting_verification',
    assignedDepartmentId: 'dept-waste',
    assignedDepartmentName: 'Housekeeping & Circular Waste',
    assignedStaffName: 'Supervisor Tom Harris',
    urgency: 'high',
    isSimulated: true,
    aiAnalysis: {
      detectedCategory: 'waste',
      confidenceScore: 0.96,
      urgency: 'high',
      suggestedDepartment: 'Housekeeping & Circular Waste',
      suggestedAction: 'Manual diversion before compacting; replenish smart bin signage.',
      evidenceSummary: 'Computer vision identified 8+ non-biodegradable polymeric items in organic stream.',
      requiresHumanReview: false,
      visualKeywords: ['polystyrene', 'plastic film', 'compost bin', 'organic stream']
    },
    history: [
      { id: 'h-20', status: 'submitted', timestamp: '2026-10-13 13:45', actorName: 'Prof. Elena Rostova', actorRole: 'student', comment: 'Contamination spotted right after lunch peak rush.' },
      { id: 'h-21', status: 'assigned', timestamp: '2026-10-13 13:50', actorName: 'Auto-Routing Engine', actorRole: 'admin', comment: 'Assigned to Housekeeping & Circular Waste.' },
      { id: 'h-22', status: 'in_progress', timestamp: '2026-10-13 14:10', actorName: 'Supervisor Tom Harris', actorRole: 'maintenance', comment: 'Segregation team dispatched to intercept bag before composter transport.' },
      { id: 'h-23', status: 'awaiting_verification', timestamp: '2026-10-13 15:00', actorName: 'Supervisor Tom Harris', actorRole: 'maintenance', comment: 'Contaminants safely removed. New bilingual signage posted on bin lid.' }
    ]
  },
  {
    id: 'ECO-2026-0072',
    title: 'Drip Irrigation Pipe Fractured Near Native Flora Garden',
    description: 'Underground micro-emitter line split beneath mulch bed, creating muddy erosion pool and pooling approximately 40 gal/hr.',
    category: 'biodiversity',
    building: 'Botanical Conservatory & Gardens',
    locationDetails: 'Sector G4, East Parterre Native Bed',
    coordinates: { x: 50, y: 84 },
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    dateObserved: '2026-10-12 11:00',
    dateReported: '2026-10-12 11:15',
    reporterId: 'usr-student-1',
    reporterName: 'Aria Sharma',
    reporterRole: 'student',
    status: 'resolved',
    assignedDepartmentId: 'dept-grounds',
    assignedDepartmentName: 'Gardening & Campus Biodiversity',
    assignedStaffName: 'Gardener Samuel Okonjo',
    urgency: 'medium',
    isSimulated: true,
    aiAnalysis: {
      detectedCategory: 'biodiversity',
      confidenceScore: 0.88,
      urgency: 'medium',
      suggestedDepartment: 'Gardening & Campus Biodiversity',
      suggestedAction: 'Splice 1/2-inch poly tubing and adjust zone pressure regulator.',
      evidenceSummary: 'Visible standing water pooling over native root zones.',
      requiresHumanReview: false,
      visualKeywords: ['irrigation pipe', 'mud accumulation', 'native plants']
    },
    history: [
      { id: 'h-30', status: 'submitted', timestamp: '2026-10-12 11:15', actorName: 'Aria Sharma', actorRole: 'student', comment: 'Found water pooling near milkweed patch.' },
      { id: 'h-31', status: 'assigned', timestamp: '2026-10-12 11:20', actorName: 'Auto-Routing Engine', actorRole: 'admin', comment: 'Assigned to Gardening & Campus Biodiversity.' },
      { id: 'h-32', status: 'in_progress', timestamp: '2026-10-12 11:45', actorName: 'Gardener Samuel Okonjo', actorRole: 'maintenance', comment: 'Coupling repaired and pressure tested.' },
      { id: 'h-33', status: 'resolved', timestamp: '2026-10-12 14:00', actorName: 'Aria Sharma', actorRole: 'student', comment: 'Verified repaired on site. Ground drying naturally. Excellent work!' }
    ]
  },
  {
    id: 'ECO-2026-0115',
    title: 'AC Unit Leaking Refrigerant — AI Lab Floor 3',
    description: 'Strong chemical odour detected near GPU cluster room. Maintenance suspects refrigerant leak from split AC unit servicing the server room.',
    category: 'energy',
    building: 'Artificial Intelligence',
    locationDetails: 'Floor 3, GPU Cluster Room AI-301',
    coordinates: { x: 34, y: 68 },
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    dateObserved: '2026-10-14 14:30',
    dateReported: '2026-10-14 14:40',
    reporterId: 'usr-student-1',
    reporterName: 'Aria Sharma',
    reporterRole: 'student',
    status: 'acknowledged',
    assignedDepartmentId: 'dept-electrical',
    assignedDepartmentName: 'Electrical & Energy Optimization',
    assignedStaffName: 'Tech. Ravi Kumar',
    urgency: 'high',
    isSimulated: true,
    aiAnalysis: {
      detectedCategory: 'energy',
      confidenceScore: 0.89,
      urgency: 'high',
      suggestedDepartment: 'Electrical & Energy Optimization',
      suggestedAction: 'Shut down AC unit; evacuate server room; call licensed HVAC technician for R-410A recovery.',
      evidenceSummary: 'Infrared sensor anomaly + chemical trace detected by IoT air quality sensor AI-AQM-301.',
      requiresHumanReview: true,
      visualKeywords: ['HVAC unit', 'refrigerant', 'chemical odour', 'server room']
    },
    history: [
      { id: 'h-40', status: 'submitted', timestamp: '2026-10-14 14:40', actorName: 'Aria Sharma', actorRole: 'student', comment: 'Noticed unusual smell near GPU cluster room.' },
      { id: 'h-41', status: 'ai_analysis', timestamp: '2026-10-14 14:41', actorName: 'EcoVision AI Pipeline', actorRole: 'admin', comment: 'IoT sensor corroborates chemical trace. Escalated to High urgency.' },
      { id: 'h-42', status: 'acknowledged', timestamp: '2026-10-14 14:50', actorName: 'Tech. Ravi Kumar', actorRole: 'maintenance', comment: 'On the way. Bringing gas leak detector kit.' }
    ]
  },
  {
    id: 'ECO-2026-0108',
    title: 'Water Stain on Ceiling — CDSIMER Admin Corridor',
    description: 'Brown water stain expanding on suspended ceiling tile in the admin corridor, likely caused by overhead plumbing joint failure.',
    category: 'water',
    building: 'CDSIMER',
    locationDetails: 'Ground Floor, Admin Corridor A-102',
    coordinates: { x: 50, y: 44 },
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7b05?auto=format&fit=crop&w=800&q=80',
    dateObserved: '2026-10-14 10:00',
    dateReported: '2026-10-14 10:10',
    reporterId: 'usr-admin-1',
    reporterName: 'Dr. Sophia Vance',
    reporterRole: 'admin',
    status: 'submitted',
    urgency: 'medium',
    isSimulated: true,
    aiAnalysis: {
      detectedCategory: 'water',
      confidenceScore: 0.85,
      urgency: 'medium',
      suggestedDepartment: 'Plumbing & Water Resources',
      suggestedAction: 'Inspect overhead joint above ceiling tile A-102; check riser pipe pressure.',
      evidenceSummary: 'Visual anomaly detected — moisture absorption pattern on acoustic ceiling tile.',
      requiresHumanReview: false,
      visualKeywords: ['ceiling stain', 'water damage', 'acoustic tile', 'moisture']
    },
    history: [
      { id: 'h-50', status: 'submitted', timestamp: '2026-10-14 10:10', actorName: 'Dr. Sophia Vance', actorRole: 'admin', comment: 'Stain appeared overnight. Tile is swollen and discoloured.' }
    ]
  }
];

export const WASTE_BINS: WasteBin[] = [
  { id: 'bin-101', location: 'School of Engineering West Entrance', building: 'School of Engineering', type: 'plastic', fullness: 88, status: 'near_full', lastEmptied: '2026-10-14 06:00', collectionPriority: 'high', coordinates: { x: 24, y: 45 } },
  { id: 'bin-102', location: 'Engineering Ground Cafe Atrium', building: 'School of Engineering', type: 'organic', fullness: 94, status: 'overflowing', lastEmptied: '2026-10-13 18:00', collectionPriority: 'urgent', coordinates: { x: 28, y: 40 } },
  { id: 'bin-103', location: 'EMERGENCY Maker Lab Bay', building: 'EMERGENCY', type: 'metal', fullness: 45, status: 'normal', lastEmptied: '2026-10-14 07:30', collectionPriority: 'low', coordinates: { x: 72, y: 40 } },
  { id: 'bin-104', location: 'EMERGENCY East Courtyard', building: 'EMERGENCY', type: 'paper', fullness: 72, status: 'normal', lastEmptied: '2026-10-13 20:00', collectionPriority: 'medium', coordinates: { x: 76, y: 45 } },
  { id: 'bin-105', location: 'Nursing Hall Central Sort Chute', building: 'Nursing', type: 'organic', fullness: 96, status: 'overflowing', lastEmptied: '2026-10-14 05:45', collectionPriority: 'urgent', coordinates: { x: 67, y: 68 } },
  { id: 'bin-106', location: 'CDSIMER Circular Walk', building: 'CDSIMER', type: 'paper', fullness: 30, status: 'normal', lastEmptied: '2026-10-14 08:00', collectionPriority: 'low', coordinates: { x: 51, y: 46 } },
  { id: 'bin-107', location: 'Athletic Field North Concourse', building: 'Eco-Athletics & Sports Pavilion', type: 'plastic', fullness: 64, status: 'normal', lastEmptied: '2026-10-13 22:00', collectionPriority: 'medium', coordinates: { x: 24, y: 19 } },
  { id: 'bin-108', location: 'Central Waste Logistics Depot', building: 'Circular Waste & Utility Hub', type: 'glass', fullness: 52, status: 'normal', lastEmptied: '2026-10-12 16:00', collectionPriority: 'low', coordinates: { x: 53, y: 17 } },
  { id: 'bin-109', location: 'Solar Transit EV Charging Shelter', building: 'Solar Canopy Transit Hub & EV Lot', type: 'general', fullness: 38, status: 'normal', lastEmptied: '2026-10-14 04:30', collectionPriority: 'low', coordinates: { x: 81, y: 84 } }
];

export const BUILDING_ENERGY_METRICS: BuildingEnergyMetric[] = [
  { id: 'bldg-admin', name: 'CDSIMER', currentConsumptionKw: 215, baselineKw: 195, peakKw: 280, status: 'optimal', occupancyPercent: 68, activeAnomalies: 1 },
  { id: 'bldg-sci', name: 'School of Engineering', currentConsumptionKw: 342, baselineKw: 280, peakKw: 420, status: 'warning', occupancyPercent: 78, activeAnomalies: 2 },
  { id: 'bldg-bio', name: 'Artificial Intelligence', currentConsumptionKw: 295, baselineKw: 260, peakKw: 360, status: 'warning', occupancyPercent: 72, activeAnomalies: 1 },
  { id: 'bldg-stu', name: 'Nursing', currentConsumptionKw: 260, baselineKw: 210, peakKw: 350, status: 'warning', occupancyPercent: 92, activeAnomalies: 2 },
  { id: 'bldg-eng', name: 'EMERGENCY', currentConsumptionKw: 410, baselineKw: 390, peakKw: 510, status: 'optimal', occupancyPercent: 84, activeAnomalies: 1 },
  { id: 'bldg-athl', name: 'Eco-Athletics & Sports Pavilion', currentConsumptionKw: 180, baselineKw: 160, peakKw: 250, status: 'optimal', occupancyPercent: 65, activeAnomalies: 0 },
  { id: 'bldg-waste', name: 'Circular Waste & Utility Hub', currentConsumptionKw: 140, baselineKw: 130, peakKw: 200, status: 'optimal', occupancyPercent: 40, activeAnomalies: 0 },
  { id: 'bldg-solar', name: 'Solar Canopy Transit Hub & EV Lot', currentConsumptionKw: 85, baselineKw: 90, peakKw: 150, status: 'optimal', occupancyPercent: 55, activeAnomalies: 0 },
  { id: 'bldg-quad', name: 'Botanical Conservatory & Gardens', currentConsumptionKw: 45, baselineKw: 40, peakKw: 70, status: 'optimal', occupancyPercent: 30, activeAnomalies: 0 },
];

export const RECYCLING_SAMPLES = [
  {
    id: 'smp-1',
    name: 'Polyethylene (PET) Clear Water Bottle',
    category: 'Recyclable Plastic (#1 PET)',
    confidence: 0.98,
    isHazardous: false,
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
    instructions: '1. Empty liquids completely. 2. Flatten bottle to save bin volume. 3. Caps can be re-screwed or deposited in specialized poly cap collection bin.',
    upcycleTip: 'Can be re-spun into rPET fibers for campus athletic apparel or thermal fleece blankets.',
    materialComposition: '100% Polyethylene Terephthalate, resin code 1.'
  },
  {
    id: 'smp-2',
    name: 'Used Lithium-Polymer Laptop Battery Pack',
    category: 'Hazardous E-Waste',
    confidence: 0.99,
    isHazardous: true,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    instructions: 'DO NOT DISPOSE IN GENERAL OR RECYCLING BINS! Risk of thermal runaway and fire. Place terminal leads in insulating tape and drop at MakerSpace Battery Safe Box.',
    upcycleTip: 'Specialist hydrometallurgical recycling recovers 95% Cobalt, Nickel, and Lithium for new battery cathodes.',
    materialComposition: 'Lithium Cobalt Oxide / Graphite / Volatile organic solvent electrolyte.'
  },
  {
    id: 'smp-3',
    name: 'Corrugated Cardboard Shipping Box',
    category: 'Clean Paper & Fiber',
    confidence: 0.95,
    isHazardous: false,
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    instructions: 'Remove excessive synthetic packing tape. Flatten box completely before placing into blue fiber recycling hopper.',
    upcycleTip: 'Pulp can be recycled up to 7 times into egg cartons, mailers, and cardboard cores.',
    materialComposition: 'Unbleached kraft cellulose fibers.'
  },
  {
    id: 'smp-4',
    name: 'Single-Use Takeout Coffee Cup with PE Lining',
    category: 'Composite Item (Trash / Specialized Facility)',
    confidence: 0.92,
    isHazardous: false,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    instructions: 'Contains thin plastic waterproof membrane fused to paperboard. Standard paper mills cannot pulp this. Dispose in General Waste unless specialized TerraCycle paper cup box is present.',
    upcycleTip: 'Switch to a reusable thermos for 10% campus cafe discount and prevent 300+ cups per year.',
    materialComposition: '95% bleached paperboard, 5% Polyethylene waterproofing film.'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Report Assigned to PWR',
    message: 'Report ECO-2026-0104 (Washroom Leak) was auto-assigned to Plumbing & Water Resources.',
    timestamp: '15 mins ago',
    read: false,
    reportId: 'ECO-2026-0104',
    type: 'assignment'
  },
  {
    id: 'notif-2',
    title: 'Status Update: In Progress',
    message: 'Tech Marcus Vance started work on ECO-2026-0104 in School of Engineering.',
    timestamp: '8 mins ago',
    read: false,
    reportId: 'ECO-2026-0104',
    type: 'status_change'
  },
  {
    id: 'notif-3',
    title: 'Waste Bin Overflow Alert',
    message: 'Bin #105 at Nursing Hall reached 96% capacity. Priority dispatched to HCW team.',
    timestamp: '32 mins ago',
    read: true,
    type: 'alert'
  },
  {
    id: 'notif-4',
    title: 'New High Urgency Report — AI Block',
    message: 'AC refrigerant leak detected in Artificial Intelligence building, Floor 3. Technician dispatched.',
    timestamp: '5 mins ago',
    read: false,
    reportId: 'ECO-2026-0115',
    type: 'alert'
  }
];