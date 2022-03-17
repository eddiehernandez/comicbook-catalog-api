import {Router} from 'express';
import comics from './Comics';

const router = Router();
router.use('/comics', comics);

export default router;