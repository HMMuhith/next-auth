import { NextResponse} from 'next/server'

 
// This function can be marked `async` if using `await` inside


export function middleware( request) {
const path=request.nextUrl.pathname 
const token=request.cookies.get('Token') 

if(path==='/verify' && !token){
return NextResponse.redirect(new URL('/login', request.nextUrl))
}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/user',
    '/login',
    '/signup',
    '/verify',
    '/resetpasswordquery',
    '/resetpassword',
    '/newpassword'
  ]
}