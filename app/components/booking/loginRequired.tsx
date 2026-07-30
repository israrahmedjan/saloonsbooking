import React from 'react'
import { AlertCircle, LogIn, UserPlus, ArrowRight } from 'lucide-react';

function LoginRequired() {
  return (
      <div className="container mb-4 rounded-xl  bg-white/70 backdrop-blur-md border border-secondary/20 p-4 shadow-sm">
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-amber-100 p-1.5">
          <AlertCircle size={16} className="text-secondary" />
        </div>
        <p className="text-lg text-gray-700">
          <span className="font-medium">Login required</span>
          <span className="text-gray-500"> to complete your order</span>
        </p>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <a 
          href="/auth" 
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2D2D2D] text-white text-sm font-medium hover:bg-[#1a1a1a] transition"
        >
          <LogIn size={15} />
          Login
          <ArrowRight size={14} />
        </a>
        <a 
          href="/auth" 
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
        >
          <UserPlus size={15} />
          Sign Up
        </a>
      </div>
    </div>
  </div>
  )
}

export default LoginRequired

