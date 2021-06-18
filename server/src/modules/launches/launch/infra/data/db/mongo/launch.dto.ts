import { ObjectID } from "mongodb";

export default interface ILaunchMongoDto {
    _id?: ObjectID;
    flightNumber: string;
    mission: string;
    target: string;
    rocket: string;
    launchDate: Date;
    upcoming: boolean;
    success: boolean;
    customers?: string[];
}