import IConfig from "models/IConfig";
import express, {Request, Response, Application} from 'express';
import appRoutes from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export default class WebApplication {

    private _config: IConfig;
    private _app: Application;

    constructor (config: IConfig) {

        this._config = config;
        this._app = express();

        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: false }));
    
        const routes = appRoutes(config); // inject configuration into routes
        this._app.use(routes);
    
        const swaggerDocument = YAML.load('src/openapi.yaml');
        var options = {
            customCss: '.swagger-ui .topbar { display: none }'
          };
        this._app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    
        this._app.get('*', (req: Request, res: Response) => {
            res.redirect('/api/swagger'); // default route
        })

    }

    public getApp () {
        return this._app;
    }

    public getConfig () {
        return this._config;
    }




}