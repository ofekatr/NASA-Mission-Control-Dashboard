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

function createPlanetsReadStream(): parse.Parser {
    return fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }));
}

function addPlanetsReadStreamEventHandlers(
    rs: parse.Parser,
    promiseArgs: {
        resolve: (value: unknown) => void,
        reject: (reason?: any) => void,
    },
    habitablePlanets: Planet[]
) {
    const { resolve, reject } = promiseArgs;
    return rs
        .on('data', (data) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
            console.log(habitablePlanets.map((planet) => {
                return planet['kepler_name'];
            }));
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve(habitablePlanets);
        });
}

async function loadHabitablePlanets(habitablePlanets: Planet[]) {
    const rs = createPlanetsReadStream()
    return new Promise((resolve, reject) =>
        addPlanetsReadStreamEventHandlers(rs, { resolve, reject }, habitablePlanets)
    );
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