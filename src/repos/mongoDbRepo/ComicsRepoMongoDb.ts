import IComic from "models/IComic";
import IComicsRepo from "../IComicsRepo";
import mongoose, { Model } from "mongoose";
import Logger from "../../utils/Logger";

export default class ComicsRepoMongoDb implements IComicsRepo {

    private _Comic: any;

    constructor () {
        /** Connect to Mongo */
        if (!process.env.MONGO_URI) {
            Logger.error('MONGO_URI env variable has not been set.');
            throw 'MONGO_URI env variable has not been set.';
        }

        mongoose
            .connect(<string> process.env.MONGO_URI)
            .then((result) => {
                Logger.info('Mongo Connected');
                
                this._Comic = mongoose.model("Comic", new mongoose.Schema({
                    id: Number,
                    userId: String,
                    issueNumber: {type: String, require: true},
                    title: {type: String, require: true},
                    writer: {type: String, require: true},
                    illustrator: {type: String, require: true},
                    publisher: {type: String, require: true}
                }));
            })
            .catch((error) => {
                Logger.error(error.message, error);
                throw error;
            });
    }

    getAllComics(userId: string): IComic[] {
        throw 'Not Implemented';
    }

    addComic(comic: IComic, userId: string): IComic {
        console.log(comic);
        const newComic = new this._Comic(comic);
        newComic.save((err: any, data: any) => {
            if (err) throw err;
            console.log(data);
        });
        throw 'Not Implemented';
    }

    getComicById(id: string, userId: string): IComic | undefined {
        throw 'Not Implemented';     
    }

    deleteComic(id: string, userId: string): void {
        throw 'Not Implemented';
    }

    updateComic(id: string, userId: string, comic: IComic): IComic {

        throw 'Not Implemented';

    }

}