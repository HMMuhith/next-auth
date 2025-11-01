
import { NextRequest, NextResponse } from "next/server";
import db from "@/mysql/connect";


export async function POST(request){

    try {
    
        const {Token} = await request.json()
        console.log(Token);
const sql=`SELECT * FROM next WHERE verifyToken =? `
        // const user = await USER.find({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
const [user]=await db.execute(sql,[Token])
        if (user.length===0) {
            return NextResponse.json({error: "Invalid token"})
        }
        console.log(user);

        // user.verfied = true;
        // user.verifyToken = undefined;
        // user.verifyTokenExpiry = undefined;
        // await user.save();
        const updatesql=`UPDATE next SET verified=true ,verifyToken=NULL, verifyTokenExpiry=NULL`
        await db.execute(updatesql)
        return NextResponse.json({
            success: true,
            message: "Email verified successfully"
        })


    } catch (error) {
        return NextResponse.json({error})
    }

}
