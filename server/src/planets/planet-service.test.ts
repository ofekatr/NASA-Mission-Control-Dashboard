import { PlanetsService } from "@definitions/planets.defs";
import planetsDalMock from "@planets/planets.mocks";
import createPlanetService from "@planets/planets.service";
import { expect } from "chai";

describe("Planets Service", function () {
    let planetsService: PlanetsService;

    before(function () {
        planetsService = createPlanetService({ planetsDal: planetsDalMock });
    });

    describe("getAllPlanets", function () {
        context("When I call the function", function () {
            let res: any[];

            before(function () {
                res = planetsService.getAllPlanets();
            });

            it("Should return all the planets", function () {
                expect(res).to.eql(["Planet1", "Planet2", "Planet3"]);
            });
        })
    });
});