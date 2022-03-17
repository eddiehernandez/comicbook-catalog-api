import GetAllComicsController from '../controllers/comics/GetAllComicsController';
import { Router, Request, Response } from 'express';
import IComic from 'models/IComic';
import { ComicsRepoInMem } from '../repos/ComicsRepoInMem';
import IComicsRepo from 'repos/IComicsRepo';

const router: Router = Router();
const comicsRepo: IComicsRepo = new ComicsRepoInMem();
const getAllComicsController = new GetAllComicsController(comicsRepo);

// router.get('/', (req: Request, res: Response) => {
//     res.json(comicsRepo.getAllComics());
// });

router.get('/', (req: Request, res: Response) => {

    res.json(getAllComicsController.run());

});

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);

    //validate request body is not missing anything
    const body = req.body;
    const issueNumber: string = req.body.issueNumber;
    const title: string = req.body.title;
    const writer: string = req.body.writer;
    const illustrator: string = req.body.illustrator;
    const publisher: string = req.body.publisher;

    if (!issueNumber || !title || !writer || !illustrator || !publisher)
        return res.status(400).json({
            message: 'Bad request.  Missing issueNumber, title, writer, illustrator or publishier.'
        });

    let comic: IComic;

    try {
        comic = req.body;
        console.log(comic);
    }
    catch (err){
        return res.status(400).json(err);
    }
    
    //create Comic model from request body (TODO: is this the best way to create this object?)
    // let comic = new Comic('', issueNumber, title, writer, illustrator, publisher);
    
    //call controller, pass in Comic object and repo to add it to
    const response: IComic = comicsRepo.addComic(comic);
    res.status(201).json(response);

    //if I get a response then assume it was created, else handle an exception
})

// router.post('/', (req, res) => CreateComicController.run(req, res));

export default router;