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

const buttonClass = "flex-1 rounded-md py-2 font-semibold"

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null);

    
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
                    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-secondBg bg-firstBg shadow-2xl">
                        <div className="flex items-center justify-between border-b border-secondBg p-4">
                            <h2 className="text-lg font-bold text-textPrimary">{dialogOptions.title}</h2>
                            <button
                                onClick={closeDialog}
                                className="rounded-full p-1 transition-colors hover:bg-secondBg"
                            >
                                <X className="h-5 w-5 text-textSecondary hover:text-textPrimary" />
                            </button>
                        </div>
                        <div className="flex-1 p-6 text-textPrimary">
                            {dialogOptions.content}
                        </div>
                        <div className="flex w-full gap-2 p-4 pt-0">
                            <button
                                onClick={closeDialog}
                                className={cn(buttonClass, "border border-secondBg bg-transparent text-textPrimary transition-colors hover:bg-secondBg")}
                            >
                                {dialogOptions.cancelText || "Cancel"}
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={cn(buttonClass, "bg-green-600 text-white transition-colors hover:bg-green-500")}
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
