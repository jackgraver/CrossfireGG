import { useAuth } from "@/contexts/auth";

export default function ProtectedElement({
    children,
    roles,
}: {
    children: React.ReactNode;
    roles?: string[];
}) {
    const { user } = useAuth();

    if (user && roles && user.roles.some((role) => roles.includes(role))) {
        return <>{children}</>;
    }
    if (!user) {
        return null; // or loading spinner
    }
}
