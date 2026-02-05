import React, { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

interface DialogOptions {
    title: string;
    content: ReactNode;
    onConfirm?: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
}

interface DialogContextType {
    openDialog: (options: DialogOptions) => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};

const buttonClass = "flex-1 rounded-md py-2 font-semibold";

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(
        null,
    );

    const openDialog = (options: DialogOptions) => {
        setDialogOptions(options);
    };

    const closeDialog = () => {
        setDialogOptions(null);
    };

    const handleConfirm = async () => {
        if (dialogOptions?.onConfirm) {
            await dialogOptions.onConfirm();
        }
        closeDialog();
    };

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}
            {dialogOptions && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20">
                    <div className="bg-firstBg flex w-full max-w-md flex-col overflow-hidden rounded-lg shadow-2xl">
                        <div className="border-secondBg flex items-center justify-between border-b p-4">
                            <h2 className="text-textPrimary text-lg font-bold">
                                {dialogOptions.title}
                            </h2>
                            <button
                                onClick={closeDialog}
                                className="hover:bg-secondBg rounded-full p-1 transition-colors"
                            >
                                <X className="text-textSecondary hover:text-textPrimary h-5 w-5" />
                            </button>
                        </div>
                        <div className="text-textPrimary flex-1 p-6">
                            {dialogOptions.content}
                        </div>
                        <div className="flex w-full gap-2 p-4 pt-0">
                            <button
                                onClick={closeDialog}
                                className={cn(
                                    buttonClass,
                                    "border-secondBg text-textPrimary hover:bg-secondBg border bg-transparent transition-colors",
                                )}
                            >
                                {dialogOptions.cancelText || "Cancel"}
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={cn(
                                    buttonClass,
                                    "bg-green-600 text-white transition-colors hover:bg-green-500",
                                )}
                            >
                                {dialogOptions.confirmText || "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DialogContext.Provider>
    );
};
