import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import db from '@/mysql/connect'
import crypto from 'crypto'

export const Sendmail=async(email,TypeEmail,ID)=>{
    try{
      if(TypeEmail==='VERIFY'){
    const salt=await bcrypt.genSalt(12)
const hashedToken= await bcrypt.hash(ID?.toString(),salt)


// await USER.findByIdAndUpdate(ID,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+60*60*1000})
const sql=`UPDATE next SET verifyToken=?, verifyTokenExpiry=? WHERE ID=?`
const expiry=Date.now()+60*60
const expiryDate = new Date(expiry).toISOString().slice(0, 19).replace('T', ' ');
await db.execute(sql,[hashedToken,expiryDate,ID])
 var Transport= await nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5c7236a76bb00f",
    pass: "378157625339b8"
  }
})

const Mail={
    from:'dev.muhith1@gmail.com',
    to:email,
    subject:TypeEmail==='VERIFY'? 'verify your email':'',
    html:`<p>Cilck <a href='${process.env.DOMAIN}/verify?token=${hashedToken}'>here</a> to ${TypeEmail==='VERIFY'?'verify your email':''} or copy paste the link below in your browser <br> ${process.env.DOMAIN}/verify?token=${hashedToken}</p>`
}
const mailResponse=await Transport.sendMail(Mail)
return mailResponse
}

if(TypeEmail==='RESETPASS'){
const Token=crypto.randomBytes(32).toString('hex')

    const sql=`UPDATE next SET forgetPasswordToken=?,  forgetPasswordTokenExpiry=? WHERE Email=?`
const expiry=Date.now()+60*60
const expiryDate = new Date(expiry).toISOString().slice(0, 19).replace('T', ' ');
await db.execute(sql,[Token,expiryDate,email])
 var Transport= await nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bfe6c658ba74c4",
    pass: "1fa8d2c19d604f"
  }
})

const Mail={
    from:'dev.muhith1@gmail.com',
    to:email,
    subject:TypeEmail==='RESETPASS'? 'Reset your password':'',
    html:`<p>Cilck <a href='${process.env.DOMAIN}/resetpassword?token=${Token}&email=${email}'>here</a> to ${TypeEmail==='RESETPASS'?'Reset your password ':''} or copy paste the link below in your browser <br> ${process.env.DOMAIN}/resetpassword?token=${Token}&email=${email}</p>`
}
const mailResponse=await Transport.sendMail(Mail)
return mailResponse
}
    }
    catch(error){
        console.log(error)
        throw new Error(error)
    }
}