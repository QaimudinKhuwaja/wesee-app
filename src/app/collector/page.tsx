// 'use client';
// import { useEffect, useState } from 'react';
// import ContributionsTable from '../component/ContributionsTable';
// import Navbar from '../component/Header';
// import Footer from '../component/Footer';

// interface Member {
//   name: string;
//   daily: { [key: string]: boolean };
// }

// export default function CollectorPage() {
//   const [members, setMembers] = useState<Member[]>([]);

//   useEffect(() => {
//     const savedData = localStorage.getItem('committee_members');
//     if (savedData) {
//       setMembers(JSON.parse(savedData));
//     }
//   }, []);

//   const currentUser = localStorage.getItem('current_user');

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold mb-4">Welcome, Collector {currentUser}</h1>
//         <ContributionsTable members={members} setMembers={setMembers} disabled={false} />
//       </div>
//       <Footer />
//     </>
//   );
// }



// 'use client';
// import { useEffect, useState } from 'react';
// import ContributionsTable from '../component/ContributionsTable';
// import Navbar from '../component/Header';
// import Footer from '../component/Footer';

// export default function CollectorPage() {
//   const [members, setMembers] = useState([
//     { name: 'Sharjeel Ahmed', image: '/images/sharjeel.jpg', daily: {} },
//     { name: 'Mubeen Khuwaja', image: '/images/mubeen.jpg', daily: {} },
//     { name: 'Ahmed 3', image: '/images/ahmed.jpg', daily: {} },
//     { name: 'Muntaha Maqsood', image: '/images/maqsood.jpg', daily: {} },
//     { name: 'Ali Ahmed', image: '/images/ahmed.jpg', daily: {} },
//     { name: 'Hamza Khuwaja', image: '/images/hamza.jpg', daily: {} },
//     { name: 'Mutaqi Khuwaja', image: '/images/mutaqi.jpg', daily: {} },
//     { name: 'Ahmed 2', image: '/images/ahmed.jpg', daily: {} },
//     { name: 'Mubeen 2', image: '/images/mubeen.jpg', daily: {} },
//     { name: 'Mubeen 3', image: '/images/mubeen.jpg', daily: {} },
//   ]);

//   const [currentUser, setCurrentUser] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedUser = localStorage.getItem('current_user');
//       if (savedUser) setCurrentUser(savedUser);
  
//       const savedMembers = localStorage.getItem('committee_members');
//       if (savedMembers) {
//         setMembers(JSON.parse(savedMembers));
//       }
//     }
//   }, []);

//   const currentMonth = new Date().toLocaleString('default', { month: 'long' });

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-2xl font-semibold text-indigo-600 mb-2">Welcome Dear {currentUser} ❤️</h1>

//         {/* Month Heading */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center p-2 rounded-lg mb-6">
//           <span className="text-lg"> Month: {currentMonth}</span>
//         </div>

//         {/* Contributions Table */}
//         <ContributionsTable
//           members={members}
//           setMembers={setMembers}
//           disabled={false} // Editable mode
//           currentMonth={currentMonth}
//         />
//       </div>
//       <Footer />
//     </>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import ContributionsTable from '../component/ContributionsTable';
import Navbar from '../component/Header';
import Footer from '../component/Footer';

export default function CollectorPage() {
  const [members, setMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    // Fetch members from the server
    async function fetchMembers() {
      const res = await fetch('http://localhost:5000/api/members');
      const data = await res.json();
      setMembers(data);
    }

    fetchMembers();

    const savedUser = localStorage.getItem('current_user');
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  const updateMembers = async (updatedMembers: any) => {
    setMembers(updatedMembers);

    // Send updated data to the server
    await fetch('http://localhost:5000/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMembers),
    });
  };

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-indigo-600 mb-2">Welcome Dear {currentUser} ❤️</h1>

        {/* Month Heading */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center p-2 rounded-lg mb-6">
          <span className="text-lg"> Month: {currentMonth}</span>
        </div>

        {/* Contributions Table */}
        <ContributionsTable
          members={members}
          setMembers={updateMembers} // Update members on the server
          disabled={false} // Editable mode
          currentMonth={currentMonth}
        />
      </div>
      <Footer />
    </>
  );
}