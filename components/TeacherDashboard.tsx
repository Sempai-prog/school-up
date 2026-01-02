
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, BookOpen, Clock, AlertTriangle, CheckCircle2, 
    MoreHorizontal, Plus, Calendar, Search, ArrowUpRight 
} from 'lucide-react';
import { User, ClassGroup } from '../types';
import { MOCK_TEACHER_CLASSES } from '../constants';

interface TeacherDashboardProps {
    user: User;
    onOpenProfile: () => void;
    onNavigateToAgenda: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onOpenProfile, onNavigateToAgenda }) => {
    const [classes, setClasses] = useState<ClassGroup[]>(MOCK_TEACHER_CLASSES);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
            className="p-6 pb-32 space-y-8 bg-[#F0F4F8] min-h-full"
        >
            {/* TEACHER HEADER */}
            <div className="flex justify-between items-center sticky top-0 z-30 py-2 bg-[#F0F4F8]/80 backdrop-blur-md -mx-2 px-2">
                <div className="flex items-center gap-3">
                    <motion.div 
                        whileTap={{ scale: 0.95 }} 
                        onClick={onOpenProfile} 
                        className="w-12 h-12 rounded-full border-2 border-slate-200 overflow-hidden relative cursor-pointer"
                    >
                        <img src="https://ui-avatars.com/api/?name=Prof+Touré&background=0f172a&color=fff" alt="Teacher" className="w-full h-full object-cover" />
                    </motion.div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-none">Prof. Touré</h2>
                        <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">Mathématiques • Lycée Classique</p>
                    </div>
                </div>
                <button className="p-2 bg-white rounded-full text-slate-600 shadow-sm border border-slate-200">
                    <Search size={20} />
                </button>
            </div>

            {/* QUICK STATS ROW */}
            <div className="grid grid-cols-3 gap-3">
                <motion.div variants={itemVariants} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-slate-800">157</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Élèves</span>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-emerald-500">12</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Devoirs</span>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-orange-500">4</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Alertes</span>
                </motion.div>
            </div>

            {/* NEXT CLASS HERO */}
            <motion.div 
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                onClick={onNavigateToAgenda}
                className="bg-slate-900 rounded-[32px] p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-6 -mt-6 blur-2xl"></div>
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Prochain Cours</p>
                        <h3 className="text-3xl font-bold">Terminale C</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <Clock className="text-white" size={24} />
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/30">
                            10:00 - 12:00
                        </div>
                        <span className="text-sm font-medium text-slate-300">Salle 12</span>
                    </div>
                    <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                        Faire l'appel <ArrowUpRight size={14} />
                    </button>
                </div>
            </motion.div>

            {/* MY CLASSES GRID */}
            <div>
                <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="text-lg font-bold text-slate-800">Mes Classes</h3>
                    <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
                <div className="space-y-4">
                    {classes.map((cls) => (
                        <motion.div 
                            key={cls.id}
                            variants={itemVariants}
                            className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm">
                                        {cls.name.substring(0, 3)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{cls.name}</h4>
                                        <p className="text-xs text-slate-500">{cls.studentCount} Élèves</p>
                                    </div>
                                </div>
                                {cls.pendingHomeworks > 0 && (
                                    <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <BookOpen size={10} /> {cls.pendingHomeworks} à noter
                                    </span>
                                )}
                            </div>
                            
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                <div 
                                    className={`h-full rounded-full ${cls.attendanceRate > 90 ? 'bg-emerald-500' : 'bg-yellow-500'}`} 
                                    style={{ width: `${cls.attendanceRate}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                                <span>Assiduité Moyenne</span>
                                <span>{cls.attendanceRate}%</span>
                            </div>

                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
                                <button className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors">
                                    Cahier de Textes
                                </button>
                                <button className="flex-1 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors">
                                    Notes
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* FLOATING ACTION BUTTON */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/40 flex items-center justify-center z-40"
            >
                <Plus size={28} />
            </motion.button>
        </motion.div>
    );
};

export default TeacherDashboard;
