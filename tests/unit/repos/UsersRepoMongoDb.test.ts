import UsersRepoMongoDb from '../../../src/repos/mongoDbRepo/UsersRepoMongoDb'
import dotenv from 'dotenv'
dotenv.config();


// describe('when getting all users', async () => {
    const testEmail = 'test@me.com';
    const testPassword = 'test12345';
    const user = {
        email: testEmail,
        password: testPassword
    };
    const usersRepo = new UsersRepoMongoDb(<string> process.env.MONGO_URI);

    jest.setTimeout(10000);

    beforeEach(async () => {
        const response = await usersRepo.deleteUserByEmail(testEmail);
    });

    test ('get all users returns array of users', async () => {
        await usersRepo.addUserAsync(user); // add at least one user
        const usersFound = await usersRepo.getAllUsersAsync();
        expect(usersFound).toBeTruthy();

    });

    test ('adding a user returns new user', async() => {
        const newUser = await usersRepo.addUserAsync(user);
        expect(newUser).toBeDefined();
    });


    test ('find user by email returns user', async () => {
        await usersRepo.addUserAsync(user); // add at least one user
        const userFound = await usersRepo.getUserByEmailAsync(testEmail);
        expect(userFound.email).toBe(testEmail);
    });

    afterEach(async () => {
        const response = await usersRepo.deleteUserByEmail(testEmail);
    });