import serverConfig from "@configs/server.config";
import createApp from "@app";
import logger from "@helpers/logs/logger";
import http from "http";


async function startServer() {
    const { port } = serverConfig;
    const app = await createApp();
    const server = http.createServer(app);

    return server.listen(port, () => {
        logger.info(`Server started.\nListening on port ${port}...`);
    });
}

export default startServer();