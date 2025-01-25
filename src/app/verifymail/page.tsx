"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const verifyUserEmail =  async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/verifymail", { token })
            setVerified(true);
            toast.success("Email verified successfully");
        } catch (error: unknown) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Toaster />
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                {loading ? (
                    <h1 className="text-3xl font-bold text-orange-500 mb-4">Verifying...</h1>
                ) : error ? (
                    <>
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Verification Failed</h1>
                        <p className="text-gray-300 mb-6">
                            The verification link is invalid or expired. Please try again.
                        </p>
                        <Link
                            href="/"
                            className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-all"
                        >
                            Go to Home
                        </Link>
                    </>
                ) : verified ? (
                    <>
                        <h1 className="text-3xl font-bold text-green-500 mb-4">Email Verified!</h1>
                        <p className="text-gray-300 mb-6">
                            Your email has been successfully verified. You can now log in.
                        </p>
                        <Link
                            href="/login"
                            className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-all"
                        >
                            Go to Login
                        </Link>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}