'use client';

import dynamic from 'next/dynamic';

const AdminContent = dynamic(() => import('./AdminContent'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-brutal-yellow flex items-center justify-center p-6">
      <p className="text-4xl font-black uppercase animate-pulse">Initializing Admin...</p>
    </div>
  )
});

export default function AdminPage() {
  return <AdminContent />;
}
