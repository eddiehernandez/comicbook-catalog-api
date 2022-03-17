import IComic from "models/IComic";


export default interface IComicsRepo {
    getAllComics() : IComic[];    
    addComic(comic: IComic): IComic;
}