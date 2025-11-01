"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState,useEffect } from "react"
import {toast} from 'react-hot-toast'

 const Verify=()=>{
    // const [verified,setverified]=useState(false)
    // const [Error,setError]=useState(false)
const [Token,setToken]=useState('')
const [Success,setSuccess]=useState(false)
const router=useRouter()
const notify=()=>{
    setTimeout(()=>{
        setSuccess(true)
        toast.success(`Email verified successfully`)
    },3000)

    setTimeout( ()=> router.push('/login') ,7000)
}

const failNotify=()=>{
     setTimeout(()=>{
        toast.error(`Email verification failed`)
    },4500)
}
const verification=async()=>{
    try{
    const request=await axios.post('/api/backend/verify',{Token})
    console.log(request)
notify()
    // setverified(true)
    }
    catch(error){
        // setError(true)
        failNotify()
        console.log(error)
    }
}
    useEffect(()=>{
        const params=new URLSearchParams(window.location.search)
        const token=params.get('token')
        setToken(token ||'')
    })

    useEffect(()=>{
        if(Token.length>0){
            verification()
        }
    },[Token.length])

useEffect(()=>{
setTimeout(()=>{
   const stopTime= document.getElementById('verification')
   stopTime?.remove()
   const Token=document.getElementById('verifytoken')
   Token?.remove()
},5000)
})

    return(<>
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">

       {!Success ? <h1 className="text-cyan-300 text-4xl">Verify Email</h1> :<h1 className="text-cyan-300 text-4xl">Congratulations!</h1>
 }
        <input type="text"  name="" className="py-1 focus:outline-none pl-2 font-bold mt-7 rounded-md w-[46rem] bg-white" id="verifytoken" value={Token} readOnly/>
        {/* {verified && (
            <div>
            <div className="text-2xl text-green-400" id="verification">
                {toast.success(`Email verified `)}
            </div>
            <Link href='/login' className="text-white">Login</Link>
            </div>
        )}
        {
            Error && (
                <div>
                    Verification failed
                </div>
            )
        } */}
    </div>
    </>)
}

export default Verify