
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Play, BookOpen, Layers, Trophy, 
    Target, ChevronDown, ChevronUp, Star, Zap
} from 'lucide-react';
import { Subject, Module } from '../types';

interface SubjectPortalProps {
  subject: Subject;
  modules: Module[];
  onBack: () => void;
  onStart: () => void;
}

const SubjectPortal: React.FC<SubjectPortalProps> = ({ subject, modules, onBack, onStart }) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(modules[0]?.id || null);

  // --- STATS CALCULATION ---
  const totalChapters = modules.reduce((acc, mod) => 
    acc + mod.units.reduce((uAcc, unit) => uAcc + unit.chapters.length, 0), 0
  );
  
  const completedChapters = modules.reduce((acc, mod) => 
    acc + mod.units.reduce((uAcc, unit) => 
      uAcc + unit.chapters.filter(c => c.status === 'completed').length, 0), 0
  );

  const totalXP = modules.reduce((acc, mod) => 
    acc + mod.units.reduce((uAcc, unit) => 
        uAcc + unit.chapters.reduce((cAcc, c) => cAcc + c.xpReward, 0), 0), 0
  );

  const progress = totalChapters === 0 ? 0 : Math.round((completedChapters / totalChapters) * 100);

  // --- STYLING HELPERS ---
  const getColorStyles = (colorClass: string) => {
      const color = colorClass.split('-')[1]; // e.g., 'blue' from 'bg-blue-500'
      return {
          bg: `bg-${color}-500`,
          bgLight: `bg-${color}-50`,
          text: `text-${color}-600`,
          textDark: `text-${color}-800`,
          border: `border-${color}-100`,
          gradient: `from-${color}-500 to-${color}-600`
      };
  };

  const colors = getColorStyles(subject.color);

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] relative overflow-hidden">
       {/* HERO SECTION */}
       <div className={`relative z-10 p-6 pb-12 bg-white rounded-b-[40px] shadow-xl shadow-slate-200/50 overflow-hidden`}>
           {/* Abstract Background */}
           <div className={`absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-gradient-to-br ${colors.gradient} -mr-10 -mt-10 blur-3xl`}></div>
           <div className={`absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10 bg-gradient-to-tr ${colors.gradient} -ml-10 -mb-10 blur-2xl`}></div>

           {/* Navbar */}
           <div className="flex items-center justify-between mb-6 relative z-20">
               <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
                   <ArrowLeft size={24} className="text-slate-600" />
               </button>
               <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${colors.bgLight} ${colors.text}`}>
                   Portail de Matière
               </div>
           </div>

           {/* Subject Info */}
           <div className="flex flex-col items-center relative z-20">
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className={`w-24 h-24 rounded-3xl ${colors.bgLight} ${colors.text} flex items-center justify-center shadow-inner mb-4 border-4 border-white shadow-xl`}
               >
                   <BookOpen size={40} />
               </motion.div>
               
               <h1 className="text-3xl font-black text-slate-800 tracking-tight text-center mb-1">{subject.name}</h1>
               <p className="text-slate-400 font-medium text-sm mb-6">Parcours Officiel • {new Date().getFullYear()}</p>

               {/* Stats Row */}
               <div className="flex w-full max-w-xs justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-slate-800 font-bold text-lg">
                            <Layers size={16} className="text-slate-400" />
                            {totalChapters}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Leçons</span>
                    </div>
                    <div className="w-px bg-slate-200"></div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center gap-1 text-slate-800 font-bold text-lg">
                            <Trophy size={16} className="text-yellow-500" />
                            {totalXP}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">XP Max</span>
                    </div>
                    <div className="w-px bg-slate-200"></div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center gap-1 text-slate-800 font-bold text-lg">
                            <Target size={16} className={colors.text} />
                            {progress}%
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Progrès</span>
                    </div>
               </div>
           </div>
       </div>

       {/* SYLLABUS LIST */}
       <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2">Programme</h3>
            
            {modules.map((module, idx) => (
                <motion.div 
                    key={module.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                    <button 
                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                        className="w-full p-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${expandedModule === module.id ? `${colors.bg} text-white` : 'bg-slate-100 text-slate-500'}`}>
                                {idx + 1}
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-slate-800 text-sm">{module.title}</h4>
                                <p className="text-xs text-slate-400">{module.units.length} Chapitres</p>
                            </div>
                        </div>
                        {expandedModule === module.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                    </button>

                    <AnimatePresence>
                        {expandedModule === module.id && (
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden bg-slate-50/50"
                            >
                                <div className="p-4 pt-2 space-y-3">
                                    {module.units.map(unit => (
                                        <div key={unit.id}>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">{unit.title}</p>
                                            <div className="space-y-2">
                                                {unit.chapters.map(chapter => (
                                                    <div key={chapter.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-2 h-2 rounded-full ${chapter.status === 'completed' ? 'bg-emerald-400' : chapter.status === 'current' ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>
                                                            <span className={`text-xs font-bold ${chapter.status === 'locked' ? 'text-slate-400' : 'text-slate-700'}`}>
                                                                {chapter.title}
                                                            </span>
                                                        </div>
                                                        {chapter.status === 'completed' && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                                                        {chapter.status === 'locked' && <div className="text-[10px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded">Cadenassé</div>}
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

       {/* BOTTOM ACTIONS */}
       <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-30 flex gap-3">
            <button className="flex-1 py-4 rounded-2xl font-bold bg-white border-2 border-slate-100 text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <Zap size={20} className="text-slate-400" />
                Mode Révision
            </button>
            <button 
                onClick={onStart}
                className="flex-[2] py-4 rounded-2xl font-bold bg-slate-900 text-white shadow-xl shadow-slate-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
                <Play size={20} className="fill-white" />
                Continuer le Parcours
            </button>
       </div>
    </div>
  );
};

export default SubjectPortal;
