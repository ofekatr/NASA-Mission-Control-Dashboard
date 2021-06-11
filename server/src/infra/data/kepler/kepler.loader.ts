import { Planet } from "@app/planets/planets.defs";
import { CreatePlanetsLoaderParams } from "@app/shared/definitions/loaders";
import { getBasePath } from "@app/shared/utils/path.utils";

function createPlanetsLoader({
    fs,
    path,
    parse,
    verifyValidPlanet,
    createPlanet,
}: CreatePlanetsLoaderParams) {
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