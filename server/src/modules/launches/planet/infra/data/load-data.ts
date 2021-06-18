import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { loadKeplerDataFactory } from './kepler';

function createLoadPlanetModuleData(
    {
        loadKeplerData = loadKeplerDataFactory(),
    } = {}
) {
    return async function loadPlanetModuleData() {
        await loadKeplerData();
    }

}

const loadPlanetModuleDataFactory = createSingletonFactory(createLoadPlanetModuleData);

export default loadPlanetModuleDataFactory;