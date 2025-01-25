"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';



export default function ProfilePage() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState("nothing");
  const router = useRouter();
  const logoutUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      console.log("Logout success", response);
      toast.success("Logout successful");
      setTimeout(() => {
        router.push("/login"); // Redirect to login page after 4 seconds
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to logout");
      setLoading(false);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get(`/api/users/me`)
    console.log("The details of the users are : ", res.data);
    setData(res?.data?.data?._id);
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-black flex-col p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl font-bold text-white mb-6">Profile Page</h1>

      <button
        className="px-6 py-3 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
        onClick={logoutUser}
      >
        {loading ? "Processing" : "Logout"}
      </button>

      {data === "nothing" ? null : (
        <Link
          className="px-6 py-3 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
          href={`/profile/${data}`}
        >
          {data}
        </Link>
      )}

      <button
        className="px-6 py-3 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        onClick={getUserDetails}
      >
        {loading ? "Processing" : "Get User Details"}
      </button>
    </div>

  );
}
