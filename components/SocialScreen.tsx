
import React, { useState, useEffect } from 'react';
import { MessageCircle, Bell, Search, User, Image as ImageIcon, Heart, Plus, Trophy, Medal, Crown, MessageSquare, ThumbsUp, PenTool, Share2 } from 'lucide-react';
import { FEED_POSTS, MOCK_THREADS, MOCK_USER } from '../constants';
import { Thread, ForumPost, BlogPost } from '../types';
import ChatInterface from './ChatInterface';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialScreenProps {
  defaultTab?: 'social' | 'forum' | 'blog' | 'leaderboard';
}

const MOCK_FORUM_POSTS: ForumPost[] = [
    { id: 'f1', author: 'Paul B.', avatar: 'https://i.pravatar.cc/150?u=paul', subject: 'Mathématiques', question: 'Qui peut m\'expliquer le théorème de Pythagore avec un exemple simple ?', likes: 12, repliesCount: 5, timestamp: '10 min', solved: false },
    { id: 'f2', author: 'Sarah L.', avatar: 'https://i.pravatar.cc/150?u=sarah', subject: 'SVT', question: 'C\'est quoi la différence entre mitose et méiose ? Je confonds les deux.', likes: 8, repliesCount: 3, timestamp: '1h', solved: true },
    { id: 'f3', author: 'David O.', avatar: 'https://i.pravatar.cc/150?u=david', subject: 'Physique', question: 'Besoin d\'aide pour l\'exercice 3 sur les forces.', likes: 2, repliesCount: 0, timestamp: '3h', solved: false },
];

const MOCK_BLOG_POSTS: BlogPost[] = [
    { id: 'b1', title: 'Victoire de l\'équipe de Basket !', author: 'Club Sport', snippet: 'Nos Lions ont remporté la finale inter-lycées avec un score écrasant de 56-40. Bravo à tous !', image: 'https://picsum.photos/seed/sport/600/400', category: 'Sport', date: 'Hier', likes: 145 },
    { id: 'b2', title: 'Inscriptions Club Théâtre', author: 'Mme Bamba', snippet: 'Les auditions pour la pièce de fin d\'année commencent ce mercredi. Venez nombreux en salle polyvalente.', image: 'https://picsum.photos/seed/theater/600/400', category: 'Culture', date: 'Il y a 2j', likes: 89 },
];

