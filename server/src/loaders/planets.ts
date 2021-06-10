import { CreatePlanetsLoaderParams } from "@definitions/loaders.defs";
import { Planet } from "@definitions/planets.defs";

function createPlanetsLoader({
    fs,
    path,
    parse,
    verifyValidPlanet,
    createPlanet,
}: CreatePlanetsLoaderParams) {
    async function loadHabitablePlanets(habitablePlanets: Planet[]) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
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