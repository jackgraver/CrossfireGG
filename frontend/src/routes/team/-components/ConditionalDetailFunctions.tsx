import { BooleanStatus } from "@/types/TeamModel";
import ManagingButton from "./ManagingButton";
import JoinButton from "./JoinButton";
import PayButton from "./PayButton";

export function getPaidStatus(paid: BooleanStatus) {
    if (paid === BooleanStatus.False) {
        return <PayButton />;
    } else if (paid === BooleanStatus.True) {
        return (
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                Paid
            </span>
        );
    } else if (paid === BooleanStatus.Pending) {
        return (
            <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                Pending
            </span>
        );
    } else {
        return (
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                Unknown
            </span>
        );
    }
}

export function getJoinedStatus(joined: BooleanStatus) {
    if (joined === BooleanStatus.False) {
        return <JoinButton />;
    } else if (joined === BooleanStatus.True) {
        return (
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                Joined
            </span>
        );
    } else if (joined === BooleanStatus.Pending) {
        return (
            <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                Pending
            </span>
        );
    } else {
        return (
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                Unknown
            </span>
        );
    }
}
