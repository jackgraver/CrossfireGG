import { useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { matchesRole } from "@/utils/role.util";
import { Roles } from "@repo/types";
import {
    Trophy,
    Video,
    Settings,
    User,
    LogOut,
    Moon,
    Sun,
    Monitor,
} from "lucide-react";
import TeamLogo from "./shared/bracket/atoms/TeamLogo";
import { useAuth, useSignOut } from "@/contexts/auth";
import { authClient } from "@/lib/auth/auth-client";
import { useRouteContext } from "@tanstack/react-router";
import { setThemeServerFn } from "@/lib/theme";
import { UserType } from "../contexts/auth";

interface NavItemProps {
    to?: string;
    params?: Record<string, string>;
    icon: React.ReactNode;
    label: string;
    left?: boolean;
    padding?: string;
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: () => void;
}

const NavItem = ({
    to,
    params,
    icon,
    label,
    left = true,
    padding = "px-3 py-2",
    onClick,
    onMouseEnter,
}: NavItemProps) => {
    const baseClasses =
        "flex items-center gap-2 rounded-lg text-textSecondary hover:text-textPrimary hover:bg-white/5 transition-all duration-200 text-sm font-medium " +
        padding;

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

export default function NavBar({ user }: { user: UserType }) {
    const signOut = useSignOut();
    const { theme } = useRouteContext({ from: "__root__" });
    const router = useRouter();

    function toggleDarkMode() {
        const themes = ["light", "dark", "auto"] as const;
        const next = themes[(themes.indexOf(theme) + 1) % themes.length];
        setThemeServerFn({ data: next }).then(() => router.invalidate());
    }

    return (
        <nav className="bg-mainBg/80 sticky top-0 z-50 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
                <div className="flex items-center gap-1">
                    <NavItem
                        to="/tournament"
                        icon={<Trophy size={18} />}
                        label="Tournaments"
                        padding="pr-3 py-2"
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
                                        styling={"h-8 w-8 rounded-full"}
                                    />
                                }
                                label={user?.name}
                                padding="pl-3 py-2"
                            />
                            <div className="bg-mainBg border-border invisible absolute right-0 z-20 mt-2 w-40 rounded border opacity-0 shadow-md transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                                <ul className="flex flex-col py-2">
                                    <li>
                                        <NavItem
                                            icon={
                                                theme === "dark" ? (
                                                    <Moon size={18} />
                                                ) : theme === "light" ? (
                                                    <Sun />
                                                ) : (
                                                    <Monitor />
                                                )
                                            }
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
