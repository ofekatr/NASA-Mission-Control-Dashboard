import { Planet } from '@definitions/planets';
import { deepFreezeAndSeal } from '../helpers/object.helper';
import { requiredArgument } from '../helpers/validators/required-argument';

interface CreatePlanetsDalRequestParams {
    parse: any;
    fs: any;
    path: any;
}

async function createPlanetsModel({
    parse = requiredArgument("parse"), fs = requiredArgument("fs"), path = requiredArgument("path")
}: CreatePlanetsDalRequestParams) {
    function isHabitablePlanet(planet: Planet) {
        return planet['koi_disposition'] === 'CONFIRMED'
            && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
            && planet['koi_prad'] < 1.6;
    }

    async function loadHabitablePlanets(habitablePlanets: Planet[]) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
                .pipe(parse({
                    comment: '#',
                    columns: true,
                }))
                .on('data', (data) => {
                    if (isHabitablePlanet(data)) {
                        habitablePlanets.push(data);
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

export default createPlanetsModel;