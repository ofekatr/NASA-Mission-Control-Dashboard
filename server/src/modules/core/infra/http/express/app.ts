import applyErrorHandlingMiddlewareDep from '@core/infra/http/express/middlewares/error-handler';
import applyMorganMiddlewareDep from '@core/infra/http/express/middlewares/morgan';
import { applyLaunchApiFactory } from '@launch';
import { applyPlanetApiFactory } from '@planet';
import { getBasePath as getBasePathDep } from '@shared/utils/path.utils';
import { createSingletonFactory } from '@shared/utils/singleton.utils';
import { json as jsonDep, urlencoded as urlencodedDep } from 'body-parser';
import compressionDep from 'compression';
import expressDep, { RequestHandler } from 'express';
import helmetDep from 'helmet';
import path from 'path';

function createCreateApp(
    {
        applyErrorHandlingMiddleware = applyErrorHandlingMiddlewareDep,
        applyMorganMiddleware = applyMorganMiddlewareDep,
        applyLaunchApi = applyLaunchApiFactory(),
        applyPlanetApi = applyPlanetApiFactory(),
        getBasePath = getBasePathDep,
        json = jsonDep,
        urlencoded = urlencodedDep,
        helmet = helmetDep,
        compression = compressionDep,
        express = expressDep,
    } = {}
) {
    return function createApp() {
        const app = express();

        app.use(
            json(),
            urlencoded({
                extended: true,
            })
        );

        applyMorganMiddleware(app);

        const publicPath = path.join(getBasePath(), 'public');
        app.use(express.static(publicPath));

        app.use(express.json() as RequestHandler);

        app.use(helmet());

        app.use(compression());

        app.get('/', (_req, res) => res.sendFile(path.join(publicPath, 'index.html')));

        applyPlanetApi(app);
        applyLaunchApi(app);

        app.get('/*', (_req, res) => res.sendFile(path.join(publicPath, 'index.html')));

        applyErrorHandlingMiddleware(app);

        return app;
    }
}

const createCreateAppFactory = createSingletonFactory(createCreateApp);

export default createCreateAppFactory;