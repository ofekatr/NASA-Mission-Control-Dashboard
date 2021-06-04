import createLaunchesController from "@root/launches/launches.controller";
import createLaunchesDal from "@launches/launches.dal";
import { Router } from "express";
import createLaunchesService from "@launches/launches.service";

export interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    launchDate: Date;
    destination: string;
    customers: string[];
    upcoming: boolean;
    success: boolean;
}

export type LaunchesDal = ReturnType<typeof createLaunchesDal>;

export type LaunchesController = ReturnType<typeof createLaunchesController>;

export type LaunchesService = ReturnType<typeof createLaunchesService>

export interface CreateLaunchesServiceParams {
    launchesDal: LaunchesDal;
}

export interface CreateLaunchControllerParams {
    launchesService: LaunchesService
}

export interface CreateLaunchRouterParams {
    launchesController: LaunchesController;
    Router: typeof Router;
}