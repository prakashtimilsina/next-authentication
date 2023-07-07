"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    if (!buttonDisabled) {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login Success",response.data)
        router.push("/profile")
  
      } catch (error: any) {
        console.log("Login failed", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else{
      alert('Please enter all fields')
    } 
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
  } else{
      setButtonDisabled(true);
  }
  },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <label htmlFor="email">email</label>
      <input
        className="py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="py-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg focus:border-gray-600 hover:cursor-pointer"
      >
        {buttonDisabled ? "No Login": "Login here"}
      </button>
      <br />
      <Link href="/signup">Go to Sign up page</Link>
    </div>
  );
};
export default Login;
