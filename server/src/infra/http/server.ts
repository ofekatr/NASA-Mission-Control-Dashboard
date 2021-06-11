import serverConfig from "@infra/config";
import logger from "@infra/logs/logger";
import createApp from "@infra/http/app";
import loadDbConnection from "@infra/data/db/mongo/mongo.loader";
import http from "http";


async function startServer() {
    const { port } = serverConfig;
    const app = await createApp();
    const server = http.createServer(app);

    await loadDbConnection();

    return server.listen(port, () => {
        logger.info(`Server listening on port ${port}...`);
    });
}

export default startServer;