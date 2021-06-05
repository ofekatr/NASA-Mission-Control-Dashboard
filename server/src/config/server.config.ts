import { checkIfObjectHasNullProperties } from "@helpers/object.helper";
import assert from 'assert';
import "dotenv/config";

const extractGlobalConfigPropsFromObject = ({
    NODE_ENV = "development",
    PORT = 8080,
}: any) => ({
    nodeEnv: NODE_ENV,
    port: PORT,
});

const globalConfig = extractGlobalConfigPropsFromObject(process.env);
assert.ok(
    !checkIfObjectHasNullProperties(globalConfig),
    "Invalid Server Configuration"
);

export default globalConfig;