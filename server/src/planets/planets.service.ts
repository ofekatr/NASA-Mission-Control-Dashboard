import createPlanetsDal from "@planets/planets.dal";

async function createPlanetService({ planetsDalPromise = createPlanetsDal() } = {}) {
    const planetsDal = await planetsDalPromise;
    function getAllPlanets() {
        return planetsDal.getAllPlanets();
    }

    return {
        getAllPlanets,
    }
}

export default createPlanetService;