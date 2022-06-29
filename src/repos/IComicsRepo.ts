import IComic from "models/IComic";


export default interface IComicsRepo {
    getAllComics(userId: string) : Promise<IComic[]>;    
    addComic(comic: IComic, userId: string): Promise<IComic>;
    getComicById(id: string, userId: string): Promise<IComic | undefined>;
    deleteComic(id: string, userId: string): Promise<void>;
    updateComic(id: string, userId: string, comic: IComic): Promise<IComic>;
}