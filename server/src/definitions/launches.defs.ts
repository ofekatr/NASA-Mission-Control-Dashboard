import createLaunchesModel from "@launches/launch.model";
import createLaunchesController from "@launches/launches.controller";
import createLaunchesDal from "@launches/launches.dal";
import createLaunchesService from "@launches/launches.service";
import { Router } from "express";

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

export type LaunchesModel = ReturnType<typeof createLaunchesModel>;

export type LaunchesDal = ReturnType<typeof createLaunchesDal>;

export type LaunchesController = ReturnType<typeof createLaunchesController>;

export type LaunchesService = ReturnType<typeof createLaunchesService>

export interface CreateLaunchInfo {
    mission: string;
    rocket: string;
    launchDate: Date;
    destination: string;
    customers: string[];
}

export interface CreateLaunchesDalParams {
    launchesModel: LaunchesModel;
}

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