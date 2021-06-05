import "dotenv/config";

const extractGlobalConfigPropsFromObject = ({
    NODE_ENV = "development",
    PORT = 8080,
}: any) => ({
    nodeEnv: NODE_ENV,
    port: PORT,
});

const globalConfig = extractGlobalConfigPropsFromObject(process.env);

export default globalConfig;