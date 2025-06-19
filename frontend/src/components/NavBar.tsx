import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const username = "ADMIN"; // This will be replaced with actual user data later

    const token = localStorage.getItem("access_token");
    const signedIn = token !== null && token !== "";

    return (
        <nav className="bg-gray-200 shadow-md">
            <div className="w-full px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
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
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
                                <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    {/* User section */}
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-gray-600"
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
                                                <p className="text-sm font-medium text-gray-900">
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
                                            to="/manage-teams"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Manage Teams
                                        </Link>
                                        {signedIn ? (
                                            <Link
                                                to="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                                                to="/sign-in"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
