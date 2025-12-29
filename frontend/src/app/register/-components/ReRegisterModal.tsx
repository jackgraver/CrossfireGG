import { api } from "@/lib/api";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import OSSForm from "@/shared/OSSForm/OSSForm";
import { PromiseReturn } from "@/types/Types";
import { X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type ReRegisterModalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
};

function extractFaceitIdFromLink(link: string): string | null {
    const match = link.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
    );
    return match ? match[0] : null;
}

export default function ReRegisterModal({
    setShowModal,
    title,
}: ReRegisterModalProps) {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState("");

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();

        try {
            const id = extractFaceitIdFromLink(teamName);
            console.log("id", id);
            const data: any = await api.post("/team/reregister", {
                team_link: id,
            });

            console.log(data);
            if (data.team_id) {
                return { success: true, result: data.team_id };
            }

            return { success: false, result: null };
        } catch (err: any) {
            console.error("Submission error (re-register):", err);
            if (err.error === "Team already registered") {
                return { success: true, result: err.team_id };
            }

            return { success: false, result: null };
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
            <div className="bg-firstBg w-[500px] max-w-[90vw] rounded-lg p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between pb-4">
                    <h1 className="text-textPrimary truncate pr-4 text-2xl font-bold">
                        {title === "" ? "Re-Register" : title}
                    </h1>
                    <X
                        onClick={() => setShowModal(false)}
                        className="hover:bg-secondBg shrink-0 rounded-md bg-none p-1"
                        height={32}
                        width={32}
                    />
                </div>
                <h2 className="text-textPrimary text-xl font-bold">
                    Confirm Team Link
                </h2>
                <OSSForm
                    onSubmit={handleSubmit}
                    onSuccess={(id) => {
                        if (id) navigate({ to: `/team/${id}` });
                    }}
                    submitLabel="Register"
                >
                    <BaseInput
                        type="text"
                        placeholder="https://www.faceit.com/en/teams/..."
                        value={teamName}
                        disabled={false}
                        onChange={(e) => {
                            setTeamName(e.target.value);
                        }}
                        autoFocus={true}
                    />
                </OSSForm>
            </div>
        </div>
    );
}
