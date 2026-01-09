import { Link } from "@tanstack/react-router";
import { hasSession } from "@/lib/auth.util";

export default function SignUpButton({ session }: { session: any }) {
    const activeClass =
        "flex w-full items-center justify-center rounded-xl bg-cfRed py-3 text-xs font-black tracking-widest text-white uppercase shadow-sm transition-all hover:bg-cfRedDark";

    const getButtonContent = () => {
        //TODO: revert this
        // if (!hasSession(session)) {
        //     return { to: "/sign-up", text: "Create Account" };
        // }
        if (!session?.team_id) {
            return { to: "/register", text: "Create Team" };
        }
        return { to: "/tournament", text: "Join Tournament" };
    };

    const { to, text } = getButtonContent();

    return (
        <Link className={activeClass} to={to as any}>
            {text}
        </Link>
    );
}
