// export class Comic {

//     id: string;
//     issueNumber: string;    
//     title: string;
//     writer: string;
//     illustrator: string;
//     publisher: string;

//     constructor (id: string, issueNumber: string, title: string, writer: string, illustrator: string, publisher: string){
//         this.id = id;
//         this.issueNumber = issueNumber;    
//         this.title = title;
//         this.writer = writer;
//         this.illustrator = illustrator;
//         this.publisher = publisher;    
//     }

// }

export default interface IComic {
    id?: string;
    issueNumber: string;    
    title: string;
    writer: string;
    illustrator: string;
    publisher: string;
}