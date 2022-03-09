import Comic from '../models/Comic';

interface IComicsService {
    getAllComics() : Comic[];    
}

export default IComicsService;