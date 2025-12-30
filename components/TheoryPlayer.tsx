
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, PlayCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// Define a local interface that covers the props actually used by TheoryPlayer
// This decouples it from the strict 'Chapter' definition in types.ts which doesn't contain content/videoUrl
export interface TheoryContent {
  title: string;
  content?: string;
  videoUrl?: string;
  xpReward: number;
}

interface TheoryPlayerProps {
  chapter: TheoryContent;
  onComplete: () => void;
  onBack: () => void;
}

const TheoryPlayer: React.FC<TheoryPlayerProps> = ({ chapter, onComplete, onBack }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFinish = () => {
    setIsCompleted(true);
    // Trigger parent callback after small delay for animation
    setTimeout(() => {
        onComplete();
    }, 1500);
  };

  // Simple parser to render markdown-like content for the prototype
  const renderContent = (text: string) => {
    return text.split('\n').map((line, index) => {
        if (line.startsWith('# ')) {
            return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-6 mb-4">{line.replace('# ', '')}</h2>;
        }
        if (line.startsWith('## ')) {
            return <h3 key={index} className="text-xl font-bold text-slate-800 mt-5 mb-3">{line.replace('## ', '')}</h3>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
            return <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 font-bold text-slate-800 rounded-r-lg">{line.replace(/\*\*/g, '')}</div>
        }
        if (line.trim() === '') {
            return <br key={index} />;
        }
        if (line.startsWith('- ')) {
            return <li key={index} className="ml-4 list-disc text-slate-600 mb-2">{line.replace('- ', '')}</li>
        }
        return <p key={index} className="text-slate-600 leading-relaxed mb-3 text-lg">{line}</p>;
    });
  };

  return (
    <div className="h-full flex flex-col bg-white relative z-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="ml-2 flex-1">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wide bg-emerald-50 px-2 py-1 rounded-md">Théorie</span>
          <h2 className="text-lg font-bold text-slate-900 truncate">{chapter.title}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Video Player */}
        {chapter.videoUrl && (
            <div className="w-full aspect-video bg-black relative">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={chapter.videoUrl} 
                    title={chapter.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0"
                ></iframe>
            </div>
        )}

        {/* Content Body */}
        <div className="p-6 max-w-2xl mx-auto">
            {chapter.content ? (
                <div className="prose prose-slate">
                    {renderContent(chapter.content)}
                </div>
            ) : (
                <div className="text-center py-10 text-slate-400">
                    <p>Contenu indisponible pour le moment.</p>
                </div>
            )}
        </div>
      </div>

      {/* Sticky Footer Action */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-slate-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        {isCompleted ? (
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full py-3 bg-emerald-100 text-emerald-700 rounded-xl font-bold flex items-center justify-center gap-2"
            >
                <CheckCircle2 size={20} />
                Leçon terminée ! +{chapter.xpReward} XP
            </motion.div>
        ) : (
            <button 
                onClick={handleFinish}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition-all"
            >
                <Award className="text-yellow-400" size={20} />
                Marquer comme lu (+{chapter.xpReward} XP)
            </button>
        )}
      </div>
    </div>
  );
};

export default TheoryPlayer;