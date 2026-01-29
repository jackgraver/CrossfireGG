import { User } from "@/lib/server/auth.server";
import { Link } from "@tanstack/react-router";
import { MoveUpRight } from "lucide-react";

export default function SignUpButton({ user, isRegistered }: { user: User | null, isRegistered: boolean }) {
    const activeClass =
        "flex-start flex w-full items-center justify-center rounded-lg bg-cfRed px-4 py-2 text-xs font-black tracking-widest text-white uppercase shadow-sm transition-all hover:bg-cfRedDark gap-2";

    const getButtonContent = () => {
        if (!user) {
            return { to: "/sign-up", text: "Create Account" };
        }
        if (!user?.teamId) {
            return { to: "/register", text: "Create Team To Join" };
        }
        if (!isRegistered) {
            return { to: "/register/team", text: "Register Team" };
        }
    };

    const buttonContent = getButtonContent();

    if (!buttonContent) {
        return null;
    }
    const { to, text } = buttonContent;
    return (
        <Link className={activeClass} to={to as any}>
            <span className="flex-1">{text}</span>
            <MoveUpRight className="h-5 w-5" />
        </Link>
    );
}
