'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(localStorage.getItem('current_user'));
    setUserRole(localStorage.getItem('user_role'));
  }, []);

  return (
    <header className="bg-blue-950 text-white p-3 shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-xl font-bold">🧾 Committee Tracker</h1>
        
        <div className="text-xs sm:text-sm text-center sm:text-right">
          <span className="block sm:inline mr-2">👋 Welcome, <span className="font-semibold">{currentUser}</span></span>
          <span className="block sm:inline text-gray-300">
            {userRole === 'collector' ? '📦 Collector' : '👀 Viewer'}
          </span>
        </div>
      </div>
    </header>
  );
}
