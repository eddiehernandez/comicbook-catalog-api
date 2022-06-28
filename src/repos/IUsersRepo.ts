import IUser from "models/IUser";


export default interface IUsersRepo {
    addUser(user: IUser): Promise<IUser>
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getAllUsers(): Promise<IUser[]> ;
    deleteUserByEmail(email: string): Promise<any>;
}