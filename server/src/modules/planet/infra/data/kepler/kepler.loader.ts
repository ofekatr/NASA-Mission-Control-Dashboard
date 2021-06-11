import {
    createPlanet as createPlanetDep,
    verifyHabitablePlanet as verifyHabitablePlanetDep
} from "planet/domain/planet";
import { Planet } from "planet/planet.defs";
import { getBasePath } from "@shared/utils/path.utils";
import parseDep from "csv-parse";
import fsDep from "fs";
import pathDep from "path";

function createPlanetLoader(
    {
        fs = fsDep,
        path = pathDep,
        parse = parseDep,
        verifyValidPlanet = verifyHabitablePlanetDep,
        createPlanet = createPlanetDep,
    } = {}
) {
    async function loadHabitablePlanet(habitablePlanet: Planet[]) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(getBasePath(), 'data', 'kepler_data.csv'))
                .pipe(parse({
                    comment: '#',
                    columns: true,
                }))
                .on('data', (data) => {
                    if (verifyValidPlanet(data)) {
                        habitablePlanet.push(createPlanet(data));
                    }
                })
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {
                    resolve(habitablePlanet);
                });
        });
    }

    return loadHabitablePlanet;
}

export default createPlanetLoader;