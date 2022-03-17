
import { Request, Response } from 'express';
import IComic from 'models/IComic';
import IComicsRepo from 'repos/IComicsRepo';


export default class GetAllComicsController {

    private _comicsRepo: IComicsRepo;

    constructor (comicsRepo: IComicsRepo) {
        this._comicsRepo = comicsRepo;
    }

    public run (): IComic[] {

        return this._comicsRepo.getAllComics();
    
    }
}