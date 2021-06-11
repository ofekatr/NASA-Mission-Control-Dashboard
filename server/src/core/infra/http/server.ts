import config from "@shared/config";
import loadDbConnection from "core/infra/data/db/mongo/mongo.loader";
import createApp from "@core/infra/http/express/app";
import logger from "core/infra/logs/logger";
import http from "http";


async function startServer() {
    const { port } = config;
    const app = await createApp();
    const server = http.createServer(app);

    await loadDbConnection();

    return server.listen(port, () => {
        logger.info(`Server listening on port ${port}...`);
    });
}

export default startServer;