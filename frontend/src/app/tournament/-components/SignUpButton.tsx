import { Link } from "@tanstack/react-router";
import { MoveUpRight } from "lucide-react";

export default function SignUpButton({ session }: { session: any }) {
    const activeClass =
        "flex-start flex w-full items-center justify-center rounded-lg bg-cfRed px-4 py-2 text-xs font-black tracking-widest text-white uppercase shadow-sm transition-all hover:bg-cfRedDark gap-2";

    const getButtonContent = () => {
        //TODO: revert this
        // if (!hasSession(session)) {
        //     return { to: "/sign-up", text: "Create Account" };
        // }
        if (!session?.team_id) {
            return { to: "/register", text: "Create Team To Join" };
        }
        return { to: "/tournament", text: "Join Tournament" };
    };

    const { to, text } = getButtonContent();

    return (
        <Link className={activeClass} to={to as any}>
            <span className="flex-1">{text}</span>
            <MoveUpRight className="h-5 w-5" />
        </Link>
    );
}
