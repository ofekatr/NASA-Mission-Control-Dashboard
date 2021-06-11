import createLaunchesDal from "@app/launches/launches.dal";
import createLaunchesService from "@app/launches/launches.service";
import createLaunchesController from "@infra/http/launches/launches.controller";

export interface LaunchEntity {
    flightNumber: number;
    mission: string;
    target: string;
    rocket: string;
    launchDate: Date;
    success: boolean;
    upcoming: boolean;
    customers: string[] | undefined;
    abortLaunch: () => void;
}

export type LaunchesDal = ReturnType<typeof createLaunchesDal>;

export type LaunchesController = ReturnType<typeof createLaunchesController>;

export type LaunchesService = ReturnType<typeof createLaunchesService>

export interface CreateLaunchParams {
    mission: string;
    rocket: string;
    launchDate: string;
    target: string;
}

export interface CreateEntityForExistingLaunchParams {
    flightNumber: number;
    mission: string;
    rocket: string;
    launchDate: Date;
    target: string;
    upcoming: boolean;
    success: boolean;
    customers?: string[];
}