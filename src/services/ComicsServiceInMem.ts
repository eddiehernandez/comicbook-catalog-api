import Comic from '../models/Comic'
import IComicsService from './IComicsService';

class ComicsServiceInMem implements IComicsService {

    comics: Comic[];

    constructor (){
        this.comics = new Array();
        
        const comic1 = new Comic(1, 1, 'Amazing Spiderman', 'Stan Lee', 'Some Dude', 'Marvel');
        const comic2 = new Comic(2, 100, 'Detective', 'Bob Kane', 'Some Other Dude', 'DC');

        this.comics.push(comic1);
        this.comics.push(comic2);

    }
    getAllComics(): Comic[] {
        return this.comics;
    }


}

export default ComicsServiceInMem;