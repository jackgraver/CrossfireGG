import { cn } from "@/utils/cn";
import {
    createFileRoute,
    Link,
    Outlet,
    useMatchRoute,
} from "@tanstack/react-router";

export const Route = createFileRoute("/admin/manage/tournament/$tournament_id")(
    {
        component: RouteComponent,
    },
);

function RouteComponent() {
    const tournament_id = "1";

    const matchRoute = useMatchRoute();
    const isActiveTab = (to: string, exact: boolean) => {
        if (exact) {
            return matchRoute({ to }) !== false;
        }
        return matchRoute({ to, fuzzy: true }) !== false;
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <Link
                    to="/admin/manage/tournament/$tournament_id/teams"
                    params={{ tournament_id }}
                    className={cn(
                        `relative rounded-md bg-gray-500 px-6 py-3 text-sm font-medium transition-colors ${
                            isActiveTab("/admin/manage/tournament/teams", true)
                                ? "text-textPrimary bg-gray-600"
                                : "text-textSecondary hover:text-textPrimary"
                        }`,
                    )}
                >
                    Teams
                </Link>
                <Link
                    to="/admin/manage/tournament/$tournament_id/stages"
                    params={{ tournament_id }}
                    className={cn(
                        `relative rounded-md bg-gray-500 px-6 py-3 text-sm font-medium transition-colors ${
                            isActiveTab("/admin/manage/tournament/stages", true)
                                ? "text-textPrimary bg-gray-600"
                                : "text-textSecondary hover:text-textPrimary"
                        }`,
                    )}
                >
                    Stages
                </Link>
            </div>
            <Outlet />
        </div>
    );
}
