import IComic from "models/IComic";
import IComicsRepo from "./IComicsRepo";


export default class ComicsRepoInMem implements IComicsRepo {

    private _comics: IComic[];

    constructor (){
        this._comics = new Array();
        
        // const comic1 = new Comic('1', '1', 'Amazing Spiderman', 'Stan Lee', 'Some Dude', 'Marvel');
        // const comic2 = new Comic('2', '100', 'Detective', 'Bob Kane', 'Some Other Dude', 'DC');

        const comic1: IComic = {
            id: '1',
            issueNumber: '1',
            title: 'Amazing Spiderman',
            writer: 'Stan Lee',
            illustrator: 'Some Dude',
            publisher: 'Marvel Comics'            
        };
        const comic2: IComic = {
            id: '2',
            issueNumber: '100',
            title: 'Batman: Detective',
            writer: 'Bob Kane',
            illustrator: 'Some Other Dude',
            publisher: 'DC Comics'            
        };

        this._comics.push(comic1);
        this._comics.push(comic2);

    }

    getAllComics(): IComic[] {

        return this._comics;

    }

    addComic(comic: IComic): IComic {
        const uniqueId = new Date().getTime();
        comic.id = uniqueId.toString();
        this._comics.push(comic);
        return comic;
    }

    getComicById(id: string): IComic {
        return this._comics.filter(x => x.id == id)[0];       
    }

    deleteComic(id: string): void {
        if (!this.getComicById(id))
            throw `Comic ${id} not found!`;
            
        this._comics = this._comics.filter(x => x.id != id);
    }

    updateComic(id: string, comic: IComic): IComic {

        if ((!id) || (!comic) || (!comic.id))
            throw 'Missing id and/or comic to update';

        if (id != comic.id)
            throw 'Request id does not equal comic id!';

        const existingComic = this.getComicById(id);
        if (!existingComic)
            throw `Comic ${comic.id} not found!`;

        this.deleteComic(id);
        this._comics.push(comic);
        return comic;

    }

}