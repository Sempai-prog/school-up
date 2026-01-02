
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Play, BookOpen, Layers, Trophy, 
    Target, ChevronDown, ChevronUp, Star, Zap, Lock, CheckCircle2
} from 'lucide-react';
import { Subject, Module } from '../types';

interface SubjectPortalProps {
  subject: Subject;
  modules: Module[];
  onBack: () => void;
  onStart: () => void;
}

const SubjectPortal: React.FC<SubjectPortalProps> = ({ subject, modules, onBack, onStart }) => {
  // Open the first module by default or the one with active progress
  const [expandedModule, setExpandedModule] = useState<string | null>(modules[0]?.id || null);

  // --- STATS CALCULATION ENGINE ---
  const totalChapters = modules.reduce((acc, mod) => 
    acc + mod.units.reduce((uAcc, unit) => uAcc + unit.chapters.length, 0), 0
  );
  
  const completedChapters = modules.reduce((acc, mod) => 
    acc + mod.units.reduce((uAcc, unit) => 
      uAcc + unit.chapters.filter(c => c.status === 'completed').length, 0), 0
  );

  const earnedXP = modules.reduce((acc, mod) => 
    acc + mod.units.reduce((uAcc, unit) => 
        uAcc + unit.chapters.reduce((cAcc, c) => c.status === 'completed' ? cAcc + c.xpReward : cAcc, 0), 0), 0
  );

  const progress = totalChapters === 0 ? 0 : Math.round((completedChapters / totalChapters) * 100);

  // --- DYNAMIC STYLING ---
  // Helper to extract color name from Tailwind class (e.g. 'bg-blue-600' -> 'blue')
  const getColorName = (colorClass: string) => {
      const parts = colorClass.split('-');
      return parts.length > 1 ? parts[1] : 'blue';
  };
  
  const colorName = getColorName(subject.color);
  
  // Tailwind Safe-listing workaround: We use explicit style objects for dynamic colors where Tailwind might fail in JIT if classes aren't detected
  const dynamicStyles = {
      bg: `bg-${colorName}-500`,
      bgLight: `bg-${colorName}-50`,
      text: `text-${colorName}-600`,
      shadow: `shadow-${colorName}-200`
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] relative overflow-hidden">
       {/* HERO HEADER SECTION */}
       <div className="relative z-10 bg-white rounded-b-[40px] shadow-xl shadow-slate-200/50 overflow-hidden">
           {/* Abstract Background Elements */}
           <div className={`absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-gradient-to-br from-${colorName}-400 to-${colorName}-600 -mr-10 -mt-10 blur-3xl`}></div>
           <div className={`absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10 bg-gradient-to-tr from-${colorName}-400 to-${colorName}-600 -ml-10 -mb-10 blur-2xl`}></div>

           {/* Top Navigation */}
           <div className="flex items-center justify-between p-6 relative z-20">
               <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors group">
                   <ArrowLeft size={24} className="text-slate-600 group-hover:text-slate-900" />
               </button>
               <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${dynamicStyles.bgLight} ${dynamicStyles.text}`}>
                   Portail de Matière
               </div>
           </div>

           {/* Subject Identity & Stats */}
           <div className="flex flex-col items-center px-6 pb-8 relative z-20">
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className={`w-24 h-24 rounded-3xl ${dynamicStyles.bgLight} ${dynamicStyles.text} flex items-center justify-center mb-4 border-4 border-white shadow-2xl ${dynamicStyles.shadow}`}
               >
                   <BookOpen size={40} />
               </motion.div>
               
               <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-1 leading-none">{subject.name}</h1>
               <p className="text-slate-400 font-medium text-sm mb-8">Parcours Officiel • {new Date().getFullYear()}</p>

               {/* Dashboard Stats Row */}
               <div className="grid grid-cols-3 w-full gap-2">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
                        <div className="flex items-center gap-1.5 text-slate-800 font-black text-lg">
                            <Layers size={18} className="text-slate-400" />
                            {completedChapters}<span className="text-slate-300 text-sm">/{totalChapters}</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide mt-1">Chapitres</span>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
                         <div className="flex items-center gap-1.5 text-slate-800 font-black text-lg">
                            <Trophy size={18} className="text-yellow-500" />
                            {earnedXP}
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide mt-1">XP Gagné</span>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center">
                         <div className="flex items-center gap-1.5 text-slate-800 font-black text-lg">
                            <Target size={18} className={dynamicStyles.text} />
                            {progress}%
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide mt-1">Global</span>
                    </div>
               </div>
           </div>
       </div>

       {/* CONTENT SCROLL AREA */}
       <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-36">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Programme Détaillé</h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold">{modules.length} Modules</span>
            </div>
            
            {modules.map((module, idx) => (
                <motion.div 
                    key={module.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden"
                >
                    <button 
                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                        className="w-full p-5 flex items-center justify-between bg-white hover:bg-slate-50/50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-sm ${expandedModule === module.id ? `bg-slate-900 text-white` : 'bg-slate-100 text-slate-500'}`}>
                                {idx + 1}
                            </div>
                            <div className="text-left">
                                <h4 className={`font-bold text-sm ${expandedModule === module.id ? 'text-slate-900' : 'text-slate-700'}`}>{module.title}</h4>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">{module.units.length} Unités d'apprentissage</p>
                            </div>
                        </div>
                        <div className={`p-2 rounded-full ${expandedModule === module.id ? 'bg-slate-100' : 'bg-transparent'}`}>
                            {expandedModule === module.id ? <ChevronUp size={18} className="text-slate-600" /> : <ChevronDown size={18} className="text-slate-400" />}
                        </div>
                    </button>

                    <AnimatePresence>
                        {expandedModule === module.id && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-slate-50/50 border-t border-slate-100"
                            >
                                <div className="p-5 pt-2 space-y-4">
                                    {module.units.map(unit => (
                                        <div key={unit.id}>
                                            <div className="flex items-center gap-2 mb-3 mt-2">
                                                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{unit.title}</p>
                                                <div className="h-px bg-slate-200 flex-1"></div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                {unit.chapters.map(chapter => (
                                                    <div key={chapter.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                        <div className="flex items-center gap-3">
                                                            {chapter.status === 'completed' ? (
                                                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                                    <CheckCircle2 size={14} />
                                                                </div>
                                                            ) : chapter.status === 'locked' ? (
                                                                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                                                                    <Lock size={12} />
                                                                </div>
                                                            ) : (
                                                                <div className={`w-6 h-6 rounded-full ${dynamicStyles.bgLight} ${dynamicStyles.text} flex items-center justify-center relative`}>
                                                                    <div className={`absolute inset-0 bg-${colorName}-500 opacity-20 rounded-full animate-ping`}></div>
                                                                    <Play size={10} fill="currentColor" />
                                                                </div>
                                                            )}
                                                            
                                                            <span className={`text-xs font-bold ${chapter.status === 'locked' ? 'text-slate-400' : 'text-slate-700'}`}>
                                                                {chapter.title}
                                                            </span>
                                                        </div>
                                                        
                                                        {chapter.status !== 'locked' && (
                                                            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-[9px] font-bold text-yellow-600 border border-yellow-100">
                                                                <Star size={8} fill="currentColor" />
                                                                {chapter.xpReward}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
       </div>

       {/* BOTTOM ACTION BAR */}
       <div className="absolute bottom-0 left-0 right-0 p-4 pb-safe bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30">
            <div className="flex gap-3 max-w-md mx-auto">
                <button className="flex-1 py-4 rounded-2xl font-bold bg-white border-2 border-slate-100 text-slate-600 flex flex-col items-center justify-center gap-1 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 group">
                    <Zap size={22} className="text-slate-400 group-hover:text-yellow-500 transition-colors" />
                    <span className="text-[10px] uppercase tracking-wide">Mode Révision</span>
                </button>
                
                <button 
                    onClick={onStart}
                    className="flex-[2.5] py-4 rounded-2xl font-bold bg-slate-900 text-white shadow-xl shadow-slate-300 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                    <span className="text-sm relative z-10">Continuer le Parcours</span>
                    <div className="bg-white/20 p-1 rounded-full relative z-10 group-hover:bg-white/30 transition-colors">
                        <Play size={16} fill="currentColor" />
                    </div>
                </button>
            </div>
       </div>
    </div>
  );
};

export default SubjectPortal;
