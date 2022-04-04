import { Router } from 'express';
import * as usersController from '../controllers/usersController'

const usersRouter: Router = Router();
usersRouter.get('/', usersController.getAllUsersHandler);
usersRouter.post('/register', usersController.registerUserHandler);
usersRouter.post('/login', usersController.loginUserHandler);
export default usersRouter;