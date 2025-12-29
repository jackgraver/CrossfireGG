import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { logoutFn } from "@/lib/server/auth.server";
import { useAuth } from "@/contexts/auth";
import { matchesRole } from "@/lib/role.util";
import { useAppSession } from "@/contexts/session";

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle("dark");
    if (typeof window !== "undefined") {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }
}

const preloadImage = (url: string) => {
    const img = new Image();
    img.src = url;
};

export default function NavBar({ session }: { session: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const logout = useServerFn(logoutFn);

    useEffect(() => {
        const darkPref = localStorage.getItem("theme");
        if (!darkPref || darkPref === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    return (
        <>
            <nav className="bg-mainBg bg-mainBgTransparent sticky top-0 z-50 backdrop-blur-md">
                {true && <div></div>}
                <div className="w-full pr-4">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                {/* <h1 className="text-2xl font-bold">OSS</h1> */}
                                <img
                                    src="/crossfire.png"
                                    className="h-16 w-16"
                                />
                            </Link>
                        </div>
                        <div className="mt-4 flex h-min items-center rounded-md bg-red-500 px-1 py-1">
                            <p className="pointer-events-none">ALPHA RELEASE</p>
                            <p>{session?.name + " | " + session?.team_id}</p>
                        </div>

                        <div className="flex items-center">
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-textSecondary hover:bg-secondBg hover:text-textPrimary inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    <svg
                                        className={`${
                                            isMenuOpen ? "hidden" : "block"
                                        } h-6 w-6`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                    <svg
                                        className={`${
                                            isMenuOpen ? "block" : "hidden"
                                        } h-6 w-6`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                {isMenuOpen && (
                                    <div
                                        className="from-secondBg to-firstBg ring-opacity-5 absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-gradient-to-b shadow-lg ring-1 ring-black"
                                        onMouseLeave={() =>
                                            setIsMenuOpen(false)
                                        }
                                    >
                                        {session && (
                                            <div className="border-border border-b px-4 py-3">
                                                <Link to="/user">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="bg-secondBg flex h-10 w-10 items-center justify-center rounded-full">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="text-textSecondary h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-textPrimary text-lg font-medium">
                                                                {session.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                        >
                                            {matchesRole(
                                                session?.roles,
                                                "ADMIN",
                                            ) && (
                                                <Link
                                                    to="/manage-teams"
                                                    className="text-textSecondary hover:bg-secondBg block px-4 py-2 text-sm"
                                                    role="menuitem"
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                >
                                                    Manage Teams
                                                </Link>
                                            )}
                                            {matchesRole(
                                                session?.roles,
                                                "ADMIN",
                                                "PRODUCTION_LEAD",
                                                "PRODUCTION",
                                            ) && (
                                                <Link
                                                    to="/casting"
                                                    className="text-textSecondary hover:bg-secondBg block px-4 py-2 text-sm"
                                                    role="menuitem"
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                >
                                                    Casting
                                                </Link>
                                            )}
                                            {matchesRole(
                                                session?.roles,
                                                "ADMIN",
                                            ) && (
                                                <Link
                                                    to="/admin"
                                                    className="text-textSecondary hover:bg-secondBg block px-4 py-2 text-sm"
                                                    role="menuitem"
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                >
                                                    Admin
                                                </Link>
                                            )}
                                            <div
                                                className="text-textSecondary hover:bg-secondBg block cursor-pointer px-4 py-2 text-sm"
                                                role="menuitem"
                                                onClick={() => toggleDarkMode()}
                                            >
                                                Toggle Dark Mode
                                            </div>
                                            {localStorage.getItem(
                                                "team_id",
                                            ) && (
                                                <div>
                                                    <Link
                                                        to={`/team/$team_id`}
                                                        params={{
                                                            team_id:
                                                                localStorage.getItem(
                                                                    "team_id",
                                                                ) ?? "",
                                                        }}
                                                    >
                                                        <div className="text-textSecondary hover:bg-secondBg block px-4 py-2 text-sm">
                                                            Manage Team
                                                        </div>
                                                    </Link>
                                                </div>
                                            )}
                                            {session ? (
                                                <Link
                                                    to="/"
                                                    className="text-textSecondary hover:bg-secondBg block px-4 py-2 text-sm"
                                                    role="menuitem"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        logout();
                                                    }}
                                                    onMouseEnter={() =>
                                                        preloadImage(
                                                            "/bg-city.png",
                                                        )
                                                    }
                                                >
                                                    Sign Out
                                                </Link>
                                            ) : (
                                                <Link
                                                    to="/sign-in"
                                                    className="text-textSecondary hover:bg-secondBg block px-4 py-2 text-sm"
                                                    role="menuitem"
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                    onMouseEnter={() =>
                                                        preloadImage(
                                                            "/bg-city.png",
                                                        )
                                                    }
                                                >
                                                    Sign In
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
