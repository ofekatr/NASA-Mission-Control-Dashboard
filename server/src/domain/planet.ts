import { Planet } from "@app/planets/planets.defs";


function createPlanetsModel() {

    function verifyHabitablePlanet(planet: Planet) {
        return planet['koi_disposition'] === 'CONFIRMED'
            && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
            && planet['koi_prad'] < 1.6;
    }

    function createPlanet(data: any) {
        return data;
    }

    return {
        verifyHabitablePlanet,
        createPlanet,
    }

}

export default createPlanetsModel;