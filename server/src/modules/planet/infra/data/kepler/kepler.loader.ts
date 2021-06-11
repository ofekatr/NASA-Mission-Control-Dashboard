import { verifyHabitablePlanet as verifyHabitablePlanetDep } from "@planet/domain/kepler-planet";
import Planet from "@planet/domain/planet";
import { getBasePath } from "@shared/utils/path.utils";
import parseDep from "csv-parse";
import { createReadStream as createReadStreamDep } from "fs";
import { join as joinDep } from "path";

function createPlanetLoader(
    {
        createReadStream = createReadStreamDep,
        join = joinDep,
        parse = parseDep,
        verifyValidPlanet = verifyHabitablePlanetDep,
        createPlanet = Planet.createPlanet,
    } = {}
) {
    async function loadHabitablePlanet(habitablePlanet: Planet[]) {
        return new Promise((resolve, reject) => {
            createReadStream(join(getBasePath(), 'data', 'kepler_data.csv'))
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