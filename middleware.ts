import { adminRoutes, apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";
import { UserRole } from "@prisma/client";
import { auth } from "./auth";

//@ts-ignore
export default auth((req) => {
    console.log("middleware");
    const { nextUrl } = req;
    const session = req.auth;
    console.log("token", session);

    const isLoggedIn = !!session;
    console.log("isLoggedIn", isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const dynamicRoutePattern = /\/blog\/[^/]+|\/author\/[^/]+|\/contact\/[^/]+/;
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || dynamicRoutePattern.test(nextUrl.pathname);

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
        console.log("is Admin route", session)
        if (!isLoggedIn) {
            return Response.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`, nextUrl));
        }
        if (session?.user?.role !== UserRole.ADMIN) {
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