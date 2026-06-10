'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function CallbackPage() {
  useEffect(() => {
    async function handleAuth() {
      const hash = window.location.hash;

      if (!hash) {
        window.location.href = '/';
        return;
      }

      const params = new URLSearchParams(
        hash.replace('#', '')
      );

      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (!error) {
          window.location.href = '/dashboard';
          return;
        }
      }

      window.location.href = '/';
    }

    handleAuth();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">
          Signing you in...
        </h1>
        <p className="text-gray-600">
          Please wait.
        </p>
      </div>
    </main>
  );
}