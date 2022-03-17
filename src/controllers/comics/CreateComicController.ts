
import { Request, Response } from 'express';
import IComic from 'models/IComic';
import IComicsRepo from 'repos/IComicsRepo';

export default class CreateComicController {

    private _comicsRepo: IComicsRepo;


    constructor (comicsRepo: IComicsRepo) {
        this._comicsRepo = comicsRepo;
    }

    public run (comic: IComic): IComic {

        return this._comicsRepo.addComic(comic);

    }
}