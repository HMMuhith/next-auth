import { NextResponse,NextRequest } from 'next/server'
import Connection from '@/db_config/db_config'
 
// This function can be marked `async` if using `await` inside

Connection()
console.log(Connection())
export function middleware( request) {
const path=request.nextUrl.pathname 
const common_path=path==='/login' || path==='/signup' || path==='/verify' || path==='/resetpassword'
const Token=request.cookies.get('token') || ''

// if(common_path & Token){
//   return NextResponse.redirect(new URL('/', request.nextUrl))
// }
// return NextResponse.redirect(new URL('/login', request.nextUrl))
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