import { createFileRoute } from "@tanstack/react-router";
import TournamentsSection from "./-components/TournamentsSection";

export const Route = createFileRoute("/tournament/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <TournamentsSection />;
}
