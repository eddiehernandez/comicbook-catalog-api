import IComic from "models/IComic";


export default interface IComicsRepo {
    getAllComics(userId: string) : IComic[];    
    addComic(comic: IComic, userId: string): IComic;
    getComicById(id: string, userId: string): IComic | undefined;
    deleteComic(id: string, userId: string): void;
    updateComic(id: string, userId: string, comic: IComic): IComic;
}