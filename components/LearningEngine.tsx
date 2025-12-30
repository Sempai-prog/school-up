
import React, { useState, useEffect } from 'react';
import { 
  DndContext, closestCenter, KeyboardSensor, PointerSensor, 
  useSensor, useSensors, DragEndEvent 
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, 
  verticalListSortingStrategy, useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
    CheckCircle2, RotateCcw, GripVertical, ArrowRight,
    Trophy, XCircle, Lock, Circle, ChevronLeft, MessageSquare, Star, Send
} from 'lucide-react';
import { Chapter, LessonStep, ParsonsItem, QuizContent, Comment } from '../types';
import TheoryPlayer from './TheoryPlayer';
import { LessonSkeleton } from './Loaders';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK COMMENTS ---
const MOCK_COMMENTS: Comment[] = [
    { id: '1', author: 'Sarah K.', avatar: 'https://i.pravatar.cc/150?u=1', text: 'Merci pour cette explication claire !', date: 'Il y a 2j', rating: 5 },
    { id: '2', author: 'David O.', avatar: 'https://i.pravatar.cc/150?u=2', text: 'Je n\'ai pas bien compris la partie sur les vecteurs.', date: 'Il y a 1j', rating: 3 },
];

// --- SUB-COMPONENTS ---

const SortableItem: React.FC<{ id: string, content: string }> = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 1 };
  return (
    <div ref={setNodeRef} style={style} {...attributes} className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-3 flex items-start gap-4 touch-none transition-all ${isDragging ? 'shadow-xl ring-2 ring-indigo-500 opacity-90 scale-105' : 'hover:border-indigo-100'}`}>
        <div {...listeners} className="mt-1 text-slate-300 hover:text-indigo-500 cursor-grab active:cursor-grabbing transition-colors"><GripVertical size={20} /></div>
        <p className="text-base font-medium text-slate-700 font-sans select-none leading-relaxed">{content}</p>
    </div>
  );
};

const ParsonsPlayer: React.FC<{ items: ParsonsItem[], onValidate: (success: boolean) => void }> = ({ items: initialItems, onValidate }) => {
  const [items, setItems] = useState<ParsonsItem[]>([...initialItems].sort(() => Math.random() - 0.5));
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const checkOrder = () => {
    const currentIds = items.map(i => i.id).join(',');
    const correctIds = initialItems.map(i => i.id).join(',');
    onValidate(currentIds === correctIds);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 mb-6">
          <p className="text-sm text-indigo-900 font-medium text-center">🔁 Rangez les éléments dans l'ordre logique.</p>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex-1 overflow-y-auto min-h-[200px] px-1 pb-4">
            {items.map((item) => <SortableItem key={item.id} id={item.id} content={item.content} />)}
          </div>
        </SortableContext>
      </DndContext>
      <button onClick={checkOrder} className="w-full py-4 mt-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2 hover:shadow-indigo-300">
          <CheckCircle2 size={20} /> Vérifier ma réponse
      </button>
    </div>
  );
};

const QuizPlayer: React.FC<{ quiz: QuizContent, onValidate: (success: boolean) => void }> = ({ quiz, onValidate }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleValidate = () => {
        if (!selectedOption) return;
        setSubmitted(true);
        const isCorrect = quiz.options.find(o => o.id === selectedOption)?.isCorrect || false;
        setTimeout(() => onValidate(isCorrect), 1200);
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

// --- FEEDBACK DRAWER ---

const FeedbackDrawer: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);

    const handleSubmit = () => {
        if (!comment.trim()) return;
        const newComment: Comment = {
            id: Date.now().toString(),
            author: 'Moi',
            avatar: 'https://picsum.photos/id/64/200/200', // Mock Current User
            text: comment,
            date: 'À l\'instant',
            rating: rating || 5
        };
        setComments([newComment, ...comments]);
        setComment('');
        setRating(0);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />
                    <motion.div 
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-50 h-[80%] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                <MessageSquare className="text-indigo-500" size={20} />
                                Avis & Questions
                            </h3>
                            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500"><XCircle size={20} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Input Zone */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="flex justify-center gap-2 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} onClick={() => setRating(star)} className="p-1 transition-transform hover:scale-110">
                                            <Star size={24} className={rating >= star ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} />
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Poser une question ou laisser un avis..." 
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    />
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={!comment.trim()}
                                        className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-4">
                                {comments.map((c) => (
                                    <motion.div key={c.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                                        <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full border border-slate-100" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-bold text-sm text-slate-800">{c.author}</h4>
                                                <span className="text-[10px] text-slate-400">{c.date}</span>
                                            </div>
                                            <div className="flex mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={10} className={i < (c.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                                                ))}
                                            </div>
                                            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-r-2xl rounded-bl-2xl">{c.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// --- MAIN ENGINE ---

interface LearningEngineProps {
    chapter: Chapter;
    isLoading?: boolean; 
    onStepComplete: (stepId: string) => void; // Added Prop
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
    const [steps, setSteps] = useState<LessonStep[]>(chapter.steps);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [stepSuccess, setStepSuccess] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    // Sync local state when chapter prop updates (from parent state lift)
    useEffect(() => {
        const firstActive = chapter.steps.findIndex(s => s.status === 'current' || s.status === 'locked');
        if (firstActive !== -1) setCurrentStepIndex(firstActive);
        else setCurrentStepIndex(chapter.steps.length - 1);
        setSteps(chapter.steps);
        setStepSuccess(false);
    }, [chapter]);

    if (isLoading) {
        return <LessonSkeleton />;
    }

    const currentStep = steps[currentStepIndex];

    const handleStepValidation = (success: boolean) => {
        if (success) {
            setStepSuccess(true);
            
            // NOTIFY PARENT IMMEDIATELY
            onStepComplete(currentStep.id);

            // Optimistic local update for UI fluidity
            const newSteps = [...steps];
            newSteps[currentStepIndex] = { ...newSteps[currentStepIndex], status: 'completed' };
            if (currentStepIndex < newSteps.length - 1) {
                if (newSteps[currentStepIndex + 1].status === 'locked') {
                    newSteps[currentStepIndex + 1] = { ...newSteps[currentStepIndex + 1], status: 'current' };
                }
            }
            setSteps(newSteps);
        }
    };

    const goToNextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
            setStepSuccess(false);
        } else {
            onCompleteChapter();
        }
    };

    const renderStepContent = () => {
        if (stepSuccess && currentStep.type !== 'theory') {
             return (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-emerald-200 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                        <div className="w-32 h-32 bg-gradient-to-tr from-emerald-400 to-teal-500 text-white rounded-[32px] flex items-center justify-center shadow-xl shadow-emerald-200 rotate-3">
                            <Trophy size={64} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Excellent !</h2>
                    <p className="text-slate-500 mb-10 text-lg">Tu maîtrises ce point à la perfection.</p>
                    <button onClick={goToNextStep} className="w-full max-w-xs py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-300 hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                        {currentStepIndex === steps.length - 1 ? 'Terminer le Chapitre' : 'Continuer'} <ArrowRight size={20} />
                    </button>
                </motion.div>
             );
        }

        switch (currentStep.type) {
            case 'theory':
                return (
                    <div className="h-full flex flex-col">
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                           <TheoryPlayer 
                                chapter={{...chapter, content: currentStep.content, title: currentStep.title} as any} 
                                onComplete={() => handleStepValidation(true)}
                                onBack={() => {}} 
                            />
                        </div>
                        {stepSuccess && (
                             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-4 bg-white/80 backdrop-blur border-t border-slate-100 z-50 absolute bottom-0 w-full">
                                <button onClick={goToNextStep} className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 hover:shadow-xl transition-all">
                                    Continuer <ArrowRight size={20} />
                                </button>
                             </motion.div>
                        )}
                    </div>
                );
            case 'checkpoint':
            case 'exercise':
                return (
                    <div className="h-full p-6 pt-2">
                         {currentStep.quiz ? (
                             <QuizPlayer quiz={currentStep.quiz} onValidate={handleStepValidation} />
                         ) : currentStep.parsons ? (
                             <ParsonsPlayer items={currentStep.parsons} onValidate={handleStepValidation} />
                         ) : <div>Error</div>}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#F8FAFC] relative">
            {/* Minimalist Glass Top Bar */}
            <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <button onClick={onExit} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-sm border border-slate-100 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                
                {/* Step Indicators */}
                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-sm">
                    {steps.map((step, idx) => {
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

                {/* Feedback Button */}
                <button onClick={() => setShowFeedback(true)} className="w-10 h-10 bg-white text-indigo-500 rounded-full flex items-center justify-center shadow-sm border border-slate-100 hover:bg-indigo-50 transition-colors">
                     <MessageSquare size={20} />
                </button>
            </div>

            {/* Main Content Card */}
            <div className="flex-1 px-4 pb-4 overflow-hidden relative">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white w-full h-full rounded-[40px] shadow-2xl shadow-indigo-500/5 overflow-hidden border border-white/50 relative"
                >
                    {renderStepContent()}
                </motion.div>
            </div>

            {/* Feedback Sheet */}
            <FeedbackDrawer isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
        </div>
    );
};

export default LearningEngine;
