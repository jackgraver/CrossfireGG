import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { matchesRole } from "@/lib/role.util";

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

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: sessionData, isPending } = authClient.useSession();
    const user = sessionData?.user;

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/sign-in";
                },
            },
        });
    };

    useEffect(() => {
        const darkPref = localStorage.getItem("theme");
        if (darkPref === "light") {
            document.documentElement.classList.remove("dark");
        } else if (!darkPref || darkPref === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const isLoggedIn = !!user;

    return (
        <>
            <nav className="bg-mainBg bg-mainBgTransparent sticky top-0 z-50 backdrop-blur-md">
                {true && <div></div>}
                <div className="w-full pr-4">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                <img
                                    src="/crossfire.png"
                                    className="h-16 w-16"
                                />
                            </Link>
                        </div>
                        <div className="mt-4 flex h-min flex-col items-center gap-1 rounded-md bg-red-500 px-1 py-1">
                            <p className="pointer-events-none">ALPHA RELEASE</p>
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
                                        {isLoggedIn && (
                                            <div className="border-border border-b px-4 py-3">
                                                <Link to="/user">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0">
                                                            {user.image ? (
                                                                <img
                                                                    src={
                                                                        user.image
                                                                    }
                                                                    alt={
                                                                        user.name
                                                                    }
                                                                    className="h-10 w-10 rounded-full"
                                                                />
                                                            ) : (
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
                                                            )}
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-textPrimary text-lg font-medium">
                                                                {user.name}
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
                                            <div
                                                className="text-textSecondary hover:bg-secondBg block cursor-pointer px-4 py-2 text-sm"
                                                role="menuitem"
                                                onClick={() => toggleDarkMode()}
                                            >
                                                Toggle Dark Mode
                                            </div>
                                            {isLoggedIn ? (
                                                <button
                                                    className="text-textSecondary hover:bg-secondBg block w-full px-4 py-2 text-left text-sm"
                                                    role="menuitem"
                                                    onClick={() => {
                                                        handleSignOut();
                                                    }}
                                                    onMouseEnter={() =>
                                                        preloadImage(
                                                            "/bg-city.png",
                                                        )
                                                    }
                                                >
                                                    Sign Out
                                                </button>
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
