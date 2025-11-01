import jwt from 'jsonwebtoken'


export const Decode=async(request)=>{
    const token= await request.cookies.get('Token')?.value || ''
    const decode=await jwt.verify(token,process.env.SECRET_TOKEN)
    return decode
}