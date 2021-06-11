import "dotenv/config";

function extractServerConfigFromEnv({
    NODE_ENV = "development",
    PORT = 8080,
    DB_USER = "user0",
    DB_PASSWORD,
}: any) {
    return {
        nodeEnv: NODE_ENV,
        port: PORT,
        db: {
            user: DB_USER,
            password: DB_PASSWORD,
        }
    };
};

function loadServerConfig() {
    return extractServerConfigFromEnv(process.env);
}

export default loadServerConfig;