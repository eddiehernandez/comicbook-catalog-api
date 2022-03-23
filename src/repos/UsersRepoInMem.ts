import IUser from "models/IUser";
import IUsersRepo from "./IUsersRepo";


export default class UsersRepoInMem implements IUsersRepo {

    private _users: IUser[];

    constructor (){
        this._users = new Array();

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

    // getComicById(id: string): IComic {
    //     return this._comics.filter(x => x.id == id)[0];       
    // }

    // deleteComic(id: string): void {
    //     if (!this.getComicById(id))
    //         throw `Comic ${id} not found!`;
            
    //     this._comics = this._comics.filter(x => x.id != id);
    // }

    // updateComic(id: string, comic: IComic): IComic {

    //     if ((!id) || (!comic) || (!comic.id))
    //         throw 'Missing id and/or comic to update';

    //     if (id != comic.id)
    //         throw 'Request id does not equal comic id!';

    //     const existingComic = this.getComicById(id);
    //     if (!existingComic)
    //         throw `Comic ${comic.id} not found!`;

    //     this.deleteComic(id);
    //     this._comics.push(comic);
    //     return comic;

    // }

}