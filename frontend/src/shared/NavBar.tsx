import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { logoutFn } from "@/lib/server/auth.server";
import { matchesRole } from "@/lib/role.util";
import {
    Trophy,
    Users,
    Video,
    Settings,
    User,
    LogIn,
    LogOut,
    Moon,
} from "lucide-react";
import { useAuth } from "@/contexts/auth";

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

interface NavItemProps {
    to?: string;
    params?: Record<string, string>;
    icon: React.ReactNode;
    label: string;
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: () => void;
}

const NavItem = ({
    to,
    params,
    icon,
    label,
    onClick,
    onMouseEnter,
}: NavItemProps) => {
    const baseClasses =
        "flex items-center gap-2 px-3 py-2 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-white/5 transition-all duration-200 text-sm font-medium";

    if (to) {
        return (
            <Link
                to={to}
                params={params}
                className={baseClasses}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
            >
                {icon}
                <span className="hidden sm:inline">{label}</span>
            </Link>
        );
    }

    return (
        <button
            className={baseClasses}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
};

export default function NavBar() {
    const { user } = useAuth();
    const logout = useServerFn(logoutFn);

    useEffect(() => {
        const darkPref = localStorage.getItem("theme");
        if (darkPref === "light") {
            document.documentElement.classList.remove("dark");
        } else if (!darkPref || darkPref === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    return (
        <nav className="bg-mainBg/80 sticky top-0 z-50 backdrop-blur-md">
            <div className="w-full px-4 pl-0">
                <div className="flex h-14 items-center justify-between">
                    <Link to="/" className="shrink-0">
                        <img
                            src="/crossfire.png"
                            className="h-14 w-14"
                            alt="Crossfire"
                        />
                    </Link>
                    <div className="flex items-center gap-1">
                        <NavItem
                            to="/tournament"
                            icon={<Trophy size={18} />}
                            label="Tournaments"
                        />
                        {user?.teamId && (
                            <NavItem
                                to="/team/$team_id"
                                params={{ team_id: user.teamId.toString() }}
                                icon={<Users size={18} />}
                                label="My Team"
                            />
                        )}
                        {matchesRole(user?.roles, "ADMIN") && (
                            <NavItem
                                to="/manage-teams"
                                icon={<Users size={18} />}
                                label="Manage Teams"
                            />
                        )}
                        {matchesRole(
                            user?.roles,
                            "ADMIN",
                            "PRODUCTION_LEAD",
                            "PRODUCTION",
                        ) && (
                            <NavItem
                                to="/casting"
                                icon={<Video size={18} />}
                                label="Casting"
                            />
                        )}
                        {matchesRole(user?.roles, "ADMIN") && (
                            <NavItem
                                to="/admin"
                                icon={<Settings size={18} />}
                                label="Admin"
                            />
                        )}
                        <NavItem
                            icon={<Moon size={18} />}
                            label="Theme"
                            onClick={() => toggleDarkMode()}
                        />
                        {user ? (
                            <>
                                <NavItem
                                    to="/user"
                                    icon={<User size={18} />}
                                    label={user?.name}
                                />
                                <NavItem
                                    to="/"
                                    icon={<LogOut size={18} />}
                                    label="Sign Out"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                    }}
                                    onMouseEnter={() =>
                                        preloadImage("/bg-city.png")
                                    }
                                />
                            </>
                        ) : (
                            <NavItem
                                to="/sign-in"
                                icon={<LogIn size={18} />}
                                label="Sign In"
                                onMouseEnter={() =>
                                    preloadImage("/bg-city.png")
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
