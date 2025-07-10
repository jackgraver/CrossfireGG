import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type Role = 1 | 2 | 3;

interface TokenPayload {
    sub: string;
    roles: Role[];
    exp: number;
}

const protectedRoutes: { route: string; roles: Role[] }[] = [
    { route: "/admin", roles: [1] },
    { route: "/manage-teams", roles: [1] },
    { route: "/casting", roles: [1, 2, 3] },
];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;

    console.log(token);

    const pathname = request.nextUrl.pathname;

    const matchedRoute = protectedRoutes.find((r) =>
        pathname.startsWith(r.route),
    );

    if (!matchedRoute) return NextResponse.next(); // Not protected

    if (!token) {
        console.log("no token");
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        const decoded = jwtDecode<TokenPayload>(token);

        const userRoles = decoded.roles || [];

        const isAllowed = matchedRoute.roles.some((role) =>
            userRoles.includes(role),
        );

        if (!isAllowed) {
            console.log("not allowed");
            return NextResponse.redirect(new URL("/", request.url));
        }
    } catch (err) {
        console.log("err");
        console.error("Invalid token:", err);
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/manage-teams/:path*", "/casting/:path*"],
};
