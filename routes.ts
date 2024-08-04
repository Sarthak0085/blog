/**
 *  An array of routes that are accessible to public
 * These routes doesn't require authentication
 * @type {string[]}
*/

export const publicRoutes = [
    "/",
    "/auth/verification"
];

/**
 *  An array of routes that are used for authentication 
 * These routes will send logged in users to directly settings
 * @type {string[]}
*/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/**
 *  An array of routes that only be used by admin 
 * These routes will send users to home if role is not admin
 * @type {string[]}
*/
export const adminRoutes = [
    "/admin/get-blogs",
    "/admin/get-users",
    "/admin/get-categories",
    "/admin/get-comments",
    "/admin/get-likes",
    "admin/get-dislikes",
    "/admin/get-favourites",
    "/admin/get-saved-posts",
    "/admin/add-blog",
    "/admin/edit-blog/[id]",
];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purpose
 * @type {string[]}
*/
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string[]}
*/
export const DEFAULT_LOGIN_REDIRECT = "/client";