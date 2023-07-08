"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res: any = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <p>Profile details </p>
      <h2 className="p-1 rounded bg-green-400">{data==="nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
        onClick={logout}
        className="p-2 my-2 border border-gray-400 rounded-lg"
      >
        Sign Out
      </button>
      <button
        onClick={getUserDetails}
        className="p-2 my-2 border border-gray-400 rounded-lg"
      >
        getUserDetails
      </button> 
      {/* We can also use this getUserDetails function using useEffect hooks when 
      user are in profile page or so */}
    </div>
  );
};

export default page;
