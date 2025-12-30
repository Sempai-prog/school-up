
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
  
  // State for Curriculum Progress - Initialized for FREE ROAM (Unlock All)
  const [curriculum, setCurriculum] = useState(() => {
    // Deep copy the initial modules
    const freeRoamData = JSON.parse(JSON.stringify(INITIAL_MODULES));
    
    // Iterate through the entire structure to unlock everything
    Object.keys(freeRoamData).forEach((grade) => {
      Object.keys(freeRoamData[grade]).forEach((subject) => {
        freeRoamData[grade][subject].forEach((mod: any) => {
          mod.units.forEach((unit: any) => {
            unit.chapters.forEach((chap: any) => {
              // In Free Roam, ensure nothing is locked. 
              // 'current' status implies accessible/clickable in our UI.
              if (chap.status === 'locked') {
                chap.status = 'current';
              }
            });
          });
        });
      });
    });
    
    return freeRoamData;
  });

  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [socialDefaultTab, setSocialDefaultTab] = useState<'social' | 'leaderboard'>('social');

  // Initial Load Effect
  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
        setIsAppLoading(false);
    }, 2500); // 2.5s splash screen
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

  // Synchronize Tab clicks with View state
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
    
    // Simulate loading delay for better UX
    setIsContentLoading(true);
    setCurrentView('subject_map');
    setActiveTab(Tab.LEARNING);
    
    setTimeout(() => {
        setIsContentLoading(false);
    }, 800);
  };

  const handleStartLesson = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    // Simulate loading delay
    setIsContentLoading(true);
    setCurrentView('lesson');
    setTimeout(() => {
        setIsContentLoading(false);
    }, 800);
  };

  // --- FREE ROAM PROGRESSION LOGIC ---
  const handleChapterComplete = (chapterId: string) => {
    if (!selectedSubjectId) return;

    // 1. Award XP (using selectedChapter state for simplicity as it matches the id)
    if (selectedChapter && selectedChapter.id === chapterId) {
       const reward = selectedChapter.xpReward || 50;
       updateXp(user.xp + reward);
    }

    // 2. Update Curriculum State (Mark completed only, NO UNLOCKING needed)
    setCurriculum(prev => {
        const newCurriculum = JSON.parse(JSON.stringify(prev));
        
        // Safety check
        if (!newCurriculum[gradeLevel] || !newCurriculum[gradeLevel][selectedSubjectId]) {
            return prev;
        }

        const currentGradeModules = newCurriculum[gradeLevel][selectedSubjectId];

        // Find and update the specific chapter
        for (const mod of currentGradeModules) {
            for (const unit of mod.units) {
                for (const chapter of unit.chapters) {
                    if (chapter.id === chapterId) {
                        chapter.status = 'completed';
                    }
                }
            }
        }

        return newCurriculum;
    });

    // 3. Navigate back
    setCurrentView('subject_map');
  };

  // --- NAVIGATION HANDLERS ---
  const handleNavigateToAgenda = () => {
      setCurrentView('agenda');
      setActiveTab(Tab.AGENDA);
  };

  const handleNavigateToLeaderboard = () => {
      setSocialDefaultTab('leaderboard');
      setCurrentView('social');
      setActiveTab(Tab.SOCIAL);
  };

  const handleNavigateToLibrary = () => {
      setCurrentView('library');
  };

  const handleNavigateToNotifications = () => {
      setCurrentView('notifications');
  };

  const handleNavigateToStore = () => {
      setCurrentView('store');
  };
  
  const handleNavigateToSettings = () => {
      setIsProfileOpen(false); 
      setCurrentView('settings');
  };

  // --- LOGIC ---
  const updateXp = (newXp: number) => {
      setUser(prev => ({ ...prev, xp: newXp }));
  };

  const handlePremiumUpgrade = () => {
    setUser(prev => ({ ...prev, isPremium: true }));
  };

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

      case 'agenda':
        return <AgendaScreen />;
      
      case 'library':
        return <LibraryScreen onBack={() => {
            setCurrentView('dashboard');
            setActiveTab(Tab.DASHBOARD);
        }} />;

      case 'notifications':
        return <NotificationScreen onBack={() => setCurrentView('dashboard')} />;

      case 'store':
        return <StoreScreen 
            userXp={user.xp} 
            onUpdateXp={updateXp} 
            onUpgrade={handlePremiumUpgrade}
            onBack={() => setCurrentView('dashboard')} 
        />;

      case 'settings':
        return <SettingsScreen 
            user={user} 
            onLogout={handleLogout} 
            onBack={() => setCurrentView('dashboard')} 
        />;

      case 'subject_map':
        const subject = CURRICULUM_SUBJECTS[gradeLevel].find(s => s.id === selectedSubjectId);
        const modules = selectedSubjectId ? curriculum[gradeLevel]?.[selectedSubjectId] : [];
        
        if (!subject || !modules) return <div>Sujet introuvable</div>;

        return (
            <SubjectMap 
                subject={subject}
                modules={modules}
                isLoading={isContentLoading} // Pass loading state
                onStartLesson={handleStartLesson}
                onBack={() => {
                    setCurrentView('dashboard');
                    setActiveTab(Tab.DASHBOARD);
                }}
            />
        );

      case 'lesson':
        if (!selectedChapter) {
            return <div>Erreur: Chapitre non sélectionné</div>;
        }
        return (
            <LearningScreen 
                chapter={selectedChapter}
                isLoading={isContentLoading} // Pass loading state
                onCompleteChapter={() => handleChapterComplete(selectedChapter.id)}
                onExit={() => {
                    setCurrentView('subject_map');
                }}
            />
        );

      case 'sis':
        return <SisScreen />;

      case 'social':
        return <SocialScreen defaultTab={socialDefaultTab} />;

      default:
        return <DashboardScreen 
            user={user}
            onOpenProfile={() => setIsProfileOpen(true)} 
            onOpenSubject={handleOpenSubject}
            currentGrade={gradeLevel}
            onGradeChange={setGradeLevel}
            onNavigateToAgenda={handleNavigateToAgenda}
            onNavigateToLeaderboard={handleNavigateToLeaderboard}
            onNavigateToLibrary={handleNavigateToLibrary}
            onNavigateToNotifications={handleNavigateToNotifications}
            onNavigateToStore={handleNavigateToStore}
        />;
    }
  };

  // --- RENDER APP ---

  if (isAppLoading) {
      return <AppSplash />;
  }

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200">
      
      {/* Background Ambience */}
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

      {/* Only show BottomNav if we are not in a deep drill-down view */}
      {currentView !== 'lesson' && currentView !== 'library' && currentView !== 'store' && currentView !== 'settings' && currentView !== 'notifications' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      <AnimatePresence>
          {isProfileOpen && (
              <ProfileModal 
                user={{...user, grade: gradeLevel}} // Use live user state
                onClose={() => setIsProfileOpen(false)} 
                onLogout={handleLogout}
              />
          )}
      </AnimatePresence>
    </div>
  );
};

export default App;
