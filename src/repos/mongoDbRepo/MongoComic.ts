export default interface MongoComic {
    _id?: string;
    userId?: string;
    issueNumber: string;    
    title: string;
    writer: string;
    illustrator: string;
    publisher: string;
}