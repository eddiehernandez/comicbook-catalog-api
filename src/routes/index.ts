import {Router} from 'express';
import router from './BlahComicst';


const routert = Router();
routert.use('/comics', router);

export default routert;