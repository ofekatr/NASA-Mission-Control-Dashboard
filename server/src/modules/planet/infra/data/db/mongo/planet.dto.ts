import { ObjectID } from "mongodb";

export default interface IPlanetMongoDto {
    _id?: ObjectID;
    keplerName: string;
}