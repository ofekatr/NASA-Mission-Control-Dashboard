
import planetRepoFactory from '@planet/planet.repo';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import keplerClientFactory from './client';

function createLoadKeplerData(
    {
        keplerClient: { loadHabitablePlanet } = keplerClientFactory(),
        db: { dbSaveAll } = planetRepoFactory(),
    } = {}
) {
    return async function loadKeplerData() {
        const planets = await loadHabitablePlanet();
        await dbSaveAll(planets);
    }

}

const loadKeplerDataFactory = createSingletonFactory(createLoadKeplerData);

export default loadKeplerDataFactory;