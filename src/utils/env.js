import dotenv from "dotenv"

dotenv.config({
    "path": "./.env"
})

function getEnv(key, defaultValue) {
    const value = process.env[key];

    if (!value && defaultValue === undefined) {
        throw new Error (`Missing enviroment variable ${key}`)
    }

    return value || defaultValue;
}

export const env = {
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", 5000),
    MONGODB_URL: getEnv("MONGODB_URL", "mongodb://localhost:27017/newdatabase")
}