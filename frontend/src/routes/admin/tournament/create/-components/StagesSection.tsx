import { Plus } from "lucide-react";
import StageItem from "./StageItem";

type StagesSectionProps = {
    form: any;
    stages: any[];
    stageFormats: any[] | undefined;
    addStage: () => void;
    removeStage: (id: string) => void;
};

export default function StagesSection({
    form,
    stages,
    stageFormats,
    addStage,
    removeStage,
}: StagesSectionProps) {
    return (
        <section className="border-secondBg bg-firstBg rounded-lg border p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold">Stages</h2>
                    <p className="text-sm text-gray-400">Add one or more stages</p>
                </div>
                <button
                    type="button"
                    onClick={addStage}
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
                >
                    <Plus className="h-4 w-4" />
                    Add stage
                </button>
            </div>
            {stages.length === 0 ? (
                <div className="border-secondBg bg-secondBg/30 mt-4 flex min-h-35 items-center justify-center rounded-lg border border-dashed text-sm text-gray-400">
                    No stages yet.
                </div>
            ) : (
                <div className="mt-4 space-y-4">
                    {stages.map((stage: any, index: number) => (
                        <StageItem
                            key={stage?.__id ?? index}
                            form={form}
                            stage={stage}
                            index={index}
                            stageFormats={stageFormats}
                            onRemove={() => removeStage(stage.__id)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
