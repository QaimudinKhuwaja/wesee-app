'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'vscode') {
      localStorage.setItem('current_user', username);
      localStorage.setItem('user_role', 'collector');
      router.push('/collector');
    } else if (password === '1234567') {
      localStorage.setItem('current_user', username);
      localStorage.setItem('user_role', 'viewer');
      router.push('/viewer');
    } else {
      alert('Invalid username or password');
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('current_user');
    const role = localStorage.getItem('user_role');
    if (user && role) {
      router.push(`/${role}`);
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-80 sm:w-96">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">🔐 Committee Login</h2>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}
