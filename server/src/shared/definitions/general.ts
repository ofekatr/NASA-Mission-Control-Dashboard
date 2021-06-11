export type BasicObject = { [key: string]: any };

export type ExpandType<T extends BasicObject> = {
    [K in keyof T]: T[K]
} & BasicObject;