import IUser from "models/IUser";
import IUsersRepo from "../IUsersRepo";


export default class UsersRepoInMem implements IUsersRepo {

    private _users: IUser[];

    constructor (){
        this._users = new Array();

    }

    async addUser(user: IUser): Promise<IUser> {
        this._users.push(user);
        return user;
    }
    async getUserByEmail(email: string): Promise<IUser | undefined> {
        return this._users.find(x => x.email === email);
    }
    async getAllUsers(): Promise<IUser[]> {
        return this._users;
    }
    async deleteUserByEmail(email: string): Promise<any> {
        this._users = this._users.filter(x => x.email !== email);
        const response = {
            status: 'deletion successful',
            email: email
        }
        return response;
    }

}