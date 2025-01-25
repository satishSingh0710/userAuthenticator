"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { set } from "mongoose";

interface ProfilePageProps {
  params: Promise<{ id: string }>; // Type params as a Promise
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [unwrapParams, setUnwrapParams] = useState<{ id: string } | null>(null);
  const [mailSent, setMailSent] = useState(false);
  useEffect(() => {
    // Unwrap params asynchronously
    params.then(setUnwrapParams).catch((error) => {
      console.error("Failed to unwrap params:", error);
    });
  }, [params]);

  const sendMail = async () => {
    try {
      await axios.get("/api/users/sendResetPasswordMail"); // Send mail to user
      setMailSent(true);
    } catch (error: any) {
      setMailSent(false);
      console.error("Failed to send mail:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-yellow-500">
          Profile Page
        </h1>
        {unwrapParams ? (
          <h2 className="text-xl font-medium text-center text-gray-300">
            <span className="text-white font-bold">{unwrapParams.id}</span>, Welcome here!!
          </h2>
        ) : (
          <h2 className="text-xl font-medium text-center text-gray-300">Loading...</h2>
        )}
        <div className="mt-6 flex justify-center space-x-4">
          {
            !mailSent && (
              <button
                className="px-6 py-3 bg-yellow-600 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
                onClick={sendMail}
              >
                CHANGE PASSWORD
              </button>
            )
          }

          {
            mailSent && (
              <div className="px-6 py-3 bg-green-600 text-black font-semibold rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300">
                Mail Sent
              </div>
            )
          }
        </div>
      </div>
    </div>

  );
}
