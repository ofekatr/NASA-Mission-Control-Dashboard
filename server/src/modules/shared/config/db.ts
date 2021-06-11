import { requiredArgument } from "@shared/validators/required-argument";

function extractDbConfigFromEnv({
    DB_URL = requiredArgument("DB_URL"),
}: any) {
    return {
        url: DB_URL,
    }
};

function loadDbConfig() {
    return extractDbConfigFromEnv(process.env);
}

const db = loadDbConfig();

export default db;