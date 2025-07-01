/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--color-bg)",
                "bg-dark": "var(--color-bg-dark)",
                "bg-light": "var(--color-bg-light)",
                "bg-extra-light": "var(--color-bg-extra-light)",
                "text-primary": "var(--color-text)",
                "text-secondary": "var(--color-text-secondary)",
                border: "var(--color-border)",
                gradient: "var(--color-gradient)",
            },
        },
    },
    plugins: [],
};
