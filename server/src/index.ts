import "@core/infra/data/db";
import "reflect-metadata";
import { loadDbConnection } from "@core/infra/data/db";
import logger from "@core/infra/logs/logger";
import config from "@shared/config";

async function main() {
    logger.info(`Environment: ${config.nodeEnv}`);
    await loadDbConnection();

    const startServerFactory = require("@core/infra/http/server").default;
    const loadModuleDataFactory = require("@modules/modules-data.loader").default;
    
    const startServer = startServerFactory();
    startServer();

    const loadModulesData = loadModuleDataFactory();
    await loadModulesData();
}

main();