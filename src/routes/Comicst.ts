import { createComicController, deleteComicController, getAllComicsController, getComicByIdController, updateComicController } from '../controllers/comics';
import { Router, Request, Response } from 'express';
import IComic from 'models/IComic';


const router: Router = Router();

router.get('/', (req: Request, res: Response) => {

    res.json(getAllComicsController.run());

});

router.get('/:id', (req: Request, res: Response) => {
    const id : string = req.params.id;
    let comic: IComic;

    try {
        comic = getComicByIdController.run(id);
        if (!comic) return res.status(404).json({message: `Comic ${id} not found.`});
        return res.json(comic);        
    }
    catch (err){
        return res.status(500).json(err);
    }

});

router.delete('/:id', (req: Request, res: Response) => {

    try {
        const id : string = req.params.id;

        //validate comic you are trying to delete exists
        if (!getComicByIdController.run(id)) 
            return res.status(404).json({message: `Comic ${id} not found.`});

        //proceed to delete comicbook
        deleteComicController.run(id);
        return res.sendStatus(204);
    }
    catch (err){
        return res.status(500).json(err);
    }

});

router.post('/', (req: Request, res: Response) => {
    
    try {

        //validate request body is not missing anything
        const body = req.body;
        if (!body.issueNumber || !body.title || !body.writer || !body.illustrator || !body.publisher)
            return res.status(400).json({
                message: 'Bad request.  Missing issueNumber, title, writer, illustrator or publishier.'
            });

        let comic: IComic = body;
        const response = createComicController.run(comic);
        return res.status(201).json(response);
    }
    catch (err){
        return res.status(500).json(err);
    }

});

router.put('/:id', (req: Request, res: Response) => {
    
    try {
        const id : string = req.params.id;

        const body = req.body;
        if (!body.issueNumber || !body.title || !body.writer || !body.illustrator || !body.publisher || !body.id)
            return res.status(400).json({
                message: 'Bad request.  Missing issueNumber, title, writer, illustrator, publishier or id.'
            });

        const comic: IComic = body;

        //validate comic you are trying to delete exists
        if (!getComicByIdController.run(id)) 
            return res.status(404).json({message: `Comic ${id} not found.`});

        //proceed to delete comicbook
        const response = updateComicController.run(id, comic);
        return res.json(response);
    }
    catch (err){
        return res.status(500).json(err);
    }

});

export default router;