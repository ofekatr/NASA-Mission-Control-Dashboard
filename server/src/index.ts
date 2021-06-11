import "reflect-metadata";
import config from "@shared/config";
import { loadDbConnection } from "@core/infra/data/db";
import startServer from "@core/infra/http/server";
import { loadModulesData } from "modules-data.loader";
import logger from "@core/infra/logs/logger";

async function main() {
    logger.info(`Environment: ${config.nodeEnv}`);
    await loadDbConnection();
    await loadModulesData();
    startServer();
}

main();