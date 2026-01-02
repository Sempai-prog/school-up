
import React, { useState, useEffect } from 'react';
import { 
    CheckCircle2, ArrowRight, Trophy, ChevronLeft, MessageSquare, 
    MoveDown, MousePointerClick, Flag, Flame, XCircle
} from 'lucide-react';
import { Chapter, ParsonsItem, QuizContent } from '../types';
import TheoryPlayer from './TheoryPlayer';
import { LessonSkeleton } from './Loaders';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// SUB-COMPONENTS (INTERACTION LAYERS)
// ============================================================================

/**
 * SEQUENCE BUILDER (Parsons Problems)
 */
const SequenceBuilder: React.FC<{ items: ParsonsItem[], onValidate: (success: boolean) => void }> = ({ items: initialItems, onValidate }) => {
    const [pool, setPool] = useState<ParsonsItem[]>([]);
    const [answer, setAnswer] = useState<ParsonsItem[]>([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setPool([...initialItems].sort(() => Math.random() - 0.5));
        setAnswer([]);
    }, [initialItems]);

    const handleAddToAnswer = (item: ParsonsItem) => {
        setIsError(false);
        setPool(prev => prev.filter(i => i.id !== item.id));
        setAnswer(prev => [...prev, item]);
    };

    const handleRemoveFromAnswer = (item: ParsonsItem) => {
        setIsError(false);
        setAnswer(prev => prev.filter(i => i.id !== item.id));
        setPool(prev => [...prev, item]);
    };

    const checkOrder = () => {
        const currentIds = answer.map(i => i.id).join(',');
        const correctIds = initialItems.map(i => i.id).join(',');
        
        if (currentIds === correctIds) {
            onValidate(true);
        } else {
            setIsError(true);
            onValidate(false); // Notify failure to reset combo
            setTimeout(() => setIsError(false), 800);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 mb-4">
                <p className="text-sm text-indigo-900 font-medium text-center flex items-center justify-center gap-2">
                    <MousePointerClick size={16} /> 
                    Tape les blocs dans l'ordre logique.
                </p>
            </div>

            <div className={`flex-1 bg-slate-50 rounded-3xl p-4 border-2 transition-colors duration-300 relative ${isError ? 'border-red-300 bg-red-50' : 'border-dashed border-slate-200'}`}>
                {answer.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                        <MoveDown size={24} className="mb-2 animate-bounce" />
                        <span className="text-sm font-bold">Ton résultat ici</span>
                    </div>
                )}
                <div className="space-y-2">
                    <AnimatePresence>
                        {answer.map((item, index) => (
                            <motion.button
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                key={item.id}
                                onClick={() => handleRemoveFromAnswer(item)}
                                className="w-full text-left p-4 bg-white rounded-xl shadow-sm border-l-4 border-indigo-500 font-medium text-slate-700 text-sm active:scale-95 transition-transform flex items-center gap-3"
                            >
                                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">{index + 1}</span>
                                {item.content}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-4 min-h-[140px]">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Blocs disponibles</p>
                <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                        {pool.map((item) => (
                            <motion.button
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                key={item.id}
                                onClick={() => handleAddToAnswer(item)}
                                className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 shadow-sm active:bg-slate-50 active:scale-95 transition-all"
                            >
                                {item.content}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <button 
                onClick={checkOrder} 
                disabled={pool.length > 0}
                className="w-full py-4 mt-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2 hover:shadow-indigo-300 disabled:opacity-50 disabled:shadow-none"
            >
                <CheckCircle2 size={20} /> Valider
            </button>
        </div>
    );
};

/**
 * QUIZ PLAYER
 */
const QuizPlayer: React.FC<{ quiz: QuizContent, onValidate: (success: boolean) => void }> = ({ quiz, onValidate }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleValidate = () => {
        if (!selectedOption) return;
        setSubmitted(true);
        const isCorrect = quiz.options.find(o => o.id === selectedOption)?.isCorrect || false;
        
        // Immediate feedback delay
        setTimeout(() => {
             onValidate(isCorrect);
             // Reset if wrong to allow retry or handle externally (here we assume strict flow)
        }, 1200);
    };

    return (
        <div className="flex flex-col h-full justify-center max-w-lg mx-auto w-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center leading-snug">{quiz.question}</h2>
            <div className="space-y-4">
                {quiz.options.map(opt => {
                    let btnClass = "bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-600";
                    if (selectedOption === opt.id) btnClass = "bg-blue-50 border-blue-500 ring-1 ring-blue-500 text-blue-700 shadow-md";
                    if (submitted) {
                        if (opt.isCorrect) btnClass = "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-sm";
                        else if (selectedOption === opt.id) btnClass = "bg-red-50 border-red-200 text-red-600 opacity-70";
                    }
                    return (
                        <button key={opt.id} onClick={() => !submitted && setSelectedOption(opt.id)} disabled={submitted} className={`w-full p-6 rounded-2xl border-2 text-left font-semibold text-lg transition-all active:scale-[0.98] ${btnClass}`}>
                            {opt.text}
                        </button>
                    );
                })}
            </div>
            <button 
                onClick={handleValidate} 
                disabled={!selectedOption || submitted} 
                className="w-full py-4 mt-10 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 disabled:opacity-50 disabled:shadow-none hover:bg-slate-800 transition-all"
            >
                Valider
            </button>
        </div>
    );
};

/**
 * SUCCESS VIEW (The Trophy Animation)
 */
const SuccessView: React.FC<{ onContinue: () => void, isLastStep: boolean }> = ({ onContinue, isLastStep }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="h-full flex flex-col items-center justify-center p-6 text-center"
        >
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                <div className="w-32 h-32 bg-gradient-to-tr from-emerald-400 to-teal-500 text-white rounded-[32px] flex items-center justify-center shadow-2xl shadow-emerald-200 rotate-3 animate-[bounce_1s_infinite]">
                    <Trophy size={64} />
                </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Excellent !</h2>
            <p className="text-slate-500 mb-10 text-lg">
                {isLastStep ? "Chapitre terminé avec brio." : "Tu maîtrises ce point."}
            </p>
            <button 
                onClick={onContinue} 
                className="w-full max-w-xs py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-300 hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
                {isLastStep ? 'Terminer le Chapitre' : 'Continuer'} <ArrowRight size={20} />
            </button>
        </motion.div>
    );
};

/**
 * END OF CHAPTER VIEW
 */
const ChapterCompleteView: React.FC<{ onExit: () => void }> = ({ onExit }) => (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
            <Flag size={48} fill="currentColor" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Chapitre Terminé</h2>
        <p className="text-slate-500 mb-8">Bravo, tu as validé toutes les étapes !</p>
        <button onClick={onExit} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">
            Retour au parcours
        </button>
    </div>
);


// ============================================================================
// MAIN PURE COMPONENT
// ============================================================================

interface LearningEngineProps {
    chapter: Chapter;
    isLoading?: boolean; 
    onStepComplete: (stepId: string) => void;
    onCompleteChapter: () => void;
    onExit: () => void;
}

const LearningEngine: React.FC<LearningEngineProps> = ({ 
    chapter, 
    isLoading, 
    onStepComplete, 
    onCompleteChapter, 
    onExit 
}) => {
    // Transient local state
    const [showSuccess, setShowSuccess] = useState(false);
    const [combo, setCombo] = useState(0); // NEW: Combo System
    const [shake, setShake] = useState(false); // NEW: Error Feedback

    // 1. DERIVE ACTIVE STEP
    const activeStep = chapter.steps.find(s => s.status === 'current');
    const isChapterFullyComplete = chapter.status === 'completed' && !activeStep;

    // 2. AUTO-RESET EFFECT
    useEffect(() => {
        setShowSuccess(false);
    }, [chapter]);

    if (isLoading) return <LessonSkeleton />;

    // 3. HANDLERS
    const handleSuccessTrigger = (success: boolean) => {
        if (success) {
            setCombo(c => c + 1);
            setShowSuccess(true);
        } else {
            setCombo(0);
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    const handleContinue = () => {
        if (activeStep) {
            onStepComplete(activeStep.id);
        } else if (isChapterFullyComplete) {
            onCompleteChapter();
        }
    };

    // 4. RENDERER
    const renderContent = () => {
        if (showSuccess) {
            const isLast = activeStep ? chapter.steps.indexOf(activeStep) === chapter.steps.length - 1 : false;
            return <SuccessView onContinue={handleContinue} isLastStep={isLast} />;
        }

        if (!activeStep) {
            if (isChapterFullyComplete) return <ChapterCompleteView onExit={onCompleteChapter} />;
            return <div className="p-10 text-center text-slate-400">Erreur: Aucune étape active.</div>;
        }

        switch (activeStep.type) {
            case 'theory':
                return (
                    <div className="h-full flex flex-col">
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                           <TheoryPlayer 
                                chapter={{...chapter, content: activeStep.content, title: activeStep.title} as any} 
                                onComplete={() => handleSuccessTrigger(true)}
                                onBack={onExit} 
                            />
                        </div>
                    </div>
                );
            case 'checkpoint':
                return (
                    <div className="h-full p-6 pt-2">
                         <QuizPlayer quiz={activeStep.quiz} onValidate={handleSuccessTrigger} />
                    </div>
                );
            case 'exercise':
                return (
                    <div className="h-full p-6 pt-2">
                         <SequenceBuilder items={activeStep.parsons} onValidate={handleSuccessTrigger} />
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#F8FAFC] relative">
            {/* Top Navigation Bar */}
            <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <button onClick={onExit} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-sm border border-slate-100 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                
                {/* Progress Indicators */}
                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-sm">
                    {chapter.steps.map((step) => {
                        let color = "bg-slate-200"; 
                        if (step.status === 'completed') color = "bg-emerald-400";
                        else if (step.status === 'current') color = "bg-indigo-500 scale-125";
                        
                        return (
                            <motion.div 
                                key={step.id} 
                                layout
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${color}`}
                            />
                        );
                    })}
                </div>

                {/* Combo Meter - Replaces Chat Icon */}
                <div className={`flex items-center gap-1 font-bold ${combo > 1 ? 'text-orange-500' : 'text-slate-300'} transition-colors`}>
                    <motion.div
                         animate={combo > 1 ? { scale: [1, 1.2, 1] } : {}}
                         transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                        <Flame size={24} fill={combo > 1 ? "currentColor" : "none"} />
                    </motion.div>
                    <span className="text-lg">{combo}</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 px-4 pb-4 overflow-hidden relative">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                        y: 0, 
                        opacity: 1,
                        x: shake ? [0, -10, 10, -10, 10, 0] : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-white w-full h-full rounded-[40px] shadow-2xl shadow-indigo-500/5 overflow-hidden border border-white/50 relative"
                >
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    );
};

export default LearningEngine;
