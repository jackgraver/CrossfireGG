import { api } from "@/lib/api";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import OSSForm from "@/shared/OSSForm/OSSForm";
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

    const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
        e.preventDefault();
        console.log(teamName);

        try {
            await api
                .post("/team/reregister", {
                    team_name: teamName,
                })
                .then((data: any) => {
                    console.log(data);
                    if (data.team_id) {
                        router.push(`/team/${data.team_id}`);
                    }
                });

            return true;
        } catch (err) {
            console.error("Submission error:", err);
            // return failure
            return false;
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
                <OSSForm onSubmit={handleSubmit} submitLabel="Register">
                    <BaseInput
                        type="text"
                        placeholder="Team Name"
                        value={teamName}
                        disabled={false}
                        onChange={(e) => {
                            setTeamName(e.target.value);
                        }}
                    />
                </OSSForm>
            </div>
        </div>
    );
}
