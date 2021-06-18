import Planet from '@planet/domain/models/planet';
import IKeplerDto from '@planet/infra/data/kepler/dtos/kepler';
import mapKeplerDtoToDomainFactory from '@planet/infra/data/kepler/mappers/kepler';
import KeplerPlanet from '@planet/infra/data/kepler/models/kepler-planet';
import { getBasePath } from '@shared/utils/path.utils';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import parseDep from 'csv-parse';
import { createReadStream as createReadStreamDep } from 'fs';
import { join as joinDep } from 'path';

function createKeplerClient(
    {
        createReadStream = createReadStreamDep,
        join = joinDep,
        parse = parseDep,
        verifyValidPlanet = KeplerPlanet.checkHabitablePlanetByRawData,
        createPlanet = Planet.createPlanet,
        mapKeplerDtoToDomain = mapKeplerDtoToDomainFactory(),
    } = {}
) {
    async function loadHabitablePlanet(): Promise<Planet[]> {
        const habitablePlanets: Planet[] = [];
        return new Promise((resolve, reject) => {
            createReadStream(join(getBasePath(), 'data', 'kepler_data.csv'))
                .pipe(parse({
                    comment: '#',
                    columns: true,
                }))
                .on('data', (data: IKeplerDto) => {
                    if (verifyValidPlanet(data)) {
                        const { keplerName } = mapKeplerDtoToDomain(data);
                        habitablePlanets.push(
                            createPlanet({ keplerName })
                        );
                    }
                })
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {
                    resolve(habitablePlanets);
                });
        });
    }

    return {
        loadHabitablePlanet,
    }
}

const keplerClientFactory = createSingletonFactory(createKeplerClient)

export default keplerClientFactory;