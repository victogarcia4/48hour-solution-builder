'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Router Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <div className="bg-black border-4 border-white p-8 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-black uppercase mb-4 text-white">Something went wrong!</h2>
        <div className="bg-black text-white p-4 mb-6 font-mono text-left text-sm overflow-auto">
          <p className="font-bold text-red-400">Message: {error.message}</p>
          {error.stack && (
            <pre className="mt-4 text-xs text-gray-400">{error.stack}</pre>
          )}
        </div>
        <button
          className="brutal-btn bg-white text-black font-black uppercase px-8 py-4 hover:bg-brutal-yellow transition-colors"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
