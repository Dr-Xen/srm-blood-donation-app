'use client';

import { useState } from 'react';

export default function CreateCampPage() {
  const [campName, setCampName] = useState('');
  const [campDate, setCampDate] = useState('');
  const [campTime, setCampTime] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [maxDonors, setMaxDonors] = useState(100);
  const [message, setMessage] = useState('');

  async function createCamp() {
    setMessage('');

    const res = await fetch('/api/camps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        campName,
        campDate,
        campTime,
        venue,
        description,
        maxDonors,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Camp created successfully.');

      setCampName('');
      setCampDate('');
      setCampTime('');
      setVenue('');
      setDescription('');
      setMaxDonors(100);
    } else {
      setMessage(data.error || 'Failed to create camp.');
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Create Blood Donation Camp
        </h1>

        <div className="space-y-4">

          <input
            className="w-full border rounded p-3"
            placeholder="Camp Name"
            value={campName}
            onChange={e => setCampName(e.target.value)}
          />

          <input
            type="date"
            className="w-full border rounded p-3"
            value={campDate}
            onChange={e => setCampDate(e.target.value)}
          />

          <input
            type="time"
            className="w-full border rounded p-3"
            value={campTime}
            onChange={e => setCampTime(e.target.value)}
          />

          <input
            className="w-full border rounded p-3"
            placeholder="Venue"
            value={venue}
            onChange={e => setVenue(e.target.value)}
          />

          <textarea
            className="w-full border rounded p-3"
            rows={4}
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            type="number"
            className="w-full border rounded p-3"
            value={maxDonors}
            onChange={e => setMaxDonors(Number(e.target.value))}
          />

          <button
            onClick={createCamp}
            className="bg-red-700 text-white px-6 py-3 rounded"
          >
            Create Camp
          </button>

          {message && (
            <p className="font-medium">
              {message}
            </p>
          )}

        </div>

      </div>
    </main>
  );
}