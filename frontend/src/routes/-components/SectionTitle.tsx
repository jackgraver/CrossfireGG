interface SectionTitleProps {
    title: string;
    subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
    return (
        <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-500 sm:text-sm">
                {subtitle}
            </div>
            <div className="text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
                {title}
            </div>
        </div>
    );
}
