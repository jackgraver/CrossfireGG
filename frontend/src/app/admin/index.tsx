import { createFileRoute } from "@tanstack/react-router";
import { useCreateTournamentForm } from "./-hooks/useCreateTournamentForm";
import { Plus, SaveIcon, Trash2 } from "lucide-react";
import { useStore } from "@tanstack/react-form";
import CreateTournaments from "./-components/CreateTournaments";
import MangeTournamentSignups from "./-components/MangeTournamentSignups";

export const Route = createFileRoute("/admin/")({
    component: Admin,
});

function Admin() {
    return (
        <>
            <CreateTournaments />
            <MangeTournamentSignups />
        </>
    );
}
