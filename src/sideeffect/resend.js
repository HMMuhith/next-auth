import { Resend } from 'resend';
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import db from '@/mysql/connect';

export const ResendMail=async(email,TypeEmail,ID)=>{
const resend = new Resend(process.env.RESEND_API);
try{
    console.log(process.env.RESEND_API)
if(TypeEmail==='VERIFY'){
const salt=await bcrypt.genSalt(12)
const hashedToken= await bcrypt.hash(ID?.toString(),salt)

const sql=`UPDATE next SET verifyToken=?, verifyTokenExpiry=? WHERE ID=?`
const expiry=Date.now()+60*60
const expiryDate = new Date(expiry).toISOString().slice(0, 19).replace('T', ' ');
await db.execute(sql,[hashedToken,expiryDate,ID])
  return  await resend.emails.send({
  from: 'onboarding@resend.dev',
  to:email ,
  subject: 'verify your email',
  html: `<p>Cilck <a href='${process.env.DOMAIN}/verify?token=${hashedToken}'>here</a> to ${TypeEmail==='VERIFY'?'verify your email':''} or copy paste the link below in your browser <br> ${process.env.DOMAIN}/verify?token=${hashedToken}</p>`
});
}
     
if(TypeEmail==='RESETPASS'){
const Token=crypto.randomBytes(32).toString('hex')

    const sql=`UPDATE next SET forgetPasswordToken=?,  forgetPasswordTokenExpiry=? WHERE Email=?`
const expiry=Date.now()+60*60
const expiryDate = new Date(expiry).toISOString().slice(0, 19).replace('T', ' ');
await db.execute(sql,[Token,expiryDate,email])
return  await resend.emails.send({
  from: 'onboarding@resend.dev',
  to:email ,
  subject: 'reset your password',
  html: `<p>Cilck <a href='${process.env.DOMAIN}/resetpassword?token=${Token}&email=${email}'>here</a> to ${TypeEmail==='RESETPASS'?'Reset your password ':''} or copy paste the link below in your browser <br> ${process.env.DOMAIN}/resetpassword?token=${Token}&email=${email}</p>`
});
}
}
catch(error){
console.log(error)
}
}
