import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { 
  UserRole, 
  SustainabilityReport, 
  AppNotification, 
  WasteBin, 
  IssueCategory, 
  ReportStatus, 
  AIAnalysisResult,
  Department
} from '../types';
import { 
  INITIAL_REPORTS, 
  INITIAL_NOTIFICATIONS, 
  WASTE_BINS, 
  DEPARTMENTS 
} from '../data/mockData';

interface AppContextType {
  // Auth & Role
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: { id: string; name: string; role: UserRole; email: string; department?: string };
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Sync status is shown explicitly: a working demo is not necessarily synchronized.
  syncStatus: 'local' | 'connecting' | 'live' | 'error';
  syncMessage: string;

  // Reports
  reports: SustainabilityReport[];
  addReport: (newReport: Omit<SustainabilityReport, 'id' | 'dateReported' | 'status' | 'history' | 'isSimulated' | 'aiAnalysis'>) => SustainabilityReport;
  updateReportStatus: (reportId: string, newStatus: ReportStatus, comment?: string, evidenceUrl?: string) => void;
  assignReportDepartment: (reportId: string, deptId: string, deptName: string) => void;
  getReportById: (id: string) => SustainabilityReport | undefined;

  // Waste Bins
  wasteBins: WasteBin[];
  updateBinFullness: (binId: string, fullness: number) => void;
  emptyBin: (binId: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;

  // Departments
  departments: Department[];

  // Global AI Copilot
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  copilotContext: string;
  setCopilotContext: (ctx: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ROLE_USERS: Record<UserRole, { id: string; name: string; role: UserRole; email: string; department?: string }> = {
  student: {
    id: 'usr-student-1',
    name: 'Aria Sharma',
    role: 'student',
    email: 'aria.sharma@ecoverse.edu',
  },
  maintenance: {
    id: 'usr-maint-1',
    name: 'Marcus Vance (Facility Tech)',
    role: 'maintenance',
    email: 'marcus.vance@ecoverse.edu',
    department: 'Plumbing & Water Resources'
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Dr. Sophia Vance (Chief Sustainability Officer)',
    role: 'admin',
    email: 'sophia.vance@ecoverse.edu'
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ecoverse_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('ecoverse_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('ecoverse_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Role state (with localStorage persistence)
  // Role state
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = sessionStorage.getItem('ecoverse_role');
      return (saved as UserRole) || 'student';
    } catch {
      return 'student';
    }
  });

  // Auth state: always starts as false on fresh localhost open so Login Page opens first
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      localStorage.removeItem('ecoverse_auth');
      const saved = sessionStorage.getItem('ecoverse_auth');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const login = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('ecoverse_role', role);
      sessionStorage.setItem('ecoverse_auth', 'true');
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('ecoverse_auth');
      sessionStorage.removeItem('ecoverse_role');
      localStorage.removeItem('ecoverse_auth');
      localStorage.removeItem('ecoverse_role');
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  };

  const handleSetCurrentRole = (role: UserRole) => {
    setCurrentRole(role);
    try {
      sessionStorage.setItem('ecoverse_role', role);
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  };

  const currentUser = ROLE_USERS[currentRole];

  // Shared reports and bins use Supabase when configured; otherwise use local-only demo storage.
  // When cloud mode is active, the server is authoritative on initial load.
  const [reports, setReports] = useState<SustainabilityReport[]>(() => {
    if (supabase) return INITIAL_REPORTS;
    try { return JSON.parse(localStorage.getItem('ecoverse_reports') || 'null') || INITIAL_REPORTS; }
    catch { return INITIAL_REPORTS; }
  });
  const [wasteBins, setWasteBins] = useState<WasteBin[]>(() => {
    if (supabase) return WASTE_BINS;
    try { return JSON.parse(localStorage.getItem('ecoverse_waste_bins') || 'null') || WASTE_BINS; }
    catch { return WASTE_BINS; }
  });
  const reportsRef = useRef(reports);
  const binsRef = useRef(wasteBins);
  const [syncStatus, setSyncStatus] = useState<'local' | 'connecting' | 'live' | 'error'>(supabase ? 'connecting' : 'local');
  const [syncMessage, setSyncMessage] = useState(supabase ? 'Connecting to shared Supabase data…' : 'Local-only demo: Supabase environment variables are missing.');

  const replaceReports = (rows: SustainabilityReport[]) => {
    reportsRef.current = rows;
    setReports(rows);
  };
  const replaceBins = (rows: WasteBin[]) => {
    binsRef.current = rows;
    setWasteBins(rows);
  };

  // In browser-demo mode only, preserve the original localStorage behavior.
  useEffect(() => {
    if (!supabase) localStorage.setItem('ecoverse_reports', JSON.stringify(reports));
  }, [reports]);
  useEffect(() => {
    if (!supabase) localStorage.setItem('ecoverse_waste_bins', JSON.stringify(wasteBins));
  }, [wasteBins]);

  useEffect(() => {
    if (!supabase) return;
    const db = supabase;
    let active = true;
    let reportsRequest = 0;
    let binsRequest = 0;
    let dataLoaded = false;
    let realtimeConnected = false;

    const fail = (error: unknown) => {
      if (!active) return;
      console.error('EcoVerse shared-data error:', error);
      setSyncStatus('error');
      setSyncMessage(`Cloud synchronization failed: ${error instanceof Error ? error.message : String(error)}. Check SQL, RLS, Supabase keys and Realtime.`);
    };

    const markLive = () => {
      if (active && dataLoaded && realtimeConnected) {
        setSyncStatus('live');
        setSyncMessage('Shared data is synchronized through Supabase.');
      }
    };

    const reloadReports = async () => {
      const request = ++reportsRequest;
      const { data, error } = await db.from('ecoverse_demo_reports').select('data');
      if (error) throw error;
      if (active && request === reportsRequest) {
        replaceReports((data || []).map(row => row.data as SustainabilityReport)
          .sort((a, b) => b.dateReported.localeCompare(a.dateReported)));
      }
    };

    const reloadBins = async () => {
      const request = ++binsRequest;
      const { data, error } = await db.from('ecoverse_demo_bins').select('data');
      if (error) throw error;
      if (active && request === binsRequest) replaceBins((data || []).map(row => row.data as WasteBin));
    };

    const channel = db.channel('ecoverse-demo-shared-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ecoverse_demo_reports' },
        () => { void reloadReports().catch(fail); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ecoverse_demo_bins' },
        () => { void reloadBins().catch(fail); })
      .subscribe((status: string) => {
        if (!active) return;
        if (status === 'SUBSCRIBED') { realtimeConnected = true; markLive(); }
        else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
          realtimeConnected = false;
          fail(new Error(`Realtime channel status: ${status}`));
        }
      });

    const initialize = async () => {
      try {
        const [r, b] = await Promise.all([
          db.from('ecoverse_demo_reports').select('id').limit(1),
          db.from('ecoverse_demo_bins').select('id').limit(1)
        ]);
        if (r.error) throw r.error;
        if (b.error) throw b.error;

        // First visitor seeds the shared sample set. ignoreDuplicates prevents
        // later visitors from overwriting edits to the initial demo records.
        if (!r.data?.length) {
          const result = await db.from('ecoverse_demo_reports')
            .upsert(INITIAL_REPORTS.map(report => ({ id: report.id, data: report })),
              { onConflict: 'id', ignoreDuplicates: true });
          if (result.error) throw result.error;
        }
        if (!b.data?.length) {
          const result = await db.from('ecoverse_demo_bins')
            .upsert(WASTE_BINS.map(bin => ({ id: bin.id, data: bin })),
              { onConflict: 'id', ignoreDuplicates: true });
          if (result.error) throw result.error;
        }
        await Promise.all([reloadReports(), reloadBins()]);
        if (!active) return;
        dataLoaded = true;
        markLive();
      } catch (error) { fail(error); }
    };
    void initialize();
    return () => { active = false; void db.removeChannel(channel); };
  }, []);

  // Serialize writes per record so a rapid sequence of clicks or slider moves
  // cannot finish out of order and leave an older value on the server.
  const pendingReportWrites = useRef(new Map<string, SustainabilityReport>());
  const activeReportWrites = useRef(new Set<string>());
  const pendingBinWrites = useRef(new Map<string, WasteBin>());
  const activeBinWrites = useRef(new Set<string>());

  const saveReport = (report: SustainabilityReport) => {
    if (!supabase) return;
    const db = supabase;
    pendingReportWrites.current.set(report.id, report);
    if (activeReportWrites.current.has(report.id)) return;
    activeReportWrites.current.add(report.id);
    void (async () => {
      while (pendingReportWrites.current.has(report.id)) {
        const latest = pendingReportWrites.current.get(report.id)!;
        pendingReportWrites.current.delete(report.id);
        const { error } = await db.from('ecoverse_demo_reports').upsert({ id: latest.id, data: latest }, { onConflict: 'id' });
        if (error) {
          setSyncStatus('error');
          setSyncMessage(`Unable to save report ${report.id}: ${error.message}. Refresh after fixing the database.`);
          console.error(error);
          break;
        }
      }
      activeReportWrites.current.delete(report.id);
    })();
  };

  const saveBin = (bin: WasteBin) => {
    if (!supabase) return;
    const db = supabase;
    pendingBinWrites.current.set(bin.id, bin);
    if (activeBinWrites.current.has(bin.id)) return;
    activeBinWrites.current.add(bin.id);
    void (async () => {
      while (pendingBinWrites.current.has(bin.id)) {
        const latest = pendingBinWrites.current.get(bin.id)!;
        pendingBinWrites.current.delete(bin.id);
        const { error } = await db.from('ecoverse_demo_bins').upsert({ id: latest.id, data: latest }, { onConflict: 'id' });
        if (error) {
          setSyncStatus('error');
          setSyncMessage(`Unable to save bin ${bin.id}: ${error.message}. Refresh after fixing the database.`);
          console.error(error);
          break;
        }
      }
      activeBinWrites.current.delete(bin.id);
    })();
  };

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('ecoverse_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved notifications', e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('ecoverse_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Copilot state
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotContext, setCopilotContext] = useState('Overview');

  // Simulated AI Computer Vision analysis generator
  const runSimulatedAIAnalysis = (category: IssueCategory, title: string, desc: string): AIAnalysisResult => {
    const text = (title + ' ' + desc).toLowerCase();
    let suggestedDept = 'Integrated Facilities & Civil Infra';
    let suggestedAction = 'Dispatch initial inspector to verify site parameters.';
    let urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    let keywords = ['campus visual feed', 'anomaly check'];

    if (category === 'water' || text.includes('water') || text.includes('leak') || text.includes('pipe') || text.includes('flush')) {
      suggestedDept = 'Plumbing & Water Resources';
      suggestedAction = 'Check isolation valves, meter flow rates, replace damaged seals or pipe segments.';
      urgency = text.includes('flood') || text.includes('heavy') || text.includes('high') ? 'critical' : 'high';
      keywords = ['fluid flow pattern', 'hydrostatic pressure loss', 'fixture valve'];
    } else if (category === 'energy' || text.includes('light') || text.includes('power') || text.includes('ac') || text.includes('hvac')) {
      suggestedDept = 'Electrical & Energy Optimization';
      suggestedAction = 'Inspect occupancy sensor circuit, verify BMS schedule override, replace ballast.';
      urgency = 'medium';
      keywords = ['lux level anomaly', 'parasitic energy draw', 'unoccupied illumination'];
    } else if (category === 'waste' || text.includes('trash') || text.includes('bin') || text.includes('overflow') || text.includes('compost')) {
      suggestedDept = 'Housekeeping & Circular Waste';
      suggestedAction = 'Schedule emergency bag changeout; audit bin signage and volume telemetry.';
      urgency = text.includes('spill') || text.includes('overflow') ? 'high' : 'medium';
      keywords = ['volumetric fill threshold', 'contamination index', 'chute blockage'];
    } else if (category === 'biodiversity' || text.includes('plant') || text.includes('tree') || text.includes('garden')) {
      suggestedDept = 'Gardening & Campus Biodiversity';
      suggestedAction = 'Conduct root health check, recalibrate drip irrigation line, apply organic mulch.';
      urgency = 'medium';
      keywords = ['canopy vigor', 'soil moisture deficiency', 'flora habitat'];
    }

    return {
      detectedCategory: category,
      confidenceScore: +(0.88 + Math.random() * 0.1).toFixed(2),
      urgency,
      suggestedDepartment: suggestedDept,
      suggestedAction,
      evidenceSummary: `Computer Vision model analyzed visual evidence against 12,000+ campus facilities training records. Categorized as ${category.toUpperCase()} with high fidelity.`,
      requiresHumanReview: urgency === 'critical',
      visualKeywords: keywords
    };
  };

  const addReport = (newReportData: Omit<SustainabilityReport, 'id' | 'dateReported' | 'status' | 'history' | 'isSimulated' | 'aiAnalysis'>) => {
    const newId = `ECO-2026-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    
    const aiAnalysis = runSimulatedAIAnalysis(newReportData.category, newReportData.title, newReportData.description);
    
    // Auto-resolve assigned department based on routing rules
    const targetDept = DEPARTMENTS.find(d => d.categoriesHandled.includes(newReportData.category)) || DEPARTMENTS[4];

    const newReport: SustainabilityReport = {
      ...newReportData,
      id: newId,
      dateReported: now,
      status: 'assigned',
      assignedDepartmentId: targetDept.id,
      assignedDepartmentName: targetDept.name,
      urgency: aiAnalysis.urgency,
      aiAnalysis,
      isSimulated: true,
      history: [
        {
          id: `h-${Date.now()}-1`,
          status: 'submitted',
          timestamp: now,
          actorName: currentUser.name,
          actorRole: currentUser.role,
          comment: 'Report submitted through EcoVerse Campus portal.'
        },
        {
          id: `h-${Date.now()}-2`,
          status: 'ai_analysis',
          timestamp: now,
          actorName: 'EcoVision AI Pipeline',
          actorRole: 'admin',
          comment: `Computer Vision auto-classified item (${(aiAnalysis.confidenceScore * 100).toFixed(0)}% confidence). Urgency: ${aiAnalysis.urgency.toUpperCase()}.`
        },
        {
          id: `h-${Date.now()}-3`,
          status: 'assigned',
          timestamp: now,
          actorName: 'EcoVerse Routing Engine',
          actorRole: 'admin',
          comment: `Automatically routed to ${targetDept.name} based on campus policy.`
        }
      ]
    };

    replaceReports([newReport, ...reportsRef.current]);
    saveReport(newReport);

    // Create notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Sustainability Report Created',
      message: `${newId} (${newReport.title}) was submitted and routed to ${targetDept.name}.`,
      timestamp: 'Just now',
      read: false,
      reportId: newId,
      type: 'assignment'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newReport;
  };

  const updateReportStatus = (reportId: string, newStatus: ReportStatus, comment?: string, evidenceUrl?: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const previous = reportsRef.current.find(r => r.id === reportId);
    if (!previous) return;
    const updated: SustainabilityReport = {
      ...previous,
      status: newStatus,
      resolutionEvidenceUrl: evidenceUrl || previous.resolutionEvidenceUrl,
      resolutionNotes: comment || previous.resolutionNotes,
      history: [...previous.history, {
        id: `h-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        status: newStatus,
        timestamp: now,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        comment: comment || `Status updated to ${newStatus.replace('_', ' ').toUpperCase()}`,
        evidenceUrl: evidenceUrl || undefined
      }]
    };
    replaceReports(reportsRef.current.map(r => r.id === reportId ? updated : r));
    saveReport(updated);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Status Updated: ${newStatus.replace('_', ' ').toUpperCase()}`,
      message: `Report ${reportId} status was updated by ${currentUser.name}.`,
      timestamp: 'Just now',
      read: false,
      reportId,
      type: 'status_change'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const assignReportDepartment = (reportId: string, deptId: string, deptName: string) => {
    const previous = reportsRef.current.find(r => r.id === reportId);
    if (!previous) return;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updated: SustainabilityReport = {
      ...previous,
      status: 'assigned',
      assignedDepartmentId: deptId,
      assignedDepartmentName: deptName,
      history: [...previous.history, {
        id: `h-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        status: 'assigned',
        timestamp: now,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        comment: `Reassigned to ${deptName} by Administrator.`
      }]
    };
    replaceReports(reportsRef.current.map(r => r.id === reportId ? updated : r));
    saveReport(updated);
  };

  const getReportById = (id: string) => reports.find(r => r.id === id);

  // Per-record writes avoid replacing other people's unrelated edits.
  const updateBinFullness = (binId: string, fullness: number) => {
    const old = binsRef.current.find(b => b.id === binId);
    if (!old) return;
    const status = fullness >= 90 ? 'overflowing' : fullness >= 75 ? 'near_full' : 'normal';
    const collectionPriority = fullness >= 90 ? 'urgent' : fullness >= 75 ? 'high' : fullness >= 50 ? 'medium' : 'low';
    const updated: WasteBin = { ...old, fullness, status, collectionPriority };
    replaceBins(binsRef.current.map(b => b.id === binId ? updated : b));
    saveBin(updated);
  };

  const emptyBin = (binId: string) => {
    const old = binsRef.current.find(b => b.id === binId);
    if (!old) return;
    const updated: WasteBin = {
      ...old, fullness: 0, status: 'collected', collectionPriority: 'low',
      lastEmptied: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    replaceBins(binsRef.current.map(b => b.id === binId ? updated : b));
    saveBin(updated);
  };

  // Notification actions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        syncStatus,
        syncMessage,
        login,
        logout,
        currentRole,
        setCurrentRole: handleSetCurrentRole,
        currentUser,
        isDarkMode,
        toggleDarkMode,
        reports,
        addReport,
        updateReportStatus,
        assignReportDepartment,
        getReportById,
        wasteBins,
        updateBinFullness,
        emptyBin,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        unreadCount,
        departments: DEPARTMENTS,
        isCopilotOpen,
        setIsCopilotOpen,
        copilotContext,
        setCopilotContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
