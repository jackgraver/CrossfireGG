import { createFileRoute } from "@tanstack/react-router";
import ManageTournaments from "./-components/tournaments";
import ManageUsers from "./-components/users";
import ManageTeams from "./-components/teams";
import { api } from "@/lib/api";
import ProtectedRoute from "@/shared/ProtectedRoute";

export const Route = createFileRoute("/admin/")({
    component: Admin,
});

function Admin() {
    // const queryClient = useQueryClient();

    return (
        <div className="bg-mainBg text-textPrimary min-h-screen p-8">
            <div className="flex flex-col gap-y-4">
                <h1>Admin Configuation</h1>
                <div>
                    {/* <button
                        className="rounded-md bg-gray-600 p-2"
                        onClick={() =>
                            api
                                .get("/match/refresh")
                                .then((data) => console.log(data))
                        }
                    >
                        Refresh Teams
                    </button> */}
                    <ManageTournaments />
                    {/* <ManageUsers />
                    <ManageTeams />
                    <div className="gap-y-4">
                        <button
                            onClick={() => api.get("/user/user-role")}
                            className="rounded-md bg-gray-600 p-2"
                        >
                            User Role
                        </button>
                        <button
                            onClick={() => api.get("/match/refresh")}
                            className="rounded-md bg-gray-600 p-2"
                        >
                            Refresh
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
