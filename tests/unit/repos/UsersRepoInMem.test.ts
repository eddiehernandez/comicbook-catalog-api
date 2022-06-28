// import UsersRepoMongoDb from '../../../src/repos/mongoDbRepo/UsersRepoMongoDb'
import UsersRepoInMem from '../../../src/repos/inMemoryRepo/UsersRepoInMem';
import dotenv from 'dotenv'
dotenv.config();


// describe('when getting all users', async () => {
    const testEmail = 'test@me.com';
    const testPassword = 'test12345';
    const user = {
        email: testEmail,
        password: testPassword
    };
    const usersRepo = new UsersRepoInMem();

    jest.setTimeout(10000);

    beforeEach(async () => {
        const response = await usersRepo.deleteUserByEmail(testEmail);
    });

    test ('get all users returns array of users', async () => {
        await usersRepo.addUser(user); // add at least one user
        const usersFound = await usersRepo.getAllUsers();
        expect(usersFound).toBeTruthy();

    });

    test ('adding a user returns new user', async() => {
        const newUser = await usersRepo.addUser(user);
        expect(newUser).toBeDefined();
    });


    test ('find user by email returns user', async () => {
        await usersRepo.addUser(user); // add at least one user
        const userFound = await usersRepo.getUserByEmail(testEmail);
        expect(userFound?.email).toBe(testEmail);
    });

    test ('find invalid email return undefined', async () => {
        const badEmail = 'hello123@me.com';
        const response = await usersRepo.deleteUserByEmail(badEmail); //make sure this user does not exist
        const userFound = await usersRepo.getUserByEmail(testEmail);
        expect(userFound).toBe(undefined);       
    })

    afterEach(async () => {
        const response = await usersRepo.deleteUserByEmail(testEmail);
    });