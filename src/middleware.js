// Next Imports
import { NextResponse } from 'next/server'

// Third-party Imports
import Negotiator from 'negotiator'
import { withAuth } from 'next-auth/middleware'
import { match as matchLocale } from '@formatjs/intl-localematcher'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getLocalizedUrl, isUrlMissingLocale } from '@/utils/i18n'
import { ensurePrefix, withoutSuffix } from '@/utils/string'

// Constants
const HOME_PAGE_URL = '/dashboards/crm'

const getLocale = request => {
  // Try to get locale from URL
  const urlLocale = i18n.locales.find(locale => request.nextUrl.pathname.startsWith(`/${locale}`))

  if (urlLocale) return urlLocale

  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders = {}

  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)
  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export default withAuth(
  async function middleware(request) {
    // Get locale from request headers
    const locale = getLocale(request)
    const pathname = request.nextUrl.pathname

    // If the user is logged in, `token` will be an object containing the user's details
    const token = request.nextauth.token

    // Check if the user is logged in
    const isUserLoggedIn = !!token

    // Guest routes (Routes that can be accessed by guest users who are not logged in)
    const guestRoutes = ['login', 'register', 'forgot-password']

    // Shared routes (Routes that can be accessed by both guest and logged in users)
    const sharedRoutes = ['shared-route']

    // Private routes (All routes except guest and shared routes that can only be accessed by logged in users)
    const privateRoute = ![...guestRoutes, ...sharedRoutes].some(route => pathname.endsWith(route))

    // If the user is not logged in and is trying to access a private route, redirect to the login page
    // if (!isUserLoggedIn && privateRoute) {
    //   let redirectUrl = '/login'

    //   if (!(pathname === '/')) {
    //     const searchParamsStr = new URLSearchParams({ redirectTo: withoutSuffix(pathname, '/') }).toString()

    //     redirectUrl += `?${searchParamsStr}`
    //   }

    //   return localizedRedirect(redirectUrl, request)
    // }

    // If the user is logged in and is trying to access a guest route, redirect to the root page
    const isRequestedRouteIsGuestRoute = guestRoutes.some(route => pathname.endsWith(route))

    // if (isUserLoggedIn && isRequestedRouteIsGuestRoute) {
    //   return localizedRedirect(HOME_PAGE_URL, request)
    // }

    // // If the user is logged in and is trying to access root page, redirect to the home page
    // if (pathname === '/') {
    //   return localizedRedirect(HOME_PAGE_URL, request)
    // }

    // If pathname already contains a return next() else redirect with localized URL
    // return isUrlMissingLocale(pathname) ? localizedRedirect(pathname, request) : NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      }
    }
  }
)

// Matcher Config
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - all items inside the public folder
     *    - images (public images)
     *    - next.svg (Next.js logo)
     *    - vercel.svg (Vercel logo)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg).*)'
  ]
}
