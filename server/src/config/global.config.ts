import assert from 'assert';
import "dotenv/config";
import { checkIfObjectHasNullProperties } from "@utils/object.util";

const extractGlobalConfigPropsFromObject = ({
    PORT: port = 8080,
    CLIENT_ENDPOINT: clientEndpoint,
}: any) => ({
    port,
    clientEndpoint,
});

const globalConfig = extractGlobalConfigPropsFromObject(process.env);
assert.ok(
    !checkIfObjectHasNullProperties(globalConfig),
    "Invalid Server Configuration"
);

export default globalConfig;