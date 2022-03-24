import {Router} from 'express';
import comicsRouter from './comics'
import { extractJWT } from './middleware';
import usersRouter from './users';

const router = Router();

router.use('/api/comics', extractJWT, comicsRouter);
router.use('/api/users', usersRouter);

export default router;