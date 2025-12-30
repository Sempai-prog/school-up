
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Settings, Moon, Bell, LogOut, ChevronRight, User as UserIcon, HeartPulse, Phone, AlertTriangle, FileText, Calendar, MapPin } from 'lucide-react';
import { User } from '../types';
import { BADGES } from '../constants';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'medical' | 'admin'>('general');

  // Extended Mock Data (Normally comes from User prop)
  const medicalInfo = user.medical || {
      bloodType: 'O+',
      allergies: ['Arachides', 'Pénicilline'],
      emergencyContact: { name: 'Mme Kouamé (Mère)', relation: 'Mère', phone: '07 07 07 07' },
      conditions: ['Asthme léger']
  };

  const adminInfo = user.admin || {
      matricule: 'CI-ABJ-23-4859',
      dob: '12 Mars 2008',
      birthPlace: 'Cocody, Abidjan',
      entryYear: '2019',
      parents: { father: 'M. Kouamé Jean', mother: 'Mme Kouamé Awa' },
      eligibility: true
  };

  const renderGeneralTab = () => (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Stats */}
            <div className="flex gap-4 w-full">
                <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <span className="block text-2xl font-bold text-blue-600">{user.level}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Niveau</span>
                </div>
                <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <span className="block text-2xl font-bold text-orange-500">{user.xp}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">XP Total</span>
                </div>
                <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <span className="block text-2xl font-bold text-emerald-500">#{user.streak}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Rang</span>
                </div>
            </div>

            {/* Exam Eligibility */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${adminInfo.eligibility ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full text-white ${adminInfo.eligibility ? 'bg-emerald-500' : 'bg-red-500'}`}>
                        <FileText size={18} />
                    </div>
                    <div>
                        <h4 className={`font-bold text-sm ${adminInfo.eligibility ? 'text-emerald-800' : 'text-red-800'}`}>
                            {adminInfo.eligibility ? 'Éligible aux Examens' : 'Non Éligible'}
                        </h4>
                        <p className={`text-[10px] ${adminInfo.eligibility ? 'text-emerald-600' : 'text-red-600'}`}>
                            Dossier administratif complet
                        </p>
                    </div>
                </div>
                {adminInfo.eligibility && <Award className="text-emerald-500" />}
            </div>

            {/* Badges */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Award className="text-yellow-500" size={20} />
                        Badges & Succès
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {BADGES.map((badge) => (
                        <div key={badge.id} className={`p-3 rounded-xl border flex items-center gap-3 ${badge.unlocked ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-100 border-transparent opacity-60 grayscale'}`}>
                            <div className={`p-2 rounded-lg text-white ${badge.color}`}>
                                {badge.icon === 'Calculator' && <span className="font-bold text-xs">∑</span>}
                                {badge.icon === 'Sun' && <span className="font-bold text-xs">☀</span>}
                                {badge.icon === 'MessageCircle' && <span className="font-bold text-xs">💬</span>}
                                {badge.icon === 'Flame' && <span className="font-bold text-xs">🔥</span>}
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-slate-800">{badge.name}</h4>
                                <p className="text-[10px] text-slate-500 leading-tight">{badge.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Settings Link */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                 <div onClick={onLogout} className="p-4 flex items-center justify-between cursor-pointer hover:bg-red-50 group transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100"><LogOut size={18} /></div>
                        <span className="text-sm font-medium text-red-600">Déconnexion</span>
                    </div>
                </div>
            </div>
      </motion.div>
  );

  const renderMedicalTab = () => (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xl border-4 border-white shadow-sm">
                   {medicalInfo.bloodType}
               </div>
               <div>
                   <h4 className="font-bold text-slate-800">Groupe Sanguin</h4>
                   <p className="text-xs text-slate-500">Donnée vitale vérifiée</p>
               </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                   <div className="flex items-center gap-2 mb-2 text-orange-500">
                       <AlertTriangle size={18} />
                       <span className="font-bold text-xs uppercase">Allergies</span>
                   </div>
                   <ul className="list-disc list-inside text-sm text-slate-700 font-medium">
                       {medicalInfo.allergies.map(a => <li key={a}>{a}</li>)}
                   </ul>
               </div>
               <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                   <div className="flex items-center gap-2 mb-2 text-blue-500">
                       <HeartPulse size={18} />
                       <span className="font-bold text-xs uppercase">Santé</span>
                   </div>
                   <ul className="list-disc list-inside text-sm text-slate-700 font-medium">
                       {medicalInfo.conditions?.map(c => <li key={c}>{c}</li>)}
                   </ul>
               </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-3 text-emerald-700">
                    <Phone size={18} />
                    <span className="font-bold text-sm uppercase">Contact d'Urgence</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100 flex justify-between items-center">
                    <div>
                        <h5 className="font-bold text-slate-800 text-sm">{medicalInfo.emergencyContact.name}</h5>
                        <p className="text-xs text-slate-500">{medicalInfo.emergencyContact.relation}</p>
                    </div>
                    <a href={`tel:${medicalInfo.emergencyContact.phone}`} className="bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors">
                        <Phone size={16} />
                    </a>
                </div>
          </div>
      </motion.div>
  );

  const renderAdminTab = () => (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
           <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Matricule</p>
                <h3 className="text-2xl font-mono font-bold tracking-widest">{adminInfo.matricule}</h3>
                <div className="mt-4 flex gap-4">
                    <div>
                        <p className="text-slate-400 text-[10px] uppercase">Année Entrée</p>
                        <p className="font-bold">{adminInfo.entryYear}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-[10px] uppercase">Classe Actuelle</p>
                        <p className="font-bold">{user.grade}</p>
                    </div>
                </div>
           </div>

           <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
               <div className="p-4 border-b border-slate-50 flex items-center gap-4">
                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Calendar size={18} /></div>
                   <div>
                       <p className="text-xs text-slate-400 font-bold uppercase">Date de Naissance</p>
                       <p className="text-sm font-bold text-slate-800">{adminInfo.dob}</p>
                   </div>
               </div>
               <div className="p-4 border-b border-slate-50 flex items-center gap-4">
                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><MapPin size={18} /></div>
                   <div>
                       <p className="text-xs text-slate-400 font-bold uppercase">Lieu de Naissance</p>
                       <p className="text-sm font-bold text-slate-800">{adminInfo.birthPlace}</p>
                   </div>
               </div>
               <div className="p-4 flex items-center gap-4">
                   <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><UserIcon size={18} /></div>
                   <div>
                       <p className="text-xs text-slate-400 font-bold uppercase">Parents</p>
                       <p className="text-sm font-bold text-slate-800">{adminInfo.parents.father} & {adminInfo.parents.mother}</p>
                   </div>
               </div>
           </div>
      </motion.div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-slate-50 w-full max-w-md h-[90vh] sm:h-[85vh] rounded-t-3xl sm:rounded-3xl z-50 overflow-hidden flex flex-col relative shadow-2xl"
      >
        {/* Header Image Background */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
             <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-full backdrop-blur-md hover:bg-black/30 z-10">
                <X size={20} />
             </button>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto relative -mt-12 px-6 pb-6">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-200 mb-3">
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-slate-500 font-medium">{user.grade} • {user.school}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex mb-6">
                {(['general', 'medical', 'admin'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
                            activeTab === tab ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        {tab === 'general' ? 'Général' : tab === 'medical' ? 'Médical' : 'Admin'}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <div key={activeTab}>
                    {activeTab === 'general' && renderGeneralTab()}
                    {activeTab === 'medical' && renderMedicalTab()}
                    {activeTab === 'admin' && renderAdminTab()}
                </div>
            </AnimatePresence>

            <div className="mt-8 text-center text-[10px] text-slate-300 font-mono">
                ID: {user.id} • Last Sync: Today 10:00
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;
