import IComic from "models/IComic";
import IComicsRepo from "../IComicsRepo";
import mongoose, { model, Schema, connect, disconnect, Types } from "mongoose";
import Logger from "../../utils/Logger";

interface IMongoComic extends IComic {
    _id?: Types.ObjectId
}


export default class ComicsRepoMongoDb implements IComicsRepo {

    private _comicSchema: Schema;
    private _ComicModel: any;
    private _mongoUri: string;

    constructor (mongoUri: string) {
        this._mongoUri = mongoUri;

        this._comicSchema = new Schema<IMongoComic>({
            id: { type: String, required: false},
            _id: { type: Schema.Types.ObjectId, required: false},
            userId: { type: String, required: true },
            issueNumber: { type: String, required: true },    
            title: { type: String, required: true },
            writer: { type: String, required: true },
            illustrator: { type: String, required: true },
            publisher: { type: String, required: true }
        });

        this._ComicModel = model<IMongoComic>('Comic', this._comicSchema);
    }

    async getAllComics(userId: string): Promise<IComic[]> {
        try {
            await connect(this._mongoUri);
            const comicsFound = await this._ComicModel.find({userId: userId});
            await disconnect();
            // Logger.info('comics found!', comicsFound);
            return comicsFound;                
        }
        catch (err){
            Logger.error('Error trying to get all comics async', err);
            throw err;
        }
    }

    async addComic(comic: IMongoComic, userId: string): Promise<IComic> {
        try {
            await connect(this._mongoUri);        
            comic.userId = userId; //associating comic to userId
            const newComic = await this._ComicModel.create(comic);
            await disconnect();

            const comicResponseDTO: IComic = {
                id: newComic._id.toString(),
                userId: newComic.userId,
                issueNumber: newComic.issueNumber,
                title: newComic.title,
                writer: newComic.writer,
                illustrator: newComic.illustrator,
                publisher: newComic.publisher                  
            }

            Logger.info('comic created', comicResponseDTO);
            return comicResponseDTO;                
        }
        catch (err){
            Logger.error('Error trying to create new comic.', err);
            throw err;
        }     
    }

    async getComicById(id: string, userId: string): Promise<IComic | undefined> {
        throw 'Not Implemented';     
    }

    async deleteComic(id: string, userId: string): Promise<void> {
        try {
            await connect(this._mongoUri);      
            const response = await this._ComicModel.deleteOne({
                // _id: new mongoose.Types.ObjectId(id),
                _id: id,
                userId: userId
            });
            await disconnect();
            Logger.info('delete response', response);
        }
        catch (err){
            throw err;
        }
    }

    async updateComic(id: string, userId: string, comic: IComic): Promise<IComic> {
        throw 'Not Implemented';

    }

}