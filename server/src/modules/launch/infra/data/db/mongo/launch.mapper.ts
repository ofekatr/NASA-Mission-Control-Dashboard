import Launch from "@launch/domain/models/launch";
import ILaunchMongoDto from "@launch/infra/data/db/mongo/launch.dto";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { requiredArgument } from "@shared/validators/required-argument";

function createMapDomainToMongoDto(
    {

    } = {}
) {
    return function mapDomainToMongoDto(
        {
            flightNumber = requiredArgument("flightNumber"),
            launchDate = requiredArgument("launchDate"),
            mission = requiredArgument("mission"),
            rocket = requiredArgument("rocket"),
            success = requiredArgument("success"),
            target = requiredArgument("target"),
            upcoming = requiredArgument("upcoming"),
            customers,
        }: Launch = requiredArgument("launch")
    ): ILaunchMongoDto {
        return {
            flightNumber,
            launchDate,
            mission,
            rocket,
            success,
            target,
            upcoming,
            customers,
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
            flightNumber = requiredArgument("flightNumber"),
            launchDate = requiredArgument("launchDate"),
            mission = requiredArgument("mission"),
            rocket = requiredArgument("rocket"),
            success = requiredArgument("success"),
            target = requiredArgument("target"),
            upcoming = requiredArgument("upcoming"),
            customers,
        }: ILaunchMongoDto = requiredArgument("launchMongoDTO")
    ): Launch {
        return Launch.createLaunch({
            flightNumber,
            launchDate,
            mission,
            rocket,
            success,
            target,
            upcoming,
            customers,
        });
    }

}

const mapMongoDtoToDomainFactory = createSingletonFactory(createMapMongoDtoToDomain);

export {
    mapMongoDtoToDomainFactory,
    mapDomainToMongoDtoFactory,
};

