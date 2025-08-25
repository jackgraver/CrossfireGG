import { api } from "@/lib/api";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import OSSForm from "@/shared/OSSForm/OSSForm";
import { PromiseReturn } from "@/types/Types";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ReRegisterModalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
};

export default function ReRegisterModal({
    setShowModal,
    title,
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
            <div className="w-[500px] max-w-[90vw] rounded-lg bg-firstBg p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between pb-4">
                    <h1 className="truncate pr-4 text-2xl font-bold text-textPrimary">
                        {title === "" ? "Re-Register" : title}
                    </h1>
                    <X
                        onClick={() => setShowModal(false)}
                        className="flex-shrink-0 rounded-md bg-none p-1 hover:bg-secondBg"
                        height={32}
                        width={32}
                    />
                </div>
                <h2 className="text-xl font-bold text-textPrimary">
                    Confirm Team Name
                </h2>
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
