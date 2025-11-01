"use client"
import axios from "axios"
import React, { useState} from "react"

const ResetPass=()=>{
     const [Email,setEmail]=useState('')
const Reset=async()=>{
    try{
    const request=await axios.post('/api/backend/resetpasswordquery',{Email})
    console.log(request)
    setLoading(true)
    }
    catch(error){
        console.log(error)
    }

}


    return(<>
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">
        <h1 className="text-cyan-300 text-4xl">Reset Password</h1>
        <input type="email"  name="" className="py-1 focus:outline-none pl-2 font-bold mt-7 rounded-md w-[46rem] bg-white" id="verifytoken" value={Email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
     
            <div className="bg-black text-center text-white mt-4 rounded-md">
            <button type="button" onClick={Reset} className="px-5 py-2 w-60  cursor-pointer">Reset</button> 
            </div>
        
    
    </div>
    </>)
}

export default ResetPass