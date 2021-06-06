import { CreatePlanetsDalRequestParams, Planet } from '@definitions/planets.defs';
import { deepFreezeAndSeal } from '@helpers/object.helper';
import { requiredArgument } from '@helpers/validators/required-argument';

async function createPlanetsDal({
    planetsModel = requiredArgument("planetsModel"), parse = requiredArgument("parse"), fs = requiredArgument("fs"), path = requiredArgument("path")
}: CreatePlanetsDalRequestParams) {
    async function loadHabitablePlanets(habitablePlanets: Planet[]) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
                .pipe(parse({
                    comment: '#',
                    columns: true,
                }))
                .on('data', (data) => {
                    if (planetsModel.verifyHabitablePlanet(data)) {
                        habitablePlanets.push(planetsModel.createPlanet(data));
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


    const planets: Planet[] = [];
    await loadHabitablePlanets(planets);

    function getAllPlanets() {
        return planets;
    }

    return deepFreezeAndSeal({
        getAllPlanets,
    });
}

export default createPlanetsDal;