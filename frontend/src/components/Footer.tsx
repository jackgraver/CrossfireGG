import { Link } from "@tanstack/react-router";

const navLinks: { label: string; to: "/" | "/about" | "/partners" | "/rules" }[] = [
    { label: "Rules", to: "/rules" },
    { label: "About Us", to: "/about" },
    { label: "Partners", to: "/partners" },
    { label: "Contact", to: "/" },
];

export default function Footer() {
    return (
        <footer className="mt-auto w-full">
            <div className="flex flex-col items-center gap-8 px-4 pt-8 pb-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-4">
                <span className="w-full flex-1 text-center text-sm text-textSecondary md:text-left">
                    <span className="font-extrabold text-white text-xl">
                        CROSS<span className="text-orange-500">FIRE</span>GG
                    </span>
                    <span className="text-textSecondary text-sm pl-4">
                        © 2026 CrossfireGG. All rights reserved.
                    </span>
                </span>
                <nav
                    className="flex w-full flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:justify-center"
                    aria-label="Footer"
                >
                    {navLinks.map(({ label, to }) => (
                        <Link
                            key={label}
                            to={to}
                            className="text-textSecondary transition-colors hover:text-textPrimary"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="flex w-full flex-1 items-center justify-center gap-4 md:justify-end">
                    <a
                        href="#"
                        className="text-textSecondary transition-colors hover:text-textPrimary"
                        aria-label="X"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img src="/X logo.svg" alt="X Logo" className="h-5 w-5" />
                    </a>
                    <a
                        href="#"
                        className="text-textSecondary transition-colors hover:text-textPrimary"
                        aria-label="Discord"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img
                            src="/Discord-Symbol-White.svg"
                            alt="Discord Logo"
                            className="h-6 w-6"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
