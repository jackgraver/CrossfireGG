import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;

    const protectedRoutes = ["/admin", "/manage-teams", "/casting"];

    console.log("middleware");
    if (
        protectedRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route),
        )
    ) {
        if (!token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/manage-teams/:path*", "/casting/:path*"],
};
