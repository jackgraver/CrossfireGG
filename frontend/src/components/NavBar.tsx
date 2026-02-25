import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { matchesRole } from "@/utils/role.util";
import { Roles } from "@repo/types";
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
import TeamLogo from "./shared/bracket/atoms/TeamLogo";
import { useSignOut } from "@/contexts/auth";
import { authClient } from "@/lib/auth/auth-client";

function toggleDarkMode() {
    if (typeof document === "undefined") return;
    const isDark = document.documentElement.classList.toggle("dark");
    if (typeof window !== "undefined") {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }
}

const preloadImage = (url: string) => {
    if (typeof window === "undefined") return;
    const img = new Image();
    img.src = url;
};

interface NavItemProps {
    to?: string;
    params?: Record<string, string>;
    icon: React.ReactNode;
    label: string;
    left?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: () => void;
}

const NavItem = ({
    to,
    params,
    icon,
    label,
    left = true,
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
                {left && icon}
                <span className="hidden sm:inline">{label}</span>
                {!left && icon}
            </Link>
        );
    }

    return (
        <button
            className={baseClasses}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {left && icon}
            <span className="hidden sm:inline">{label}</span>
            {!left && icon}
        </button>
    );
};

export default function NavBar() {
    const { user, isLoading } = useAuth();
    if (isLoading) return null;

    const signOut = useSignOut();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const darkPref = localStorage.getItem("theme");
        if (darkPref === "light") {
            document.documentElement.classList.remove("dark");
        } else if (!darkPref || darkPref === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    return (
        <nav className="bg-mainBg/80 sticky top-0 z-50 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
                <div className="flex items-center gap-1">
                    <NavItem
                        to="/tournament"
                        icon={<Trophy size={18} />}
                        label="Tournaments"
                    />
                    {matchesRole(
                        user?.roles,
                        Roles.ADMIN,
                        Roles.PRODUCTION_LEAD,
                        Roles.PRODUCTION,
                    ) && (
                        <NavItem
                            to="/casting"
                            icon={<Video size={18} />}
                            label="Casting"
                        />
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {matchesRole(user?.roles, Roles.ADMIN) && (
                        <NavItem
                            to="/admin"
                            icon={<Settings size={18} />}
                            label="Admin"
                            left={false}
                        />
                    )}
                    {user ? (
                        <div className="group relative">
                            <NavItem
                                left={false}
                                to="/user"
                                icon={
                                    <TeamLogo
                                        avatar={user.image ?? undefined}
                                        styling={"h-8 w-8 rounded-md"}
                                    />
                                }
                                label={user?.name}
                            />
                            <div className="bg-mainBg border-border invisible absolute right-0 z-20 mt-2 w-40 rounded border opacity-0 shadow-md transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                                <ul className="flex flex-col py-2">
                                    <li>
                                        <NavItem
                                            icon={<Moon size={18} />}
                                            label="Theme"
                                            onClick={() => toggleDarkMode()}
                                            left={false}
                                        />
                                    </li>
                                    <li>
                                        <NavItem
                                            left={false}
                                            to="/user"
                                            icon={<User size={16} />}
                                            label="Profile"
                                        />
                                    </li>
                                    <li>
                                        <NavItem
                                            left={false}
                                            to="/"
                                            icon={<LogOut size={18} />}
                                            label="Sign Out"
                                            onClick={() => {
                                                signOut.mutate();
                                            }}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="bg-faceit hover:bg-faceitSecondary flex cursor-pointer items-center gap-2 rounded-md py-2 pr-3 pl-2 text-sm font-bold text-black"
                            onClick={async () => {
                                if (process.env.NODE_ENV === "development") {
                                    await authClient.signIn.email({
                                        email: "root@admin.com",
                                        password: "root-password",
                                    });
                                    return;
                                }

                                await authClient.signIn.oauth2({
                                    providerId: "faceit",
                                    callbackURL:
                                        "https://crossfiregg.com/tournament",
                                });
                            }}
                        >
                            <img
                                src="/faceit.png"
                                alt="Faceit"
                                className="h-5 w-5"
                            />
                            Sign In With Faceit
                        </button>
                    )}
                </div>
            </div>

            {/* <div className="w-full px-4 pl-0">
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
                        {matchesRole(
                            user?.roles,
                            Roles.ADMIN,
                            Roles.PRODUCTION_LEAD,
                            Roles.PRODUCTION,
                        ) && (
                            <NavItem
                                to="/casting"
                                icon={<Video size={18} />}
                                label="Casting"
                            />
                        )}
                        {matchesRole(user?.roles, Roles.ADMIN) && (
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
            </div> */}
        </nav>
    );
}
