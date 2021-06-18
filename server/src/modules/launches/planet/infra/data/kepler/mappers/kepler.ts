import IKeplerDto from "@planet/infra/data/kepler/dtos/kepler";
import KeplerPlanet from "@planet/infra/data/kepler/models/kepler-planet";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { requiredArgument } from "@shared/validators/required-argument";

function createMapKeplerDtoToDomain(
    {
        createKeplerPlanet = KeplerPlanet.createKeplerPlanet,
    } = {}
) {
    return function mapKeplerDtoToDomain(
        {
            kepler_name = requiredArgument("kepler_name")
        }: IKeplerDto = requiredArgument("keplerDto")
    ): KeplerPlanet {
        return createKeplerPlanet({
            keplerName: kepler_name,
        });
    }
}

const mapKeplerDtoToDomainFactory = createSingletonFactory(createMapKeplerDtoToDomain);

export default mapKeplerDtoToDomainFactory;