'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function CallbackPage() {
  useEffect(() => {
    async function handleAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          window.location.href = '/dashboard';
          return;
        }

        // Give Supabase a moment to process auth
        setTimeout(async () => {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session) {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/';
          }
        }, 1500);
      } catch (error) {
        console.error(error);
        window.location.href = '/';
      }
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