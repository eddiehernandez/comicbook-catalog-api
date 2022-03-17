
import { Request, Response } from 'express';
import IComic from 'models/IComic';
import IComicsRepo from 'repos/IComicsRepo';

export default class UpdateComicController {

    private _comicsRepo: IComicsRepo;


    constructor (comicsRepo: IComicsRepo) {
        this._comicsRepo = comicsRepo;
    }

    public run (id: string, comic: IComic): IComic {

        return this._comicsRepo.updateComic(id, comic);

    }
}