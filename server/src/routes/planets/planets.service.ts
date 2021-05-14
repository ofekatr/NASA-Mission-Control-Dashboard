function createPlanetsService() {
    function getPlanets(): string {
        return "Planets!";
    }

    return {
        getPlanets,
    };
}

export type PlanetsService = ReturnType<typeof createPlanetsService>;
export default createPlanetsService;