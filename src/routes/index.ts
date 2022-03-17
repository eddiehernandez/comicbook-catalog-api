import {Router} from 'express';
import comics from '../routes/Comics';

const router = Router();
router.use('/comics', comics);

export default router;