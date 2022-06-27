import IUser from "models/IUser";


export default interface IUsersRepo {
    addUser(user: IUser): IUser;
    addUserAsync(user: IUser): Promise<IUser>
    getUserByEmail(email: string): IUser | undefined;
    getUserByEmailAsync(email: string): Promise<IUser>
    getAllUsers(): IUser[];
    getAllUsersAsync(): Promise<IUser[]> ;
    deleteUserByEmail(email: string): Promise<any>;
}