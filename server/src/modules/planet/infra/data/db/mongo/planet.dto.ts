import { ObjectID } from "mongodb";

export default interface PlanetMongoDTO {
    _id: ObjectID;
    keplerName: string;
}