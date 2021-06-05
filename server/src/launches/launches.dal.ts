import { Launch } from "@definitions/launches.defs";
import { deepFreezeAndSeal } from "@helpers/object.helper";

function createLaunchesDal() {
    const launches: Launch[] = [];

    const launch: Launch = {
        flightNumber: 100,
        mission: "Kepler Exploration X",
        rocket: "Explorer IS1",
        launchDate: new Date("December 27, 2030"),
        destination: "Kepler-442 b",
        customers: ["ZTM", "NASA"],
        upcoming: true,
        success: true,
    };

    launches[launch.flightNumber] = launch;

    function getAllLaunches() {
        return launches.filter(launch => !!launch);
    }

    return deepFreezeAndSeal({
        getAllLaunches,
    });
}

export default createLaunchesDal;