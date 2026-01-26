import React from "react";

/** Visual status of the toast. */
export type ToastStatus = "default" | "success" | "error" | "info";
/** Placement where the toast should render. */
export type ToastVariant = "bottom-right" | "center";

/** Options to display a toast. */
export type ToastOptions = {
    /** Optional heading shown above the body. */
    title?: string;
    /** Toast content (text or JSX). */
    body: React.ReactNode;
    /** Visual status (default/success/error/info). */
    status?: ToastStatus;
    /** Placement variant (bottom-right/center). */
    variant?: ToastVariant;
    /** Auto-dismiss timeout in milliseconds. Omit or set to 0 to persist. */
    durationMs?: number;
};

/** Represents a toast stored by the provider with an assigned id. */
export type ToastInstance = Required<ToastOptions> & { id: string };

/** Events emitted by the toast service to the provider. */
type ToastEvent = { type: "show"; toast: ToastInstance } | { type: "dismiss"; id?: string };

/** Listener called whenever a toast event occurs. */
type Listener = (event: ToastEvent) => void;

const listeners = new Set<Listener>();
let idCounter = 0;
const pendingToasts: ToastInstance[] = [];

/** Generates a unique toast id. */
function nextId(): string {
    idCounter += 1;
    return `toast_${Date.now()}_${idCounter}`;
}

/**
 * Global toast service for showing/dismissing toasts from anywhere.
 *
 * Usage:
 *   toastService.display({ body: "Saved!", status: "success" })
 *   const id = toastService.info("Working...", "Please wait", { durationMs: 0 })
 *   toastService.dismiss(id)
 */
export const toastService = {
    /** Subscribe to toast events. Used by the provider. */
    subscribe(listener: Listener) {
        listeners.add(listener);
        // Flush any pending toasts that were emitted before a listener existed
        if (pendingToasts.length > 0) {
            for (const toast of pendingToasts) {
                listener({ type: "show", toast });
            }
            pendingToasts.length = 0;
        }
        return () => {
            listeners.delete(listener);
        };
    },

    /** Display a toast with the given options. Returns the toast id. */
    display(options: ToastOptions): string {
        const id = nextId();
        const toast: ToastInstance = {
            id,
            title: options.title ?? "",
            body: options.body,
            status: options.status ?? "default",
            variant: options.variant ?? "bottom-right",
            durationMs: options.durationMs ?? 5000,
        };
        if (listeners.size === 0) {
            pendingToasts.push(toast);
        } else {
            listeners.forEach((l) => l({ type: "show", toast }));
        }
        return id;
    },

    /** Convenience: success toast. */
    success(body: React.ReactNode, title?: string, opts?: Partial<ToastOptions>) {
        return this.display({
            body,
            title,
            status: "success",
            ...(opts || {}),
        });
    },

    /** Convenience: error toast. */
    error(body: React.ReactNode, title?: string, opts?: Partial<ToastOptions>) {
        return this.display({ body, title, status: "error", ...(opts || {}) });
    },

    /** Convenience: info toast. */
    info(body: React.ReactNode, title?: string, opts?: Partial<ToastOptions>) {
        return this.display({ body, title, status: "info", ...(opts || {}) });
    },

    /** Dismiss a toast by id. If id is omitted, dismisses all. */
    dismiss(id?: string) {
        listeners.forEach((l) => l({ type: "dismiss", id }));
    },
};
