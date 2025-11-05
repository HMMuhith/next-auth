'use client'

import { useEffect, useState } from "react";

export default function Main() {
  const [user,setuser]=useState('')
  useEffect(()=>{
    const request=localStorage.getItem('user')
    setuser(request)
  },[])
  return (<>
      
   <div className="m-auto text-center bg-slate-900 flex justify-center pt-36 w-dvw text-4xl  text-sky-400 min-h-screen  ">Hi { user || `Guest`} </div>
   </>
  );
}
