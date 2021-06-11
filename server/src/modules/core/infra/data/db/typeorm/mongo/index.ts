import { EntityTarget, getConnection } from "typeorm";
import ormConfig from "@core/infra/data/db/typeorm/mongo/ormconfig";
function getRepository<T>(target: EntityTarget<T>) {
    return getConnection().getMongoRepository(target);
}

export {
    getRepository,
    ormConfig,
};