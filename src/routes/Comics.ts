import { createComicController, deleteComicController, getAllComicsController, getComicByIdController, updateComicController } from '../controllers/comics';
import { Router, Request, Response } from 'express';
import IComic from 'models/IComic';

const comicsRouter: Router = Router();

comicsRouter.get('/', (req: Request, res: Response) => {
    try {
        const userId: string = res.locals.jwt.email;

        const comicsResponse = getAllComicsController.run(userId);
        return res.json({
            comics: comicsResponse,
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
});

comicsRouter.get('/:id', (req: Request, res: Response) => {

    const id : string = req.params.id;
    let comic: IComic | undefined;

    try {
        const userId: string = res.locals.jwt.email;
        comic = getComicByIdController.run(id, userId);
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

});

comicsRouter.delete('/:id', (req: Request, res: Response) => {

    try {
        const userId: string = res.locals.jwt.email;
        const id : string = req.params.id;

        //validate comic you are trying to delete exists
        if (!getComicByIdController.run(id, userId)) 
            return res.status(404).json({message: `Comic ${id} not found.`});

        //proceed to delete comicbook
        deleteComicController.run(id, userId);
        return res.sendStatus(204);
    }
    catch (err){
        return res.status(500).json({
            code: '500',
            message: 'Unexpected error',
            err
        });
    }

});

comicsRouter.post('/', (req: Request, res: Response) => {
    
    try {
        const userId: string = res.locals.jwt.email;

        //validate request body is not missing anything
        const body = req.body;
        if (!body.issueNumber || !body.title || !body.writer || !body.illustrator || !body.publisher)
            return res.status(400).json({
                message: 'Bad request.  Missing issueNumber, title, writer, illustrator or publishier.'
            });

        let comic: IComic = body;
        const response = createComicController.run(comic, userId);
        return res.status(201).json(response);
    }
    catch (err){
        return res.status(500).json({
            code: '500',
            message: 'Unexpected error',
            err
        });
    }

});

comicsRouter.put('/:id', (req: Request, res: Response) => {
    
    try {
        const userId: string = res.locals.jwt.email;
        const id : string = req.params.id;

        const body = req.body;
        if (!body.issueNumber || !body.title || !body.writer || !body.illustrator || !body.publisher || !body.id)
            return res.status(400).json({
                message: 'Bad request.  Missing issueNumber, title, writer, illustrator, publishier or id.'
            });

        const comic: IComic = body;

        //validate comic you are trying to delete exists
        if (!getComicByIdController.run(id, userId)) 
            return res.status(404).json({message: `Comic ${id} not found.`});

        //proceed to delete comicbook
        const response = updateComicController.run(id, comic, userId);
        return res.json(response);
    }
    catch (err){
        return res.status(500).json({
            code: '500',
            message: 'Unexpected error',
            err
        });
    }

});

export default comicsRouter;