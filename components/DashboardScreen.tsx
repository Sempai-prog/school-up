
import React, { useState } from 'react';
import { 
  Flame, Trophy, BookOpen, ChevronRight, 
  MoreHorizontal, ChevronDown, Check, GraduationCap, PlayCircle, Star,
  Users, School, CalendarClock, Book, Bell
} from 'lucide-react';
import { CURRICULUM_SUBJECTS, CURRICULUM_MODULES } from '../data/curriculum';
import { Subject, GradeLevel, Tab, User } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardScreenProps {
  user: User; // Accepted User prop
  onOpenProfile?: () => void;
  onOpenSubject: (subjectId: string) => void;
  onNavigateToLearning?: () => void;
  onNavigateToAgenda?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToLibrary?: () => void;
  onNavigateToNotifications?: () => void; // New
  onNavigateToStore?: () => void; // New
  currentGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
    user,
    onOpenProfile, 
    onOpenSubject,
    onNavigateToLearning, 
    onNavigateToAgenda,
    onNavigateToLeaderboard,
    onNavigateToLibrary,
    onNavigateToNotifications,
    onNavigateToStore,
    currentGrade, 
    onGradeChange 
}) => {
  const [showGradeMenu, setShowGradeMenu] = useState(false);

  // Data Loading
  const activeSubjects = CURRICULUM_SUBJECTS[currentGrade] || [];
  
  // Calculate specific subject progress based on curriculum
  const getProgress = (subjectId: string) => {
      const modules = CURRICULUM_MODULES[currentGrade]?.[subjectId];
      if (!modules || modules.length === 0) return 0;
      
      let total = 0;
      let completed = 0;
      modules.forEach(m => {
          m.units.forEach(u => {
              total += u.chapters.length;
              completed += u.chapters.filter(c => c.status === 'completed').length;
          });
      });
      
      return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const gradeLabels: Record<GradeLevel, string> = {
      '6eme': '6ème', '5eme': '5ème', '4eme': '4ème', '3eme': '3ème',
      '2nde': '2nde', '1ere': '1ère', 'tle': 'Terminale'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 pb-32 space-y-8 max-w-md mx-auto"
    >
       {/* GLASS HEADER */}
       <div className="flex justify-between items-center sticky top-0 z-30 py-2 -mx-2 px-2">
            <div className="flex items-center gap-3">
                <motion.div 
                    whileTap={{ scale: 0.95 }} 
                    onClick={onOpenProfile} 
                    className="relative cursor-pointer group"
                >
                    <div className={`w-12 h-12 rounded-full border-2 ${user.isPremium ? 'border-yellow-400 shadow-yellow-200' : 'border-white/80 shadow-indigo-500/20'} shadow-lg overflow-hidden relative z-10`}>
                        <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
                    </div>
                    {user.isPremium && (
                        <div className="absolute -top-1 -right-1 z-30 bg-yellow-400 text-white p-0.5 rounded-full border border-white">
                            <Star size={10} fill="currentColor" />
                        </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 blur-md opacity-0 group-hover:opacity-60 transition-opacity"></div>
                    <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 border-2 border-white w-4 h-4 rounded-full z-20"></div>
                </motion.div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-none tracking-tight">Salut, {user.name.split(' ')[1]}</h2>
                    <p className="text-xs font-medium text-slate-500 mt-1">Prêt à apprendre ?</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Bell Icon for Notifications */}
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={onNavigateToNotifications}
                    className="w-10 h-10 bg-white/70 backdrop-blur-xl border border-white/60 rounded-full flex items-center justify-center text-slate-600 shadow-sm relative"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </motion.button>

                <div className="relative">
                    <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowGradeMenu(!showGradeMenu)}
                        className="flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm pl-3 pr-2 py-2 rounded-full text-xs font-bold text-slate-700"
                    >
                        <div className="bg-indigo-100 p-1 rounded-full text-indigo-600">
                            <GraduationCap size={12} />
                        </div>
                        {gradeLabels[currentGrade]}
                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${showGradeMenu ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <AnimatePresence>
                        {showGradeMenu && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95, transformOrigin: "top right" }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-indigo-500/10 border border-white/60 overflow-hidden z-50 p-1"
                            >
                                {(Object.keys(gradeLabels) as GradeLevel[]).map((grade) => (
                                    <button 
                                        key={grade}
                                        onClick={() => { onGradeChange(grade); setShowGradeMenu(false); }}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex justify-between items-center transition-colors ${currentGrade === grade ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {gradeLabels[grade]}
                                        {currentGrade === grade && <Check size={14} className="text-indigo-600" />}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
       </div>

       {/* HERO CARD */}
       <motion.div 
         variants={itemVariants}
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
         onClick={onNavigateToLearning}
         className="relative w-full h-48 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-[32px] p-6 text-white shadow-xl shadow-indigo-500/30 overflow-hidden cursor-pointer group isolation-auto"
       >
            {/* Abstract Shapes */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-purple-500/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        Reprendre
                    </div>
                </div>
                
                <div>
                    <h3 className="text-2xl font-bold mb-1 leading-tight">Nombres Entiers</h3>
                    <p className="text-indigo-200 text-sm font-medium opacity-90">Module 1 • Arithmétique</p>
                </div>

                <div className="flex items-center gap-4">
                     <button className="w-12 h-12 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <PlayCircle size={24} fill="currentColor" />
                     </button>
                     <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold mb-1.5 opacity-90">
                            <span>Progression</span>
                            <span>35%</span>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: '35%' }} 
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                            />
                        </div>
                     </div>
                </div>
            </div>
       </motion.div>

       {/* STATS ROW */}
       <div className="grid grid-cols-2 gap-4">
           <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[28px] p-5 shadow-lg shadow-slate-200/50 flex flex-col justify-between aspect-[1.4/1]">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <Flame size={20} fill="currentColor" />
                </div>
                <div>
                    <span className="text-3xl font-bold text-slate-800 tracking-tight">{user.streak}</span>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Série Jours</p>
                </div>
           </motion.div>

           <motion.div 
                variants={itemVariants}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToStore} 
                className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[28px] p-5 shadow-lg shadow-slate-200/50 flex flex-col justify-between aspect-[1.4/1] cursor-pointer hover:bg-white/80 transition-colors"
           >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <Trophy size={20} />
                </div>
                <div>
                    <span className="text-xl font-bold text-slate-800 tracking-tight">{user.xp.toLocaleString()}</span>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1 flex items-center gap-1">
                        XP Total <span className="bg-yellow-100 text-yellow-700 px-1 rounded text-[8px]">+240</span>
                    </p>
                </div>
           </motion.div>
       </div>

       {/* SUBJECTS GRID */}
       <div className="space-y-4">
           <div className="flex justify-between items-center px-1">
               <h3 className="text-lg font-bold text-slate-800">Matières</h3>
               <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                    <MoreHorizontal size={20} />
               </button>
           </div>
           
           <AnimatePresence mode="wait">
               <motion.div 
                    key={currentGrade}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="grid grid-cols-2 gap-4"
               >
                   {activeSubjects.length > 0 ? (
                        activeSubjects.map((sub) => (
                            <motion.div
                                key={sub.id}
                                variants={itemVariants}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => onOpenSubject(sub.id)}
                                className={`
                                    relative overflow-hidden rounded-[32px] p-5 flex flex-col justify-between aspect-square cursor-pointer shadow-lg hover:shadow-xl transition-shadow
                                    ${sub.color.replace('bg-', 'bg-gradient-to-br from-').replace('500', '400').replace('600', '500')} to-${sub.color.split('-')[1]}-600
                                `}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-inner">
                                    <BookOpen size={24} />
                                </div>
                                
                                <div className="text-white relative z-10">
                                    <h4 className="font-bold text-lg leading-tight mb-2">{sub.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-black/20 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
                                            <div className="h-full bg-white/90 rounded-full" style={{ width: `${getProgress(sub.id)}%` }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold opacity-90">{getProgress(sub.id)}%</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                   ) : (
                       <div className="col-span-2 py-12 text-center text-slate-400 bg-white/40 rounded-[32px] border-2 border-dashed border-slate-200">
                           <p className="font-medium">Programme non disponible</p>
                       </div>
                   )}
               </motion.div>
           </AnimatePresence>
       </div>

        {/* WIDGETS ROW */}
        <div className="grid grid-cols-2 gap-4 pt-2">
             <motion.div 
                 variants={itemVariants}
                 whileTap={{ scale: 0.96 }}
                 onClick={onNavigateToAgenda}
                 className="col-span-2 bg-white border border-slate-100 rounded-[24px] p-4 flex items-center gap-4 shadow-md shadow-indigo-500/5 cursor-pointer relative overflow-hidden"
            >
                {/* Decorative glow */}
                <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-100 rounded-full blur-2xl -mr-8 -mt-8 opacity-50"></div>

                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <CalendarClock size={24} />
                </div>
                <div className="flex-1 z-10">
                    <h5 className="font-bold text-slate-800 text-sm">Prochain cours</h5>
                    <p className="text-xs text-slate-500 font-medium">Mathématiques • 14h00</p>
                </div>
                <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-10">
                    Voir Agenda
                </div>
            </motion.div>

            {/* Leaderboard Widget */}
            <motion.div 
                variants={itemVariants}
                onClick={onNavigateToLeaderboard}
                whileTap={{ scale: 0.96 }}
                className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100 rounded-[24px] p-4 flex items-center gap-3 shadow-sm cursor-pointer"
            >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-500 shadow-sm">
                    <Users size={20} />
                </div>
                <div>
                    <h5 className="font-bold text-slate-800 text-sm">Ma Classe</h5>
                    <p className="text-[10px] text-purple-600 font-bold flex items-center gap-1">
                        14ème <span className="text-red-500">📉</span>
                    </p>
                </div>
            </motion.div>

            {/* Library Widget */}
            <motion.div 
                 variants={itemVariants}
                 onClick={onNavigateToLibrary}
                 whileTap={{ scale: 0.96 }}
                 className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-[24px] p-4 flex items-center gap-3 shadow-sm cursor-pointer"
            >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                    <Book size={20} />
                </div>
                <div>
                    <h5 className="font-bold text-slate-800 text-sm">Bibliothèque</h5>
                    <p className="text-[10px] text-emerald-600 font-bold">3 nouveaux</p>
                </div>
            </motion.div>
        </div>

    </motion.div>
  );
};

export default DashboardScreen;
