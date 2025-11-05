'use client'
import React, { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"

const Signup = () => {

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [signupoption, setsignupoption] = useState(true)
    const [sentMail, setsentMail] = useState(false)
    const [btnValue, setbtnValue] = useState(true)
const [ButtonType,setButtonType]=useState(false)

    const notify = () => {
        setTimeout(() => {
            toast.success(`Signed up successfully`)
        }, 1850)
    }
    const failnotify = () => {
        setTimeout(() => {
            toast.error(`Signup failed`)
        }, 1850)
    }
    const signupHandler = async (e) => {
        e.preventDefault()
        try {
            setbtnValue(false)
            const request = await axios.post('/api/backend/usersignup', { Name, Email, Password })
            const response = await request.data
            console.log(response)
            notify()
            setName('')
            setEmail('')
            setPassword('')
            setsignupoption(false)
            setsentMail(true)
        }
        catch (error) {
            setbtnValue(true)
            failnotify()
            console.log(error)
        }
    }
useEffect(()=>{
    if(Name.length>0 && Email.length>0 && Password.length>0){
        setButtonType(true)
    }
},[Name.length,Email.length,Password.length])
    return (<>
        <div className="bg-slate-900 flex flex-col min-h-screen justify-center items-center">
            {
                signupoption &&
                <div className="">
                    <div>
                        <input type="text" placeholder="Name" value={Name} onChange={(e) => { setName(e.target.value) }} className="mb-4 py-2 pl-2 w-80 placeholder:text-zinc-800 placeholder:opacity-35 bg-white rounded-md focus:outline-none text-left" name="" id="" />
                    </div>
                    <div>
                        <input type="email" name="" value={Email} onChange={(e) => { setEmail(e.target.value) }} className='mb-4 py-2 w-80 pl-2 bg-white rounded-md focus:outline-none text-left placeholder:text-zinc-800 placeholder:opacity-35' placeholder="Email" id="" />
                    </div>
                    <div>
                        <input type="password" name="" value={Password} onChange={(e) => { setPassword(e.target.value) }} className="mb-4 py-2 w-80 pl-2 bg-white rounded-md focus:outline-none text-left placeholder:text-zinc-800 placeholder:opacity-35" placeholder="Password" id="" />
                    </div>
                    <div className="text-center">
                        <input type="button" name="" onClick={signupHandler} id="" className={`bg-blue-600   mb-4 text-white py-1.5 px-33 rounded-sm ${ButtonType?'cursor-pointer opacity-100':'cursor-no-drop opacity-35'}`} value={btnValue ? `Sign up` : `Processing...`} />
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