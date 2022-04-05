import IUser from "models/IUser";


export default interface IUsersRepo {
    addUser(user: IUser): IUser;
    getUserByEmail(email: string): IUser | undefined;
    getAllUsers(): IUser[];
}