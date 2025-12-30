import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Moon, Lock, LogOut, ChevronRight, HelpCircle, Shield, ArrowLeft } from 'lucide-react';

interface SettingsScreenProps {
    user: any;
    onLogout: () => void;
    onBack?: () => void;
}

const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">{title}</h3>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
            {children}
        </div>
    </div>
);

const Row = ({ icon: Icon, label, action, color = 'text-slate-600', bg = 'bg-slate-50' }: any) => (
    <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer active:bg-slate-50">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color}`}>
                <Icon size={20} />
            </div>
            <span className="font-bold text-slate-700 text-sm">{label}</span>
        </div>
        {action}
    </div>
);

const Toggle = ({ value, onChange }: { value: boolean, onChange: (v: boolean) => void }) => (
    <div 
      onClick={() => onChange(!value)}
      className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${value ? 'bg-indigo-500' : 'bg-slate-200'}`}
    >
        <motion.div 
          layout 
          className="w-5 h-5 bg-white rounded-full shadow-sm"
          animate={{ x: value ? 20 : 0 }}
        />
    </div>
);

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onLogout, onBack }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <div className="px-6 py-4 bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100 flex items-center gap-3">
          {onBack && (
              <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600">
                  <ArrowLeft size={24} />
              </button>
          )}
          <h1 className="text-xl font-bold text-slate-900">Paramètres</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-32">
          
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-3xl shadow-lg shadow-indigo-500/5 mb-8 flex items-center gap-4 border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md">
                  <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                  <h2 className="font-bold text-slate-900 text-lg">{user.name}</h2>
                  <p className="text-xs text-slate-500 font-medium">{user.grade} • {user.school}</p>
              </div>
              <button className="text-indigo-600 text-xs font-bold bg-indigo-50 px-3 py-1.5 rounded-full">
                  Modifier
              </button>
          </div>

          <Section title="Préférences">
              <Row 
                icon={Bell} 
                label="Notifications Push" 
                color="text-blue-500" 
                bg="bg-blue-50"
                action={<Toggle value={notificationsEnabled} onChange={setNotificationsEnabled} />} 
              />
              <Row 
                icon={Moon} 
                label="Mode Sombre" 
                color="text-purple-500" 
                bg="bg-purple-50"
                action={<Toggle value={darkMode} onChange={setDarkMode} />} 
              />
          </Section>

          <Section title="Compte & Sécurité">
              <Row 
                icon={Lock} 
                label="Changer mot de passe" 
                color="text-emerald-500" 
                bg="bg-emerald-50"
                action={<ChevronRight size={18} className="text-slate-300" />} 
              />
               <Row 
                icon={Shield} 
                label="Confidentialité" 
                color="text-orange-500" 
                bg="bg-orange-50"
                action={<ChevronRight size={18} className="text-slate-300" />} 
              />
          </Section>

          <Section title="Support">
              <Row 
                icon={HelpCircle} 
                label="Aide & FAQ" 
                color="text-sky-500" 
                bg="bg-sky-50"
                action={<ChevronRight size={18} className="text-slate-300" />} 
              />
          </Section>

          <button 
            onClick={onLogout}
            className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
          >
              <LogOut size={20} />
              Se déconnecter
          </button>
          
          <p className="text-center text-[10px] text-slate-400 mt-6 font-mono">
              SkoolUP v2.0.1 (Build 2405)
          </p>
      </div>
    </div>
  );
};

export default SettingsScreen;