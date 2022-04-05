import {Router} from 'express';
import IConfig from 'models/IConfig';
import comicsRouter from './comics'
import { extractJWT } from './middleware';
import usersRouter from './users';

export default (config: IConfig): Router => {

    const router = Router();
    console.log(config);
    router.use('/comics', extractJWT, comicsRouter);
    router.use('/users', usersRouter);

    return router;

}