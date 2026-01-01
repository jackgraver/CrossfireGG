import { Link } from "@tanstack/react-router";
import { hasSession } from "@/lib/auth.util";

export default function SignUpButton({ session }: { session: any }) {
    const className="rounded-md bg-blue-500 px-4 py-2 font-bold text-gray-100 hover:bg-blue-600"
    if (!hasSession(session)) {
        return <Link className={className} to="/sign-up">Create Account</Link>;
    }
    if (hasSession(session) && !session?.team_id) {
        return <Link className={className} to="/">Create Team</Link>;
    }

    return <Link className={className} to="/tournament">Join Tournament</Link>;
}