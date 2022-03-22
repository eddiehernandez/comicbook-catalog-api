import 'dotenv';
import express, {Request, Response, NextFunction, Application} from 'express';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const main = () => {
    const app: Application = express();
    const port: number = parseInt(<string> process.env.PORT, 10) || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(routes);

    const swaggerDocument = YAML.load('src/openapi.yaml');
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get('/', (req: Request, res: Response) => {
        res.send(`Hello world!! Server running on ${port}.`);
    });

    

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

main();


