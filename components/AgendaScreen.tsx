
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Upload, CheckCircle2, FileText, ChevronRight, MapPin, BookOpen } from 'lucide-react';
import { WEEKLY_SCHEDULE, HOMEWORK_TASKS } from '../data/agenda';
import { Homework } from '../types';

const AgendaScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timetable' | 'homework'>('timetable');
  const [tasks, setTasks] = useState<Homework[]>(HOMEWORK_TASKS);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // Helper to get color based on subject name (consistent with app theme)
  const getSubjectColor = (subject: string) => {
    if (subject.includes('Math')) return 'bg-blue-500';
    if (subject.includes('Hist')) return 'bg-orange-500';
    if (subject.includes('Anglais') || subject.includes('Français')) return 'bg-pink-500';
    if (subject.includes('SVT') || subject.includes('Bio')) return 'bg-emerald-500';
    if (subject.includes('Info')) return 'bg-purple-500';
    if (subject.includes('Sport')) return 'bg-yellow-500';
    return 'bg-slate-500';
  };

  const handleUpload = (id: string) => {
    setUploadingId(id);
    setTimeout(() => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'submitted' } : t));
        setUploadingId(null);
    }, 2000);
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const dayLabels: Record<string, string> = { 'Mon': 'Lundi', 'Tue': 'Mardi', 'Wed': 'Mercredi', 'Thu': 'Jeudi', 'Fri': 'Vendredi' };
  
  // Determine "current" class (Mocking Tuesday 10:30 for demo)
  const isCurrentClass = (day: string, start: string, end: string) => {
      // Hardcoded "Now" for visual demo: Tuesday 10:30
      const nowDay = 'Tue';
      const nowTime = 10.5; // 10:30
      
      const startH = parseInt(start.split(':')[0]);
      const endH = parseInt(end.split(':')[0]);
      
      return day === nowDay && nowTime >= startH && nowTime < endH;
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
       {/* Header with Segmented Control */}
       <div className="px-6 py-4 bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100">
           <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                   <Calendar size={24} />
               </div>
               <h1 className="text-xl font-bold text-slate-900">Vie Scolaire</h1>
           </div>

           <div className="flex bg-slate-100 p-1 rounded-xl relative">
               <motion.div 
                   layoutId="agendaTab"
                   className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
                   initial={false}
                   animate={{ 
                       left: activeTab === 'timetable' ? '4px' : '50%', 
                       width: 'calc(50% - 4px)' 
                   }}
                   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
               />
               <button 
                   onClick={() => setActiveTab('timetable')}
                   className={`flex-1 py-2.5 text-sm font-bold text-center z-10 transition-colors ${activeTab === 'timetable' ? 'text-slate-900' : 'text-slate-500'}`}
               >
                   Emploi du Temps
               </button>
               <button 
                   onClick={() => setActiveTab('homework')}
                   className={`flex-1 py-2.5 text-sm font-bold text-center z-10 transition-colors ${activeTab === 'homework' ? 'text-slate-900' : 'text-slate-500'}`}
               >
                   Devoirs
               </button>
           </div>
       </div>

       <div className="flex-1 overflow-y-auto p-6 pb-32">
           <AnimatePresence mode="wait">
               {activeTab === 'timetable' ? (
                   <motion.div 
                        key="timetable"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                   >
                       {days.map(day => {
                           const daySlots = WEEKLY_SCHEDULE.filter(s => s.day === day).sort((a,b) => a.startTime.localeCompare(b.startTime));
                           if (daySlots.length === 0) return null;

                           return (
                               <div key={day}>
                                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 sticky top-0">{dayLabels[day]}</h3>
                                   <div className="space-y-4 border-l-2 border-slate-100 pl-4 ml-2">
                                       {daySlots.map(slot => {
                                           const isNow = isCurrentClass(slot.day, slot.startTime, slot.endTime);
                                           const color = getSubjectColor(slot.subjectId);
                                           
                                           return (
                                               <div key={slot.id} className="relative">
                                                   <span className="absolute -left-[23px] top-4 w-3 h-3 rounded-full bg-slate-200 border-2 border-white"></span>
                                                   {isNow && (
                                                       <span className="absolute -left-[23px] top-4 w-3 h-3 rounded-full bg-indigo-500 animate-ping"></span>
                                                   )}
                                                   
                                                   <div className={`
                                                       relative overflow-hidden rounded-2xl p-4 border transition-all
                                                       ${isNow ? 'bg-white border-indigo-200 shadow-lg shadow-indigo-100 scale-105' : 'bg-white/60 border-slate-100 hover:bg-white'}
                                                   `}>
                                                       {isNow && <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-500 text-white text-[10px] font-bold rounded-bl-xl">EN COURS</div>}
                                                       
                                                       <div className="flex justify-between items-start mb-2">
                                                           <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                                               <Clock size={16} />
                                                               {slot.startTime} - {slot.endTime}
                                                           </div>
                                                       </div>
                                                       
                                                       <div className="flex items-center gap-4">
                                                           <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shadow-sm`}>
                                                               <BookOpen size={24} />
                                                           </div>
                                                           <div>
                                                               <h4 className="font-bold text-slate-900 text-lg">{slot.subjectId}</h4>
                                                               <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                                                   <MapPin size={12} /> {slot.room}
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           );
                                       })}
                                   </div>
                               </div>
                           );
                       })}
                   </motion.div>
               ) : (
                   <motion.div 
                        key="homework"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                   >
                       {tasks.map((task, idx) => (
                           <motion.div 
                               key={task.id}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: idx * 0.05 }}
                               className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm"
                           >
                               <div className="flex justify-between items-start mb-3">
                                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white ${getSubjectColor(task.subjectId)}`}>
                                       {task.subjectId}
                                   </span>
                                   <span className={`text-xs font-bold ${task.status === 'todo' ? 'text-orange-500' : 'text-slate-400'}`}>
                                       {task.status === 'todo' ? `Pour ${task.dueDate}` : task.status === 'submitted' ? 'Rendu' : `Noté: ${task.grade}/20`}
                                   </span>
                               </div>
                               
                               <h3 className="font-bold text-slate-800 mb-4">{task.title}</h3>
                               
                               {task.status === 'todo' ? (
                                   <button 
                                       onClick={() => handleUpload(task.id)}
                                       disabled={uploadingId === task.id}
                                       className="w-full py-3 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors"
                                   >
                                       {uploadingId === task.id ? (
                                           <>Envoi en cours...</>
                                       ) : (
                                           <><Upload size={18} /> Rendre le devoir</>
                                       )}
                                   </button>
                               ) : (
                                   <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl font-bold text-sm">
                                       <CheckCircle2 size={18} />
                                       {task.status === 'graded' ? 'Devoir Corrigé' : 'Devoir Envoyé'}
                                       {task.status === 'submitted' && <span className="ml-auto text-xs text-emerald-500 underline cursor-pointer">Voir ma copie</span>}
                                   </div>
                               )}
                           </motion.div>
                       ))}
                   </motion.div>
               )}
           </AnimatePresence>
       </div>
    </div>
  );
};

export default AgendaScreen;
