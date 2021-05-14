import "dotenv/config";
import http from "http";
import app from "./app";

const port = process.env.PORT || 8080;

const server = http.createServer(app);

export default server.listen(port, () => {
    console.log(`Server started.\nListening on port ${port}...`);
});