type RoundCardProps = {
    round_num: number;
    children: React.ReactNode;
};

export default function RoundSection({ round_num, children }: RoundCardProps) {
    return (
        <div className="flex flex-col text-center items-center">
            {/* <h1 className="text-2xl text-white">{`Round ${round_num}`}</h1> */}
            {children}
        </div>
    );
}
