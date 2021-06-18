function extractServerConfigFromEnv({
    NODE_ENV = 'development',
    PORT = 8080,
}: any) {
    return {
        nodeEnv: NODE_ENV,
        port: PORT,
    };
};

function loadServerConfig() {
    return extractServerConfigFromEnv(process.env);
}

export default loadServerConfig();