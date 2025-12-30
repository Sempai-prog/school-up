
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Zap, Crown, User, Sparkles, LifeBuoy, Hourglass, Check, AlertCircle, ArrowLeft } from 'lucide-react';

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  color: string;
  purchased: boolean;
  type: 'cosmetic' | 'service';
}

interface StoreScreenProps {
    userXp: number;
    onUpdateXp: (newXp: number) => void;
    onUpgrade?: () => void;
    onBack?: () => void;
}

const StoreScreen: React.FC<StoreScreenProps> = ({ userXp, onUpdateXp, onUpgrade, onBack }) => {
  const [activeTab, setActiveTab] = useState<'cosmetic' | 'service'>('service');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [items, setItems] = useState<StoreItem[]>([
    // Services
    { id: 's1', name: 'SOS Prof', description: 'Chat en direct de 15 min avec un enseignant.', price: 500, type: 'service', icon: <LifeBuoy size={24} />, color: 'bg-red-500', purchased: false },
    { id: 's2', name: 'Pass Premium', description: '1 Semaine sans pubs + Mode hors ligne.', price: 2000, type: 'service', icon: <Crown size={24} />, color: 'bg-yellow-500', purchased: false },
    { id: 's3', name: 'Joker Retard', description: '+24h pour rendre un devoir sans pénalité.', price: 800, type: 'service', icon: <Hourglass size={24} />, color: 'bg-purple-500', purchased: false },
    // Cosmetics
    { id: 'c1', name: 'Avatar Ninja', description: 'Débloque le style Ninja pour ton profil.', price: 1200, type: 'cosmetic', icon: <User size={24} />, color: 'bg-slate-800', purchased: false },
    { id: 'c2', name: 'Thème Néon', description: 'Interface sombre avec accents fluo.', price: 1500, type: 'cosmetic', icon: <Zap size={24} />, color: 'bg-fuchsia-500', purchased: false },
  ]);

  const handlePurchase = (item: StoreItem) => {
    if (item.purchased) return;

    if (userXp >= item.price) {
        // Handle Premium specifically
        if (item.id === 's2' && onUpgrade) {
            onUpgrade();
        }

        // Success Transaction
        onUpdateXp(userXp - item.price);
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, purchased: true } : i));
        setFeedback({ type: 'success', message: `${item.name} activé !` });
        
        // Clear feedback
        setTimeout(() => setFeedback(null), 2000);
    } else {
        // Fail
        setFeedback({ type: 'error', message: 'Pas assez de XP !' });
        setTimeout(() => setFeedback(null), 2000);
    }
  };

  const filteredItems = items.filter(i => i.type === activeTab);

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] relative overflow-hidden">
      {/* Feedback Toast */}
      <AnimatePresence>
          {feedback && (
              <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`absolute top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 ${feedback.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
              >
                  {feedback.type === 'success' ? <Sparkles size={18} /> : <AlertCircle size={18} />}
                  {feedback.message}
              </motion.div>
          )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-slate-900 text-white p-6 pb-12 rounded-b-[40px] shadow-2xl z-10 relative overflow-hidden">
         {/* Background FX */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl -ml-10 -mb-10"></div>

         <div className="relative z-10 flex items-center gap-3 mb-6">
            {onBack && (
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
            )}
            <h1 className="text-xl font-bold">Boutique Campus</h1>
         </div>

         <div className="relative z-10 flex flex-col items-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Mon Solde</span>
            <div className="flex items-center gap-2">
                <TrophyIcon className="text-yellow-400" />
                <span className="text-4xl font-black tracking-tight">{userXp.toLocaleString()}</span>
                <span className="text-xl font-bold text-yellow-400">XP</span>
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="px-6 -mt-6 relative z-20">
        <div className="bg-white p-1.5 rounded-2xl shadow-lg shadow-slate-200/50 flex">
            <button 
                onClick={() => setActiveTab('service')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'service' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Services & Boosts
            </button>
            <button 
                onClick={() => setActiveTab('cosmetic')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'cosmetic' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Cosmétique
            </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item) => (
                <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden group"
                >
                    <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                        {item.icon}
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{item.name}</h3>
                        <p className="text-xs text-slate-500 leading-tight mt-1">{item.description}</p>
                    </div>

                    <button
                        onClick={() => handlePurchase(item)}
                        disabled={item.purchased}
                        className={`
                            px-4 py-2 rounded-xl font-bold text-xs flex flex-col items-center min-w-[80px] transition-all
                            ${item.purchased 
                                ? 'bg-slate-100 text-slate-400' 
                                : 'bg-slate-900 text-white shadow-lg shadow-slate-300 active:scale-95 hover:bg-indigo-600'
                            }
                        `}
                    >
                        {item.purchased ? (
                            <div className="flex items-center gap-1"><Check size={14} /> Actif</div>
                        ) : (
                            <>
                                <span>Acheter</span>
                                <span className="text-yellow-400">{item.price} XP</span>
                            </>
                        )}
                    </button>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Simple Trophy Icon Component
const TrophyIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
);

export default StoreScreen;
