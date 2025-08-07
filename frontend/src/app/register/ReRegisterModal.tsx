import { api } from "@/lib/api";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import OSSForm from "@/shared/OSSForm/OSSForm";
import { PromiseReturn } from "@/types/Types";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ReRegisterModalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReRegisterModal({
    setShowModal,
}: ReRegisterModalProps) {
    const router = useRouter();

    const [teamName, setTeamName] = useState("");

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();

        try {
            const data: any = await api.post("/team/reregister", {
                team_name: teamName,
            });

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
            <div className="w-[400px] max-w-full rounded-lg bg-firstBg p-6 shadow-lg">
                <div className="flex flex-row items-end pb-4">
                    <h1 className="flex-1 text-2xl font-bold text-textPrimary">
                        Enter Team Name
                    </h1>
                    <X
                        onClick={() => setShowModal(false)}
                        className="rounded-md bg-none p-1 hover:bg-secondBg"
                        height={32}
                        width={32}
                    />
                </div>
                <OSSForm
                    onSubmit={handleSubmit}
                    onSuccess={(id) => {
                        if (id) router.push(`/team/${id}`);
                    }}
                    submitLabel="Register"
                >
                    <BaseInput
                        type="text"
                        placeholder="Team Name"
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
