interface ManagingButtonProps {
    buttonText: string;
    onClick?: () => void;
}

export default function ManagingButton({
    buttonText,
    onClick,
}: ManagingButtonProps) {
    return (
        <button
            className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-textPrimary hover:bg-blue-400"
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
