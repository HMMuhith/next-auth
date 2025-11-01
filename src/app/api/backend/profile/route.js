import { Decode } from "@/sideeffect/decode";
import USER from "@/models/usermodel";
import { NextResponse } from "next/server";


export const GET=async(request)=>{
    const {id}=await Decode(request)
   const user=await USER.findById(id).select("-password")
   console.log(user)
   return NextResponse.json({user})
}