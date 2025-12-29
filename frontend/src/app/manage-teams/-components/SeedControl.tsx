import { ChevronDown, ChevronUp } from "lucide-react";

export default function SeedControl({
    seed,
    setSeed,
}: {
    seed: number;
    setSeed: (value: number) => void;
}) {
    return (
        <>
            <button onClick={() => setSeed(seed - 1)} disabled={seed === -1}>
                <ChevronUp
                    width={24}
                    height={24}
                    className="rounded-md hover:bg-secondBg"
                />
            </button>
            <p className="w-12 border-none bg-transparent text-center text-2xl font-bold outline-none">
                {seed}
            </p>
            <button
                onClick={() => {
                    if (seed == -1) setSeed(1);
                    else setSeed(seed + 1);
                }}
            >
                <ChevronDown
                    width={24}
                    height={24}
                    className="rounded-md hover:bg-secondBg"
                />
            </button>
        </>
    );
}
