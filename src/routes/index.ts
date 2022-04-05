import {Router} from 'express';
import IConfig from 'models/IConfig';
import IComicsRepo from 'repos/IComicsRepo';
import IUsersRepo from 'repos/IUsersRepo';
// import comicsRouter from './comics'
import { extractJWT } from './middleware';
// import usersRouter from './users';
import usersAppRouter from './users';
import comicsAppRouter from './comics';

export default (config: IConfig, usersRepo: IUsersRepo, comicsRepo: IComicsRepo): Router => {

    const router = Router();

    const usersRouter = usersAppRouter(config, usersRepo);
    const comicsRouter = comicsAppRouter(comicsRepo);

    router.use('/comics', extractJWT, comicsRouter);
    router.use('/users', usersRouter);

    return router;

}