
import IComic from 'models/IComic';
import IComicsRepo from 'repos/IComicsRepo';


export default class DeleteComicController {

    private _comicsRepo: IComicsRepo;

    constructor (comicsRepo: IComicsRepo) {
        this._comicsRepo = comicsRepo;
    }

    public run (id: string, userId: string): void {

        return this._comicsRepo.deleteComic(id, userId);

    }
}