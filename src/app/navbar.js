'use client'
import React from "react"
export  const Navbar=()=>{
return (<>
<div className="bg-slate-900 flex justify-between items-center">
    <div className="text-5xl text-white pl-20 pt-6">
        Logo
    </div>
    <ul className="flex justify-center w-[40rem] gap-13 text-white pt-6 items-center border border-red-700">
      
        <li><a className="text-sm hover:underline-offset-8 hover:underline" href="/login">Log in</a></li>
        <li><a className="text-sm hover:underline-offset-8 hover:underline" href="/signup">Sign up</a></li>
        <li><a className="text-sm hover:underline-offset-8 hover:underline" href="/about">About</a></li>
        <li><a className="text-sm hover:underline-offset-8 hover:underline" href="/verify">Verification</a></li>
    </ul>
</div>
</>)
}

