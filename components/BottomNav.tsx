
import React, { useState } from 'react';
import { Home, BrainCircuit, School, Users, ShoppingBag, Bell } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: Tab.DASHBOARD, icon: Home, label: 'Accueil' },
    { id: Tab.LEARNING, icon: BrainCircuit, label: 'Apprendre' },
    { id: Tab.SIS, icon: School, label: 'Scolarité' },
    { id: Tab.SOCIAL, icon: Users, label: 'Campus' },
    { id: Tab.STORE, icon: ShoppingBag, label: 'Shop' },
    { id: Tab.NOTIFICATIONS, icon: Bell, label: 'Notifs' },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-slate-200 pb-safe pt-2 px-2 shadow-lg z-30">
      <div className="flex justify-between items-center h-16 pb-2 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 ${
                isActive ? 'text-blue-600 -translate-y-2' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div
                className={`p-2 rounded-2xl transition-all duration-300 ${
                  isActive ? 'bg-blue-50 shadow-md shadow-blue-100' : 'bg-transparent'
                }`}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
