import IUser from "models/IUser";
import IUsersRepo from "../IUsersRepo";
import mongoose, { model, Schema, connect, disconnect } from "mongoose";
import Logger from "../../utils/Logger";
import * as mongoDB from "mongodb";

export default class UsersRepoMongoDb implements IUsersRepo {

    private _collectionName: string = 'users';
    private _mongoDbName: string;

    private _client: mongoDB.MongoClient;
    private _collections: { users? : mongoDB.Collection } = {};

    private async connectToDb () {
        await this._client.connect();
        const db: mongoDB.Db = this._client.db(this._mongoDbName);
        const usersCollection: mongoDB.Collection = db.collection(this._collectionName);
        this._collections.users = usersCollection;
        // Logger.info(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
    }

    private async disconnectDb () {
        await this._client.close();
    }

    constructor (mongoHost: string, mongoDbName: string){
        this._mongoDbName = mongoDbName;
        this._client = new mongoDB.MongoClient(mongoHost);
    }

    async getAllUsers(): Promise<IUser[]> {
        try {
            await this.connectToDb(); 
            let users = (await this._collections.users?.find({}).toArray()) as unknown as IUser[];
            users = users.map(x => {
                return {
                    email: x.email,
                    password: '********'
                }
            });
            return users; 
        }
        catch (err){
            Logger.error('Error trying to get all users async', err);
            throw err;
        }
        finally{
            await this.disconnectDb();
        }
    }

    async addUser(user: IUser): Promise<IUser> {
        try {
            await this.connectToDb();
            const result = await this._collections.users?.insertOne(user);
            if (result?.acknowledged)
                return user;
            throw new Error('Error trying to add new user.');
        }
        catch (err){
            Logger.error('Error trying to add user', err);
            throw err;
        }     
        finally{
            await this.disconnectDb();
        }  
    }

    async getUserByEmail(email: string): Promise<IUser | undefined> {
        try {
            await this.connectToDb(); 
            let userFound = (await this._collections.users?.findOne({ email: email })) as unknown as IUser;
            if (!userFound) return undefined;
            return {
                email: userFound.email,
                password: userFound.password
            }
        }
        catch (err){
            Logger.error('Error trying to get all users async', err);
            throw err;
        }
        finally{
            await this.disconnectDb();
        }
    }

    async deleteUserByEmail(email: string): Promise<void> {
        try {
            await this.connectToDb();
            const result = await this._collections.users?.deleteOne({ email: email });
        }
        catch (err){
            throw err;
        }     
        finally{
            await this.disconnectDb();
        }  
    }

}