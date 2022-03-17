import CreateComicController from "./CreateComicController";
import ComicsRepoInMem from '../../repos/ComicsRepoInMem'
import IComicsRepo from "repos/IComicsRepo";
import GetAllComicsController from "./GetAllComicsController";
import GetComicByIdController from "./GetComicByIdController";
import DeleteComicController from './DeleteComicController';
import UpdateComicController from "./UpdateComicController";

const comicsRepo: IComicsRepo = new ComicsRepoInMem();
const createComicController = new CreateComicController(comicsRepo);
const getAllComicsController = new GetAllComicsController(comicsRepo);
const getComicByIdController = new GetComicByIdController(comicsRepo);
const deleteComicController = new DeleteComicController(comicsRepo);
const updateComicController = new UpdateComicController(comicsRepo);

export {
    createComicController, getAllComicsController, getComicByIdController, deleteComicController, updateComicController
};
