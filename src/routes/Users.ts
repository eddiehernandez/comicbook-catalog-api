import { Router } from 'express';
import { getAllUsersHandler, registerUserHandler, loginUserHandler } from '../controllers/usersController'

const usersRouter: Router = Router();
usersRouter.get('/', getAllUsersHandler);
usersRouter.post('/register', registerUserHandler);
usersRouter.post('/login', loginUserHandler);
export default usersRouter;