import IUser from "models/IUser";
import IUsersRepo from "repos/IUsersRepo";

export default class GetAllUsersUseCase {
    

    getAllUsers(usersRepo: IUsersRepo): IUser[] {
        return usersRepo.getAllUsers();
    }
    
}