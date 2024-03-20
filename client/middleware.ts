import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'


const JWT_SECRET = process.env.JWT_SECRET!
export async function middleware(req: NextRequest) {
    const token = req.cookies.get('AUTH-TOKEN')?.value
    const { pathname } = req.nextUrl

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')

    if (!token) {
        if (isAuthPage) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
        const user = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
        console.log("user", user);

        if (isAuthPage || pathname === '/') {
            return NextResponse.redirect(new URL('/notes', req.url))
        }

        return NextResponse.next()

    } catch (error) {
        console.log(error);
    }

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