import { EntityTarget, getConnection } from "typeorm";

function getRepository<T>(target: EntityTarget<T>) {
    return getConnection().getMongoRepository(target);
}

export {
    getRepository,
};

