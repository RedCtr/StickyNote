import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET!
export async function middleware(req: NextRequest) {
    const token = req.cookies.get('AUTH-TOKEN')?.value
    const { pathname } = req.nextUrl

    if (!token) {
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', req.url))
    }

    jwt.verify(token, JWT_SECRET, (error, user) => {
        console.log(user);
        if (error) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
        return NextResponse.next()
    })


}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}