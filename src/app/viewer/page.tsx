'use client';
import { useEffect, useState } from 'react';
import ContributionsTable from '../component/ContributionsTable';
import Navbar from '../component/Header';
import Footer from '../component/Footer';

export default function ViewerPage() {
  const [members, setMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  useEffect(() => {
    // Fetch members from the server
    async function fetchMembers() {
      const res = await fetch('http://localhost:5000/api/members');
      const data = await res.json();
      setMembers(data);
    }

    fetchMembers();

    // Safely access localStorage in the browser
    const user = localStorage.getItem('current_user');
    setCurrentUser(user);
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-indigo-600 mb-2">
          Welcome Dear {currentUser || ''} ❤️
        </h1>

        {/* Month Heading */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center p-2 rounded-lg mb-6">
          <span className="text-lg"> Month: {currentMonth}</span>
        </div>

        {/* Contributions Table */}
        <ContributionsTable
          members={members}
          setMembers={() => {}} // No-op function since editing is disabled
          disabled={true} // View-only mode
          currentMonth={currentMonth}
        />
      </div>
      <Footer />
    </>
  );
}