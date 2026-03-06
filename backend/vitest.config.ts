import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
    resolve: {
        alias: {
            "@repo/contracts": path.resolve(
                __dirname,
                "../shared/contracts/src",
            ),
            "@repo/types": path.resolve(
                __dirname,
                "../shared/types/src",
            ),
        },
    },
});
