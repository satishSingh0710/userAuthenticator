"use client";

import React, { useEffect, useState } from "react";

interface ProfilePageProps {
  params: Promise<{ id: string }>; // Type params as a Promise
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [unwrapParams, setUnwrapParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // Unwrap params asynchronously
    params.then(setUnwrapParams).catch((error) => {
      console.error("Failed to unwrap params:", error);
    });
  }, [params]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-orange-500">
          Profile Page
        </h1>
        {unwrapParams ? (
          <h2 className="text-xl font-medium text-center text-gray-300">
            <span className="text-white font-bold">{unwrapParams.id}</span>, Welcome here!!
          </h2>
        ) : (
          <h2 className="text-xl font-medium text-center text-gray-300">Loading...</h2>
        )}
        <div className="mt-6 flex justify-center">
          <button
            className="px-6 py-2 bg-orange-500 text-black font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-300"
            onClick={() => alert("This is just a styled button!")}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
