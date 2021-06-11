import createApp from "@core/infra/http/express/app";
import config from "@shared/config";
import logger from "core/infra/logs/logger";
import http from "http";


function startServer() {
    const { port } = config;
    const app = createApp();
    const server = http.createServer(app);

    return server.listen(port, () => {
        logger.info(`Server listening on port ${port}...`);
    });
}

export default startServer;