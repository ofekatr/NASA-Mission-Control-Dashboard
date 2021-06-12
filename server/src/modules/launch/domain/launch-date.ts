import { DateInput } from "@launch/dates.defs";
import CustomError from "@shared/errors/error-objects/custom-error";
import { createSingletonFactory } from "@shared/utils/singleton.utils";
import { assertDateInput as assertDateInputDep } from "@shared/validators/dates";
import { requiredArgument } from "@shared/validators/required-argument";

function createCreateLaunchDate(
    {
        assertDateInput = assertDateInputDep,
    } = {}
) {
    return function createLaunchDate(
        launchDate: DateInput = requiredArgument("launchDate")
    ) {
        try {
            assertDateInput(launchDate);
        } catch (err) {
            throw new CustomError("invalidDateInput", launchDate);
        }
        return new Date(launchDate);
    }
}

const createLaunchDateFactory = createSingletonFactory(createCreateLaunchDate);

export default createLaunchDateFactory;