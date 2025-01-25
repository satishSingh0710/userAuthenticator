"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error) {
            console.error("Failed to signup:", error);
            toast.error("Failed to signup");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-2xl border border-gray-800">
                <h1 className="text-4xl font-extrabold text-center text-yellow-500 mb-6">
                    {loading ? "Processing" : "Create an account"}
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Sign up to access exclusive features.
                </p>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-300">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-300">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1"
                        />
                    </div>
                    <button
                        onClick={onSignup}
                        className="w-full px-6 py-2 text-lg font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1"
                    >
                        {buttonDisabled ? "Fill all the details" : "Sign Up"}
                    </button>
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-400">
                            Already have an account?{" "}
                        </span>
                        <Link href="/login" className="text-yellow-500 font-semibold hover:underline">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
