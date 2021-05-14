import http from "http";
import "dotenv/config";
import app from "./app";

const port = process.env.PORT || 8080;

const server = http.createServer(app);

export default server.listen(port, () => {
    console.log(`Server started.\nListening on port ${port}...`);
});