import serverConfig from "@infra/config";
import { Environment } from "@app/shared/definitions/configs.defs";
import WinstonWriteStream from "@infra/logs/winston-write-stream";
import { Express, RequestHandler } from "express";
import morgan from "morgan";

type EnvToFormatMap = Partial<{ [key in Environment]: string }>

const envToFormatMap: EnvToFormatMap = {
    development: "dev",
    production: "short",
    test: "tiny",
}

const DEFAULT_FORMAT = "common";

function createMorganMiddleware() {
    const format = envToFormatMap[serverConfig.nodeEnv] ?? DEFAULT_FORMAT;
    return morgan(format, {
        stream: new WinstonWriteStream(),
    });
}

function applyMorganMiddleware(app: Express) {
    app.use(createMorganMiddleware() as RequestHandler);
}
export default applyMorganMiddleware;