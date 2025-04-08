'use client';
import { useEffect } from 'react';

export default function SetupUser() {
  useEffect(() => {
    // Check if user and role are already set in localStorage
    if (!localStorage.getItem('current_user')) {
      // Set the default user and role
      localStorage.setItem('current_user', 'Ali'); // Change to actual user name
      localStorage.setItem('user_role', 'collector'); // or 'viewer'
    }
  }, []);

  return null;
}
