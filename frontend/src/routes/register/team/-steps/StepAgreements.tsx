import StepContainer from "../-components/StepContainer";
import type { StepValidationErrors } from "../-types/registration.types";

type StepAgreementsProps = {
    form: any;
    errors?: StepValidationErrors;
    canGoBack: boolean;
    canGoNext: boolean;
    onBack: () => void;
    onNext: () => void;
};

export default function StepAgreements({
    form,
    errors,
    canGoBack,
    canGoNext,
    onBack,
    onNext,
}: StepAgreementsProps) {
    const left = (
        <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold text-white">Agreements</h1>
            <p className="text-gray-400">
                Please review and accept the following agreements to proceed with your registration.
            </p>
        </div>
    );

    const right = (
        <div className="flex flex-col gap-y-6">
            <div className="border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold text-white">Rules & Guidelines</h2>
                <p className="text-sm text-gray-400">Confirm your team's compliance.</p>
            </div>

            <div className="flex flex-col gap-y-4">
                <form.Field name="agreements.rulesAndGuidelines">
                    {(field: any) => (
                        <div className="flex flex-col gap-y-1">
                            <label className="flex items-start gap-x-3 cursor-pointer group">
                                <div className="relative flex items-center pt-1">
                                    <input
                                        type="checkbox"
                                        checked={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900"
                                    />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">
                                    I, as a representative of my team, can say that my team and I
                                    understand the rules and guidelines of
                                    {""}
                                </span>
                            </label>
                            {field.state.meta.errors && (
                                <p className="text-xs text-red-500 ml-8">
                                    {field.state.meta.errors.join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field name="agreements.discordConfirmation">
                    {(field: any) => (
                        <div className="flex flex-col gap-y-1">
                            <label className="flex items-start gap-x-3 cursor-pointer group">
                                <div className="relative flex items-center pt-1">
                                    <input
                                        type="checkbox"
                                        checked={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-700 bg-gray-800 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900"
                                    />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">
                                    All members of my team that are participating are currently in
                                    the Crossfire Discord.
                                </span>
                            </label>
                            {field.state.meta.errors && (
                                <p className="text-xs text-red-500 ml-8">
                                    {field.state.meta.errors.join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>
            </div>
        </div>
    );

    return (
        <StepContainer
            left={left}
            right={right}
            errors={errors}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            onBack={onBack}
            onNext={onNext}
        />
    );
}
