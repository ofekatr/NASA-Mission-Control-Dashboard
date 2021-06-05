import logger from "@logs/logger";

function handleError(err: Error) {
    logger.error(err);
}

export default handleError;