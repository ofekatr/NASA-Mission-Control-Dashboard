// import { PlanetService } from 'planet/planet.defs';
// import planetRepoMock from 'planet/planet.mocks';
// import getPlanetServiceInstance from 'planet/planet.service';
// import { expect } from 'chai';

// describe('Planet Service', function () {
//     let planetService: PlanetService;

//     before(async function () {
//         planetService = getPlanetServiceInstance({ planetRepo: planetRepoMock });
//     });

//     describe('getAllPlanet', function () {
//         context('When I call the function', function () {
//             let res: any[];

//             before(function () {
//                 res = planetService.getAllPlanet();
//             });

//             it('Should return all the planet', function () {
//                 expect(res).to.eql(['Planet1', 'Planet2', 'Planet3']);
//             });
//         })
//     });
// });