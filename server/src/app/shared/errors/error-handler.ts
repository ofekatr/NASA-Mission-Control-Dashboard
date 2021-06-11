import logger from "@app/shared/logs/logger";


function handleError(err: Error) {
    logger.error(err);
}

export default handleError;