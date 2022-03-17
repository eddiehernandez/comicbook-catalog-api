import IComic from "models/IComic";
import IComicsRepo from "./IComicsRepo";


export class ComicsRepoInMem implements IComicsRepo {

    comics: IComic[];

    constructor (){
        this.comics = new Array();
        
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

        this.comics.push(comic1);
        this.comics.push(comic2);

    }

    getAllComics(): IComic[] {

        return this.comics;

    }

    addComic(comic: IComic): IComic {
        const uniqueId = new Date().getTime();
        comic.id = uniqueId.toString();
        this.comics.push(comic);
        return comic;
    }


}