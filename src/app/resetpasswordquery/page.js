"use client"
import axios from "axios"
import React, { useState} from "react"
import Link from "next/link"

const ResetPass=()=>{
     const [Email,setEmail]=useState('')
     const [Message,setMessage]=useState(false)
     const [sentMail,setsentMail]=useState(false)

         
const Reset=async()=>{
    try{
        setMessage(true)
    const request=await axios.post('/api/backend/resetpasswordquery',{Email})
    console.log(request)

setMessage(false)
setsentMail(true)
    }
    catch(error){
        setMessage(false)
        console.log(error)
    }

}


    return(<>
   
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center">
         { !sentMail && (
            <>
        <h1 className="text-cyan-300 text-4xl">Reset Password</h1>
        <input type="email"  name="" className="py-1 focus:outline-none pl-2 font-bold mt-7 rounded-md w-[46rem] bg-white" id="verifytoken" value={Email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
     
            <div className="bg-black text-center text-white mt-4 rounded-md">
            <button type="button" onClick={Reset} className="px-5 py-2 w-60  cursor-pointer">{Message?`Processing...`:`Reset`}</button> 
            </div>
            </>
         )
    
}
     {sentMail && (
                <div className="text-cyan-300 min-h font-bold">An email has been sent to your mail to reset your password.Please click <Link className="text-white" target="_blank" rel="noopener noreferrer" href={`https://mailtrap.io/inboxes/4110402/messages/`}>here</Link> to check</div>
            )}
    </div>
    </>)
}

export default ResetPass