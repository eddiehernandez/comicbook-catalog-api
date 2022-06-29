import IComic from "models/IComic";
import IComicsRepo from "../IComicsRepo";


export default class ComicsRepoInMem implements IComicsRepo {

    private _comics: IComic[];

    constructor (){
        this._comics = new Array();

        const comic1: IComic = {
            id: '1',
            userId: 'jim@me.com',
            issueNumber: '1',
            title: 'Amazing Spiderman',
            writer: 'Stan Lee',
            illustrator: 'Some Dude',
            publisher: 'Marvel Comics'            
        };
        const comic2: IComic = {
            id: '2',
            userId: 'kate@me.com',
            issueNumber: '100',
            title: 'Batman: Detective',
            writer: 'Bob Kane',
            illustrator: 'Some Other Dude',
            publisher: 'DC Comics'            
        };

        this._comics.push(comic1);
        this._comics.push(comic2);

    }

    async getAllComics(userId: string): Promise<IComic[]> {
        return this._comics.filter(x => x.userId === userId);
    }

    async addComic(comic: IComic, userId: string): Promise<IComic> {
        const uniqueId = new Date().getTime();
        comic.id = uniqueId.toString();
        comic.userId = userId;
        this._comics.push(comic);
        return comic;
    }

    async getComicById(id: string, userId: string): Promise<IComic | undefined> {
        return this._comics.find(x => ((x.id === id) && (x.userId === userId)));       
    }

    async deleteComic(id: string, userId: string): Promise<void> {
        if (!this.getComicById(id, userId))
            throw `Comic ${id} not found!`;
            
        this._comics = this._comics.filter(x => !((x.id === id) && (x.userId === userId)));
    }

    async updateComic(id: string, userId: string, comic: IComic): Promise<IComic> {

        if ((!id) || (!comic?.id))
            throw 'Missing id and/or comic to update';

        if (id != comic.id)
            throw 'Request id does not equal comic id!';

        const existingComic = this.getComicById(id, userId);
        if (!existingComic)
            throw `Comic ${comic.id} not found!`;

        this.deleteComic(id, userId);
        comic.userId = userId;
        this._comics.push(comic);
        return comic;

    }

}