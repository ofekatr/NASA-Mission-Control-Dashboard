const logger = {
    log: (msg: any) => console.log(msg),
    info: (msg: any) => console.info(msg),
    error: (msg: any) => console.error(msg),
    debug: (msg: any) => console.warn(msg),
    count: (msg: any) => console.count(msg),
};

export default logger;