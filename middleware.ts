// import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(_req: NextRequest) {
  // const isAuthRoutes: boolean = /^(\/(login|register|password)\/?\w*)/g.test(req.nextUrl.pathname)

  // const cookieStore = await cookies()
  // const hasToken = cookieStore?.has(`token`) && Boolean(cookieStore?.get(`token`)?.value)

  // if (!isAuthRoutes && !hasToken) {
  //   const params: any = req.nextUrl.pathname + req.nextUrl.search
  //   return NextResponse.redirect(new URL(`/login?request=${btoa(params)}`, req.nextUrl))
  // } else if (isAuthRoutes && hasToken) {
  //   const params: any = req.nextUrl.searchParams
  //   const requestParam: any = await params.get('request')
  //   return NextResponse.redirect(new URL(requestParam ? atob(requestParam) : '/', req.url))
  // }
  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|media|logo|sitemap.xml|robots.txt).*)'],
}
