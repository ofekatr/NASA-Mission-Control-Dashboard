import Planet from "@planet/domain/models/planet";
import IPlanetMongoDto from "@planet/infra/data/db/mongo/planet.dto";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { requiredArgument } from "@shared/validators/required-argument";

function createMapDomainToMongoDto(
    {

    } = {}
) {
    return function mapDomainToMongoDto(
        {
            keplerName = requiredArgument("keplerName"),
        }: Planet = requiredArgument("planet"),
    ): IPlanetMongoDto {
        return {
            keplerName,
        };
    }
}

const mapDomainToMongoDtoFactory = createSingletonFactory(createMapDomainToMongoDto);

function createMapMongoDtoToDomain(
    {

    } = {}
) {
    return function mapMongoDtoToDomain(
        {
            keplerName = requiredArgument("keplerName"),
        }: IPlanetMongoDto = requiredArgument("planetMongoDTO"),
    ): Planet {
        return Planet.createPlanet({
            keplerName,
        })
    }

}

const mapMongoDtoToDomainFactory = createSingletonFactory(createMapMongoDtoToDomain);

export { mapDomainToMongoDtoFactory, mapMongoDtoToDomainFactory };
