
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BookOpen, MessageCircle, Star, Trash2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

interface Notification {
  id: string;
  type: 'grade' | 'homework' | 'system' | 'social';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'grade', title: 'Nouvelle Note', message: 'Tu as reçu 16/20 en Mathématiques.', time: 'Il y a 10 min', read: false },
  { id: '2', type: 'homework', title: 'Rappel Devoir', message: 'Exercice de Physique à rendre pour demain.', time: 'Il y a 1h', read: false },
  { id: '3', type: 'social', title: 'M. Touré', message: 'A répondu à votre question sur le forum.', time: 'Il y a 2h', read: true },
  { id: '4', type: 'system', title: 'Mise à jour', message: 'Le module "Géométrie" est maintenant disponible.', time: 'Hier', read: true },
];

const NotificationScreen: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'grade': return <Star size={20} className="text-yellow-500" />;
      case 'homework': return <BookOpen size={20} className="text-blue-500" />;
      case 'social': return <MessageCircle size={20} className="text-pink-500" />;
      default: return <AlertCircle size={20} className="text-slate-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <div className="px-6 py-4 bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
            {onBack && (
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600">
                    <ArrowLeft size={24} />
                </button>
            )}
            <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
        </div>
        <button onClick={markAllRead} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
            Tout lire
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32">
        <AnimatePresence mode="popLayout">
            {notifications.length > 0 ? (
                notifications.map((notif) => (
                    <motion.div
                        key={notif.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        onClick={() => markRead(notif.id)}
                        className={`
                            relative p-4 rounded-2xl border flex gap-4 cursor-pointer transition-all
                            ${notif.read ? 'bg-white border-slate-100' : 'bg-indigo-50/50 border-indigo-100 shadow-sm'}
                        `}
                    >
                        {!notif.read && (
                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500"></div>
                        )}
                        
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-slate-50' : 'bg-white shadow-sm'}`}>
                            {getIcon(notif.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start pr-4">
                                <h4 className={`text-sm font-bold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</h4>
                                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">{notif.time}</span>
                            </div>
                            <p className={`text-xs mt-1 leading-relaxed ${notif.read ? 'text-slate-500' : 'text-slate-600 font-medium'}`}>
                                {notif.message}
                            </p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <Bell size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">Aucune notification</p>
                </div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationScreen;
