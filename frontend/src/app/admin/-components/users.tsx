import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type User = {
    user_id: string;
    email: string;
    faceit_id: string;
    team_id: string;
};

export default function ManageUsers() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: () => api.get<any>("/user/all"),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    const users: User[] = data;

    return (
        <div>
            <h1>Manage Users</h1>
            <div className="flex flex-col gap-y-4">
                {users.map((user) => (
                    <div key={user.user_id} className="bg-firstBg rounded-md p-2">
                        <div>{user.user_id}</div>
                        <div>{user.email}</div>
                        <div>{user.faceit_id}</div>
                        <div>{user.team_id}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
