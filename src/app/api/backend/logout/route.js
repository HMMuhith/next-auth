import { NextResponse } from "next/server"

export const GET=async()=>{
    try{
    const res=NextResponse.json({
        success:true,
        message:`Logged out successfully`
    })
    res.cookies.set('Token', '', {maxAge:0})
    return res
}
catch(error){
    NextResponse.error(error)
}
}