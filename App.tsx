
import React, { useState, useEffect } from 'react';
import { Tab, GradeLevel, Chapter, User, CurriculumState } from './types';
import { MOCK_USER } from './constants';
import { CURRICULUM_SUBJECTS, CURRICULUM_MODULES as INITIAL_MODULES } from './data/curriculum';
import DashboardScreen from './components/DashboardScreen';
import LearningScreen from './components/LearningEngine';
import SubjectMap from './components/SubjectMap';
import SubjectPortal from './components/SubjectPortal';
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

// Define View State Types - Added 'subject_portal'
type ViewState = 'dashboard' | 'subject_portal' | 'subject_map' | 'lesson' | 'sis' | 'social' | 'agenda' | 'library' | 'store' | 'notifications' | 'settings';

const App: React.FC = () => {
  // --- LOADING STATES ---
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);

  // --- USER SESSION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('tle'); // Default to Terminale for demo 
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User>(MOCK_USER); 

  // --- NAVIGATION STATE ---
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null); 
  const [socialDefaultTab, setSocialDefaultTab] = useState<'social' | 'leaderboard'>('social');

  // --- CORE CURRICULUM STATE (THE BRAIN) ---
  const [curriculum, setCurriculum] = useState<CurriculumState>(() => {
    try {
        const saved = localStorage.getItem('skoolup_curriculum_v4'); // Incremented version
        if (saved) {
            return JSON.parse(saved);
        }
        return JSON.parse(JSON.stringify(INITIAL_MODULES)); 
    } catch (e) {
        console.error("Failed to load curriculum", e);
        return JSON.parse(JSON.stringify(INITIAL_MODULES));
    }
  });

  // --- PERSISTENCE EFFECT ---
  useEffect(() => {
    localStorage.setItem('skoolup_curriculum_v4', JSON.stringify(curriculum));
  }, [curriculum]);

  // Initial Splash Timer
  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  // --- AUTH HANDLERS ---
  const handleLogin = (role: string) => {
    setUser(prev => ({ ...prev, role: role as 'student' | 'teacher' }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    setCurrentView('dashboard');
  };

  // --- NAVIGATION HANDLERS ---
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === Tab.DASHBOARD) setCurrentView('dashboard');
    if (tab === Tab.SIS) setCurrentView('sis');
    if (tab === Tab.SOCIAL) {
        setCurrentView('social');
        setSocialDefaultTab('social'); 
    }
    if (tab === Tab.AGENDA) setCurrentView('agenda');
    if (tab === Tab.STORE) setCurrentView('store');
    if (tab === Tab.NOTIFICATIONS) setCurrentView('notifications');
    if (tab === Tab.LEARNING) {
      if (currentView !== 'subject_map' && currentView !== 'lesson' && currentView !== 'subject_portal') {
          setCurrentView('dashboard'); 
      }
    }
  };

  // 1. Dashboard -> Portal
  const handleOpenSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setIsContentLoading(true);
    setCurrentView('subject_portal'); // Now goes to Portal first
    setActiveTab(Tab.LEARNING);
    setTimeout(() => setIsContentLoading(false), 400);
  };

  // 2. Portal -> Map
  const handleEnterMap = () => {
      setIsContentLoading(true);
      setCurrentView('subject_map');
      setTimeout(() => setIsContentLoading(false), 400);
  };

  // 3. Map -> Lesson
  const handleStartLesson = (chapter: Chapter) => {
    setSelectedChapterId(chapter.id);
    setIsContentLoading(true);
    setCurrentView('lesson');
    setTimeout(() => setIsContentLoading(false), 600);
  };

  // --- THE BRAIN: PROGRESSION LOGIC ---
  const handleStepSuccess = (chapterId: string, stepId: string) => {
    if (!selectedSubjectId) return;

    setCurriculum((prev) => {
        const nextState = JSON.parse(JSON.stringify(prev));
        const subjectModules = nextState[gradeLevel]?.[selectedSubjectId];

        if (!subjectModules) return prev;

        let targetChapter: any = null;
        let allChaptersFlat: any[] = [];

        subjectModules.forEach((mod: any) => {
            mod.units.forEach((unit: any) => {
                unit.chapters.forEach((chap: any) => {
                    allChaptersFlat.push(chap);
                    if (chap.id === chapterId) {
                        targetChapter = chap;
                    }
                });
            });
        });

        if (!targetChapter) return prev;

        const stepIndex = targetChapter.steps.findIndex((s: any) => s.id === stepId);
        if (stepIndex === -1) return prev;

        targetChapter.steps[stepIndex].status = 'completed';

        if (stepIndex < targetChapter.steps.length - 1) {
            targetChapter.steps[stepIndex + 1].status = 'current';
        } else {
            if (targetChapter.status !== 'completed') {
                targetChapter.status = 'completed';
            }

            const currentChapIndex = allChaptersFlat.findIndex((c: any) => c.id === chapterId);
            if (currentChapIndex !== -1 && currentChapIndex < allChaptersFlat.length - 1) {
                const nextChapter = allChaptersFlat[currentChapIndex + 1];
                if (nextChapter.status === 'locked') {
                    nextChapter.status = 'current';
                    if (nextChapter.steps.length > 0) {
                        nextChapter.steps[0].status = 'current';
                    }
                }
            }
        }

        return nextState;
    });

    setUser(prev => ({ ...prev, xp: prev.xp + 50 }));
  };


  // --- VIEW RENDERER ---
  const renderContent = () => {
    // Shared Subject Data Fetching
    const subject = selectedSubjectId ? CURRICULUM_SUBJECTS[gradeLevel].find(s => s.id === selectedSubjectId) : null;
    const modules = selectedSubjectId ? curriculum[gradeLevel]?.[selectedSubjectId] : [];

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
            onNavigateToAgenda={() => { setCurrentView('agenda'); setActiveTab(Tab.AGENDA); }}
            onNavigateToLeaderboard={() => { setSocialDefaultTab('leaderboard'); setCurrentView('social'); setActiveTab(Tab.SOCIAL); }}
            onNavigateToLibrary={() => setCurrentView('library')}
            onNavigateToNotifications={() => { setCurrentView('notifications'); setActiveTab(Tab.NOTIFICATIONS); }}
            onNavigateToStore={() => { setCurrentView('store'); setActiveTab(Tab.STORE); }}
            currentGrade={gradeLevel}
            onGradeChange={(g) => { setGradeLevel(g); /* Reset navigation if needed */ }}
          />
        );

      case 'subject_portal':
        if (!subject || !modules) return <div>Erreur de chargement</div>;
        return (
            <SubjectPortal 
                subject={subject}
                modules={modules}
                onBack={() => { setCurrentView('dashboard'); setActiveTab(Tab.DASHBOARD); }}
                onStart={handleEnterMap}
            />
        );

      case 'subject_map':
        if (!subject || !modules) return <div>Erreur de chargement du sujet</div>;
        return (
            <SubjectMap 
                subject={subject}
                modules={modules}
                isLoading={isContentLoading}
                onStartLesson={handleStartLesson}
                onBack={() => setCurrentView('subject_portal')}
            />
        );

      case 'lesson':
        let liveChapter: Chapter | null = null;
        if (selectedSubjectId && selectedChapterId) {
             const mods = curriculum[gradeLevel]?.[selectedSubjectId] || [];
             for (const m of mods) {
                 for (const u of m.units) {
                     const c = u.chapters.find((ch: any) => ch.id === selectedChapterId);
                     if (c) { liveChapter = c; break; }
                 }
                 if (liveChapter) break;
             }
        }

        if (!liveChapter) return <div>Chapitre introuvable</div>;

        return (
            <LearningScreen 
                chapter={liveChapter}
                isLoading={isContentLoading} 
                onStepComplete={(stepId) => handleStepSuccess(liveChapter!.id, stepId)}
                onCompleteChapter={() => setCurrentView('subject_map')}
                onExit={() => setCurrentView('subject_map')}
            />
        );

      case 'agenda': return <AgendaScreen />;
      case 'library': return <LibraryScreen onBack={() => { setCurrentView('dashboard'); setActiveTab(Tab.DASHBOARD); }} />;
      case 'notifications': return <NotificationScreen onBack={() => { setCurrentView('dashboard'); setActiveTab(Tab.DASHBOARD); }} />;
      case 'store': return <StoreScreen userXp={user.xp} onUpdateXp={(xp) => setUser({...user, xp})} onBack={() => { setCurrentView('dashboard'); setActiveTab(Tab.DASHBOARD); }} />;
      case 'settings': return <SettingsScreen user={user} onLogout={handleLogout} onBack={() => setCurrentView('dashboard')} />;
      case 'sis': return <SisScreen />;
      case 'social': return <SocialScreen defaultTab={socialDefaultTab} />;

      default: return null;
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

      {['dashboard', 'sis', 'social', 'agenda', 'store', 'notifications'].includes(currentView) && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      <AnimatePresence>
          {isProfileOpen && <ProfileModal user={{...user, grade: gradeLevel}} onClose={() => setIsProfileOpen(false)} onLogout={handleLogout} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
