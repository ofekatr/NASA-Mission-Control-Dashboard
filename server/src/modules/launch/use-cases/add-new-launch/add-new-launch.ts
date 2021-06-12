import createFlightNumberFactory from "@launch/domain/flight-number";
import createLaunchDateFactory from "@launch/domain/launch-date";
import Launch, { CreateLaunchProps } from "@launch/domain/launch";
import { AddNewLaunchDTO } from "@launch/launch.defs";
import launchRepoFactory from "@launch/launch.repo";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { requiredArgument } from "@shared/validators/required-argument";

const extractPropsFromDTO = ({
    launchDate,
    mission,
    rocket,
    target
}: AddNewLaunchDTO = requiredArgument("request")) => ({
    launchDate,
    mission,
    rocket,
    target,
})

function createAddNewLaunch(
    {
        launchRepo = launchRepoFactory(),
        createLaunch = Launch.createLaunch,
        createFlightNumber = createFlightNumberFactory(),
        createLaunchDate = createLaunchDateFactory(),
    } = {}
) {
    return async function addNewLaunch(request: AddNewLaunchDTO) {
        const flightNumber = createFlightNumber();
        const launchDate = createLaunchDate(request.launchDate);
        const props: CreateLaunchProps = {
            ...extractPropsFromDTO(request),
            flightNumber,
            launchDate,
        }
        const launch = createLaunch(props);
        return await launchRepo.saveLaunch(launch);
    }
}

const addNewLaunchFactory = createSingletonFactory(createAddNewLaunch);

export default addNewLaunchFactory;
