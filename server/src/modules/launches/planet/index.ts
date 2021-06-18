import loadAndSavePlanetsFactory from "@planet/infra/data/kepler";
import applyPlanetApiFactory from "@planet/infra/http/express";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createLoadPlanetData(
    {
        loadAndSavePlanets = loadAndSavePlanetsFactory()
    } = {}
) {
    return async function loadPlanetData() {
        await loadAndSavePlanets();
    }
}

const loadPlanetDataFactory = createSingletonFactory(createLoadPlanetData);

export {
    loadPlanetDataFactory,
    applyPlanetApiFactory,
};

