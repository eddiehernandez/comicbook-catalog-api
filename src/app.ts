import express, {Request, Response, Application} from 'express';
import appRoutes from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import IConfig from 'models/IConfig';
import IUsersRepo from 'repos/IUsersRepo';
import IComicsRepo from 'repos/IComicsRepo';
import Logger from './utils/Logger';
import dotenv from 'dotenv';

export default (config: IConfig, usersRepo: IUsersRepo, comicsRepo: IComicsRepo): Application => {

    dotenv.config();
    const app: Application = express();

    /** Log the request */
    app.use((req, res, next) => {
        /** Log the req */
        const env: string = <string> process.env.NODE_ENV;
        if (env != 'dev'){
            Logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        }
        res.on('finish', () => {
            /** Log the res */
            if (env != 'dev')
                Logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        })
        next();
    });


    // Parse request body
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //Application route
    const routes = appRoutes(config, usersRepo, comicsRepo); // inject config and repos into routes
    app.use(routes);

    //Open API Swagger route
    const swaggerDocument = YAML.load('src/openapi.yaml');
    var options = { customCss: '.swagger-ui .topbar { display: none }' };
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

    // Captures undefined routes
    app.use((req: Request, res: Response) => {
        res.status(404).json({
            code: '404',
            message: `Endpoint: ${req?.originalUrl} not found!`
        });
    })

    return app;
}


