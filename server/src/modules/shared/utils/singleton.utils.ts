function singletonify<T>(createInstance: (...props: any[]) => T) {
    let instance: T;

    return function getInstance() {
        if (instance) return instance;

        return instance = createInstance();
    }
}

export {
    singletonify,
}