import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { UserCheck, Shield, Wrench, GraduationCap, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentRole, setCurrentRole, currentUser } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const roles: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode; color: string; desc: string; access: string[] }[] = [
    {
      role: 'student',
      title: 'Student / Faculty Reporter',
      subtitle: 'Aria Sharma (Environmental Science Student)',
      icon: <GraduationCap className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-950/20 hover:border-cyan-400',
      desc: 'Submit sustainability issues, upload visual evidence, view AI classification, and track progress until verified.',
      access: ['Submit new complaints', 'Photo & location upload', 'Track personal timeline', 'Verify resolution']
    },
    {
      role: 'maintenance',
      title: 'Maintenance & Facilities Team',
      subtitle: 'Marcus Vance (Senior Operations Tech)',
      icon: <Wrench className="w-6 h-6 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-950/20 hover:border-amber-400',
      desc: 'Review assigned tickets, update work progress, upload before/after repair evidence, and resolve issues.',
      access: ['Acknowledge tickets', 'Update in-progress status', 'Submit repair proof', 'Add operational notes']
    },
    {
      role: 'admin',
      title: 'Campus Sustainability Administrator',
      subtitle: 'Dr. Sophia Vance (Chief Sustainability Officer)',
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-950/20 hover:border-purple-400',
      desc: 'Cross-campus analytics, configure automated routing rules, reassign tickets, and monitor campus digital twins.',
      access: ['System-wide dashboard', 'Auto-routing engine', 'Reassign any ticket', 'Audit AI confidence']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold font-display flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-emerald-400" />
              Demo Role Selector
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Switch role personas to test different operational permissions and workflows.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid gap-4 mt-5">
          {roles.map(item => {
            const isSelected = currentRole === item.role;
            return (
              <div
                key={item.role}
                onClick={() => {
                  setCurrentRole(item.role);
                  // Navigate to role-appropriate landing page
                  if (item.role === 'admin') {
                    navigate('/admin-reporting');
                  } else if (item.role === 'maintenance') {
                    navigate('/orders');
                  } else {
                    navigate('/');
                  }
                  onClose();
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected ? 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500/50' : item.color
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-100">{item.title}</h3>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                            Active Role
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3">{item.desc}</p>

                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
                  {item.access.map((acc, idx) => (
                    <span key={idx} className="text-[11px] bg-slate-800/60 text-slate-300 px-2 py-0.5 rounded">
                      ✓ {acc}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Currently acting as: <strong className="text-emerald-400">{currentUser.name}</strong></span>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
