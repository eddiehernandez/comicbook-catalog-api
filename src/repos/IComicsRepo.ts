import IComic from "models/IComic";


export default interface IComicsRepo {
    getAllComics() : IComic[];    
    addComic(comic: IComic): IComic;
    getComicById(id: string): IComic;
    deleteComic(id: string): void;
    updateComic(id: string, comic: IComic): IComic;
}