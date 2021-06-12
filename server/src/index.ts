import "@core/infra/data/db";
import { loadDbConnection } from "@core/infra/data/db";
import logger from "@core/infra/logs/logger";
import config from "@shared/config";

async function main() {
    logger.info(`Environment: ${config.nodeEnv}`);
    await loadDbConnection();

    const startServerFactory = require("@core/infra/http/server").default;
    const loadModuleDataFactory = require("@modules/load-modules-data").default;
    
    const startServer = startServerFactory();
    startServer();

    const loadModulesData = loadModuleDataFactory();
    await loadModulesData();
}

main();