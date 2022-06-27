import IUser from "models/IUser";
import IUsersRepo from "../IUsersRepo";


export default class UsersRepoInMem implements IUsersRepo {

    private _users: IUser[];

    constructor (){
        this._users = new Array();

    }

    addUserAsync(user: IUser): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    getUserByEmailAsync(email: string): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    getAllUsersAsync(): Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    deleteUserByEmail(email: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getAllUsers(): IUser[] {
        return this._users;
    }

    addUser(user: IUser): IUser {
        this._users.push(user);
        return user;
    }

    getUserByEmail(email: string): IUser | undefined {
        return this._users.find(x => x.email === email);
    }

}