import 'dotenv';
import express, {Request, Response, NextFunction, Application} from 'express';

const main = () => {
    const app: Application = express();
    const port: number = parseInt(<string> process.env.PORT, 10) || 3000;

    app.get('/', (req: Request, res: Response) => {
        res.send(`Hello world! Server running on ${port}.`);
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

}

main();


