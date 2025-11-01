import db from "@/mysql/connect";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Sendmail } from "@/sideeffect/mail";

export const POST=async(request)=>{
    try{
const {Email,Password}=await request.json()
const sql=`SELECT * FROM next WHERE Email=?`

const [user]= await db.execute(sql,[Email])
const checkUser=user[0]
if(user.length===0){
    return NextResponse.json({
error:`user doesn't exist`
    })

}

const checkPassword= await bcrypt.compare(Password,checkUser.Password)
if(!checkPassword){
    return NextResponse.json({
        error:`Error password`
    })
}

const userdata={
    Name:checkUser.Name,
    Email:checkUser.Email,
    Password:checkUser.Password
}
const Token= await jwt.sign(userdata,process.env.SECRET_PASS,{expiresIn:60*60*2})


const response= NextResponse.json({
success:true,
Token
})
response.cookies.set(`Token`,Token,{
    httpOnly:true, 
    secure:true,
    maxAge:60*60*2
  })

  return response
    }
    catch(error){
        console.log(error)
    }

}