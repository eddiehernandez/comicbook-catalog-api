import IUser from "models/IUser";
import IUsersRepo from "../IUsersRepo";
import mongoose, { model, Schema, connect, disconnect } from "mongoose";
import Logger from "../../utils/Logger";

export default class UsersRepoMongoDb implements IUsersRepo {



    private _userSchema: Schema;
    private _UserModel: any;
    private _mongoUri: string;

    constructor (mongoUri: string){

        
        this._userSchema = new Schema<IUser>({
            email: { type: String, required: true },
            password: { type: String, required: true }
        });

        this._UserModel = model<IUser>('User', this._userSchema);

        this._mongoUri = mongoUri;

    }

    async getAllUsers(): Promise<IUser[]> {
        try {
            await connect(this._mongoUri);
            const usersFound = await this._UserModel.find().exec();
            await disconnect();
            return usersFound;                
        }
        catch (err){
            Logger.error('Error trying to get all users async', err);
            throw err;
        }
    }

    async addUser(user: IUser): Promise<IUser> {
        try {
            await connect(this._mongoUri);
            const newUser: IUser = await this._UserModel.create(user);
            await disconnect();

            const userResDTO: IUser = {
                email: newUser?.email,
                password: newUser?.password
            }
            return userResDTO;                
        }
        catch (err){
            Logger.error('Error trying to get all users async', err);
            throw err;
        }       
    }

    async getUserByEmail(email: string): Promise<IUser | undefined> {
        try {
            await connect(this._mongoUri);
            const userFound = await this._UserModel.findOne({email: email}).exec();
            await disconnect();
            if (!userFound) return undefined;
            const user: IUser = {
                email: userFound?.email,
                password: userFound?.password
            };
            return user;            
        }
        catch (err){
            Logger.error(`Error trying to get user with email ${email}`, err);
            throw err;
        }
    }

    async deleteUserByEmail(email: string): Promise<any> {
        try {
            await connect(this._mongoUri);
            const response = await this._UserModel.deleteMany({email: email});
            await disconnect();
            return response;
        }
        catch (err){
            Logger.error(`Error trying to delete users with email ${email}`, err);
            throw err;
        }
    }

}