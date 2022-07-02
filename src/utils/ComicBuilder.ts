import IComic from "models/IComic";

export default class ComicBuilder {

    private _comic: IComic;

    constructor() {
        this._comic = {
            id: '',
            userId: '',
            issueNumber: '',
            title: '',
            writer: '',
            illustrator: '',
            publisher: ''
        }
    }

    setId(id: string) {
        this._comic.id = id;
        return this;
    }


    setUserId(userId: string) {
        this._comic.userId = userId;
        return this;
    }

    setIssueNumber(issueNumber: string){
        this._comic.issueNumber = issueNumber;
        return this;
    }

    setTitle(title: string){
        this._comic.title = title;
        return this;
    }

    setWriter(writer: string){
        this._comic.writer = writer;
        return this;
    }

    setIllustrator(illustrator: string){
        this._comic.illustrator = illustrator;
        return this;
    }

    setPublisher(publisher: string){
        this._comic.publisher = publisher;
        return this;
    }

    build(): IComic {
        const comic = this._comic;
        this.clear();
        return comic;
    }


    clear(): void {
        this._comic = {
            id: '',
            userId: '',
            issueNumber: '',
            title: '',
            writer: '',
            illustrator: '',
            publisher: ''
        }
    }



}