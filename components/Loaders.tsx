
import React from 'react';
import { motion } from 'framer-motion';

// --- INITIAL APP SPLASH (Rive-style Animation) ---

export const AppSplash: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Abstract Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[100px]"
      />
      
      {/* Central Logo Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-8">
            {/* Orbital Rings */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-300 opacity-80"
            />
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-500 border-l-purple-300 opacity-80"
            />
            
            {/* Core Pulse */}
            <motion.div 
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center"
            >
                <div className="w-4 h-4 bg-white rounded-full"></div>
            </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                SkoolUP
            </h1>
            <motion.div 
                className="h-1 bg-indigo-500 rounded-full mt-2 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            />
        </motion.div>
      </div>

      <div className="absolute bottom-10 text-slate-400 text-xs font-medium tracking-widest uppercase">
          Chargement des modules
      </div>
    </div>
  );
};

// --- SKELETON LOADERS (Shimmer Effect) ---

export const MapSkeleton: React.FC = () => {
  return (
    <div className="h-full bg-[#F8FAFC] flex flex-col">
        {/* Header Skeleton */}
        <div className="px-4 py-3 bg-white/80 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
            <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
            </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-6 space-y-12 overflow-hidden">
            {[1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center gap-8">
                    <div className="h-8 w-40 bg-slate-200 rounded-full animate-pulse" />
                    <div className="relative flex flex-col items-center gap-6">
                        <div className="absolute top-0 bottom-0 w-0.5 bg-slate-200 border-l-2 border-dashed border-slate-300 h-full -z-10" />
                        {[1, 2, 3].map((j) => (
                            <div key={j} className="flex flex-col items-center gap-3">
                                <div className="w-20 h-20 rounded-full bg-slate-200 animate-pulse border-4 border-white shadow-sm" />
                                <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export const LessonSkeleton: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-[#F8FAFC] p-4">
            <div className="w-full h-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-50 flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                        <div className="h-2 w-16 bg-slate-100 rounded animate-pulse" />
                        <div className="h-6 w-48 bg-slate-100 rounded animate-pulse" />
                    </div>
                </div>
                {/* Content Body */}
                <div className="p-8 space-y-6 flex-1">
                    <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-[90%] bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-[95%] bg-slate-100 rounded animate-pulse" />
                    
                    <div className="w-full h-48 bg-slate-100 rounded-2xl animate-pulse my-8" />
                    
                    <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-[80%] bg-slate-100 rounded animate-pulse" />
                </div>
                {/* Footer */}
                <div className="p-6 border-t border-slate-50">
                    <div className="w-full h-12 bg-slate-100 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
};
