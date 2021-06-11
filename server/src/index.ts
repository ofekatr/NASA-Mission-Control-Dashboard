import "reflect-metadata";
import { loadDbConnection } from "@core/infra/data/db";
import startServer from "@core/infra/http/server";
import { loadModulesData } from "index";

async function main() {
    await loadDbConnection();
    await loadModulesData();
    startServer();
}

main();