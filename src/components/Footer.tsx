import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Eye, Box, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { isDarkMode } = useApp();

  return (
    <footer className={`border-t transition-colors duration-300 text-xs mt-16 ${
      isDarkMode 
        ? 'border-slate-800/80 bg-[#050811] text-slate-400' 
        : 'border-slate-200/80 bg-white text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Brand & Mission */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Leaf className="w-4 h-4 text-white fill-white" />
              </div>
              <span className={`font-display font-bold text-base tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                EcoVerse<span className="text-cyan-500">.AI</span>
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              An intelligent enterprise sustainability platform combining Computer Vision, Digital Twins, and Generative AI to accelerate university campus decarbonization, circular waste management, and accountable environmental problem resolution.
            </p>
          </div>

          {/* Core Feature Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Eye className="w-3.5 h-3.5 text-cyan-500" />
              <span>Computer Vision</span>
            </div>
            <div className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Box className="w-3.5 h-3.5 text-emerald-500" />
              <span>Digital Twin</span>
            </div>
            <div className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              isDarkMode 
                ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Generative AI</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${
          isDarkMode 
            ? 'border-slate-800/80 text-slate-500' 
            : 'border-slate-200/80 text-slate-500'
        }`}>
          <div>
            © {new Date().getFullYear()} EcoVerse AI — University Campus Sustainability Initiative. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Academic Presentation Prototype
            </span>
            <Link to="/about" className={`hover:underline transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}>
              Architecture Specs
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
