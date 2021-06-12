import { verifyHabitablePlanet as verifyHabitablePlanetDep } from "@planet/domain/models/kepler-planet";
import Planet from "@planet/domain/models/planet";
import { getBasePath } from "@shared/utils/path.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import parseDep from "csv-parse";
import { createReadStream as createReadStreamDep } from "fs";
import { join as joinDep } from "path";

function createLoadKeplerPlanets(
    {
        createReadStream = createReadStreamDep,
        join = joinDep,
        parse = parseDep,
        verifyValidPlanet = verifyHabitablePlanetDep,
        createPlanet = Planet.createPlanet,
    } = {}
) {
    return async function loadHabitablePlanet(): Promise<Planet[]> {
        const habitablePlanets: Planet[] = [];
        return new Promise((resolve, reject) => {
            createReadStream(join(getBasePath(), 'data', 'kepler_data.csv'))
                .pipe(parse({
                    comment: '#',
                    columns: true,
                }))
                .on('data', (data) => {
                    if (verifyValidPlanet(data)) {
                        habitablePlanets.push(createPlanet(data));
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
}

const loadKeplerPlanetsFactory = createSingletonFactory(createLoadKeplerPlanets)

export default loadKeplerPlanetsFactory;