import { createFileRoute, redirect, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute("/user/")({
    component: User,
    beforeLoad: async ({ context }) => {
        console.log("user route context:", context);
        if (!context.session) {
            throw redirect({
                to: "/",
            });
        }
    },
});

function User() {
    return <div>User</div>;
}
