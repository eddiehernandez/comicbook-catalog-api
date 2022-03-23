import CreateComicController from "./CreateComicController";
import GetAllComicsController from "./GetAllComicsController";
import GetComicByIdController from "./GetComicByIdController";
import DeleteComicController from './DeleteComicController';
import UpdateComicController from "./UpdateComicController";
import { comicsRepo } from "../../repos";

// initialize application comics controllers
const createComicController = new CreateComicController(comicsRepo);
const getAllComicsController = new GetAllComicsController(comicsRepo);
const getComicByIdController = new GetComicByIdController(comicsRepo);
const deleteComicController = new DeleteComicController(comicsRepo);
const updateComicController = new UpdateComicController(comicsRepo);

export {
    createComicController, getAllComicsController, getComicByIdController, deleteComicController, updateComicController
};
