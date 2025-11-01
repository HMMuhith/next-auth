import db from '@/mysql/connect'
import { NextResponse } from 'next/server.js'


export const GET=async()=>{
    try{
const sql=`CREATE TABLE next(
ID INTEGER PRIMARY KEY AUTO_INCREMENT,
Name VARCHAR(100) ,
Email VARCHAR(100) UNIQUE ,
Password VARCHAR(100),
verified TINYINT(1) DEFAULT 0,

  forgotPasswordToken VARCHAR(255),
  forgotPasswordTokenExpiry DATETIME,
  verifyToken VARCHAR(255),
  verifyTokenExpiry DATETIME
)`


 await db.execute(sql)
    
    return NextResponse.json({
        success:true,
        message:`Database table created successfully`
    })
    
    }
    catch(error){
        console.log(error)
    }

}
