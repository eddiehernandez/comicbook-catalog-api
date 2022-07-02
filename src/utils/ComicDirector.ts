import IComic from "models/IComic";
import MongoComic from "../repos/mongoDbRepo/MongoComic";
import ComicBuilder from "./ComicBuilder";

export default class ComicDirector {

    static buildComic (mongoComic: MongoComic): IComic {
        return new ComicBuilder()
            .setId(mongoComic._id?.toString() ?? '')
            .setIllustrator(mongoComic.illustrator)
            .setIssueNumber(mongoComic.issueNumber)
            .setPublisher(mongoComic.publisher)
            .setTitle(mongoComic.title)
            .setUserId(mongoComic?.userId ?? '')
            .setWriter(mongoComic.writer)
            .build();
    }


}