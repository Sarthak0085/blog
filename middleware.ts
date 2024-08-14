import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { getToken } from 'next-auth/jwt';
import { adminRoutes, apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";
import { UserRole } from "@prisma/client";

const secret = process.env.AUTH_SECRET || "";

const { auth } = NextAuth(authConfig);

//@ts-ignore
export default auth(async function middleware(req) {
    //@ts-ignore
    const token = await getToken({ req, secret });
    const { nextUrl } = req;
    const isLoggedIn = !!token;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const dynamicRoutePattern = /\/blog\/[^/]+|\/author\/[^/]+|\/contact\/[^/]+/;
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || dynamicRoutePattern.test(nextUrl.pathname);
    console.log("Public Route :", isPublicRoute, nextUrl.pathname);

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackURL = encodeURIComponent(callbackUrl);
        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackURL}`, nextUrl));
    }

    if (isAdminRoute) {
        if (!isLoggedIn) {
            return Response.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`, nextUrl));
        }
        console.log(req.auth);
        if (token?.role !== UserRole.ADMIN) {
            return Response.redirect(new URL('/', nextUrl));
        }
        return null;
    }

    return null;
});


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};