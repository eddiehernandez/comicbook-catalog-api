import express, {Request, Response, NextFunction, Application} from 'express';
import appRoutes from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import IConfig from 'models/IConfig';

export default (config: IConfig): Application => {

    const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const routes = appRoutes(config); // inject configuration into routes
    app.use(routes);

    const swaggerDocument = YAML.load('src/openapi.yaml');
    var options = {
        customCss: '.swagger-ui .topbar { display: none }'
      };
    app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

    app.get('*', (req: Request, res: Response) => {
        res.redirect('/api/swagger'); // default route
    })

    return app;
}


