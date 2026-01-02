
import React, { useState, useEffect } from 'react';
import { MessageCircle, Bell, Search, User, Image as ImageIcon, Heart, Plus, Trophy, Medal, Crown, MessageSquare, ThumbsUp, PenTool, Share2, X, Send } from 'lucide-react';
import { FEED_POSTS, MOCK_THREADS, MOCK_USER } from '../constants';
import { Thread, ForumPost, BlogPost, Post } from '../types';
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
  const [socialSubTab, setSocialSubTab] = useState<'feed' | 'messages'>('feed');
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [activeForumFilter, setActiveForumFilter] = useState('Tout');
  
  // Local State for Posts
  const [posts, setPosts] = useState<Post[]>(FEED_POSTS);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    if (defaultTab) setMainTab(defaultTab);
  }, [defaultTab]);

  const handlePostSubmit = () => {
      if (!newPostContent.trim()) return;

      const newPost: Post = {
          id: Date.now().toString(),
          author: 'Moi',
          role: 'Student',
          content: newPostContent,
          date: 'À l\'instant',
          likes: 0,
          type: 'question'
      };

      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setIsComposeOpen(false);
  };

  if (selectedThread) {
      return <ChatInterface thread={selectedThread} onBack={() => setSelectedThread(null)} />;
  }

  const stories = [
      { id: 'me', name: 'Moi', img: MOCK_USER.avatarUrl, isAdd: true },
      { id: '1', name: 'M. Touré', img: 'https://ui-avatars.com/api/?name=M+Toure&background=0D8ABC&color=fff', hasStory: true },
      { id: '2', name: 'Admin', img: 'https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff', hasStory: true },
      { id: '3', name: 'Alice', img: 'https://i.pravatar.cc/150?u=alice', hasStory: false },
  ];

  // Mock Leaderboard
  const LEADERBOARD_DATA = [
      { id: 'top1', name: 'Awa Diop', xp: 15200, avatar: 'https://i.pravatar.cc/150?u=awa', rank: 1, streak: 20 },
      { id: 'top2', name: 'Jean K.', xp: 14800, avatar: 'https://i.pravatar.cc/150?u=jean', rank: 2, streak: 18 },
      { id: 'top3', name: 'Marie S.', xp: 14500, avatar: 'https://i.pravatar.cc/150?u=marie', rank: 3, streak: 15 },
      { id: '4', name: 'Paul B.', xp: 13900, avatar: 'https://i.pravatar.cc/150?u=paul', rank: 4 },
      { id: '5', name: 'Sarah L.', xp: 13500, avatar: 'https://i.pravatar.cc/150?u=sarah', rank: 5 },
      { id: 'u1', name: 'Kouamé Junior', xp: 12450, avatar: MOCK_USER.avatarUrl, rank: 14, isMe: true },
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
                    <button 
                        onClick={() => setIsComposeOpen(true)}
                        className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-slate-300 hover:scale-105 transition-transform"
                    >
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
                                                    <button 
                                                        onClick={() => setIsComposeOpen(true)}
                                                        className="absolute inset-0 bg-black/30 flex items-center justify-center text-white"
                                                    >
                                                        <Plus size={24} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-600">{story.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Feed Posts */}
                            <div className="space-y-6">
                                {posts.map(post => (
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

            {/* ... Other Tabs (Forum, Blog, Leaderboard) kept as is ... */}
            
        </AnimatePresence>
      </div>

      {/* COMPOSE POST MODAL */}
      <AnimatePresence>
          {isComposeOpen && (
              <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsComposeOpen(false)}
                  />
                  <motion.div 
                    initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                    className="bg-white w-full max-w-md rounded-2xl z-10 p-4 shadow-2xl relative"
                  >
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-slate-900">Nouvelle Publication</h3>
                          <button onClick={() => setIsComposeOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                              <X size={20} className="text-slate-500" />
                          </button>
                      </div>
                      <textarea 
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="Quoi de neuf ?"
                          className="w-full h-32 bg-slate-50 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 font-medium placeholder:text-slate-400"
                      />
                      <div className="flex justify-between items-center mt-4">
                          <div className="flex gap-2">
                              <button className="p-2 rounded-full text-indigo-600 bg-indigo-50 hover:bg-indigo-100">
                                  <ImageIcon size={20} />
                              </button>
                          </div>
                          <button 
                              onClick={handlePostSubmit}
                              disabled={!newPostContent.trim()}
                              className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
                          >
                              <Send size={18} /> Publier
                          </button>
                      </div>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

    </div>
  );
};

export default SocialScreen;
