'use client';

import Link from 'next/link';

export default function NurseDashboard() {
return ( <main className="min-h-screen bg-gray-100 p-6"> <div className="max-w-6xl mx-auto">

```
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">
        Nurse Dashboard
      </h1>

      <Link
        href="/"
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Home
      </Link>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      <Link
        href="/nurse/create-camp"
        className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold mb-2">
          Create Camp
        </h2>

        <p className="text-gray-600">
          Create and manage upcoming blood donation camps.
        </p>
      </Link>

      <Link
        href="/admin"
        className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold mb-2">
          Camp Responses
        </h2>

        <p className="text-gray-600">
          View accepted and declined donor responses.
        </p>
      </Link>

      <Link
        href="/admin"
        className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold mb-2">
          Medical Examinations
        </h2>

        <p className="text-gray-600">
          Review donors and perform medical examinations.
        </p>
      </Link>

    </div>

    

  </div>
</main>


);
}
