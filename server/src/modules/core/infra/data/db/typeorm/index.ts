import { getRepository, ormConfig } from "@core/infra/data/db/typeorm/mongo";
import logger from "@core/infra/logs/logger";
import { createConnection } from "typeorm";

async function loadDbConnection() {
    await createConnection(ormConfig);
    logger.info("TypeORM connection is ready.");
}

export {
    loadDbConnection,
    getRepository,
};

