type TeamFormFieldsProps = {
    form: any;
};

export default function TeamFormFields({ form }: TeamFormFieldsProps) {
    const inputClasses = (isInvalid: boolean) => `
        w-full rounded-md border p-2 bg-thirdBg text-white transition-colors
        ${isInvalid ? "border-red-500 focus:ring-red-500" : "border-gray-400 focus:border-orange-500 focus:ring-orange-500"}
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const renderField = (name: string, label: string, type: string = "text") => (
        <form.Field
            name={name}
            validators={{
                onChange: ({ value }: any) =>
                    value.length < 1 ? `${label} is required` : undefined,
            }}
            children={(field: any) => {
                const isInvalid =
                    field.state.meta.touchedErrors && field.state.meta.touchedErrors.length > 0;
                return (
                    <div className="flex flex-1 flex-col">
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor={field.name}
                                className="text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                {label}
                            </label>
                            <input
                                id={field.name}
                                className={inputClasses(isInvalid)}
                                type={type}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                disabled={name === "team.name" ? true : false}
                            />
                        </div>
                        {!field.state.meta.isValid && (
                            <em role="alert" className="text-sm font-medium text-red-500">
                                {field.state.meta.errors.join(", ")}
                            </em>
                        )}
                    </div>
                );
            }}
        />
    );

    return (
        <div className="flex flex-row gap-4">
            {renderField("team.name", "Team Name")}
            {renderField("team.twitter", "Twitter / X")}
        </div>
    );
}
