
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GRADES, TRANSACTIONS, ATTENDANCE_DATA } from '../constants';
import { 
    CreditCard, TrendingUp, CheckCircle2, Clock, Wallet, CalendarDays, MoreVertical, ArrowUpRight,
    AlertCircle, Gavel, UserX, Info, Upload, X
} from 'lucide-react';
import { DisciplineRecord, Sanction, Attendance } from '../types';

const MOCK_DISCIPLINE: DisciplineRecord = {
    absences: 12, // hours
    lateness: 3, // count
    sanctions: [
        { id: 's1', type: 'warning', title: 'Avertissement de Conduite', date: '10 Nov 2023', reason: 'Bavardages incessants en cours de Mathématiques.', severity: 'low' },
        { id: 's2', type: 'blame', title: 'Blâme', date: '25 Oct 2023', reason: 'Insolence envers un surveillant.', severity: 'medium' }
    ]
};

const SisScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'grades' | 'wallet' | 'discipline'>('grades');
  const [selectedAbsence, setSelectedAbsence] = useState<Attendance | null>(null);

  const getGradeColor = (score: number) => {
      if (score >= 16) return 'text-emerald-500';
      if (score >= 10) return 'text-blue-500';
      return 'text-orange-500';
  };

  const getProgressColor = (score: number) => {
      if (score >= 16) return 'stroke-emerald-500';
      if (score >= 10) return 'stroke-blue-500';
      return 'stroke-orange-500';
  };

  const handleJustify = () => {
      // Logic to submit justification
      setSelectedAbsence(null);
      // In real app, update state/backend
  };

  return (
    <div className="p-6 pb-32 space-y-6 relative">
        {/* Custom Segmented Control */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex relative">
             <motion.div 
                layoutId="activeTabPill"
                className="absolute top-1.5 bottom-1.5 rounded-xl bg-slate-900 shadow-lg"
                initial={false}
                animate={{ 
                    left: activeTab === 'grades' ? '4px' : activeTab === 'wallet' ? '33.3%' : '66.6%', 
                    width: 'calc(33.3% - 4px)' 
                }}
            />
            <button 
                onClick={() => setActiveTab('grades')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 transition-colors ${activeTab === 'grades' ? 'text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Notes
            </button>
            <button 
                onClick={() => setActiveTab('wallet')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 transition-colors ${activeTab === 'wallet' ? 'text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Scolarité
            </button>
            <button 
                onClick={() => setActiveTab('discipline')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl relative z-10 transition-colors ${activeTab === 'discipline' ? 'text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Discipline
            </button>
        </div>

        {activeTab === 'grades' && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* GPA Hero Card */}
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[32px] p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    
                    <div className="relative z-10 flex justify-between items-end">
                        <div>
                            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Moyenne Générale</p>
                            <h2 className="text-5xl font-bold tracking-tight">14.5<span className="text-2xl opacity-60 font-medium">/20</span></h2>
                            <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit">
                                <TrendingUp size={16} />
                                <span className="text-xs font-bold">+0.5 vs T1</span>
                            </div>
                        </div>
                        
                        {/* Calendar Widget Mini */}
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center min-w-[80px]">
                            <span className="block text-xs text-blue-100 uppercase font-bold mb-1">DEC</span>
                            <span className="block text-2xl font-bold">15</span>
                            <div className="mt-1 w-1 h-1 bg-emerald-400 rounded-full mx-auto"></div>
                        </div>
                    </div>
                </div>

                {/* Grade Data Cards */}
                <div className="grid grid-cols-1 gap-4">
                    <h3 className="font-bold text-slate-800 ml-2">Détail par matière</h3>
                    {GRADES.map((grade, idx) => (
                        <motion.div 
                            key={grade.subjectId}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" className={getProgressColor(grade.score)} strokeWidth="3" strokeDasharray={`${(grade.score / 20) * 100}, 100`} />
                                    </svg>
                                    <span className={`absolute text-xs font-bold ${getGradeColor(grade.score)}`}>{grade.score}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">{grade.subjectId}</h4>
                                    <div className="flex gap-2 text-[10px] text-slate-400 font-bold uppercase mt-1">
                                        <span className="bg-slate-50 px-2 py-1 rounded-md">Coef {grade.coefficient}</span>
                                        {grade.isExam && <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded-md">Examen</span>}
                                    </div>
                                </div>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                                <ArrowUpRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        )}

        {activeTab === 'wallet' && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Credit Card Visual */}
                <div className="relative w-full aspect-[1.58/1] bg-slate-900 rounded-[32px] shadow-2xl shadow-slate-900/20 p-8 text-white overflow-hidden flex flex-col justify-between group">
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl"></div>
                    <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>

                    <div className="flex justify-between items-start z-10">
                        <Wallet className="opacity-80" />
                        <span className="text-xs font-bold tracking-widest uppercase opacity-60">Skool Pay</span>
                    </div>

                    <div className="z-10">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Solde Disponible</p>
                        <h3 className="text-3xl font-mono font-bold tracking-tight">125,000 <span className="text-lg">F</span></h3>
                    </div>

                    <div className="flex justify-between items-end z-10">
                        <div>
                            <p className="font-mono text-sm opacity-80 tracking-widest">**** 1804</p>
                            <p className="text-[10px] font-bold mt-1 opacity-60">KOUAMÉ JUNIOR</p>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-red-500/80 mix-blend-screen"></div>
                            <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-3 mix-blend-screen"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-blue-600 text-white py-4 rounded-[24px] font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors flex flex-col items-center gap-2">
                        <CreditCard size={24} />
                        <span className="text-xs">Payer Scolarité</span>
                    </button>
                    <button className="bg-white text-slate-600 border border-slate-100 py-4 rounded-[24px] font-bold shadow-sm hover:bg-slate-50 transition-colors flex flex-col items-center gap-2">
                        <CalendarDays size={24} />
                        <span className="text-xs">Historique</span>
                    </button>
                </div>

                {/* Recent Transactions List */}
                <div>
                    <h3 className="font-bold text-slate-800 mb-4 ml-2">Transactions</h3>
                    <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-sm divide-y divide-slate-50">
                        {TRANSACTIONS.map((tx) => (
                            <div key={tx.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 rounded-2xl transition-colors">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                    {tx.status === 'completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-sm">{tx.label}</h4>
                                    <p className="text-xs text-slate-400 font-medium">{tx.date}</p>
                                </div>
                                <span className="font-bold text-slate-900 text-sm font-mono">-{tx.amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )}

        {activeTab === 'discipline' && (
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
             >
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-2">
                            <Clock size={20} />
                        </div>
                        <span className="text-3xl font-bold text-slate-800">{MOCK_DISCIPLINE.absences}h</span>
                        <span className="text-xs text-slate-400 font-bold uppercase mt-1">Absences</span>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center mb-2">
                            <AlertCircle size={20} />
                        </div>
                        <span className="text-3xl font-bold text-slate-800">{MOCK_DISCIPLINE.lateness}</span>
                        <span className="text-xs text-slate-400 font-bold uppercase mt-1">Retards</span>
                    </div>
                </div>

                {/* Attendance List (Interactive) */}
                <div>
                    <h3 className="font-bold text-slate-800 mb-4 ml-2 flex items-center gap-2">
                        <UserX size={18} /> Registre d'Assiduité
                    </h3>
                    <div className="space-y-3">
                        {ATTENDANCE_DATA.map((record) => (
                            <div 
                                key={record.id} 
                                onClick={() => !record.justified && setSelectedAbsence(record)}
                                className={`
                                    p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between
                                    ${!record.justified ? 'cursor-pointer hover:border-red-200 hover:bg-red-50/30' : ''}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${record.status === 'present' ? 'bg-emerald-100 text-emerald-600' : record.status === 'absent' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {record.status === 'present' ? 'P' : record.status === 'absent' ? 'A' : 'R'}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">{record.date}</h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">
                                            {record.status === 'present' ? 'Présent' : record.status === 'absent' ? 'Absent' : 'Retard'}
                                        </p>
                                    </div>
                                </div>
                                
                                {record.status !== 'present' && (
                                    <div className="flex items-center">
                                        {record.justified ? (
                                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md flex items-center gap-1">
                                                <CheckCircle2 size={10} /> Justifié
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-1 rounded-md border border-red-100">
                                                Non Justifié
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sanctions List */}
                <div>
                    <h3 className="font-bold text-slate-800 mb-4 ml-2 flex items-center gap-2">
                        <Gavel size={18} /> Sanctions
                    </h3>
                    <div className="space-y-3">
                        {MOCK_DISCIPLINE.sanctions.map((item) => (
                            <div key={item.id} className={`p-4 rounded-2xl border-l-4 bg-white shadow-sm flex gap-4 ${item.type === 'blame' ? 'border-red-500' : 'border-orange-400'}`}>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`font-bold text-sm ${item.type === 'blame' ? 'text-red-600' : 'text-orange-600'}`}>
                                            {item.title}
                                        </h4>
                                        <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed">{item.reason}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </motion.div>
        )}

        {/* JUSTIFICATION MODAL */}
        <AnimatePresence>
            {selectedAbsence && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedAbsence(null)}
                    />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl"
                    >
                         <button onClick={() => setSelectedAbsence(null)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full">
                             <X size={20} className="text-slate-400" />
                         </button>

                         <h3 className="text-lg font-bold text-slate-900 mb-1">Justifier l'absence</h3>
                         <p className="text-sm text-slate-500 mb-6">Date: {selectedAbsence.date}</p>

                         <div className="space-y-4">
                             <div>
                                 <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Motif</label>
                                 <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                                     <option>Maladie</option>
                                     <option>Décès familial</option>
                                     <option>Rendez-vous médical</option>
                                     <option>Autre</option>
                                 </select>
                             </div>
                             
                             <div>
                                 <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Commentaire</label>
                                 <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 h-24 resize-none" placeholder="Détails supplémentaires..." />
                             </div>

                             <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500 transition-colors">
                                 <Upload size={24} className="mb-2" />
                                 <span className="text-xs font-bold">Ajouter un justificatif (Photo/PDF)</span>
                             </div>

                             <button onClick={handleJustify} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
                                 Envoyer la demande
                             </button>
                         </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

    </div>
  );
};

export default SisScreen;
