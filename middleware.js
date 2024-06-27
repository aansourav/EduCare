import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LOGIN_ROUTE, PUBLIC_ROUTES, ROOT_ROUTE } from "./lib/routes";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
    const { nextUrl } = req;
    const isAuthenticated = !!req.auth;
    const isPublicRoute = PUBLIC_ROUTES.find(
        (route) =>
            nextUrl.pathname.startsWith(route) ||
            nextUrl.pathname === ROOT_ROUTE
    );
    if (!isAuthenticated && !isPublicRoute) {
        return Response.redirect(new URL(LOGIN_ROUTE, nextUrl));
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
