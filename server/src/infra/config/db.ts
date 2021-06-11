import { requiredArgument } from "@app/shared/validators/required-argument";

function extractDbConfigFromEnv({
    DB_USER = "user0",
    DB_PASSWORD = requiredArgument("DB_PASSWORD"),
}: any) {
    return {
        user: DB_USER,
        password: DB_PASSWORD,
    }
};

function loadDbConfig() {
    return extractDbConfigFromEnv(process.env);
}

const db = loadDbConfig();

export default db;