const SocialScreen: React.FC<SocialScreenProps> = ({ defaultTab = 'social' }) => {
  const [mainTab, setMainTab] = useState<'social' | 'forum' | 'blog' | 'leaderboard'>(defaultTab);
  
  // Inner Tab state for Social (Chat)
  const [socialSubTab, setSocialSubTab] = useState<'feed' | 'messages'>('feed');
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [activeForumFilter, setActiveForumFilter] = useState('Tout');

  // Sync prop change
  useEffect(() => {
    if (defaultTab) setMainTab(defaultTab);
  }, [defaultTab]);

  if (selectedThread) {
      return <ChatInterface thread={selectedThread} onBack={() => setSelectedThread(null)} />;
  }

  // Mock Stories for Chat tab
  const stories = [
      { id: 'me', name: 'Moi', img: MOCK_USER.avatarUrl, isAdd: true },
      { id: '1', name: 'M. Touré', img: 'https://ui-avatars.com/api/?name=M+Toure&background=0D8ABC&color=fff', hasStory: true },
      { id: '2', name: 'Admin', img: 'https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff', hasStory: true },
      { id: '3', name: 'Alice', img: 'https://i.pravatar.cc/150?u=alice', hasStory: false },
  ];

  // Mock Leaderboard Data
  const LEADERBOARD_DATA = [
      { id: 'top1', name: 'Awa Diop', xp: 15200, avatar: 'https://i.pravatar.cc/150?u=awa', rank: 1, streak: 20 },
      { id: 'top2', name: 'Jean K.', xp: 14800, avatar: 'https://i.pravatar.cc/150?u=jean', rank: 2, streak: 18 },
      { id: 'top3', name: 'Marie S.', xp: 14500, avatar: 'https://i.pravatar.cc/150?u=marie', rank: 3, streak: 15 },
      { id: '4', name: 'Paul B.', xp: 13900, avatar: 'https://i.pravatar.cc/150?u=paul', rank: 4 },
      { id: '5', name: 'Sarah L.', xp: 13500, avatar: 'https://i.pravatar.cc/150?u=sarah', rank: 5 },
      { id: 'u1', name: 'Kouamé Junior', xp: 12450, avatar: MOCK_USER.avatarUrl, rank: 14, isMe: true }, // Current User
      { id: '7', name: 'David O.', xp: 11000, avatar: 'https://i.pravatar.cc/150?u=david', rank: 15 },
  ];

  const top3 = LEADERBOARD_DATA.slice(0, 3);
  const restOfList = LEADERBOARD_DATA.slice(3);

  const getSubjectColor = (subject: string) => {
      switch(subject) {
          case 'Mathématiques': return 'bg-blue-100 text-blue-700';
          case 'SVT': return 'bg-emerald-100 text-emerald-700';
          case 'Physique': return 'bg-indigo-100 text-indigo-700';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  return (
    <div className="pb-24 h-full flex flex-col bg-[#F8FAFC]">
      {/* Header & Tabs */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-100">
          <div className="px-6 pt-6 pb-2">
              <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-slate-900">Campus</h1>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm hover:bg-slate-50">
                        <Search size={20} />
                    </button>
                    <button className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-slate-300 hover:scale-105 transition-transform">
                        <Plus size={20} />
                    </button>
                  </div>
              </div>

              {/* Scrollable Main Tabs */}
              <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
                 {[
                     { id: 'social', label: 'Discussions' },
                     { id: 'forum', label: 'Forum' },
                     { id: 'blog', label: 'Blog' },
                     { id: 'leaderboard', label: 'Classement' },
                 ].map((tab) => (
                     <button
                        key={tab.id}
                        onClick={() => setMainTab(tab.id as any)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                            mainTab === tab.id 
                            ? 'bg-slate-900 text-white shadow-md shadow-slate-300' 
                            : 'bg-white text-slate-500 border border-slate-200'
                        }`}
                     >
                         {tab.label}
                     </button>
                 ))}
              </div>
          </div>
           
           {/* Sub-tabs for Social only */}
           {mainTab === 'social' && (
                <div className="px-6 flex gap-6 border-t border-slate-100 mt-2">
                    <button 
                        onClick={() => setSocialSubTab('feed')}
                        className={`py-3 text-sm font-bold transition-colors relative ${socialSubTab === 'feed' ? 'text-slate-900' : 'text-slate-400'}`}
                    >
                        Fil d'actualité
                        {socialSubTab === 'feed' && <motion.div layoutId="socialSubTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />}
                    </button>
                    <button 
                        onClick={() => setSocialSubTab('messages')}
                        className={`py-3 text-sm font-bold transition-colors relative ${socialSubTab === 'messages' ? 'text-slate-900' : 'text-slate-400'}`}
                    >
                        Messages
                        {socialSubTab === 'messages' && <motion.div layoutId="socialSubTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />}
                    </button>
                </div>
           )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
            {/* --- SOCIAL TAB --- */}
            {mainTab === 'social' && (
                <motion.div
                    key="social-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {socialSubTab === 'feed' ? (
                        <motion.div 
                            key="feed"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="p-6 space-y-8"
                        >
                            {/* Stories Row */}
                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                                {stories.map((story) => (
                                    <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
                                        <div className={`w-16 h-16 rounded-full p-[3px] ${story.hasStory ? 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600' : 'bg-slate-100'}`}>
                                            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white relative">
                                                <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
                                                {story.isAdd && (
                                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                                                        <Plus size={24} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-600">{story.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Feed Posts */}
                            <div className="space-y-6">
                                {FEED_POSTS.map(post => (
                                    <div key={post.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-500 border border-slate-100 ${post.role === 'Admin' ? 'bg-red-50' : 'bg-blue-50'}`}>
                                                <User size={20} className={post.role === 'Admin' ? 'text-red-500' : 'text-blue-500'} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-sm text-slate-800">{post.author}</h4>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <span className="text-xs text-slate-400">{post.date}</span>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${post.role === 'Admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {post.role}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                            {post.content}
                                        </p>
                                        
                                        {post.imageUrl && (
                                            <div className="mb-5 rounded-2xl overflow-hidden shadow-sm">
                                                <img src={post.imageUrl} alt="Post content" className="w-full h-48 object-cover" />
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                                            <button className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full text-slate-500 text-xs font-bold hover:bg-pink-50 hover:text-pink-500 transition-colors">
                                                <Heart size={16} />
                                                {post.likes}
                                            </button>
                                            <button className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full text-slate-500 text-xs font-bold hover:bg-blue-50 hover:text-blue-500 transition-colors">
                                                <MessageCircle size={16} />
                                                Répondre
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="messages"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-4 space-y-2"
                        >
                            {MOCK_THREADS.map((thread) => (
                                <motion.button 
                                    key={thread.id} 
                                    onClick={() => setSelectedThread(thread)}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full p-4 flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="relative">
                                        <img src={thread.avatarUrl} alt={thread.contactName} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" />
                                        {thread.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-bold text-slate-900 text-sm">{thread.contactName}</h4>
                                            <span className={`text-xs font-bold ${thread.unreadCount > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                                                {thread.lastMessageTime}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate pr-4 leading-tight ${thread.unreadCount > 0 ? 'text-slate-800 font-semibold' : 'text-slate-500'}`}>
                                            {thread.lastMessage}
                                        </p>
                                    </div>
                                    {thread.unreadCount > 0 && (
                                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-lg shadow-blue-200">
                                            {thread.unreadCount}
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* --- FORUM TAB --- */}
            {mainTab === 'forum' && (
                <motion.div
                    key="forum"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 relative min-h-full"
                >
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Entraide Scolaire</h2>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {['Tout', 'Maths', 'SVT', 'Physique', 'Anglais'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveForumFilter(filter)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                        activeForumFilter === filter 
                                        ? 'bg-slate-900 text-white' 
                                        : 'bg-white border border-slate-200 text-slate-500'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 pb-20">
                        {MOCK_FORUM_POSTS.map((post) => (
                            <div key={post.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${getSubjectColor(post.subject)}`}>
                                        {post.subject}
                                    </span>
                                    {post.solved && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                            <Crown size={12} /> Résolu
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-bold text-slate-800 text-sm mb-3 leading-snug">{post.question}</h3>
                                
                                <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-2">
                                    <div className="flex items-center gap-2">
                                        <img src={post.avatar} alt={post.author} className="w-6 h-6 rounded-full" />
                                        <span className="text-xs text-slate-500 font-medium">{post.author}</span>
                                        <span className="text-[10px] text-slate-300">• {post.timestamp}</span>
                                    </div>
                                    <div className="flex gap-4 text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Heart size={14} className={post.likes > 5 ? "text-pink-500 fill-pink-500" : ""} />
                                            <span className="text-xs font-bold">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageSquare size={14} />
                                            <span className="text-xs font-bold">{post.repliesCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAB */}
                    <button className="fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                        <Plus size={28} />
                    </button>
                </motion.div>
            )}

            {/* --- BLOG TAB --- */}
            {mainTab === 'blog' && (
                <motion.div
                    key="blog"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 space-y-6 pb-24"
                >
                    {MOCK_BLOG_POSTS.map((post) => (
                        <motion.div 
                            key={post.id}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm relative group"
                        >
                            <div className="h-48 relative overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">{post.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{post.snippet}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400">{post.date} • {post.author}</span>
                                    <div className="flex gap-3">
                                         <button className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-pink-500 hover:bg-pink-50 transition-colors">
                                            <Heart size={18} />
                                         </button>
                                         <button className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                                            <Share2 size={18} />
                                         </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* --- LEADERBOARD TAB --- */}
            {mainTab === 'leaderboard' && (
                <motion.div 
                    key="leaderboard"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="p-6 relative min-h-full"
                >
                    {/* Podium Section */}
                    <div className="flex justify-center items-end gap-4 mb-10 pt-4">
                        {/* Rank 2 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative">
                                <img src={top3[1].avatar} className="w-14 h-14 rounded-full border-2 border-slate-200" alt="Rank 2" />
                                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                    <span className="bg-slate-300 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">2</span>
                                </div>
                            </div>
                            <div className="w-20 h-24 bg-gradient-to-b from-slate-200 to-slate-300 rounded-t-2xl shadow-inner flex flex-col items-center justify-start pt-2">
                                <span className="font-bold text-slate-600 text-xs">{top3[1].name.split(' ')[0]}</span>
                                <span className="text-[10px] text-slate-500 font-bold">{top3[1].xp} XP</span>
                            </div>
                        </div>

                        {/* Rank 1 */}
                        <div className="flex flex-col items-center gap-2 z-10">
                            <div className="relative">
                                <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400 fill-yellow-400 animate-bounce" size={20} />
                                <img src={top3[0].avatar} className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-lg shadow-yellow-200" alt="Rank 1" />
                                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">1</span>
                                </div>
                            </div>
                            <div className="w-24 h-32 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-t-2xl shadow-lg flex flex-col items-center justify-start pt-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 blur-xl"></div>
                                <span className="font-bold text-yellow-900 relative">{top3[0].name.split(' ')[0]}</span>
                                <span className="text-xs text-yellow-800 font-bold relative">{top3[0].xp} XP</span>
                            </div>
                        </div>

                        {/* Rank 3 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative">
                                <img src={top3[2].avatar} className="w-14 h-14 rounded-full border-2 border-orange-200" alt="Rank 3" />
                                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                    <span className="bg-orange-300 text-orange-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">3</span>
                                </div>
                            </div>
                            <div className="w-20 h-20 bg-gradient-to-b from-orange-200 to-orange-400 rounded-t-2xl shadow-inner flex flex-col items-center justify-start pt-2">
                                <span className="font-bold text-orange-800 text-xs">{top3[2].name.split(' ')[0]}</span>
                                <span className="text-[10px] text-orange-700 font-bold">{top3[2].xp} XP</span>
                            </div>
                        </div>
                    </div>

                    {/* The List */}
                    <div className="space-y-3 pb-20">
                        {restOfList.map((student) => (
                            <motion.div 
                                key={student.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-center gap-4 p-3 rounded-2xl border ${student.isMe ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100'} shadow-sm`}
                            >
                                <span className="font-bold text-slate-400 w-6 text-center">{student.rank}</span>
                                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <h4 className={`font-bold text-sm ${student.isMe ? 'text-indigo-900' : 'text-slate-800'}`}>
                                        {student.name} {student.isMe && '(Moi)'}
                                    </h4>
                                    <p className="text-xs text-slate-500">{student.xp.toLocaleString()} XP</p>
                                </div>
                                {student.rank <= 5 && <Medal size={16} className="text-slate-300" />}
                            </motion.div>
                        ))}
                    </div>

                    {/* Sticky My Rank */}
                    <motion.div 
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        className="fixed bottom-20 left-4 right-4 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[calc(100%-2rem)] mx-auto sm:max-w-sm z-30"
                    >
                         <span className="font-bold text-white/50 w-6 text-center">14</span>
                         <img src={MOCK_USER.avatarUrl} alt="Me" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
                         <div className="flex-1">
                             <h4 className="font-bold text-sm">Vous êtes 14ème</h4>
                             <p className="text-xs text-slate-400">Encore 500 XP pour dépasser David.</p>
                         </div>
                         <Trophy size={20} className="text-yellow-400" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialScreen;
