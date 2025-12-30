
import React from 'react';
import { Lock, Play, Check, Star } from 'lucide-react';
import { Module, Chapter } from '../types';

interface CourseMapProps {
  modules: Module[];
  onChapterClick: (chapter: Chapter) => void;
}

const CourseMap: React.FC<CourseMapProps> = ({ modules, onChapterClick }) => {
  return (
    <div className="p-6 pb-24 space-y-8 relative">
      {/* Background Line */}
      <div className="absolute left-[3.25rem] top-12 bottom-12 w-1 bg-slate-200 -z-10 rounded-full"></div>

      {modules.map((module) => (
        <div key={module.id} className="space-y-6">
          <div className="bg-slate-100/80 backdrop-blur-sm p-2 rounded-lg inline-block shadow-sm border border-slate-200">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{module.title}</h3>
          </div>
          
          <div className="space-y-8">
            {module.units.map((unit) => (
                <div key={unit.id} className="space-y-8">
                    {unit.chapters.map((chapter, index) => {
                    const isLocked = chapter.status === 'locked';
                    const isCompleted = chapter.status === 'completed';
                    const isCurrent = chapter.status === 'current';

                    return (
                        <div key={chapter.id} className="flex items-center group">
                        {/* Node Circle */}
                        <div className="relative mr-4">
                            {isCurrent && (
                                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                            )}
                            <button
                            onClick={() => !isLocked && onChapterClick(chapter)}
                            disabled={isLocked}
                            className={`
                                w-16 h-16 rounded-full flex items-center justify-center border-4 relative z-10 transition-all duration-300 transform active:scale-95
                                ${isCompleted ? 'bg-emerald-500 border-emerald-200 text-white shadow-emerald-200 shadow-lg' : ''}
                                ${isCurrent ? 'bg-blue-600 border-blue-200 text-white shadow-blue-300 shadow-xl scale-110' : ''}
                                ${isLocked ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed' : ''}
                            `}
                            >
                            {isCompleted && <Check size={28} strokeWidth={3} />}
                            {isCurrent && <Play size={28} fill="currentColor" className="ml-1" />}
                            {isLocked && <Lock size={24} />}
                            </button>
                            
                            {/* XP Tag */}
                            {!isLocked && (
                                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-20 ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    <Star size={8} fill="currentColor" />
                                    {chapter.xpReward}
                                </div>
                            )}
                        </div>

                        {/* Text Details */}
                        <div className={`flex-1 transition-opacity ${isLocked ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                            <h4 className="font-bold text-slate-800 text-sm">{chapter.title}</h4>
                            {chapter.description && (
                                <p className="text-xs text-slate-500 leading-tight mt-1">{chapter.description}</p>
                            )}
                        </div>
                        </div>
                    );
                    })}
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseMap;
