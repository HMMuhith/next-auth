import db from "@/mysql/connect"
import { NextResponse } from "next/server"

export const POST=async(request)=>{
    try{
const {Token,Email}=await request.json()
const sql=`SELECT * FROM next WHERE forgetPasswordToken=? AND Email=?  `
const [user]=await db.execute(sql,[Token,Email])

if(user.length===0){
    return NextResponse.json({
        Error:`No user found`
    })
}

const sql2=`UPDATE next.next SET forgetPasswordToken = NULL, forgetPasswordTokenExpiry = NULL WHERE Email=?`
await db.execute(sql2,[user[0].Email])

return NextResponse.json({
    success:true,
    message:`Your password reset successfully`
})
    }
    catch(error){
        console.log(error)
    }
}