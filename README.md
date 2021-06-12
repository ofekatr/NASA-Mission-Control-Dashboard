# NASA-Mission-Control-Dashboard

## Description:
A NASA dashboard app for managing and monitoring spaceflights to habitable planets in the observable universe.

## Architecture details:
* Server
    * Applies the Clean Architecture's concepts and principles.
    * Follows the Domain-Driven-Development approach.
    * Includes a Dependency Injection mechanism implementation.

## Implementation details:
* Server
    * REST API - Implemented in TypeScript, using Express.js.
    * Persistence by MongoDB via TypeORM.
    * Consumes planets related data provided by public NASA resources.
* Web App
   *  Implemented in TypeScript, using React.

## Running Instructions:

1. Install:
```
npm run install
```
2. Run:
```
npm run deploy
```
3. If not defined otherwise, browse to http://localhost:8080/

4. Enjoy!
