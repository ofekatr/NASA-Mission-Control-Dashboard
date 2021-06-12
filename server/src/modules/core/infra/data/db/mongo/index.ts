import config from "@shared/config";
import { createUnion } from "@shared/utils/union.utils";
import { MongoClient } from "mongodb";

const CollectionNamesUnion = createUnion(
    "planets",
    "launches",
)
export type CollectionNames = typeof CollectionNamesUnion.type;

let client: MongoClient;

async function loadDbConnection() {
    client = new MongoClient(config.db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
}

function getRepository(repoName: CollectionNames) {
    return client.db().collection(repoName);
}

export {
    loadDbConnection,
    getRepository,
};
