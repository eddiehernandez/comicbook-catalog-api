import { Request, Response } from 'express';
import IComic from 'models/IComic';
import Logger from '../utils/Logger';
import IComicsRepo from 'repos/IComicsRepo';
import { ExpressRouteFunction } from '../types';

const getComicByIdHandler = (comicsRepo: IComicsRepo): any => {
    return async ( req: Request, res: Response) => {

        const id : string = req.params.id;

        try {
            const userId: string = res.locals.jwt.email;
            const comic = await comicsRepo.getComicById(id, userId);
            // Logger.info('comic found =>', comic);
            if (!comic) return res.status(404).json({message: `Comic ${id} not found.`});
            return res.json(comic);        
        }
        catch (err){
            return res.status(500).json({
                code: '500',
                message: 'Unexpected error',
                err
            });
        }

    }
}

const getAllComicsHandler = (comicsRepo: IComicsRepo): any => {
    return async ( req: Request, res: Response) => {
        try {
            const userId: string = res.locals.jwt.email;
            const comicsResponse = await comicsRepo.getAllComics(userId);
            return res.json({
                data: comicsResponse,
                count: comicsResponse.length
            });

        }
        catch (err){
            return res.status(500).json({
                code: '500',
                message: 'Unexpected error',
                err
            });
        }
    }
}


const deleteComicHandler = (comicsRepo: IComicsRepo): any => {
    return async (req: Request, res: Response) => {
        try {
            const userId: string = res.locals.jwt.email;
            const id : string = req.params.id;

            //validate comic you are trying to delete exists
            const comicFound = await comicsRepo.getComicById(id, userId);
            if (!comicFound) 
                return res.status(404).json({message: `Comic ${id} not found.`});

            //proceed to delete comicbook
            await comicsRepo.deleteComic(id, userId);
            return res.sendStatus(204);
        }
        catch (err){
            return res.status(500).json({
                code: '500',
                message: 'Unexpected error',
                err
            });
        }
    }
}

const createComicHandler = (comicsRepo: IComicsRepo): any => {
    return async (req: Request, res: Response) => {
        try {
            const userId: string = res.locals.jwt.email;

            //validate request body is not missing anything
            const body = req.body;
            if (!body.issueNumber || !body.title || !body.writer || !body.illustrator || !body.publisher)
                return res.status(400).json({
                    message: 'Bad request.  Missing issueNumber, title, writer, illustrator or publishier.'
                });

            let comic: IComic = body;
            const response = await comicsRepo.addComic(comic, userId);
            return res.status(201).json(response);
        }
        catch (err){
            return res.status(500).json({
                code: '500',
                message: 'Unexpected error',
                err
            });
        }
    }
}    

const updateComicHandler = (comicsRepo: IComicsRepo): any => {
    return async (req: Request, res: Response) => {
        try {
            const userId: string = res.locals.jwt.email;
            const id : string = req.params.id;

            const body = req.body;
            if (!body.issueNumber || !body.title || !body.writer || !body.illustrator || !body.publisher || !body.id)
                return res.status(400).json({
                    message: 'Bad request.  Missing issueNumber, title, writer, illustrator, publishier or id.'
                });

            const comic: IComic = body;
            const comicFound = await comicsRepo.getComicById(id, userId);
            if (!comicFound) 
                return res.status(404).json({message: `Comic ${id} not found.`});

            //proceed to delete comicbook
            const response = await comicsRepo.updateComic(id, userId, comic,);
            return res.json(response);
        }
        catch (err){
            return res.status(500).json({
                code: '500',
                message: 'Unexpected error',
                err
            });
        }
    }
}    

export { getComicByIdHandler, deleteComicHandler, createComicHandler, getAllComicsHandler, updateComicHandler };




