
import IComic from 'models/IComic';
import IComicsRepo from 'repos/IComicsRepo';


export default class GetComicByIdController {

    private _comicsRepo: IComicsRepo;

    constructor (comicsRepo: IComicsRepo) {
        this._comicsRepo = comicsRepo;
    }

    public run (id: string, userId: string): IComic {

        return this._comicsRepo.getComicById(id, userId);
    
    }
}