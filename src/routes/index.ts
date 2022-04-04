import {Router} from 'express';
import comicsRouter from './comics'
import { extractJWT } from './middleware';
import usersRouter from './users';

const router = Router();

router.use('/comics', extractJWT, comicsRouter);
router.use('/users', usersRouter);

export default router;