import createApp from "@app";
import serverConfig from "@configs";
import logger from "@helpers/logs/logger";
import loadDbConnection from "@loaders/db";
import http from "http";


async function startServer() {
    const { port } = serverConfig;
    const app = await createApp();
    const server = http.createServer(app);

    await loadDbConnection();

    return server.listen(port, () => {
        logger.info(`Server started.\nListening on port ${port}...`);
    });
}

export default startServer();