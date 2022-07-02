import IComic from "models/IComic";
import IComicsRepo from "../IComicsRepo";
import mongoose, { model, Schema, connect, disconnect, Types } from "mongoose";
import Logger from "../../utils/Logger";
import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";
import MongoComic from "./MongoComic";
import ComicDirector from "../../utils/ComicDirector"

export default class ComicsRepoMongoDb implements IComicsRepo {

    private _collectionName: string = 'comics';
    private _mongoDbName: string;

    private _client: mongoDB.MongoClient;
    private _collections: { comics? : mongoDB.Collection } = {};

    private async connectToDb () {
        await this._client.connect();
        const db: mongoDB.Db = this._client.db(this._mongoDbName);
        const comicsCollection: mongoDB.Collection = db.collection(this._collectionName);
        this._collections.comics = comicsCollection;
        // Logger.info(`Successfully connected to database: ${db.databaseName} and collection: ${comicsCollection.collectionName}`);
    }

    private async disconnectDb () {
        await this._client.close();
    }

    constructor (mongoHost: string, mongoDbName: string){
        this._mongoDbName = mongoDbName;
        this._client = new mongoDB.MongoClient(mongoHost);
    }

    async getAllComics(userId: string): Promise<IComic[]> {
        try {
            await this.connectToDb(); 
            let mongoComics = (await this._collections.comics?.find({ userId: userId }).toArray()) as unknown as MongoComic[];
            const comics: IComic[] = mongoComics.map(c => { return ComicDirector.buildComic(c) } );
            return comics; 
        }
        catch (err){
            Logger.error('Error trying to get all comics async', err);
            throw err;
        }
        finally{
            await this.disconnectDb();
        }
    }

    async addComic(comic: IComic, userId: string): Promise<IComic> {
        try {
            await this.connectToDb();
            comic.userId = userId;
            const result = await this._collections.comics?.insertOne(comic);
            if (result?.acknowledged && result?.insertedId)
                return ComicDirector.buildComic(comic);
            throw new Error('Error trying to add new comic.');
        }
        catch (err){
            Logger.error('Error trying to add comic', err);
            throw err;
        }     
        finally{
            await this.disconnectDb();
        } 
    }

    async getComicById(id: string, userId: string): Promise<IComic | undefined> {
        try {
            await this.connectToDb(); 
            let comicFound = (await this._collections.comics?.findOne({ _id: new ObjectId(id), userId: userId })) as unknown as IComic;
            if (!comicFound) return undefined;
            return ComicDirector.buildComic(comicFound)
        }
        catch (err){
            Logger.warn(`Error trying to get user ${id}`, err);
            return undefined;
            // throw err;
        }
        finally{
            await this.disconnectDb();
        }   
    }

    async deleteComic(id: string, userId: string): Promise<void> {
        try {
            await this.connectToDb();
            const result = await this._collections.comics?.deleteOne({ _id: new ObjectId(id), userId: userId });
            // Logger.info('deleted comic result =>', result);
        }
        catch (err){
            throw err;
        }     
        finally{
            await this.disconnectDb();
        } 

    }

    async updateComic(id: string, userId: string, comic: IComic): Promise<IComic> {
        try {
            await this.connectToDb();

            const query = {
                _id: new ObjectId(id),
                userId: userId
            }

            const result = await this._collections.comics?.updateOne(query, {
                $set: comic
            });
            // Logger.info('updated comic => ', result);

            if (result?.modifiedCount === 1)
                return ComicDirector.buildComic(comic);
            else
                throw new Error(`Unable to update comic ${id}`);

        }
        catch (err){
            Logger.error('Error trying to add comic', err);
            throw err;
        }     
        finally{
            await this.disconnectDb();
        } 

    }

}