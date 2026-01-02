
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Star, Check, Play, BookOpen, Layers, MapPin } from 'lucide-react';
import { Module, Chapter, Subject } from '../types';
import { MapSkeleton } from './Loaders';

interface SubjectMapProps {
  subject: Subject;
  modules: Module[];
  isLoading?: boolean;
  onStartLesson: (chapter: Chapter) => void;
  onBack: () => void;
}

const SubjectMap: React.FC<SubjectMapProps> = ({ subject, modules, isLoading, onStartLesson, onBack }) => {
  const currentChapterRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to current chapter on mount
  useEffect(() => {
    if (currentChapterRef.current && !isLoading) {
      setTimeout(() => {
        currentChapterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [isLoading, subject.id]);
  
  if (isLoading) {
      return <MapSkeleton />;
  }

  // Dynamic color helper
  const getSubjectColor = (colorClass: string) => {
    const color = colorClass.split('-')[1] || 'blue';
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
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-3 flex items-center gap-3 shadow-sm transition-all">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3 flex-1">
            <div className={`w-10 h-10 rounded-xl ${subject.color} flex items-center justify-center text-white shadow-lg shadow-indigo-500/10`}>
                <BookOpen size={20} />
            </div>
            <div>
                <h2 className="font-bold text-slate-800 leading-none">{subject.name}</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Parcours Officiel</p>
            </div>
        </div>
        <div className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
            {subject.progress}%
        </div>
      </div>

      {/* Map Scroll Area */}
      <div className="flex-1 overflow-y-auto relative no-scrollbar pb-32 pt-4">
        
        {modules?.map((module, modIndex) => (
            <div key={module.id} className="relative z-10 mb-8">
                
                {/* Module Glass Header (Sticky per section) */}
                <div className="sticky top-2 z-30 flex justify-center mb-12 pointer-events-none">
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex flex-col items-center gap-1 max-w-[80%]"
                    >
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${colors.text} bg-slate-50 px-2 py-0.5 rounded`}>
                            Module {modIndex + 1}
                        </span>
                        <span className="text-sm font-bold text-slate-800 text-center leading-tight">{module.title}</span>
                    </motion.div>
                </div>

                <div className="px-4">
                    {module.units?.map((unit) => (
                        <div key={unit.id} className="relative mb-12">
                            
                            {/* Unit Label */}
                            <div className="mb-8 flex items-center gap-3 opacity-60">
                                <div className="h-px bg-slate-300 flex-1"></div>
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-[#F8FAFC] px-2">
                                    {unit.title}
                                </h4>
                                <div className="h-px bg-slate-300 flex-1"></div>
                            </div>

                            {/* The Winding Path Container */}
                            <div className="relative flex flex-col items-center gap-12">
                                {/* SVG Connector Line can be complex, using simpler dashed line for responsiveness */}
                                <div className="absolute top-4 bottom-4 left-1/2 -ml-px w-0.5 border-l-2 border-dashed border-slate-200 z-0"></div>

                                {unit.chapters.map((chapter, chapIndex) => {
                                    const isLocked = chapter.status === 'locked';
                                    const isCompleted = chapter.status === 'completed';
                                    const isCurrent = chapter.status === 'current';
                                    
                                    // Calculate Zig-Zag Offset (Sine Wave)
                                    // Even index: Left, Odd index: Right
                                    const xOffset = chapIndex % 2 === 0 ? '-25%' : '25%';

                                    return (
                                        <motion.div 
                                            key={chapter.id}
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: chapIndex * 0.1 }}
                                            className="relative z-10 w-full flex justify-center"
                                        >
                                            <div 
                                                className="relative flex flex-col items-center w-32"
                                                style={{ transform: `translateX(${xOffset})` }}
                                            >
                                                {/* Ripple Effect for Current */}
                                                {isCurrent && (
                                                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-${subject.color.split('-')[1]}-500/20 rounded-full animate-ping z-0`}></div>
                                                )}

                                                <motion.button
                                                    ref={isCurrent ? currentChapterRef : null}
                                                    whileTap={!isLocked ? { scale: 0.9 } : {}}
                                                    onClick={() => !isLocked && onStartLesson(chapter)}
                                                    disabled={isLocked}
                                                    className={`
                                                        w-20 h-20 rounded-[28px] flex items-center justify-center border-[6px] relative z-10 transition-all duration-300 shadow-xl
                                                        ${isCompleted 
                                                            ? 'bg-amber-400 border-amber-200 text-white shadow-amber-500/40 rotate-3' 
                                                            : isCurrent 
                                                                ? `${subject.color} border-white ring-4 ring-indigo-100 text-white shadow-indigo-500/40 scale-110 -rotate-3`
                                                                : 'bg-slate-100 border-white text-slate-300 shadow-sm'
                                                        }
                                                    `}
                                                >
                                                    {isCompleted && <Check size={32} strokeWidth={4} />}
                                                    {isCurrent && <Play size={32} fill="currentColor" className="ml-1" />}
                                                    {isLocked && <Lock size={24} />}

                                                    {/* XP Bubble */}
                                                    {!isLocked && (
                                                        <div className="absolute -top-3 -right-3 bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-slate-100 flex items-center gap-1 z-20">
                                                            <Star size={8} className="text-amber-500" fill="currentColor" />
                                                            {chapter.xpReward}
                                                        </div>
                                                    )}
                                                </motion.button>

                                                {/* Chapter Title Label */}
                                                <div className={`mt-3 bg-white/90 backdrop-blur border border-white/60 px-3 py-2 rounded-xl shadow-sm text-center min-w-[140px] transition-all duration-300 ${isLocked ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                                                    <h5 className="font-bold text-slate-800 text-xs leading-tight mb-1">{chapter.title}</h5>
                                                    {!isLocked && (
                                                        <div className="flex justify-center items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                                            <Layers size={9} /> {chapter.steps.length} étapes
                                                        </div>
                                                    )}
                                                </div>
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
        <div className="flex justify-center pb-8 opacity-40">
             <div className="bg-slate-200 text-slate-500 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 border border-slate-300">
                 <MapPin size={14} /> Fin du Parcours
             </div>
        </div>

      </div>
    </div>
  );
};

export default SubjectMap;
