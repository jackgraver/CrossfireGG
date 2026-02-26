export const InfoTile = ({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string | number;
}) => (
    <div className="flex items-center gap-4 p-2 transition-all">
        {/*<div className="bg-cfRed/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="text-cfRed" size={20} />
        </div>*/}
        <div>
            <p className="text-textSecondary text-[10px] font-bold tracking-widest uppercase">
                {label}
            </p>
            <p className="text-textPrimary text-base font-bold">{value}</p>
        </div>
    </div>
);
