import "dotenv/config";
import http from "http";
import createApp from "./app";

async function startServer() {
    const port = process.env.PORT || 8080;
    const app = await createApp();
    const server = http.createServer(app);

    return server.listen(port, () => {
        console.log(`Server started.\nListening on port ${port}...`);
    });
}

export default startServer();