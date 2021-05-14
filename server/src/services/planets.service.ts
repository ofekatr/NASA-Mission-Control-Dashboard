function createPlanetsService() {
    const planets = ["Uranus"];

    function getAllPlanets() {
        return planets;
    }

    return {
        getAllPlanets,
    };
}

export type PlanetsService = ReturnType<typeof createPlanetsService>;
export default createPlanetsService;