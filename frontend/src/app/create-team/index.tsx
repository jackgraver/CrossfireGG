import { createFileRoute } from "@tanstack/react-router";
import { validateEmail } from "@/lib/SignInUp.util";

import OSSForm from "@/shared/OSSForm/OSSForm";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import PasswordInput from "@/shared/OSSForm/PasswordInput/PasswordInput";
import SpinnerInput from "@/shared/OSSForm/SpinnerInput/SpinnerInput";
import UserForm from "@/shared/UserForm";
import FileDropper from "@/shared/OSSForm/FileDropper/FileDropper";
import { PromiseReturn } from "@/types/Types";

export const Route = createFileRoute("/create-team/")({
    component: RouteComponent,
});

function RouteComponent() {
    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();
        return { success: true, result: null };
    };
    return (
        <>
            <UserForm>
                <h1 className="text-textPrimary text-2xl font-bold">
                    Create Team
                </h1>
                <OSSForm onSubmit={handleSubmit} submitLabel="Create Team">
                    <BaseInput
                        type="text"
                        placeholder="Team Name"
                        value={""}
                        onChange={() => {}}
                        onBlur={() => {}}
                        error={""}
                        success={() => true}
                    />
                    <FileDropper
                        onFileDrop={() => {}}
                        error={""}
                        placeholder="Team Logo"
                        accept="image/*"
                    />
                    <BaseInput
                        type="text"
                        placeholder="Faceit Team"
                        value={""}
                        disabled={false}
                        onChange={(e) => {}}
                    />
                </OSSForm>
                <div className="mt-4 flex items-center">
                    <hr
                        className="flex-1 border border-neutral-600"
                        style={{ height: "1px" }}
                    />
                    <span className="mx-4 text-neutral-400">or</span>
                    <hr
                        className="w-82 flex-1 border border-neutral-600"
                        style={{ height: "1px" }}
                    />
                </div>
                <OSSForm onSubmit={handleSubmit} submitLabel="Use Faceit Team">
                    {/* TODO: probably visually better horizontal split (unless mobile) */}
                    <BaseInput
                        type="text"
                        placeholder="Faceit Team"
                        value={""}
                        disabled={false}
                        onChange={(e) => {}}
                    />
                </OSSForm>
            </UserForm>
        </>
    );
}
