import { Router } from 'express';
import IComicsRepo from 'repos/IComicsRepo';
import {createComicHandler, deleteComicHandler, getAllComicsHandler, getComicByIdHandler, updateComicHandler} from '../controllers/comicsController'

export default (comicsRepo: IComicsRepo): Router => {

    const comicsRouter: Router = Router();
    comicsRouter.get('/', getAllComicsHandler(comicsRepo));
    comicsRouter.get('/:id', getComicByIdHandler(comicsRepo));
    comicsRouter.delete('/:id', deleteComicHandler(comicsRepo));
    comicsRouter.post('/', createComicHandler(comicsRepo));
    comicsRouter.put('/:id', updateComicHandler(comicsRepo));
    return comicsRouter;

}



