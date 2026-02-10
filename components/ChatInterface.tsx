import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Loader2 } from 'lucide-react';
import { Thread, Message } from '../types';
import { MOCK_CHAT_HISTORY } from '../constants';
import { motion } from 'framer-motion';

interface ChatInterfaceProps {
  thread: Thread;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ thread, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load initial mock history
    // In a real app, we would fetch based on thread.id
    setMessages(MOCK_CHAT_HISTORY);
    scrollToBottom();
  }, [thread.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update local state immediately for responsiveness
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);
    scrollToBottom();

    // Check if we are talking to the AI Assistant
    // In MOCK_THREADS, the AI is typically defined with a specific role
    if (thread.contactRole === 'Assistant IA' || thread.contactRole === 'AI Assistant') {
        try {
            // Prepare history for API (simplified)
            // Ideally map 'me' -> 'user', 'other' -> 'model'
            // We take the last few messages to keep context without overloading tokens
            const history = messages.slice(-10).map(m => ({
                role: m.sender === 'me' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: newMessage.text,
                    history: history
                })
            });

            const data = await response.json();

            if (data.error) {
                console.error("API Error:", data.error);
                throw new Error(data.error);
            }

            const reply: Message = {
                id: (Date.now() + 1).toString(),
                text: data.text,
                sender: 'other',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, reply]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorReply: Message = {
                id: (Date.now() + 1).toString(),
                text: "Désolé, je ne peux pas répondre pour le moment. (Erreur connexion)",
                sender: 'other',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, errorReply]);
        } finally {
            setIsLoading(false);
            scrollToBottom();
        }
    } else {
        // Standard Mock Reply for other users (Human teachers/students)
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                text: "C'est noté, je regarderai ça plus tard.",
                sender: 'other',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, reply]);
            setIsLoading(false);
            scrollToBottom();
        }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 absolute inset-0 z-50">
      {/* Chat Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600">
                <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={thread.avatarUrl} alt={thread.contactName} className="w-10 h-10 rounded-full" />
                    {thread.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>}
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">{thread.contactName}</h3>
                    <p className="text-xs text-slate-500">{thread.contactRole}</p>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
            <button className="p-2 hover:bg-slate-100 rounded-full"><Phone size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-full"><Video size={20} /></button>
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e5ddd5] bg-opacity-50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
         {messages.map((msg) => {
             const isMe = msg.sender === 'me';
             return (
                 <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                 >
                     <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm relative ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none'}`}>
                         <p>{msg.text}</p>
                         <span className={`text-[10px] block text-right mt-1 opacity-70 ${isMe ? 'text-blue-100' : 'text-slate-400'}`}>
                             {msg.timestamp}
                         </span>
                     </div>
                 </motion.div>
             );
         })}
         {isLoading && (
             <div className="flex justify-start">
                 <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                     <Loader2 size={16} className="animate-spin text-slate-500" />
                     <span className="text-xs text-slate-500">Écrit...</span>
                 </div>
             </div>
         )}
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Écrire un message..."
            disabled={isLoading}
            className="flex-1 bg-slate-100 text-slate-800 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none hover:bg-blue-700 transition-colors"
          >
              <Send size={20} />
          </button>
      </div>
    </div>
  );
};

export default ChatInterface;
