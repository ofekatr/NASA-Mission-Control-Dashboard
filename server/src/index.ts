import startServer from "@core/infra/http/server";
import { loadModulesData } from "index";

async function main() {
    await loadModulesData();
    startServer();
}

main();