import ComicsRepoMongoDb from '../../../src/repos/mongoDbRepo/ComicsRepoMongoDb';
import IComic from '../../../src/models/IComic';
import dotenv from 'dotenv';
import UsersRepoMongoDb from '../../../src/repos/mongoDbRepo/UsersRepoMongoDb';
dotenv.config();


// describe('when getting all users', async () => {
    const testEmail = 'jest-test@me.com';
    const testPassword = 'test12345';
    const user = {
        email: testEmail,
        password: testPassword
    };
    const usersRepo = new UsersRepoMongoDb(<string> process.env.MONGO_URI);    

    const comic: IComic = {
        issueNumber: Math.floor(Math.random() * 100).toString(),
        title: 'Arkham Asylum',
        writer: 'Some Guy',
        illustrator: 'Some Other Dude',
        publisher: 'DC Comics'            
    };    
    const comicsRepo = new ComicsRepoMongoDb(<string> process.env.MONGO_URI);

    jest.setTimeout(10000);

    beforeEach(async () => {
        try {
            await usersRepo.addUser(user);
        }
        catch (err){
            console.log(err);
        }
    });

    test ('get all comics returns array of comics', async () => {
        const comicsFound = await comicsRepo.getAllComics(testEmail);
        expect(comicsFound).toBeTruthy();

    });

    test ('adding and deleting a comic throws no errors', async() => {
        const newComic = await comicsRepo.addComic(comic, testEmail);
        expect(newComic).toBeDefined();
        await comicsRepo.deleteComic((newComic.id ?? ''), (newComic.userId ?? ''))
    });


    // test ('find user by email returns user', async () => {
    //     await usersRepo.addUser(user); // add at least one user
    //     const userFound = await usersRepo.getUserByEmail(testEmail);
    //     expect(userFound?.email).toBe(testEmail);
    // });

    // test ('find invalid email returns undefined', async() => {
    //     const badEmail = 'hello123@me.com';
    //     const response = await usersRepo.deleteUserByEmail(badEmail); //make sure this user does not exist
    //     const userFound = await usersRepo.getUserByEmail(testEmail);
    //     expect(userFound).toBe(undefined);   
    // })

    afterEach(async () => {
        const response = await usersRepo.deleteUserByEmail(testEmail);
    });