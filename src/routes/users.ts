import { Router } from 'express';
import IConfig from 'models/IConfig';
import IUsersRepo from 'repos/IUsersRepo';
import * as usersController from '../controllers/usersController'

export default (config: IConfig, usersRepo: IUsersRepo): Router => {
    
    const usersRouter: Router = Router();
    usersRouter.get('/', usersController.getAllUsersHandler(usersRepo));
    usersRouter.post('/register', usersController.registerUserHandler(usersRepo));
    usersRouter.post('/login', usersController.loginUserHandler(config, usersRepo));
    return usersRouter;    

}
