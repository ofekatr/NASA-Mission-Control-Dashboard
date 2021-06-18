
import {
    httpAbortLaunchFactory,
    httpAddNewLaunchFactory,
    httpGetAllLaunchesFactory
} from '@launch/infra/http/express/controllers';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { Router as expressRouter } from 'express';

function createLaunchRouter(
    {
        Router = expressRouter,
        httpAbortLaunch = httpAbortLaunchFactory(),
        httpAddNewLaunch = httpAddNewLaunchFactory(),
        httpGetAllLaunches = httpGetAllLaunchesFactory(),
    } = {}) {
    const launchRouter = Router();

    launchRouter.get('/', httpGetAllLaunches);

    launchRouter.post('/', httpAddNewLaunch);

    launchRouter.delete('/:flightNumber', httpAbortLaunch);

    return launchRouter;
}

const launchRouterFactory = createSingletonFactory(createLaunchRouter);

export default launchRouterFactory;