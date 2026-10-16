export type UserRole = 'student' | 'maintenance' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  departmentName?: string;
  avatar?: string;
}

export type IssueCategory = 
  | 'water'
  | 'energy'
  | 'waste'
  | 'biodiversity'
  | 'maintenance'
  | 'other';

export type ReportStatus = 
  | 'submitted'
  | 'ai_analysis'
  | 'awaiting_assignment'
  | 'assigned'
  | 'acknowledged'
  | 'in_progress'
  | 'awaiting_verification'
  | 'resolved'
  | 'reopened';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export interface AIAnalysisResult {
  detectedCategory: IssueCategory;
  confidenceScore: number;
  urgency: UrgencyLevel;
  suggestedDepartment: string;
  suggestedAction: string;
  evidenceSummary: string;
  requiresHumanReview: boolean;
  visualKeywords: string[];
}

export interface StatusHistoryEntry {
  id: string;
  status: ReportStatus;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  comment?: string;
  evidenceUrl?: string;
}

export interface SustainabilityReport {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  building: string;
  locationDetails: string;
  coordinates?: { x: number; y: number };
  imageUrl?: string;
  dateObserved: string;
  dateReported: string;
  reporterId: string;
  reporterName: string;
  reporterRole: UserRole;
  status: ReportStatus;
  assignedDepartmentId?: string;
  assignedDepartmentName?: string;
  assignedStaffName?: string;
  urgency: UrgencyLevel;
  aiAnalysis?: AIAnalysisResult;
  history: StatusHistoryEntry[];
  resolutionEvidenceUrl?: string;
  resolutionNotes?: string;
  isSimulated: boolean;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  leadPerson: string;
  contactEmail: string;
  activeStaffCount: number;
  openTickets: number;
  avgResolutionHours: number;
  categoriesHandled: IssueCategory[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  reportId?: string;
  type: 'status_change' | 'assignment' | 'alert' | 'system';
}

export interface WasteBin {
  id: string;
  location: string;
  building: string;
  type: 'plastic' | 'paper' | 'metal' | 'glass' | 'organic' | 'general';
  fullness: number; // 0-100%
  status: 'normal' | 'near_full' | 'overflowing' | 'collected';
  lastEmptied: string;
  collectionPriority: 'low' | 'medium' | 'high' | 'urgent';
  coordinates: { x: number; y: number };
}

export interface BuildingEnergyMetric {
  id: string;
  name: string;
  currentConsumptionKw: number;
  baselineKw: number;
  peakKw: number;
  status: 'optimal' | 'warning' | 'critical';
  occupancyPercent: number;
  activeAnomalies: number;
}
