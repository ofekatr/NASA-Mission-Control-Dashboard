import createApp from "@app";
import serverConfig from "@configs/server.config";
import logger from "@helpers/logs/logger";
import cluster from "cluster";
import http from "http";
import os from "os";


async function startServer() {
    const { port } = serverConfig;
    const app = await createApp();
    const server = http.createServer(app);

    if (cluster.isMaster) {
        const NUM_OF_FORKS = os.cpus().length;
        for (let i = 0; i < NUM_OF_FORKS; i++) {
            cluster.fork();
        }
        return;
    } else {
        return server.listen(port, () => {
            logger.info(`Server started.\nListening on port ${port}...`);
        });
    }
}

export default startServer();