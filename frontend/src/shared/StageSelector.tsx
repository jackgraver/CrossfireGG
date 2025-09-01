export default function StageSelector({
    options = ["Option 1", "Option 2"],
    selectedOption,
    onOptionSelect,
}: {
    options?: [string, string];
    selectedOption?: string;
    onOptionSelect: (...args: any) => any;
}) {
    return (
        <div className="flex">
            <h1
                className={`hover:cursor-pointer ${selectedOption === options[0] ? "font-bold" : ""}`}
                onClick={() => onOptionSelect(options[0])}
            >
                {options[0]}
            </h1>
            <span className="mx-2">/</span>
            <h1
                className={`hover:cursor-pointer ${selectedOption === options[1] ? "font-bold" : ""}`}
                onClick={() => onOptionSelect(options[1])}
            >
                {options[1]}
            </h1>
        </div>
    );
}
