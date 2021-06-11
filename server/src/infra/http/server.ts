import config from "@infra/config";
import loadDbConnection from "@infra/data/db/mongo/mongo.loader";
import createApp from "@infra/http/app";
import logger from "@infra/logs/logger";
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