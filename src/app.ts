import express, {Request, Response, NextFunction, Application} from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import config from './config';

const main = () => {
    const app: Application = express();
    const port: number = config.port;

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(routes);

    const swaggerDocument = YAML.load('src/openapi.yaml');
    app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get('*', (req: Request, res: Response) => {
        res.redirect('/api/swagger'); // default route
    })

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

main();


