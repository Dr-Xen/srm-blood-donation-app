'use client';

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          Check Your Email
        </h1>

        <p className="text-gray-600">
          We have sent a sign-in link to your email address.
          Please open your inbox and click the link to continue.
        </p>
      </div>
    </main>
  );
}