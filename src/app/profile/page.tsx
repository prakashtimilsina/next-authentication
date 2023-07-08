'use client'
import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const page = () => {
  const router = useRouter();
  const logout = async () => {
    try {
     await axios.get('/api/users/logout')
     router.push('/login')
    } catch (error:any) {
      console.log(error.message)
    }
  }
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr/>
      <p>Profile details </p>
      <hr />
      <button onClick={logout} className='p-2 my-2 border border-gray-400 rounded-lg'>Sign Out</button>
    </div>
  )
}

export default page