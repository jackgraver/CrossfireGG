"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle("dark");
    if (typeof window !== "undefined") {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }
}

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const username = "ADMIN"; // This will be replaced with actual user data later

    useEffect(() => {
        const darkPref = localStorage.getItem("theme") === "dark";
        if (darkPref) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("access_token")
            : null;
    const signedIn = token !== null && token !== "";

    return (
        <nav className="bg-bg-dark">
            <div className="w-full px-4">
                <div className="flex h-16 justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <img
                                className="h-8 w-8"
                                src="/OSSLOGO.png"
                                alt="OSS Logo"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-bg-light hover:text-text-primary focus:outline-none"
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* Hamburger icon */}
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
                                {/* Close icon */}
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

                            {/* Dropdown menu */}
                            {isMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-gradient-to-b from-bg-light to-bg shadow-lg ring-1 ring-black ring-opacity-5"
                                    onMouseLeave={() => setIsMenuOpen(false)}
                                >
                                    {/* User section */}
                                    <div className="border-b border-border px-4 py-3">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-light">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-text-secondary"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-text-primary">
                                                    {username}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu items */}
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                    >
                                        <Link
                                            href="/manage-teams"
                                            className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-light"
                                            role="menuitem"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Manage Teams
                                        </Link>
                                        <Link
                                            href="/casting"
                                            className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-light"
                                            role="menuitem"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Casting
                                        </Link>
                                        <Link
                                            href="/admin"
                                            className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-light"
                                            role="menuitem"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Admin
                                        </Link>
                                        <div
                                            className="block cursor-pointer px-4 py-2 text-sm text-text-secondary hover:bg-bg-light"
                                            role="menuitem"
                                            onClick={() => toggleDarkMode()}
                                        >
                                            Toggle Dark Mode
                                        </div>
                                        {signedIn ? (
                                            <Link
                                                href="/"
                                                className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-light"
                                                role="menuitem"
                                                onClick={() =>
                                                    localStorage.removeItem(
                                                        "access_token"
                                                    )
                                                }
                                            >
                                                Sign Out
                                            </Link>
                                        ) : (
                                            <Link
                                                href="/sign-in"
                                                className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-light"
                                                role="menuitem"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
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
    );
}
