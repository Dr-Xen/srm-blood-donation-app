'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function verifyEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo:
          'http://localhost:3000/auth/callback',
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      localStorage.setItem('otp_email', email);
      setMessage(
        'Verification link sent successfully. Please check your email.'
      );
      window.location.href = '/auth/verify';
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold mb-2">
          Donor Login
        </h1>

        <p className="text-gray-600 mb-6">
          Enter your registered email address to access your donor dashboard.
        </p>

        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded p-3 mb-4"
        />

        <button
          onClick={verifyEmail}
          disabled={loading}
          className="w-full bg-red-700 text-white rounded p-3"
        >
          {loading ? 'Sending Verification Link...' : 'Verify Email'}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}