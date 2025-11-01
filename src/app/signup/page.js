'use client'
import React,{ useState } from "react"
import axios from "axios"
import Link from "next/link"

const Signup=()=>{

    const [Name,setName]=useState('')
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
const[signupoption,setsignupoption]=useState(true)
const [sentMail,setsentMail]=useState(false)
    const signupHandler=async(e)=>{
        e.preventDefault()
const request=await axios.post('/api/backend/usersignup',{Name,Email,Password})
const response=await request.data
console.log(response)
setName('')
setEmail('')
setPassword('')
setsignupoption(false)
setsentMail(true)
    }
    return (<>
    <div className="bg-slate-900 flex flex-col min-h-screen justify-center items-center">
        {
            signupoption &&
        <div className="">
        <div>
            <input type="text" placeholder="Name" value={Name} onChange={(e)=>{setName(e.target.value)}} className="mb-4 py-2 pl-2 w-80 placeholder:text-zinc-800 placeholder:opacity-35 bg-white rounded-md focus:outline-none text-left" name="" id="" />
        </div>
        <div>
            <input type="email" name="" value={Email} onChange={(e)=>{setEmail(e.target.value)}} className='mb-4 py-2 w-80 pl-2 bg-white rounded-md focus:outline-none text-left placeholder:text-zinc-800 placeholder:opacity-35' placeholder="Email"  id="" />
        </div>
        <div>
            <input type="password" name="" value={Password} onChange={(e)=>{setPassword(e.target.value)}} className="mb-4 py-2 w-80 pl-2 bg-white rounded-md focus:outline-none text-left placeholder:text-zinc-800 placeholder:opacity-35" placeholder="Password" id="" />
        </div>
        <div className="text-center">
            <input type="button" name="" onClick={signupHandler} id="" className="mb-4 py-2 px-14 bg-blue-600 cursor-pointer text-white rounded-md" value='Sign up' />
        </div>
        </div>
}
{sentMail && (
    <div className="text-cyan-300 font-bold">An email has been sent to your mail .Please click <Link className="text-white" target="_blank" rel="noopener noreferrer" href={`https://mailtrap.io/inboxes/4110402/messages/`}>here</Link> to check</div>
)}
    </div>
    </>)
}

export default Signup