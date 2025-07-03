/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                mainBg: "var(--color-main-bg)",
                firstBg: "var(--color-first-bg)",
                secondBg: "var(--color-second-bg)",
                thirdBg: "var(--color-third-bg)",
                textPrimary: "var(--color-text)",
                textSecondary: "var(--color-text-secondary)",
                border: "var(--color-border)",
                gradient: "var(--color-gradient)",
            },
        },
    },
    plugins: [],
};
