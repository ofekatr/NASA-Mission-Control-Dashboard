import {
    createLaunchController,
    createLaunchRepo,
    createLaunchService
} from "@launch";


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

export type LaunchDal = ReturnType<typeof createLaunchRepo>;

export type LaunchController = ReturnType<typeof createLaunchController>;

export type LaunchService = ReturnType<typeof createLaunchService>

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