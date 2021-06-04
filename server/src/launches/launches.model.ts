import { Launch } from "@definitions/launches";
import { deepFreezeAndSeal } from "@helpers/object.helper";

function createLaunchesModel() {
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

    return deepFreezeAndSeal({
        launches,
    });
}

export default createLaunchesModel;