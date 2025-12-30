import React, { useState, useEffect } from 'react';
import { QuizContent, QuizOption } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisualQuizProps {
  data: QuizContent;
  onComplete: (success: boolean) => void;
}

const VisualQuiz: React.FC<VisualQuizProps> = ({ data, onComplete }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (option: QuizOption) => {
    if (isAnswered) return;
    
    setSelectedOptionId(option.id);
    setIsAnswered(true);

    // Auto-advance after delay
    setTimeout(() => {
        onComplete(option.isCorrect);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      {/* Top Question Area */}
      <div className="p-6 bg-slate-800/50 border-b border-white/10">
        <h3 className="text-lg font-bold leading-relaxed">{data.question}</h3>
      </div>

      {/* Image Container */}
      <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
        {data.imageUrl ? (
            <img 
                src={data.imageUrl} 
                alt="Quiz Context" 
                className="w-full h-full object-cover opacity-90"
            />
        ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
                Pas d'image
            </div>
        )}
      </div>

      {/* Options Area */}
      <div className="p-6 bg-slate-900 pb-12">
        <div className="grid grid-cols-1 gap-3">
            {data.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const showCorrect = isAnswered && option.isCorrect;
                const showWrong = isSelected && !option.isCorrect;

                let btnClass = "bg-slate-800 border-slate-700 hover:bg-slate-700"; // Default
                if (showCorrect) btnClass = "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]";
                if (showWrong) btnClass = "bg-red-600 border-red-500 text-white";

                return (
                    <motion.button
                        key={option.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionClick(option)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-xl border-2 text-left font-semibold text-sm transition-all duration-200 flex justify-between items-center ${btnClass}`}
                    >
                        <span>{option.text}</span>
                        {showCorrect && <CheckCircle2 size={20} className="text-white" />}
                        {showWrong && <XCircle size={20} className="text-white" />}
                    </motion.button>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default VisualQuiz;
