import type { Round } from "../../types/Types";

type RoundCardProps = {
    round_num: number;
    children: React.ReactNode;
};

export default function RoundSection({ round_num, children }: RoundCardProps) {
    return (
        <div className="flex flex-col text-center">
            <h1>{`Round ${round_num}`}</h1>
            {children}
        </div>
    );
}
