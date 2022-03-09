import { Router, Request, Response } from 'express';
import ComicsServiceInMem from '../services/ComicsServiceInMem';
import IComicsService from '../services/IComicsService';

const router: Router = Router();
const comicsService: IComicsService = new ComicsServiceInMem();

router.get('/', (req: Request, res: Response) => {
    res.json(comicsService.getAllComics());
});

export default router;