import assert from 'assert';
import "dotenv/config";
import { checkIfObjectHasNullProperties } from "@helpers/object.helper";

const extractGlobalConfigPropsFromObject = ({
    NODE_ENV = "development",
    PORT: port = 8080,
    CLIENT_ENDPOINT: clientEndpoint,
}: any) => ({
    nodeEnv: NODE_ENV,
    port,
    clientEndpoint,
});

const globalConfig = extractGlobalConfigPropsFromObject(process.env);
assert.ok(
    !checkIfObjectHasNullProperties(globalConfig),
    "Invalid Server Configuration"
);

export default globalConfig;