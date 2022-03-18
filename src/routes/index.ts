import {Router} from 'express';
import comicsRouter from './Comics';


const router = Router();
router.use('/comics', comicsRouter);

export default router;