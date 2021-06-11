function createSingletonFactory<P, T>(createInstance: (props?: P) => T) {
    let instance: T;

    return function buildInstance(isOverride = false, props?: P) {
        if (instance && !isOverride)
            return instance;

        return instance = createInstance(props);
    }
}

export {
    createSingletonFactory,
};

