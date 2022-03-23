import ComicsRepoInMem from "./ComicsRepoInMem";
import UsersRepoInMem from "./UsersRepoInMem";

// inialize application repos
const comicsRepo = new ComicsRepoInMem();
const usersRepo = new UsersRepoInMem();

export { comicsRepo, usersRepo };