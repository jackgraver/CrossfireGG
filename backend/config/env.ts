// Collect missing required environment variables and only throw after all checked

type EnvVarInfo = {
    name: string;
    message: string;
    parser?: (val: string) => any;
    assignTo: (val: any, config: any) => void;
};

// Intermediate config to build incrementally
const _config: any = {};

_config.redis = {
    url: process.env.REDIS_URL,
};

const REQUIRED_VARS: EnvVarInfo[] = [
    {
        name: "PORT",
        message: "PORT is required for server port",
        parser: (v) => parseInt(v, 10),
        assignTo: (val, config) => {
            config.port = val;
        },
    },
    {
        name: "NODE_ENV",
        message: "NODE_ENV is required for node environment",
        assignTo: (val, config) => {
            config.nodeEnv = val;
        },
    },
    {
        name: "DATABASE_URL",
        message: "DATABASE_URL is required for database connection",
        assignTo: (val, config) => {
            config.database = config.database || {};
            config.database.url = val;
        },
    },
    {
        name: "CORS_ALLOWED_ORIGINS",
        message: "CORS_ALLOWED_ORIGINS is required for CORS allowed origins",
        parser: (v) => v.split(","),
        assignTo: (val, config) => {
            config.cors = config.cors || {};
            config.cors.allowedOrigins = val;
        },
    },
    {
        name: "FACEIT_CLIENT_ID",
        message: "FACEIT_CLIENT_ID is required for Faceit authentication",
        assignTo: (val, config) => {
            config.auth = config.auth || {};
            config.auth.clientId = val;
        },
    },
    {
        name: "FACEIT_CLIENT_SECRET",
        message: "FACEIT_CLIENT_SECRET is required for Faceit authentication",
        assignTo: (val, config) => {
            config.auth = config.auth || {};
            config.auth.clientSecret = val;
        },
    },
    {
        name: "FACEIT_API_KEY",
        message: "FACEIT_API_KEY is required for accessing Faceit API",
        assignTo: (val, config) => {
            config.faceit = config.faceit || {};
            config.faceit.apiKey = val;
        },
    },
    {
        name: "APP_ORIGIN",
        message: "APP_ORIGIN is required for production (e.g. https://app.com)",
        assignTo: (val, config) => {
            config.appOrigin = val;
        },
    },
    {
        name: "AUTH_TRUSTED_ORIGINS",
        message: "AUTH_TRUSTED_ORIGINS is required (comma separated)",
        parser: (v: string) => v.split(","),
        assignTo: (val, config) => {
            config.auth = config.auth || {};
            config.auth.trustedOrigins = val;
        },
    },
    {
        name: "FACEIT_REDIRECT_URI",
        message: "FACEIT_REDIRECT_URI is required for OAuth callback",
        assignTo: (val, config) => {
            config.auth = config.auth || {};
            config.auth.redirectUri = val;
        },
    },
];

const missingVars: { name: string; message: string }[] = [];

for (const envVar of REQUIRED_VARS) {
    const rawValue = process.env[envVar.name];
    if (typeof rawValue === "undefined" || rawValue === "") {
        missingVars.push({ name: envVar.name, message: envVar.message });
        continue;
    }
    const value = envVar.parser ? envVar.parser(rawValue) : rawValue;
    envVar.assignTo(value, _config);
}

if (missingVars.length > 0) {
    // Print all missing at once, nicely
    const errorMessages = missingVars.map((v) => `- ${v.name}: ${v.message}`).join("\n");
    throw new Error(
        `The following required environment variables are missing or empty:\n${errorMessages}`,
    );
}

export const config = _config;
