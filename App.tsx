
import React, { useState, useEffect } from 'react';
import { Tab, GradeLevel, Chapter, User } from './types';
import { MOCK_USER } from './constants';
import { CURRICULUM_SUBJECTS, CURRICULUM_MODULES as INITIAL_MODULES } from './data/curriculum';
import DashboardScreen from './components/DashboardScreen';
import LearningScreen from './components/LearningEngine';
import SubjectMap from './components/SubjectMap';
import SisScreen from './components/SisScreen';
import SocialScreen from './components/SocialScreen';
import AgendaScreen from './components/AgendaScreen'; 
import LibraryScreen from './components/LibraryScreen';
import StoreScreen from './components/StoreScreen'; 
import NotificationScreen from './components/NotificationScreen'; 
import SettingsScreen from './components/SettingsScreen'; 
import BottomNav from './components/BottomNav';
import ProfileModal from './components/ProfileModal';
import AuthScreen from './components/AuthScreen';
import { AppSplash } from './components/Loaders';
import { AnimatePresence, motion } from 'framer-motion';

// Define View State Types
type ViewState = 'dashboard' | 'subject_map' | 'lesson' | 'sis' | 'social' | 'agenda' | 'library' | 'store' | 'notifications' | 'settings';

const App: React.FC = () => {
  // --- LOADING STATES ---
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('6eme'); 
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User>(MOCK_USER); 
  
  // --- CORE STATE: SOURCE OF TRUTH ---
  // We deep copy the initial constant so we can mutate status (locked -> current -> completed)
  const [curriculum, setCurriculum] = useState(() => {
    try {
        return JSON.parse(JSON.stringify(INITIAL_MODULES));
    } catch (e) {
        console.error("Failed to initialize curriculum", e);
        return INITIAL_MODULES;
    }
  });

  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null); // Store ID, not object
  const [socialDefaultTab, setSocialDefaultTab] = useState<'social' | 'leaderboard'>('social');

  // Initial Load Effect
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsAppLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (role: string) => {
    setUser(prev => ({ ...prev, role: role as 'student' | 'teacher' }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    setCurrentView('dashboard');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === Tab.DASHBOARD) setCurrentView('dashboard');
    if (tab === Tab.SIS) setCurrentView('sis');
    if (tab === Tab.SOCIAL) {
        setCurrentView('social');
        setSocialDefaultTab('social'); 
    }
    if (tab === Tab.AGENDA) setCurrentView('agenda');
    if (tab === Tab.LEARNING) {
      if (currentView !== 'subject_map' && currentView !== 'lesson') {
          setCurrentView('dashboard'); 
      }
    }
  };

  const handleOpenSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setIsContentLoading(true);
    setCurrentView('subject_map');
    setActiveTab(Tab.LEARNING);
    setTimeout(() => {
        setIsContentLoading(false);
    }, 800);
  };

  const handleStartLesson = (chapter: Chapter) => {
    setSelectedChapterId(chapter.id);
    setIsContentLoading(true);
    setCurrentView('lesson');
    setTimeout(() => {
        setIsContentLoading(false);
    }, 800);
  };

  // --- PROGRESSION ENGINE (THE BRAIN) ---

  /**
   * Updates the step status to 'completed' and unlocks the next step.
   * This runs in the global state to ensure data persistence.
   */
  const handleStepComplete = (chapterId: string, stepId: string) => {
    if (!selectedSubjectId) return;

    setCurriculum((prev: any) => {
        // Deep copy to ensure immutability
        const newCurriculum = JSON.parse(JSON.stringify(prev));
        
        // Fail-safe
        if (!newCurriculum[gradeLevel]?.[selectedSubjectId]) return prev;

        const modules = newCurriculum[gradeLevel][selectedSubjectId];

        // Traverse to find the chapter
        for (const mod of modules) {
            for (const unit of mod.units) {
                const chapter = unit.chapters.find((c: any) => c.id === chapterId);
                
                if (chapter) {
                    const stepIndex = chapter.steps.findIndex((s: any) => s.id === stepId);
                    
                    if (stepIndex !== -1) {
                        // 1. Mark current step as completed
                        chapter.steps[stepIndex].status = 'completed';
                        
                        // 2. Unlock next step if exists
                        if (stepIndex < chapter.steps.length - 1) {
                            if (chapter.steps[stepIndex + 1].status === 'locked') {
                                chapter.steps[stepIndex + 1].status = 'current';
                            }
                        }
                    }
                    return newCurriculum; // Return updated state
                }
            }
        }
        return newCurriculum;
    });
  };

  /**
   * Finalizes chapter completion, awards XP, and updates global status.
   */
  const handleChapterComplete = (chapterId: string) => {
    if (!selectedSubjectId) return;

    // We need to look up the LIVE state
    const modules = curriculum[gradeLevel]?.[selectedSubjectId];
    if (!modules) return;

    let liveChapter: Chapter | null = null;
    
    // Find Chapter in State to check logic
    for (const mod of modules) {
        for (const unit of mod.units) {
            const c = unit.chapters.find((ch: any) => ch.id === chapterId);
            if (c) { liveChapter = c; break; }
        }
        if (liveChapter) break;
    }

    if (!liveChapter) return;

    // Check strict completion: All steps must be completed
    const allStepsDone = liveChapter.steps.every((s: any) => s.status === 'completed');

    if (allStepsDone) {
        // 1. Award XP (Only if not already completed to avoid farming)
        if (liveChapter.status !== 'completed') {
            const xpReward = liveChapter.xpReward || 100;
            updateXp(user.xp + xpReward);
        }

        // 2. Mark Chapter Completed in State
        setCurriculum((prev: any) => {
            const newCurriculum = JSON.parse(JSON.stringify(prev));
            const currentGradeModules = newCurriculum[gradeLevel][selectedSubjectId];

            for (const mod of currentGradeModules) {
                for (const unit of mod.units) {
                    const chapter = unit.chapters.find((c: any) => c.id === chapterId);
                    if (chapter) {
                        chapter.status = 'completed';
                        
                        // Optional: Logic to unlock the NEXT chapter could go here
                        // e.g. find current chapter index, unlock index + 1
                    }
                }
            }
            return newCurriculum;
        });
    }

    // 3. Return to Map
    setCurrentView('subject_map');
  };

  // --- UTILS ---
  const updateXp = (newXp: number) => {
      setUser(prev => ({ ...prev, xp: newXp }));
  };

  const handlePremiumUpgrade = () => {
    setUser(prev => ({ ...prev, isPremium: true }));
  };

  // --- NAVIGATION HANDLERS ---
  const handleNavigateToAgenda = () => { setCurrentView('agenda'); setActiveTab(Tab.AGENDA); };
  const handleNavigateToLeaderboard = () => { setSocialDefaultTab('leaderboard'); setCurrentView('social'); setActiveTab(Tab.SOCIAL); };
  const handleNavigateToLibrary = () => { setCurrentView('library'); };
  const handleNavigateToNotifications = () => { setCurrentView('notifications'); };
  const handleNavigateToStore = () => { setCurrentView('store'); };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardScreen 
            user={user}
            onOpenProfile={() => setIsProfileOpen(true)} 
            onOpenSubject={handleOpenSubject}
            onNavigateToLearning={() => { 
                const defaultSub = CURRICULUM_SUBJECTS[gradeLevel][0]?.id;
                if(defaultSub) handleOpenSubject(defaultSub);
            }}
            onNavigateToAgenda={handleNavigateToAgenda}
            onNavigateToLeaderboard={handleNavigateToLeaderboard}
            onNavigateToLibrary={handleNavigateToLibrary}
            onNavigateToNotifications={handleNavigateToNotifications}
            onNavigateToStore={handleNavigateToStore}
            currentGrade={gradeLevel}
            onGradeChange={setGradeLevel}
          />
        );

      case 'agenda': return <AgendaScreen />;
      case 'library': return <LibraryScreen onBack={() => { setCurrentView('dashboard'); setActiveTab(Tab.DASHBOARD); }} />;
      case 'notifications': return <NotificationScreen onBack={() => setCurrentView('dashboard')} />;
      case 'store': return <StoreScreen userXp={user.xp} onUpdateXp={updateXp} onUpgrade={handlePremiumUpgrade} onBack={() => setCurrentView('dashboard')} />;
      case 'settings': return <SettingsScreen user={user} onLogout={handleLogout} onBack={() => setCurrentView('dashboard')} />;

      case 'subject_map':
        const subject = CURRICULUM_SUBJECTS[gradeLevel].find(s => s.id === selectedSubjectId);
        // CRITICAL: Pass the LIVE curriculum state, not static constants
        const modules = selectedSubjectId ? curriculum[gradeLevel]?.[selectedSubjectId] : [];
        if (!subject || !modules) return <div>Sujet introuvable</div>;
        return (
            <SubjectMap 
                subject={subject}
                modules={modules}
                isLoading={isContentLoading}
                onStartLesson={handleStartLesson}
                onBack={() => { setCurrentView('dashboard'); setActiveTab(Tab.DASHBOARD); }}
            />
        );

      case 'lesson':
        if (!selectedChapterId) return <div>Erreur</div>;
        
        // CRITICAL: We must find the LIVE chapter object from the state
        // We cannot rely on a stale object.
        let liveChapter: Chapter | null = null;
        if (selectedSubjectId) {
             const mods = curriculum[gradeLevel]?.[selectedSubjectId];
             if (mods) {
                 for (const m of mods) {
                     for (const u of m.units) {
                         const c = u.chapters.find((ch: any) => ch.id === selectedChapterId);
                         if (c) { liveChapter = c; break; }
                     }
                     if (liveChapter) break;
                 }
             }
        }

        if (!liveChapter) return <div>Chapitre introuvable</div>;

        return (
            <LearningScreen 
                chapter={liveChapter}
                isLoading={isContentLoading} 
                onStepComplete={(stepId) => handleStepComplete(liveChapter!.id, stepId)}
                onCompleteChapter={() => handleChapterComplete(liveChapter!.id)}
                onExit={() => setCurrentView('subject_map')}
            />
        );

      case 'sis': return <SisScreen />;
      case 'social': return <SocialScreen defaultTab={socialDefaultTab} />;

      default: return <DashboardScreen user={user} onOpenProfile={() => setIsProfileOpen(true)} onOpenSubject={handleOpenSubject} currentGrade={gradeLevel} onGradeChange={setGradeLevel} />;
    }
  };

  if (isAppLoading) return <AppSplash />;
  if (!isAuthenticated) return <AuthScreen onLogin={handleLogin} />;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden max-w-md mx-auto">
         <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-200/20 rounded-full blur-[80px]" />
         <div className="absolute bottom-[20%] left-[-20%] w-80 h-80 bg-blue-200/20 rounded-full blur-[80px]" />
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar relative z-10 pt-safe">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {['dashboard', 'sis', 'social', 'agenda'].includes(currentView) && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      <AnimatePresence>
          {isProfileOpen && <ProfileModal user={{...user, grade: gradeLevel}} onClose={() => setIsProfileOpen(false)} onLogout={handleLogout} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
