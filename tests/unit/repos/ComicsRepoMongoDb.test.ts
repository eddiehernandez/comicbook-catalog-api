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
    const usersRepo = new UsersRepoMongoDb(<string> process.env.MONGO_HOST, <string> process.env.MONGO_DB_NAME);    

    const comic: IComic = {
        issueNumber: Math.floor(Math.random() * 100).toString(),
        title: 'Arkham Asylum',
        writer: 'Some Guy',
        illustrator: 'Some Other Dude',
        publisher: 'DC Comics'            
    };    
    const comicsRepo = new ComicsRepoMongoDb(<string> process.env.MONGO_HOST, <string> process.env.MONGO_DB_NAME);

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


    test ('find comic by id and userId returns comic', async () => {
        const newComic = await comicsRepo.addComic(comic, testEmail);
        const comicFound: IComic | undefined = await comicsRepo.getComicById(newComic?.id ?? '', newComic?.userId ?? '');
        expect(comicFound?.id).toBe(newComic?.id);
        await comicsRepo.deleteComic((newComic.id ?? ''), (newComic.userId ?? ''))
    });

    test ('find comic by bad id and userId returns undefined', async () => {
        const comicFound: IComic | undefined = await comicsRepo.getComicById('120934894578', 'jest-test@me.com');
        expect(comicFound).toBe(undefined);
    });


    test ('update comic returns updated comic', async () => {
        const newComic = await comicsRepo.addComic(comic, testEmail);
        newComic.writer = 'new guy';
        const updatedComic = await comicsRepo.updateComic(newComic?.id ?? '', newComic?.userId ?? '', newComic);
        expect(updatedComic.writer).toBe('new guy');
        await comicsRepo.deleteComic((newComic.id ?? ''), (newComic.userId ?? ''))
    })

    afterEach(async () => {
        const response = await usersRepo.deleteUserByEmail(testEmail);
    });