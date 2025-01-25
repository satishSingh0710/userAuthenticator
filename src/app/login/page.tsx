"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast  from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);

            router.push(`/profile`);
        } catch (error: unknown) {
            console.log("Failed to login:", error);
            toast.error("Failed to login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-10 bg-gray-900 rounded-lg shadow-2xl border border-gray-800">
                <h1 className="text-5xl font-extrabold text-center text-yellow-500 mb-6">Login</h1>
                <p className="text-center text-gray-300 mb-8 text-lg">
                    Enter your credentials to access your account.
                </p>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-300">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 mt-2 text-gray-900 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-300">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 mt-2 text-gray-900 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 shadow-sm"
                        />
                    </div>
                    <button
                        onClick={onLogin}
                        className="w-full px-6 py-3 text-lg font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 shadow-lg"
                    >
                        {buttonDisabled ? "Please fill all fields" : loading ? "Processing" : "Login"}
                    </button>
                    <div className="text-center mt-6">
                        <span className="text-md text-gray-400">
                            Don’t have an account?{" "}
                        </span>
                        <Link href="/signup" className="text-yellow-500 font-semibold hover:underline">
                            Sign up here
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}
