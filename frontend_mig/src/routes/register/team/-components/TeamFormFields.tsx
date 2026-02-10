import { Input } from "@/components/shared/form";

type TeamFormFieldsProps = {
    form: any;
};

export default function TeamFormFields({ form }: TeamFormFieldsProps) {
    return (
        <div className="flex flex-row gap-4">
            <form.Field
                name="team.name"
                validators={{
                    onChange: ({ value }: any) =>
                        !value ? "Team Name is required" : undefined,
                }}
                children={(field: any) => (
                    <Input
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        errors={field.state.meta.errors}
                        label="Team Name"
                        disabled={true}
                    />
                )}
            />
            <form.Field
                name="team.twitter"
                children={(field: any) => (
                    <Input
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        errors={field.state.meta.errors}
                        label="Twitter / X (Optional)"
                    />
                )}
            />
        </div>
    );
}
