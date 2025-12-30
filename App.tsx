
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
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('3eme'); // Default to 3eme for demo content
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User>(MOCK_USER); 
  
  // --- CORE STATE: SOURCE OF TRUTH (WITH PERSISTENCE) ---
  const [curriculum, setCurriculum] = useState(() => {
    try {
        const saved = localStorage.getItem('skoolup_curriculum_v2');
        return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(INITIAL_MODULES));
    } catch (e) {
        console.error("Failed to load curriculum", e);
        return INITIAL_MODULES;
    }
  });

  // Persist State Changes
  useEffect(() => {
    localStorage.setItem('skoolup_curriculum_v2', JSON.stringify(curriculum));
  }, [curriculum]);

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

  const handleStepComplete = (chapterId: string, stepId: string) => {
    if (!selectedSubjectId) return;

    setCurriculum((prev: any) => {
        // Deep clone for immutability
        const newCurriculum = JSON.parse(JSON.stringify(prev));
        const modules = newCurriculum[gradeLevel]?.[selectedSubjectId];
        
        if (!modules) return prev;

        // Traverse to find chapter
        for (const mod of modules) {
            for (const unit of mod.units) {
                const chapter = unit.chapters.find((c: any) => c.id === chapterId);
                if (chapter) {
                    const stepIndex = chapter.steps.findIndex((s: any) => s.id === stepId);
                    if (stepIndex !== -1) {
                        // 1. Complete Current
                        chapter.steps[stepIndex].status = 'completed';
                        
                        // 2. Unlock Next Step
                        if (stepIndex < chapter.steps.length - 1) {
                            chapter.steps[stepIndex + 1].status = 'current';
                        }
                    }
                    return newCurriculum;
                }
            }
        }
        return prev;
    });
  };

  const handleChapterComplete = (chapterId: string) => {
    if (!selectedSubjectId) return;

    // 1. Award XP Logic
    // We do this check against the previous state to avoid double rewarding on re-renders
    let xpAwarded = 0;
    
    setCurriculum((prev: any) => {
        const newCurriculum = JSON.parse(JSON.stringify(prev));
        const modules = newCurriculum[gradeLevel]?.[selectedSubjectId];
        if (!modules) return prev;

        // Flatten chapters for easy navigation
        let allChapters: any[] = [];
        modules.forEach((m: any) => m.units.forEach((u: any) => allChapters.push(...u.chapters)));

        const currentIndex = allChapters.findIndex((c: any) => c.id === chapterId);
        
        if (currentIndex !== -1) {
            const currentChapter = allChapters[currentIndex];
            
            // Check if actually new completion
            if (currentChapter.status !== 'completed') {
                currentChapter.status = 'completed';
                xpAwarded = currentChapter.xpReward || 100;

                // UNLOCK NEXT CHAPTER
                if (currentIndex < allChapters.length - 1) {
                    allChapters[currentIndex + 1].status = 'current';
                }
            }
        }
        return newCurriculum;
    });

    if (xpAwarded > 0) {
        updateXp(user.xp + xpAwarded);
    }

    setCurrentView('subject_map');
  };

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
        // CRITICAL: Pass the LIVE curriculum state
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
        
        // CRITICAL: FIND LIVE CHAPTER
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
