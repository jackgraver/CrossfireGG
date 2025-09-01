import BaseInput from "../BaseInput/BaseInput";

export default function SelectInput({
    options,
    value,
    onChange,
    disabled,
    placeholder,
}: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
}) {
    return (
        <select
            id="tournament-select"
            value={""}
            onChange={(e) => {}}
            className="text-text-primary rounded-lg bg-secondBg px-4 py-2 shadow-sm focus:border-thirdBg focus:outline-none"
        >
            {options.map((options, i) => (
                <option key={i} value={options}>
                    {options}
                </option>
            ))}
        </select>
    );
}
