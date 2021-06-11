import "dotenv/config";
import db from "@infra/config/db";
import server from "@infra/config/server";

export default {
    ...server,
    db,
}