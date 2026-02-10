import ManagingButton from "./ManagingButton";
import { SquareArrowOutUpRight } from "lucide-react";
import { openInNewTab } from "@/lib/NewTab";
import { toastService } from "@/components/shared/toast/toastService";
import { api } from "@/lib/api/client";

export default function JoinButton() {
    const handleJoined = async () => {
        const toastId = toastService.display({
            title: "Click below to pay",
            body: (
                <div className="flex justify-center">
                    <button
                        className="text-textPrimary rounded-md bg-blue-500 px-3 py-1 text-sm font-medium hover:bg-blue-400"
                        onClick={async () => {
                            openInNewTab(
                                "https://www.faceit.com/en/championship/f56331e8-131a-4c50-b7db-eec8b010ff98/Off%20Season%20Shenanigans%20S8",
                            );
                            toastService.dismiss(toastId);

                            try {
                                const res = await api.post(
                                    `/team/joined/${0}`,
                                    {
                                        joined: 2,
                                        tournament_id: 0,
                                        stage: 0,
                                    },
                                );
                                if (
                                    res &&
                                    typeof res === "object" &&
                                    "success" in res &&
                                    res.success
                                ) {
                                    toastService.success(
                                        <p>
                                            Updated joined status, waiting for
                                            confirmation
                                        </p>,
                                        "Team Marked Paid",
                                        {
                                            durationMs: 3000,
                                        },
                                    );
                                } else {
                                    const message =
                                        res &&
                                        typeof res === "object" &&
                                        "message" in res &&
                                        typeof res.message === "string"
                                            ? res.message
                                            : "Unknown error";
                                    toastService.error(
                                        <p>{message}</p>,
                                        "Update failed",
                                        {
                                            durationMs: 3000,
                                        },
                                    );
                                }
                            } catch (error) {
                                toastService.error(
                                    <p>Failed to update payment status</p>,
                                    "Update failed",
                                    {
                                        durationMs: 3000,
                                    },
                                );
                            }
                        }}
                    >
                        <div className="flex flex-row gap-x-4">
                            <span className="text-xl font-bold">Join</span>
                            <span className="mt-0.5">
                                <SquareArrowOutUpRight />
                            </span>
                        </div>
                    </button>
                </div>
            ),
            durationMs: -1,
            variant: "center",
        });
    };

    return <ManagingButton buttonText="Join" onClick={handleJoined} />;
}
