import db from "@/mysql/connect";
import bcrypt from 'bcrypt'
import { NextResponse,NextRequest } from "next/server";
// import { Sendmail } from "@/sideeffect/mail";
import { ResendMail } from "@/sideeffect/resend.js";

export const POST=async(request)=>{

const {Name,Email,Password}=await request.json()
try{
const [user]=await db.execute(`SELECT ID FROM next WHERE Email=?`,[Email])
if(user.length >0){
    return NextResponse.json({
        error:`user already exists`
    })
}

const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(Password,salt)
const sql=`INSERT INTO next (Name,Email,Password) VALUES (?,?,?)`
const [newUser]=await db.execute(sql,[Name,Email,hashedPassword])
console.log(newUser)
// await Sendmail(Email,'VERIFY',newUser?.insertId)
await ResendMail(Email,'VERIFY',newUser?.insertId)
return NextResponse.json({
    success:true,
    user:newUser
})
}
catch(error){
console.log(error)
}
}
