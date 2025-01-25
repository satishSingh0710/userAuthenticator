"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePassword = async () => {
        try {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            setLoading(true);
            await axios.post("/api/users/forgotpassword", { token, password });
            setSuccess(true);
            toast.success("Password changed successfully");
        } catch (error: unknown) {
            setError(true);
            toast.error("Failed to change password");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 bg-[#212121] rounded-lg shadow-2xl">
                <h1 className="text-4xl font-bold text-center text-white mb-8">FILL NEW PASSWORD</h1>
                <div className="space-y-6">
                    {success && (
                        <div className="text-center text-green-400">
                            <p>Password has been successfully changed!</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-red-500">
                            <p>Failed to change password. Please try again later.</p>
                        </div>
                    )}

                    {/* Password and Confirm Password Fields */}
                    {!success && !error && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                />
                            </div>
                            <button
                                onClick={changePassword}
                                className="w-full px-4 py-3 mt-6 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Change Password
                            </button>
                        </div>
                    )}

                    <Link href="/" className="block text-center text-orange-500 hover:text-orange-600 mt-6">
                        Back to Home
                    </Link>
                </div>
            </div>
            <Toaster />
        </div>
    )
}