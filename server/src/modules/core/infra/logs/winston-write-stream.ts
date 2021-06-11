import logger from "@core/infra/logs/logger";

export default class WinstonWriteStream implements WritableStream {
    locked: boolean;
    abort(_reason?: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getWriter(): WritableStreamDefaultWriter<any> {
        throw new Error("Method not implemented.");
    }
    write(message: string) {
        logger.info(message);
    }
}