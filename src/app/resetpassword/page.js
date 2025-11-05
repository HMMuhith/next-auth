"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState,useEffect } from "react"


 const ResetPass=()=>{
const [Token,setToken]=useState('')
const [Email,setEmail]=useState('')
const router=useRouter()




const Reset=async()=>{
    try{
    const request=await axios.post('/api/backend/resetpassword',{Token,Email})
    console.log(request)
    setTimeout(()=>
    router.push(`/newpassword?email=${Email}`),
    4000)
    }
    catch(error){
        console.log(error)
        
    }
}
    useEffect(()=>{
        const params=new URLSearchParams(window.location.search)
        const token=params.get('token')
        const email=params.get('email')
        setToken(token ||'')
        setEmail(email || '')
        console.log(Email)
    })

    useEffect(()=>{
        if(Token.length>0){
            setTimeout(()=>{

                Reset()
            },2000)
        }
    },[Token.length])



    return(<>
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">
        <h1 className="text-cyan-300 text-4xl">Reset Password</h1>
        <input type="text"  name="" className="py-1 focus:outline-none pl-2 font-bold mt-7 rounded-md w-[46rem] bg-white" id="verifytoken" value={Token} readOnly/>
        
    </div>
    </>)
}

export default ResetPass