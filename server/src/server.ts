import "dotenv/config";
import http from "http";
import createApp from "./app";
import logger from "./logger/logger";

async function startServer() {
    const port = process.env.PORT || 8080;
    const app = await createApp();
    const server = http.createServer(app);

    return server.listen(port, () => {
        logger.log(`Server started.\nListening on port ${port}...`);
    });
}

export default startServer();