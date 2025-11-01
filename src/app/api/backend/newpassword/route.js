import db from '@/mysql/connect.js'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'


export const POST=async(request)=>{
    try{
    const {Password,Email}=await request.json()
    const salt= await bcrypt.genSalt(12)
const newhashedpassword=await bcrypt.hash(Password,salt)
    const sql=`UPDATE next SET Password=?  WHERE Email=?`
    await db.execute(sql,[newhashedpassword,Email])
    return NextResponse.json({
        success:true,
        message:`Password updated successfully`
    })
}
catch(error){
    console.log(error)
}
}