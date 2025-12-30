
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { School, ArrowRight, Loader2, Lock, UserCircle, Sparkles, GraduationCap, CheckCircle2, XCircle } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (role: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Teacher Form State
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('Maths');

  // Test Modal State
  const [showTest, setShowTest] = useState(false);
  const [testAnswer, setTestAnswer] = useState<string | null>(null);
  const [testFeedback, setTestFeedback] = useState<'success' | 'failure' | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 1500);
  };

  const handleTeacherTest = () => {
      if (!testAnswer) return;

      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          if (testAnswer === 'B') {
              setTestFeedback('success');
              setTimeout(() => {
                  onLogin('teacher');
              }, 1500);
          } else {
              setTestFeedback('failure');
          }
      }, 1000);
  };

  return (
    <div className="min-h-full h-full bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Abstract Animated Background */}
        <motion.div 
            animate={{ 
                x: [0, 100, 0], 
                y: [0, -50, 0],
                scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[100px]"
        />
        <motion.div 
            animate={{ 
                x: [0, -100, 0], 
                y: [0, 100, 0],
                scale: [1, 1.5, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[100px]"
        />

        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full max-w-sm bg-white/60 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-indigo-500/10 overflow-hidden border border-white/50 z-10"
        >
            <div className="p-8 text-center relative">
                <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-lg shadow-indigo-500/30 text-white relative group">
                    <School size={32} />
                    <Sparkles className="absolute -top-2 -right-2 text-yellow-300 w-5 h-5 animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-1">
                    SkoolUP
                </h1>
                <p className="text-slate-500 font-medium text-sm">Portail Éducatif Unifié</p>
            </div>

            <div className="px-8 pb-8">
                {/* Role Switcher */}
                <div className="bg-white/50 p-1 rounded-2xl flex mb-6 border border-white/50 relative">
                    <motion.div 
                        className="absolute top-1 bottom-1 bg-white rounded-xl shadow-sm"
                        layoutId="role-pill"
                        initial={false}
                        animate={{ 
                            left: role === 'student' ? '4px' : '50%',
                            width: 'calc(50% - 4px)'
                        }}
                    />
                    {['student', 'teacher'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r as any)}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-xl relative z-10 transition-colors ${
                                role === r 
                                ? 'text-indigo-600' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {r === 'student' ? 'Élève' : 'Enseignant'}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {role === 'student' ? (
                        <motion.form 
                            key="student-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleLogin} 
                            className="space-y-4"
                        >
                            <div className="group">
                                <div className="relative">
                                    <UserCircle className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input 
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Matricule"
                                        className="w-full bg-white/70 border border-white/50 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all font-medium"
                                    />
                                </div>
                            </div>
                            
                            <div className="group">
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                    <input 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Mot de passe"
                                        className="w-full bg-white/70 border border-white/50 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading || !username || !password}
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 transition-all mt-4"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <>Connexion <ArrowRight size={18} /></>}
                            </motion.button>
                        </motion.form>
                    ) : (
                         <motion.div 
                            key="teacher-form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <div className="space-y-3">
                                <input 
                                    type="text"
                                    value={teacherName}
                                    onChange={(e) => setTeacherName(e.target.value)}
                                    placeholder="Nom Complet"
                                    className="w-full bg-white/70 border border-white/50 rounded-2xl py-3.5 px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                                />
                                <input 
                                    type="email"
                                    value={teacherEmail}
                                    onChange={(e) => setTeacherEmail(e.target.value)}
                                    placeholder="Email Professionnel"
                                    className="w-full bg-white/70 border border-white/50 rounded-2xl py-3.5 px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                                />
                                <select 
                                    value={teacherSubject}
                                    onChange={(e) => setTeacherSubject(e.target.value)}
                                    className="w-full bg-white/70 border border-white/50 rounded-2xl py-3.5 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                                >
                                    <option value="Maths">Mathématiques</option>
                                    <option value="SVT">SVT</option>
                                    <option value="Physique">Physique-Chimie</option>
                                    <option value="Anglais">Anglais</option>
                                </select>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowTest(true)}
                                disabled={!teacherName || !teacherEmail}
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 transition-all mt-4"
                            >
                                <GraduationCap size={20} /> Passer le test de validation
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>

        {/* Teacher Validation Test Modal */}
        <AnimatePresence>
            {showTest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => !testFeedback && setShowTest(false)}
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-3xl w-full max-w-sm p-6 relative z-10 shadow-2xl"
                    >
                         {testFeedback ? (
                             <div className="text-center py-8">
                                 {testFeedback === 'success' ? (
                                     <>
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Validation Réussie</h3>
                                        <p className="text-slate-500 mt-2">Bienvenue dans l'équipe enseignante.</p>
                                     </>
                                 ) : (
                                     <>
                                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <XCircle size={40} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Inscription Refusée</h3>
                                        <p className="text-slate-500 mt-2">La réponse était incorrecte. Veuillez réessayer plus tard.</p>
                                        <button onClick={() => { setShowTest(false); setTestFeedback(null); setTestAnswer(null); }} className="mt-6 font-bold text-indigo-600">Fermer</button>
                                     </>
                                 )}
                             </div>
                         ) : (
                             <>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Test de Compétence</h3>
                                <p className="text-sm text-slate-500 mb-6">Pédagogie : Quelle est la première étape pour gérer une classe agitée ?</p>
                                
                                <div className="space-y-3 mb-6">
                                    {[
                                        { id: 'A', text: 'Punir tout le monde immédiatement' },
                                        { id: 'B', text: 'Établir le calme et le contact visuel' },
                                        { id: 'C', text: 'Ignorer le bruit et continuer le cours' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setTestAnswer(opt.id)}
                                            className={`w-full p-3 rounded-xl border text-left text-sm font-medium transition-all ${testAnswer === opt.id ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            <span className="font-bold mr-2">{opt.id})</span> {opt.text}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={handleTeacherTest}
                                    disabled={!testAnswer || isLoading}
                                    className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : 'Valider ma réponse'}
                                </button>
                             </>
                         )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default AuthScreen;
