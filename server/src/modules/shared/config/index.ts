import "dotenv/config";
import db from "@shared/config/db";
import server from "@shared/config/server";

export default {
    ...server,
    db,
}