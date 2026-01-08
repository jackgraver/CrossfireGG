import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$team_id/matches")({
    component: RouteComponent,
});

function RouteComponent() {
    const { team_id } = Route.useParams();

    return <div>Hello "/team/$team_id/matches" {team_id}!</div>;
}
