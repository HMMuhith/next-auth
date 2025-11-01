"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState,useEffect } from "react"
import {FaCheckCircle} from 'react-icons/fa'
import {CheckCircle} from 'lucide-react'

 const ResetPass=()=>{
   const [Loading,setLoading]=useState(false)
    const [Error,setError]=useState(false)
const [Token,setToken]=useState('')
const [Email,setEmail]=useState('')
const router=useRouter()
const Reset=async()=>{
    try{
    const request=await axios.post('/api/backend/resetpassword',{Token,Email})
    console.log(request)
    setLoading(true)
    setTimeout(()=>
    router.push(`/newpassword?email=${Email}`),
    4000)
    }
    catch(error){
        console.log(error)
        setError(true)
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
            },5000)
        }
    },[Token.length])

// useEffect(()=>{
// setTimeout(()=>{
//    const stopTime= document.getElementById('verification')
//    stopTime?.remove()
//    const Token=document.getElementById('verifytoken')
//    Token?.remove()
// },5000)
// })

    return(<>
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">
        <h1 className="text-cyan-300 text-4xl">Reset Password</h1>
        <input type="text"  name="" className="py-1 focus:outline-none pl-2 font-bold mt-7 rounded-md w-[46rem] bg-white" id="verifytoken" value={Token} readOnly/>
        {Loading && (
            <div>
            <div className="text-2xl text-green-400" id="verification">
                <CheckCircle size={48} className="text-green-500"/>
            </div>
            </div>
        )}
        {
            Error && (
                <div className="text-2xl text-red-600">
                    Password reset failed
                </div>
            )
        }
    </div>
    </>)
}

export default ResetPass