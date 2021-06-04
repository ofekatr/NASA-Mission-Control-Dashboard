import { expect } from "chai";
import createPlanetService, { PlanetsService } from "@planets/planets.service";
import planetsModelMock from "@root/planets/planets.mock";

describe("Planets Service", function () {
    let planetsService: PlanetsService;

    before(function () {
        planetsService = createPlanetService(planetsModelMock);
    });

    describe("getAllPlanets", function () {
        context("When I call the function", function () {
            let res: any[];

            before(function(){
                res = planetsService.getAllPlanets();
            });

            it("Should return all the planets", function() {
                expect(res).to.eql(["Planet1", "Planet2", "Planet3"]);
            });
        })
    });
});