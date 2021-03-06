import logger from '@core/infra/logs/logger';
import config from '@shared/config';
import { createUnion } from '@shared/utils/union.utils';
import { MongoClient } from 'mongodb';

const CollectionNamesUnion = createUnion(
    'planets',
    'launches',
)
export type CollectionNames = typeof CollectionNamesUnion.type;

let client: MongoClient;

async function loadDbConnection() {
    client = new MongoClient(config.db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    client.once(
        'serverOpening',
        () => logger.info('MongoDb Connection is ready.')
    );

    await client.connect();

}

function getRepository(repoName: CollectionNames) {
    return client.db().collection(repoName);
}

export {
    loadDbConnection,
    getRepository,
};

