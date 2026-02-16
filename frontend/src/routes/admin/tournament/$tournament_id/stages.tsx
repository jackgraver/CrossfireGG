import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/tournament/$tournament_id/stages")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/admin/manage-tournament/stages"!</div>;
}
