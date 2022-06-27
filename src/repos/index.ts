import dotenv from 'dotenv'
dotenv.config();

import ComicsRepoInMem from "./inMemoryRepo/ComicsRepoInMem";
// import ComicsRepoMongoDb from "./mongoDbRepo/ComicsRepoMongoDb";

// import UsersRepoInMem from "./inMemoryRepo/UsersRepoInMem";
import UsersRepoMongoDb from "./mongoDbRepo/UsersRepoMongoDb";

// inialize application repos
const comicsRepo = new ComicsRepoInMem();
// const comicsRepo = new ComicsRepoMongoDb();

const usersRepo = new UsersRepoMongoDb(<string> process.env.MONGO_URI);
// const usersRepo = new UsersRepoInMem();

export { comicsRepo, usersRepo };