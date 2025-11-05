'use client'
import React,{ useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"

 const Login=()=>{
const router=useRouter()
const [Email,setEmail]=useState('')
const [Password,setPassword]=useState('')
const [ButtonType,setButtonType]=useState(false)
const [Loading,setLoading]=useState(false)

const notify=()=>{
    setTimeout(()=>{
        toast.success(`Loggedin successfully`)
        setLoading(false)
},3800)
   setTimeout(()=>router.push('/'),5300) 
   
}
const failnotify=()=>{
    setTimeout(()=>{
        toast.error(`Login failed`)
        setLoading(false)
    }
    ,3800)
    
}

const LoginHandler=async()=>{
    try {
        setLoading(true)
        const request=await axios.post('/api/backend/userlogin',{
            Email,Password
        })
        const response=await request.data
        console.log(response)
        if(request.data.success===true){
  console.log(response)
  localStorage.setItem('user',request.data?.Name)
       return notify()
        }
        
       return failnotify()
        
    } catch (error) {
        failnotify()
        console.log(error)
    }
   
}
// const ResetHandler=async()=>{
//     const request=await axios.post('/api/backend/resetpassword')
// }
useEffect(()=>{
    if(Email.length>0 && Password.length>0){
        setButtonType(true)
    }
    else{
        setButtonType(false)
    }
},[Email.length,Password.length])
// router.push()
return(<>
<div className="bg-slate-900 min-h-screen flex flex-col justify-center items-center">
<div className="flex flex-col justify-center items-center">
<div>
    <input type="Email" className="bg-white py-1.5 mb-6 px-14 rounded-sm focus:outline-none" name="" id="" value={Email} onChange={(e)=>{ setEmail(e.target.value)}} />
</div>
<div>
    <input type="password" name="" className="bg-white py-1.5 mb-8 rounded-sm px-14 focus:outline-none" value={Password} id="" onChange={(e)=>{setPassword(e.target.value)}} />
</div>
<div >
    <input type="button" onClick={LoginHandler} className={`bg-blue-600   mb-4 text-white py-1.5 px-33 rounded-sm ${ButtonType?'cursor-pointer opacity-100':'cursor-no-drop opacity-35'} `} value={Loading?`Processing...` :'Login'} />
</div>
<div className="flex flex-col gap-2 justify-center items-center">
<Link className="text-white" href='/signup'>Sign up</Link>
<Link className="text-orange-600" href='/resetpasswordquery'>Forget password?</Link>
</div>
</div>
</div>
</>)
}

export default Login