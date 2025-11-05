"use client"
import axios from "axios"
import React, { useEffect, useState} from "react"
import validator from 'validator'
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"

const NewPass=()=>{
     const [Password,setPassword]=useState('')
     const [Confirm_Password,setConfirm_Password]=useState('')
     const [Email,setEmail]=useState('')
     const [error,seterror]=useState('')
const [Loading,setLoading]=useState(false)

     const router=useRouter()
     useEffect(()=>{
        const params=new URLSearchParams(window.location.search)
        const email=params.get('email')
        setEmail(email)
     })
     const notifyToast=()=>{
        setTimeout(()=>{
        toast.success('Password reset successfully')
setLoading(false)
        },2800)
     }
     const notify=()=>{
        setTimeout(()=>{
router.push('/')
        },8000)
     }
const Reset=async()=>{
    try{
        setLoading(true)
if(!validator.equals(Password,Confirm_Password)){
   return seterror(`Password must match`)
}

    const request=await axios.post('/api/backend/newpassword',{Password,Email})
    console.log(request)
    notifyToast()
   notify()
    }
    catch(error){
        console.log(error)
        setTimeout(()=>{
toast.error(`Password reset failed`)
setLoading(false)
        },2800)
    }

}


    return(<>
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">
        <h1 className="text-cyan-300 text-4xl">Type Password</h1>
        <input type="password"  name="Password" className="py-2 focus:outline-none pl-2 font-bold mt-7 rounded-md w-[26rem] bg-white" id="password" value={Password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter new password"/>
        <input type="password"  name="Confirm_Password" className="py-2 focus:outline-none pl-2 font-bold mt-7 rounded-md w-[26rem] bg-white" id="confirm_password" value={Confirm_Password} onChange={(e)=>{setConfirm_Password(e.target.value)}} placeholder="Enter confirm password"/>
     {error ? (<span className="text-sm text-red-600 my-3">{error}</span>):''}
            <div className="bg-black text-center text-white mt-4 rounded-md">
            <button type="button" onClick={Reset} className="px-5 py-2 w-60  cursor-pointer">{Loading?`Processing...`:`Submit`}</button> 
            </div>
        
    
    </div>
    </>)
}

export default NewPass