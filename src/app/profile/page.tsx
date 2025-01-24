"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { set } from "mongoose";


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
    setData(res.data.data._id);
    // console.log("The data is : ", data);  
    // router.push(`/profile/${data}`); 
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile Page</h1>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={logoutUser}
      >
        {
          loading ? "Processing" : "Logout"
        }
      </button>
      {
        data === "nothing" ? null : <Link className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" href={`/profile/${data}`}>{data}</Link>
      }
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={getUserDetails}>
        {
          loading ? "Processing" : "Get User Details"
        }
      </button>
    </div>
  );
}
