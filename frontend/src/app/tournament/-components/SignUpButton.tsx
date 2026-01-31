import { useAuth } from "@/contexts/auth";
import { useDialog } from "@/shared/dialog/DialogProvider";
import { Link } from "@tanstack/react-router";
import { MoveUpRight } from "lucide-react";

export default function SignUpButton() {
    const { user, isLoading: isAuthLoading } = useAuth();

    const { openDialog } = useDialog();

    if (isAuthLoading) {
        return null;
    }

    const activeClass =
        "flex w-full items-center justify-center rounded-lg bg-cfRed px-4 py-2 text-xs font-black tracking-widest text-white uppercase shadow-sm transition-all hover:bg-cfRedDark gap-2";

    const getButtonContent = () => {
        if (!user) {
            return { to: "/sign-up", text: "Create Account" };
        }
        if (!user?.teamId) {
            return { to: "/register/team", text: "Create Team To Join" };
        }
        return {
            to: "/register/team",
            text: "Sign Up Team",
            onClick: () =>
                openDialog({
                    title: "Sign Up Team",
                    content: (
                        <div>
                            <p>
                                You are already signed up for a team. Do you want to sign up for
                                another team?
                            </p>
                        </div>
                    ),
                    onConfirm: () => {
                        console.log("confirm");
                    }
                }),
        };
    };

    const { to, text, onClick } = getButtonContent();

    return onClick ? (
        <button className={activeClass} type="button" onClick={onClick}>
            <div className="flex items-center justify-center gap-2 w-full">
                <span className="flex items-center justify-center">{text}</span>
                <MoveUpRight className="h-5 w-5 flex items-center justify-center" />
            </div>
        </button>
    ) : (
        <Link className={activeClass} to={to as any}>
            <div className="flex items-center justify-center gap-2 w-full">
                <span className="flex items-center justify-center">{text}</span>
                <MoveUpRight className="h-5 w-5 flex items-center justify-center" />
            </div>
        </Link>
    );
}
