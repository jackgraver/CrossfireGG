import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$team_id/members")({
    component: RouteComponent,
});

function RouteComponent() {
    const { team_id } = Route.useParams();

    return <div>Hello "/team/$team_id/members" {team_id}!</div>;
}
