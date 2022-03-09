class Comic {

    id: number;
    issueNumber: number;    
    title: string;
    writer: string;
    illustrator: string;
    publisher: string;

    constructor (id: number, issueNumber: number, title: string, writer: string, illustrator: string, publisher: string){
        this.id = id;
        this.issueNumber = issueNumber;    
        this.title = title;
        this.writer = writer;
        this.illustrator = illustrator;
        this.publisher = publisher;    
    }

}

export default Comic;