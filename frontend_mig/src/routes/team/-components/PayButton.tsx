import { SquareArrowOutUpRight } from "lucide-react";
import ManagingButton from "./ManagingButton";
import { openInNewTab } from "@/lib/NewTab";
import { toastService } from "@/components/shared/toast/toastService";
import { api } from "@/lib/api/client";

export default function PayButton() {
    const handlePay = async () => {
        const toastId = toastService.display({
            title: "Click below to pay",
            body: (
                <div className="flex justify-center">
                    <button
                        className="text-textPrimary rounded-md bg-blue-500 px-3 py-1 text-sm font-medium hover:bg-blue-400"
                        onClick={async () => {
                            openInNewTab(
                                "https://www.paypal.com/paypalme/OSSCSL/75?currencyCode=USD",
                            );
                            toastService.dismiss(toastId);

                            try {
                                const res = await api.post(`/team/paid/${0}`, {
                                    paid: 2,
                                    tournament_id: 0,
                                    stage: 0,
                                });
                                if (
                                    res &&
                                    typeof res === "object" &&
                                    "success" in res &&
                                    res.success
                                ) {
                                    toastService.success(
                                        <p>
                                            Updated paid status, waiting for
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
                        <span className="flex flex-row gap-x-4">
                            Pay
                            <SquareArrowOutUpRight />
                        </span>
                    </button>
                </div>
            ),
            variant: "center",
        });
    };

    return <ManagingButton buttonText="Pay" onClick={handlePay} />;
}
