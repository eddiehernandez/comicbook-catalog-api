import {Router} from 'express';
import comics from './comics';

const router = Router();
router.use('/comics', comics);

export default router;