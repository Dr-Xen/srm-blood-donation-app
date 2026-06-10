'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Donor {
id: string;
fullName: string;
email: string;
mobile: string;
donationType: string;
eligibilityStatus: string;
age: number;
weightKg: number;
}

interface Camp {
id: string;
campName: string;
campDate: string;
campTime: string;
venue: string;
description: string;
maxDonors: number;
status: string;
}

export default function DashboardPage() {
const [loading, setLoading] = useState(true);
const [donor, setDonor] = useState<Donor | null>(null);
const [camps, setCamps] = useState<Camp[]>([]);
const [error, setError] = useState('');

useEffect(() => {
async function loadData() {
try {
const donorRes = await fetch(
  '/api/donors/by-email?email=akash.zqd@gmail.com'
);

    const donorData = await donorRes.json();

    if (!donorRes.ok) {
      setError(donorData.error || 'Donor not found');
      setLoading(false);
      return;
    }

    setDonor(donorData);

    const campRes = await fetch('/api/camps');

    if (campRes.ok) {
      const campData = await campRes.json();
      setCamps(campData);
    }
  } catch (error) {
    console.error(error);
    setError('Failed to load dashboard');
  }

  setLoading(false);
}

loadData();

}, []);

async function handleLogout() {
await supabase.auth.signOut();
window.location.href = '/';
}

if (loading) {
return ( <main className="min-h-screen flex items-center justify-center"> <p>Loading dashboard...</p> </main>
);
}

if (error) {
return ( <main className="min-h-screen flex items-center justify-center"> <div className="bg-white p-6 rounded shadow"> <p className="text-red-600">{error}</p> </div> </main>
);
}

return ( <main className="min-h-screen bg-gray-100 p-6"> <div className="max-w-5xl mx-auto"> <div className="flex justify-between items-center mb-6"> <h1 className="text-3xl font-bold">
Donor Dashboard </h1>

      <button
        onClick={handleLogout}
        className="bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Donor Profile
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <p><strong>Name:</strong> {donor?.fullName}</p>
        <p><strong>Email:</strong> {donor?.email}</p>
        <p><strong>Mobile:</strong> {donor?.mobile}</p>
        <p><strong>Age:</strong> {donor?.age}</p>
        <p><strong>Weight:</strong> {donor?.weightKg} kg</p>
        <p><strong>Donation Type:</strong> {donor?.donationType}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span className="text-green-600 font-semibold">
            {donor?.eligibilityStatus}
          </span>
        </p>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Donation History
      </h2>

      <p className="text-gray-500">
        No donation history recorded yet.
      </p>
    </div>

    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Available Blood Donation Camps
      </h2>

      {camps.length === 0 ? (
        <p className="text-gray-500">
          No active camps available.
        </p>
      ) : (
        <div className="space-y-4">
          {camps.map((camp) => (
            <div
              key={camp.id}
              className="border rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold">
                {camp.campName}
              </h3>

              <p><strong>Date:</strong> {camp.campDate}</p>
              <p><strong>Time:</strong> {camp.campTime}</p>
              <p><strong>Venue:</strong> {camp.venue}</p>
              <p>{camp.description}</p>

              <div className="mt-3 flex gap-3">
                <button
  onClick={async () => {
    const res = await fetch('/api/camp-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        donorId: donor?.id,
        campId: camp.id,
        response: 'ACCEPTED',
      }),
    });

    if (res.ok) {
      alert('Camp accepted successfully');
    } else {
      alert('Failed to save response');
    }
  }}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Accept
</button>

<button
  onClick={async () => {
    const res = await fetch('/api/camp-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        donorId: donor?.id,
        campId: camp.id,
        response: 'DECLINED',
      }),
    });

    if (res.ok) {
      alert('Camp declined successfully');
    } else {
      alert('Failed to save response');
    }
  }}
  className="bg-red-600 text-white px-4 py-2 rounded"
>
  Decline
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</main>

);
}
