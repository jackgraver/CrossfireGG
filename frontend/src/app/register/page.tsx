"use client";

import { api } from "@/lib/api";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import FileDropper from "@/shared/OSSForm/FileDropper/FileDropper";
import OSSForm from "@/shared/OSSForm/OSSForm";
import UserForm from "@/shared/UserForm";
import { useState } from "react";
import ReRegisterModal from "./ReRegisterModal";
import { PromiseReturn } from "@/types/Types";

export default function RegisterPage() {
    const [teamName, setTeamName] = useState("");

    const [teamLink, setTeamLink] = useState("");
    const [faceitLinkError, setFaceitLinkError] = useState("");

    const [players, setPlayers] = useState("");

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();

        try {
            await api.post("/team/register", {
                team_name: teamName,
                faceit_link: teamLink,
                starters: players.split("\n"),
            });

            // return success
            return { success: true, result: null };
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
                        className="text-blue-600 hover:text-blue-800"
                    >
                        here
                    </a>
                </p>
                <OSSForm onSubmit={handleSubmit} submitLabel="Register">
                    <BaseInput
                        type="text"
                        placeholder="Faceit Team"
                        value={teamName}
                        disabled={false}
                        onChange={(e) => {
                            setTeamName(e.target.value);
                        }}
                    />
                    <BaseInput
                        type="text"
                        placeholder="Faceit Team"
                        value={teamLink}
                        disabled={false}
                        onChange={(e) => {
                            setTeamLink(e.target.value);
                        }}
                    />
                    {/* <textarea
                    placeholder="Players"
                    value={players}
                    disabled={false}
                    onChange={(e) => {
                        setPlayers(e.target.value);
                    }}
                    className="mt-6 w-full rounded-md border border-[#ccc] bg-firstBg p-2"
                /> */}
                </OSSForm>
            </UserForm>
        </>
    );
}
