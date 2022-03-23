import {Router} from 'express';
import comicsRouter from './Comics';
import usersRouter from './Users';
import Middleware from './Middleware';


const router = Router();
router.use('/api/comics', Middleware.extractJWT, comicsRouter);
router.use('/api/users', usersRouter);

export default router;