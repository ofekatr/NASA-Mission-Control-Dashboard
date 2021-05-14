import parse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { ThenArg } from '../types/promises';

type Planet = any;

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

async function createPlanetsService() {
    const planets: Planet[] = [];
    await loadHabitablePlanets(planets);

    function getAllPlanets() {
        return planets;
    }

    return {
        getAllPlanets,
    };
}

export type PlanetsService = ThenArg<ReturnType<typeof createPlanetsService>>;
export default createPlanetsService;