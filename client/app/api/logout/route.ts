import { cookies } from "next/headers"

export async function GET(req: Request) {
    cookies().set('AUTH-TOKEN', '', { expires: new Date(0) })
    return Response.json({ logout: true })
}