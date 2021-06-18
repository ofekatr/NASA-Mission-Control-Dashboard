import logger from "@core/infra/logs/logger";
import { BasicObject } from "@shared/definitions/general";
import { deepFreezeAndSeal } from "@shared/utils/object.utils";
import { createSingletonFactory } from "@shared/utils/singleton.utils";

function createSpaceXClient(
    {

    } = {}
) {
    const BASE_URL = 'https://api.spacexdata.com/v4';

    const LAUNCHS_BASE_URL = `${BASE_URL}/launches`;

    const REQUEST_TO_URL = deepFreezeAndSeal({
        queryLaunches: `${LAUNCHS_BASE_URL}/query`,
    });

    function queryLaunches(query?: BasicObject) {
        logger.debug(REQUEST_TO_URL.queryLaunches, query);
    }

    return deepFreezeAndSeal({
        queryLaunches,
    })
}

const spaceXClientFactory = createSingletonFactory(createSpaceXClient);

export default spaceXClientFactory;
