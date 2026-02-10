import { X } from "lucide-react";

export default function ConfirmLineupModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
            <div className="bg-firstBg w-125 max-w-[90vw] rounded-lg p-6 shadow-lg">
                <div className="flex flex-row items-center justify-between pb-4">
                    <h1 className="text-textPrimary truncate pr-4 text-2xl font-bold">
                        Confirm Lineup?
                    </h1>
                    <X
                        onClick={() => {}}
                        className="hover:bg-secondBg shrink-0 rounded-md bg-none p-1"
                        height={32}
                        width={32}
                    />
                </div>
                <h2 className="text-textPrimary text-xl font-bold">Confirm Team Link</h2>
            </div>
        </div>
    );
}
