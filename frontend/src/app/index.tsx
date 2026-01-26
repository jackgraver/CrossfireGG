import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MoveUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen flex-col items-center">
            <div className="flex flex-row items-center">
                <img src="/crossfire.png" className="h-96 w-96" />
                <div className="flex flex-col text-center">
                    <h1 className="text-6xl font-bold">CROSSFIREGG</h1>
                    <p className="text-xl text-red-500">#CAUGHTINTHECROSSFIRE</p>
                </div>
            </div>
            <div className="text-6xl">WORK IN PROGRESS :)</div>
            <div className="flex flex-row gap-32 pt-64">
                <button
                    onClick={() => navigate({ to: "/tournament" })}
                    className="flex w-64 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white"
                >
                    Browse Tournaments
                    <MoveUpRight className="h-5 w-5" />
                </button>
                <button
                    onClick={() =>
                        navigate({
                            to: "/team/$team_id",
                            params: { team_id: "1" },
                        })
                    }
                    className="flex w-64 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white"
                >
                    Manage / Create Team
                    <MoveUpRight className="h-5 w-5" />
                </button>
                <button
                    className="flex w-64 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white"
                    onClick={() =>
                        navigate({
                            to: "/manage-teams",
                        })
                    }
                >
                    ---
                    <MoveUpRight className="h-5 w-5" />
                </button>
                <button className="flex w-64 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white">
                    ---
                    <MoveUpRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
