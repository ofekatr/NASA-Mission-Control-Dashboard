import {
    createPlanet as createPlanetDep,
    verifyHabitablePlanet as verifyHabitablePlanetDep
} from "@planets/domain/planet";
import { Planet } from "@planets/planets.defs";
import { getBasePath } from "@shared/utils/path.utils";
import parseDep from "csv-parse";
import fsDep from "fs";
import pathDep from "path";

function createPlanetsLoader(
    {
        fs = fsDep,
        path = pathDep,
        parse = parseDep,
        verifyValidPlanet = verifyHabitablePlanetDep,
        createPlanet = createPlanetDep,
    } = {}
) {
    async function loadHabitablePlanets(habitablePlanets: Planet[]) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(getBasePath(), 'data', 'kepler_data.csv'))
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

    return loadHabitablePlanets;
}

export default createPlanetsLoader;