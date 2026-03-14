export type ToastStatus = "default" | "success" | "error" | "info";
export type ToastVariant = "bottom-right" | "center";

export type ToastOptions = {
    title: string;
    body?: React.ReactNode;
    status?: ToastStatus;
    variant?: ToastVariant;
    durationMs?: number;
};

export type ToastInstance = {
    id: string;
    title: string;
    body: React.ReactNode;
    status: ToastStatus;
    variant: ToastVariant;
    durationMs: number;
};

type ToastEvent =
    | { type: "show"; toast: ToastInstance }
    | { type: "dismiss"; id?: string };

type Listener = (event: ToastEvent) => void;

const listeners = new Set<Listener>();
let idCounter = 0;
const pendingToasts: ToastInstance[] = [];

function nextId(): string {
    idCounter += 1;
    return `toast_${Date.now()}_${idCounter}`;
}

export const toastService = {
    subscribe(listener: Listener) {
        listeners.add(listener);
        if (pendingToasts.length > 0) {
            const queued = pendingToasts.splice(0);
            for (const toast of queued) {
                listener({ type: "show", toast });
            }
        }
        return () => {
            listeners.delete(listener);
        };
    },

    display(options: ToastOptions): string {
        const id = nextId();
        const toast: ToastInstance = {
            id,
            title: options.title,
            body: options.body ?? "",
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

    success(
        title: string,
        body?: React.ReactNode,
        opts?: Partial<ToastOptions>,
    ) {
        return this.display({ ...opts, title, body, status: "success" });
    },

    error(title: string, body?: React.ReactNode, opts?: Partial<ToastOptions>) {
        return this.display({ ...opts, title, body, status: "error" });
    },

    info(title: string, body?: React.ReactNode, opts?: Partial<ToastOptions>) {
        return this.display({ ...opts, title, body, status: "info" });
    },

    dismiss(id?: string) {
        listeners.forEach((l) => l({ type: "dismiss", id }));
    },
};
