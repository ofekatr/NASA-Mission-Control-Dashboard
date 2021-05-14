function createPlanetsModel() {
    const planets: Array<any> = ["Uranus"];

    return planets;
}

export type PlanetsModel = ReturnType<typeof createPlanetsModel>;
export default createPlanetsModel;