import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  /* const { pathname } = request.nextUrl

  if (pathname === routes.login) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value

  if (!token) {
    return NextResponse.redirect(new URL(routes.login, request.url))
  }

  const user = await getUser()

  if (!user) {
    return NextResponse.redirect(new URL(routes.login, request.url))
  } */

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
