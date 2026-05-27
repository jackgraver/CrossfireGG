import { createFileRoute, Link } from "@tanstack/react-router";
import { Roles } from "@repo/types";
import { Trophy, Users, Settings, Video, LogOut, Plus, Pencil } from "lucide-react";
import { UserWithRolesDTO } from "@repo/contracts";
import { redirect } from "@tanstack/react-router";
import { useAllTournaments } from "@/lib/api/tournament.queries";
import { useStaffUsers } from "@/lib/api/user.queries";
import StaffRoleAssignmentForm from "@/routes/admin/-components/StaffRoleAssignmentForm";

export const Route = createFileRoute("/admin/")({
    beforeLoad: async ({ context }) => {
        const { user } = context;
        if (!user || !user.roles || !user.roles.includes(Roles.ADMIN)) {
            throw redirect({
                to: "/",
            });
        }
    },
    component: Admin,
});

function Admin() {
    const { data: tournaments } = useAllTournaments();
    const { data: users } = useStaffUsers();

    return (
        <div className="mx-auto min-h-screen max-w-7xl p-6">
            <h1 className="mb-8 text-3xl font-bold">Staff Dashboard</h1>
            <div className="mb-12">
                <div className="flex items-center justify-between">
                    <h2 className="text-textSecondary mb-4 flex items-center gap-2 text-xl font-semibold">
                        <Trophy size={20} />
                        Tournaments
                    </h2>
                    <Link
                        to="/admin/tournament/create"
                        className="border-cfRed hover:bg-cfRed/80 flex items-center gap-2 rounded-md border px-4 py-2 text-white"
                    >
                        <Plus size={16} />
                        Create Tournament
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tournaments?.map((tournament: any) => (
                        <div
                            key={tournament.id}
                            className="group bg-firstBg border-border hover:border-cfRed hover:shadow-cfRed/5 relative rounded-xl border p-4 transition-all duration-200 hover:shadow-lg"
                        >
                            <Link
                                to="/admin/tournament/$tournament_id"
                                params={{
                                    tournament_id: tournament.id.toString(),
                                }}
                                className="flex flex-col gap-1"
                            >
                                <span className="group-hover:text-cfRed text-lg font-bold transition-colors">
                                    {tournament.name}
                                </span>
                                <span className="text-textSecondary text-sm tracking-wider uppercase">
                                    Manage Tournament
                                </span>
                            </Link>
                            <Link
                                to="/admin/tournament/create"
                                search={{
                                    tournamentId: tournament.id.toString(),
                                }}
                                className="text-textSecondary hover:text-cfRed hover:bg-cfRed/10 absolute top-3 right-3 rounded-lg p-2"
                                title="Edit tournament"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Pencil size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-textSecondary mb-4 flex items-center gap-2 text-xl font-semibold">
                    <Users size={20} />
                    Staff
                </h2>
                <StaffRoleAssignmentForm />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {users?.map((user: UserWithRolesDTO) => (
                        <div
                            key={user.id}
                            className="bg-firstBg border-border group relative flex flex-col rounded-xl border p-5 transition-all duration-200 hover:shadow-xl"
                        >
                            <div className="mb-4 flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-textPrimary truncate text-lg font-bold">
                                            {user.name}
                                        </span>
                                    </div>
                                    <div className="text-textSecondary/70 truncate text-sm">
                                        {user.email}
                                    </div>
                                </div>

                                <button
                                    className="text-textSecondary hover:text-cfRed hover:bg-cfRed/10 rounded-lg p-2 opacity-0 transition-all group-hover:opacity-100"
                                    title="Delete user"
                                    onClick={() => {
                                        // TODO: Implement delete logic
                                    }}
                                >
                                    <LogOut size={16} className="rotate-90" />
                                </button>
                            </div>

                            <div className="mt-auto flex flex-wrap gap-1.5">
                                {user.userRoles.map((userRole) => {
                                    const roleName = userRole.role.name;
                                    return (
                                        <span
                                            key={userRole.id.toString()}
                                            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-black tracking-wider uppercase ${
                                                roleName === "ADMIN"
                                                    ? "bg-cfRed/10 text-cfRed border-cfRed/20"
                                                    : roleName === "PRODUCTION_LEAD"
                                                      ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                                                      : roleName === "PRODUCTION"
                                                        ? "border-blue-500/20 bg-blue-500/10 text-blue-500"
                                                        : "text-textSecondary border-white/10 bg-white/5"
                                            }`}
                                        >
                                            {roleName === "ADMIN" && <Settings size={10} />}
                                            {roleName === "PRODUCTION_LEAD" && <Trophy size={10} />}
                                            {roleName === "PRODUCTION" && <Video size={10} />}
                                            {roleName.replace("_", " ")}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
