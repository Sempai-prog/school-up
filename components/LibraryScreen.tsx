
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, FileText, Book, FileCheck, Loader2, ArrowLeft, Filter } from 'lucide-react';

interface LibraryResource {
  id: string;
  title: string;
  subject: string;
  type: 'manuel' | 'fiche' | 'epreuve' | 'corrige';
  size: string;
  downloaded?: boolean;
}

const RESOURCES: LibraryResource[] = [
  { id: '1', title: 'Manuel Maths 6ème (CIAM)', subject: 'Mathématiques', type: 'manuel', size: '45 MB' },
  { id: '2', title: 'Fiche Révision: Fractions', subject: 'Mathématiques', type: 'fiche', size: '2.4 MB' },
  { id: '3', title: 'BEPC Blanc 2023 - Zone 1', subject: 'Physique-Chimie', type: 'epreuve', size: '1.8 MB' },
  { id: '4', title: 'Corrigé BEPC 2023', subject: 'Physique-Chimie', type: 'corrige', size: '0.5 MB' },
  { id: '5', title: 'Grammaire: Les Accords', subject: 'Français', type: 'fiche', size: '3.1 MB' },
  { id: '6', title: 'History of Africa Vol.1', subject: 'Hist-Géo', type: 'manuel', size: '120 MB' },
];

interface LibraryScreenProps {
    onBack?: () => void;
}

const LibraryScreen: React.FC<LibraryScreenProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Tout');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [resources, setResources] = useState(RESOURCES);

  const categories = ['Tout', 'Manuels', 'Fiches', 'Épreuves', 'Corrigés'];

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
        setResources(prev => prev.map(r => r.id === id ? { ...r, downloaded: true } : r));
        setDownloadingId(null);
    }, 2000);
  };

  const filteredResources = activeCategory === 'Tout' 
    ? resources 
    : resources.filter(r => 
        (activeCategory === 'Manuels' && r.type === 'manuel') ||
        (activeCategory === 'Fiches' && r.type === 'fiche') ||
        (activeCategory === 'Épreuves' && r.type === 'epreuve') ||
        (activeCategory === 'Corrigés' && r.type === 'corrige')
      );

  const getIcon = (type: string) => {
      switch(type) {
          case 'manuel': return <Book size={20} className="text-blue-500" />;
          case 'epreuve': return <FileText size={20} className="text-orange-500" />;
          case 'corrige': return <FileCheck size={20} className="text-emerald-500" />;
          default: return <FileText size={20} className="text-purple-500" />;
      }
  };

  const getTypeLabel = (type: string) => {
      switch(type) {
          case 'manuel': return 'Manuel Scolaire';
          case 'epreuve': return 'Sujet d\'examen';
          case 'corrige': return 'Corrigé Type';
          default: return 'Fiche de cours';
      }
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <div className="px-6 py-4 bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-4">
           {onBack && (
               <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                 <ArrowLeft size={24} />
               </button>
           )}
           <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
               <Book size={24} />
           </div>
           <h1 className="text-xl font-bold text-slate-900">Bibliothèque</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input 
                type="text" 
                placeholder="Rechercher un document..." 
                className="w-full bg-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button className="absolute right-2 top-2 p-1.5 bg-white rounded-lg shadow-sm text-slate-500">
                <Filter size={16} />
            </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                        activeCategory === cat 
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-300' 
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="grid grid-cols-1 gap-4">
            {filteredResources.map((resource, idx) => (
                <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow group"
                >
                    {/* Visual Thumbnail */}
                    <div className="w-16 h-20 bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
                        {resource.type === 'manuel' ? (
                             <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 p-2">
                                 <div className="w-full h-full border border-white/30 rounded flex items-center justify-center">
                                     <span className="text-[8px] text-white font-bold text-center leading-tight">{resource.title}</span>
                                 </div>
                             </div>
                        ) : (
                            <div className="text-slate-400">
                                {getIcon(resource.type)}
                            </div>
                        )}
                        {resource.downloaded && (
                            <div className="absolute top-1 right-1 bg-emerald-500 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                <FileCheck size={10} className="text-white" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1 truncate pr-2">{resource.title}</h3>
                                <p className="text-xs text-slate-500 font-medium">{getTypeLabel(resource.type)}</p>
                            </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-md">
                                {resource.subject} • {resource.size}
                            </span>
                            
                            <button 
                                onClick={() => !resource.downloaded && handleDownload(resource.id)}
                                disabled={resource.downloaded || downloadingId === resource.id}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    resource.downloaded 
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                }`}
                            >
                                {downloadingId === resource.id ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : resource.downloaded ? (
                                    <FileCheck size={16} />
                                ) : (
                                    <Download size={16} />
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryScreen;
