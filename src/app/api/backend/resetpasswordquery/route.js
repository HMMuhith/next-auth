import db from "@/mysql/connect";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import { Sendmail } from "@/sideeffect/mail";

export const POST=async(request)=>{

    const {Email}=await request.json()
    try{
const [user]=await db.execute(`SELECT * FROM next WHERE Email=?`,[Email])
if(user.length===0){
    return NextResponse.json({
        error:`user not found`
    })
}

const Token=crypto.randomBytes(32).toString('hex')
const sql=`UPDATE next SET forgetPasswordToken=?, forgetPasswordTokenExpiry=?  WHERE Email=?`
const [newUser]=await db.execute(sql,[Token,new Date(Date.now()+60*7*1000),Email])
console.log(newUser)
const [iduser]=await db.execute(`SELECT ID FROM next WHERE Email=?`, [Email])
const id=iduser[0].ID
await Sendmail(Email,'RESETPASS',id)

return NextResponse.json({
    success:true,
    user:newUser
})
}
catch(error){
console.log(error)
}
}