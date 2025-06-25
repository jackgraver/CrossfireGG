module.exports = {
    darkMode: "class", // very important
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--color-bg)",
                "bg-dark": "var(--color-bg-dark)",
                "bg-light": "var(--color-bg-light)",
                text: "var(--color-text)",
                primary: "var(--color-primary)",
                card: "var(--color-card)",
                border: "var(--color-border)",
            },
        },
    },
    plugins: [],
};
