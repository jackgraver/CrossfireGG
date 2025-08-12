"use client";

import { api } from "@/lib/api";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import FileDropper from "@/shared/OSSForm/FileDropper/FileDropper";
import OSSForm from "@/shared/OSSForm/OSSForm";
import UserForm from "@/shared/UserForm";
import { useState } from "react";
import ReRegisterModal from "./ReRegisterModal";
import { PromiseReturn } from "@/types/Types";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [teamName, setTeamName] = useState("");

    const [teamLink, setTeamLink] = useState("");
    const [faceitLinkError, setFaceitLinkError] = useState("");

    const [players, setPlayers] = useState("");

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();

        try {
            const response: { team_id: string } = await api.post(
                "/team/register",
                {
                    team_name: teamName,
                    faceit_link: teamLink,
                    starters: players.split("\n"),
                },
            );
            localStorage.setItem("team_id", response.team_id);
            // return success
            return { success: true, result: response.team_id };
        } catch (err) {
            console.error("Submission error:", err);
            // return failure
            return { success: false, result: null };
        }
    };

    return (
        <>
            {showModal && <ReRegisterModal setShowModal={setShowModal} />}
            <UserForm>
                <h1 className="text-2xl font-bold text-textPrimary">
                    Register for OSS
                </h1>
                <p className="text-textSecondary">
                    Returning teams can sign-up{" "}
                    <a
                        onClick={() => setShowModal(true)}
                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                        here
                    </a>
                </p>
                <OSSForm
                    onSubmit={handleSubmit}
                    onSuccess={(team_id: string) => {
                        router.push(`/team/${team_id}?from=register`);
                    }}
                    submitLabel="Register"
                >
                    <BaseInput
                        type="text"
                        placeholder="Team Name"
                        value={teamName}
                        onChange={(e) => {
                            setTeamName(e.target.value);
                        }}
                    />
                    <BaseInput
                        type="text"
                        placeholder="Faceit Link"
                        value={teamLink}
                        onChange={(e) => {
                            setTeamLink(e.target.value);
                        }}
                    />
                </OSSForm>
            </UserForm>
        </>
    );
}
