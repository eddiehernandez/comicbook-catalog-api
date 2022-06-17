import express, {Request, Response, Application} from 'express';
import appRoutes from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import IConfig from 'models/IConfig';
import IUsersRepo from 'repos/IUsersRepo';
import IComicsRepo from 'repos/IComicsRepo';

export default (config: IConfig, usersRepo: IUsersRepo, comicsRepo: IComicsRepo): Application => {

    const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const routes = appRoutes(config, usersRepo, comicsRepo); // inject config and repos into routes
    app.use(routes);

    const swaggerDocument = YAML.load('src/openapi.yaml');
    var options = {
        customCss: '.swagger-ui .topbar { display: none }'
      };
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

    app.get('*', (req: Request, res: Response) => {
        res.status(404).json({
            code: '404',
            message: `Endpoint: ${req?.originalUrl} not found!`
        });
    })

    return app;
}


