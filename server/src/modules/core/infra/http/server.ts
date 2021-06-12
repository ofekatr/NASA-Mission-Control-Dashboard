import createAppFactory from "@core/infra/http/express/app";
import configDep from "@shared/config";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import loggerDep from "core/infra/logs/logger";
import httpDep from "http";

function createStartServer(
    {
        createApp = createAppFactory(),
        config = configDep,
        logger = loggerDep,
        http = httpDep,
    } = {}
) {
    return function startServer() {
        const { port } = config;
        const app = createApp();
        const server = http.createServer(app);

        return server.listen(port, () => {
            logger.info(`Server listening on port ${port}...`);
        });
    }

}

const startServerFactory = createSingletonFactory(createStartServer);

export default startServerFactory;