
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Star, Check, Play, BookOpen, Layers, MapPin } from 'lucide-react';
import { Module, Chapter, Subject } from '../types';
import { MapSkeleton } from './Loaders';

interface SubjectMapProps {
  subject: Subject;
  modules: Module[];
  isLoading?: boolean; // New Prop
  onStartLesson: (chapter: Chapter) => void;
  onBack: () => void;
}

const SubjectMap: React.FC<SubjectMapProps> = ({ subject, modules, isLoading, onStartLesson, onBack }) => {
  
  // Show Skeleton if loading
  if (isLoading) {
      return <MapSkeleton />;
  }

  // Dynamic color helper
  const getSubjectColor = (colorClass: string) => {
    // Extract color name (e.g. 'blue', 'pink') from 'bg-blue-500'
    const color = colorClass.split('-')[1];
    return {
        bg: `bg-${color}-500`,
        light: `bg-${color}-50`,
        text: `text-${color}-600`,
        border: `border-${color}-200`,
        shadow: `shadow-${color}-200`
    };
  };

  const colors = getSubjectColor(subject.color);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
            style={{ 
                backgroundImage: 'radial-gradient(#64748b 1.5px, transparent 1.5px)', 
                backgroundSize: '24px 24px' 
            }}
        ></div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3 flex-1">
            <div className={`w-10 h-10 rounded-xl ${subject.color} flex items-center justify-center text-white shadow-lg shadow-indigo-500/10`}>
                <BookOpen size={20} />
            </div>
            <div>
                <h2 className="font-bold text-slate-800 leading-none">{subject.name}</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Parcours 6ème</p>
            </div>
        </div>
      </div>

      {/* Map Scroll Area */}
      <div className="flex-1 overflow-y-auto relative no-scrollbar pb-32 pt-6">
        
        {modules?.map((module, modIndex) => (
            <div key={module.id} className="relative z-10 mb-12">
                
                {/* Module Glass Header */}
                <div className="sticky top-[70px] z-30 flex justify-center mb-8 pointer-events-none">
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2"
                    >
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text} bg-slate-50 px-2 py-0.5 rounded`}>
                            Module {modIndex + 1}
                        </span>
                        <span className="text-sm font-bold text-slate-800">{module.title}</span>
                    </motion.div>
                </div>

                <div className="px-6 space-y-12">
                    {module.units?.map((unit) => (
                        <div key={unit.id} className="relative">
                            
                            {/* Unit Label */}
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-px bg-slate-200 flex-1"></div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-[#F8FAFC] px-2">
                                    {unit.title}
                                </h4>
                                <div className="h-px bg-slate-200 flex-1"></div>
                            </div>

                            {/* The Path */}
                            <div className="relative flex flex-col items-center gap-8">
                                {/* Connecting Dashed Line */}
                                <div className="absolute top-8 bottom-8 left-1/2 -ml-0.5 w-0.5 border-l-2 border-dashed border-slate-300 z-0"></div>

                                {unit.chapters.map((chapter, chapIndex) => {
                                    const isLocked = chapter.status === 'locked';
                                    const isCompleted = chapter.status === 'completed';
                                    const isCurrent = chapter.status === 'current';
                                    
                                    return (
                                        <motion.div 
                                            key={chapter.id}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ delay: chapIndex * 0.1 }}
                                            className="relative z-10 flex flex-col items-center"
                                        >
                                            {/* Ripple Effect for Current */}
                                            {isCurrent && (
                                                <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping z-0 scale-150"></div>
                                            )}

                                            <motion.button
                                                whileTap={!isLocked ? { scale: 0.9 } : {}}
                                                onClick={() => !isLocked && onStartLesson(chapter)}
                                                disabled={isLocked}
                                                className={`
                                                    w-20 h-20 rounded-full flex items-center justify-center border-[6px] relative z-10 transition-all duration-300 shadow-xl
                                                    ${isCompleted 
                                                        ? 'bg-gradient-to-br from-amber-300 to-amber-500 border-amber-100 text-white shadow-amber-500/30' 
                                                        : isCurrent 
                                                            ? `${subject.color} border-white ring-4 ring-indigo-100 text-white shadow-indigo-500/40`
                                                            : 'bg-slate-100 border-slate-50 text-slate-300 grayscale'
                                                    }
                                                `}
                                            >
                                                {isCompleted && <Check size={32} strokeWidth={4} />}
                                                {isCurrent && <Play size={32} fill="currentColor" className="ml-1" />}
                                                {isLocked && <Lock size={24} />}

                                                {/* XP Bubble */}
                                                {!isLocked && (
                                                    <div className="absolute -bottom-3 bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-slate-100 flex items-center gap-1">
                                                        <Star size={8} className="text-amber-500" fill="currentColor" />
                                                        {chapter.xpReward}
                                                    </div>
                                                )}
                                            </motion.button>

                                            {/* Chapter Title Card */}
                                            <div className={`mt-4 bg-white/90 backdrop-blur border border-white/60 p-3 rounded-2xl shadow-sm text-center max-w-[160px] transition-opacity duration-300 ${isLocked ? 'opacity-50' : 'opacity-100'}`}>
                                                <h5 className="font-bold text-slate-800 text-sm leading-tight">{chapter.title}</h5>
                                                {!isLocked && (
                                                     <div className="flex justify-center items-center gap-1 mt-1 text-[10px] text-slate-500 font-medium">
                                                         <Layers size={10} /> {chapter.steps.length} Étapes
                                                     </div>
                                                )}
                                            </div>

                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        
        {/* End of Path Decoration */}
        <div className="flex justify-center pb-8 opacity-50">
             <div className="bg-slate-200 text-slate-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                 <MapPin size={14} /> Fin du Parcours
             </div>
        </div>

      </div>
    </div>
  );
};

export default SubjectMap;
