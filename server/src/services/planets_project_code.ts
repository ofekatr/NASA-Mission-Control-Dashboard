import parse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import logger from '../logger/logger';

type Planet = any;
const habitablePlanets: Array<Planet> = [];

function isHabitablePlanet(planet: Planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

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
    logger.log(err);
  })
  .on('end', () => {
    logger.log(habitablePlanets.map((planet) => {
      return planet['kepler_name'];
    }));
    logger.log(`${habitablePlanets.length} habitable planets found!`);
  });
