import createLaunchesController from "@launches/launches.controller";
import createLaunchesDal from "@launches/launches.dal";
import LaunchDao from "@launches/launches.mongo";
import createLaunchesService from "@launches/launches.service";
import { Router } from "express";

export interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    launchDate: Date;
    target: string;
    customers: string[];
    upcoming: boolean;
    success: boolean;
}

export interface LaunchEntity {
    getFlightNumber: () => number;
    getMission: () => string;
    getTarget: () => string;
    getRocket: () => string;
    getLaunchDate: () => Date;
    getSuccess: () => boolean;
    getUpcoming: () => boolean;
    getCustomers: () => string[] | undefined;
    abortLaunch: () => void;
}

export type LaunchDao = typeof LaunchDao;

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

export interface CreateLaunchesDalParams {
    db: LaunchDao;
}

export interface CreateLaunchesServiceParams {
    launchesModel: LaunchesModel;
    launchesDal: LaunchesDal;
}

export interface CreateLaunchControllerParams {
    launchesService: LaunchesService;
    launchesModel: LaunchesModel;
}

export interface CreateLaunchRouterParams {
    launchesController: LaunchesController;
    Router: typeof Router;
}