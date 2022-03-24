import { Router } from 'express';
import {createComicHandler, deleteComicHandler, getAllComicsHandler, getComicByIdHandler, updateComicHandler} from '../controllers/comicsController'

const comicsRouter: Router = Router();

comicsRouter.get('/', getAllComicsHandler);
comicsRouter.get('/:id', getComicByIdHandler);
comicsRouter.delete('/:id', deleteComicHandler);
comicsRouter.post('/', createComicHandler);
comicsRouter.put('/:id', updateComicHandler);

export default comicsRouter;
