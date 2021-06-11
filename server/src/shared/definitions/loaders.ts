
import { Planet } from "@planets/planets.defs";
import parse from "csv-parse";
import fs from "fs";
import path from "path";

export interface CreatePlanetsLoaderParams {
    parse: typeof parse;
    fs: typeof fs;
    path: typeof path;
    verifyValidPlanet: (planet: Planet) => boolean;
    createPlanet: (planetInfo: Planet) => Planet;
}