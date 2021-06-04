import "module-alias/register";
import http from "http";
import createApp from "@app";
import globalConfig from "@configs/server.config";
import logger from "@helpers/logs/logger";

async function startServer() {
    const { port } = globalConfig;
    const app = await createApp();
    const server = http.createServer(app);

    return server.listen(port, () => {
        logger.log(`Server started.\nListening on port ${port}...`);
    });
}

export default startServer();