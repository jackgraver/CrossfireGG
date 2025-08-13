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
import SpinnerInput from "@/shared/OSSForm/SpinnerInput/SpinnerInput";
import { toastService } from "@/shared/toast/toastService";

function extractFaceitIdFromLink(link: string): string | null {
    const match = link.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
    );
    return match ? match[0] : null;
}

const faceitUrlRegex =
    /^https:\/\/www\.faceit\.com\/en\/teams\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\/.*)?$/i;

export default function RegisterPage() {
    const router = useRouter();

    const [teamName, setTeamName] = useState("");

    const [teamLink, setTeamLink] = useState("");
    const [checkingTeamLink, setCheckingTeamLink] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleFaceitLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckingTeamLink(true);
        setTeamLink(e.target.value);

        if (!faceitUrlRegex.test(e.target.value)) {
            setCheckingTeamLink(false);
            return;
        }

        api.get(
            `/team/test_faceit_link/${extractFaceitIdFromLink(e.target.value)}`,
        ).then((data: any) => {
            console.log(data);
            if (data.id) {
                setCheckingTeamLink(false);
            }
            if (data.reregister) {
                toastService.display({
                    body: (
                        <div>
                            <p>Would you like to reregister?</p>
                            <div className="flex flex-row justify-end">
                                <button>Yes</button>
                                <button>No</button>
                            </div>
                        </div>
                    ),
                    durationMs: -1,
                    variant: "center",
                });
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();

        try {
            const response: { team_id: string } = await api.post(
                "/team/register",
                {
                    team_name: teamName,
                    faceit_link: teamLink,
                },
            );
            localStorage.setItem("team_id", response.team_id);
            return { success: true, result: response.team_id };
        } catch (err) {
            console.error("Submission error:", err);
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
                    <SpinnerInput
                        placeholder="Faceit Link"
                        value={teamLink}
                        onChange={(e) => {
                            // setTeamLink(e.target.value);
                            handleFaceitLinkChange(e);
                        }}
                        loading={checkingTeamLink}
                    />
                </OSSForm>
            </UserForm>
        </>
    );
}
