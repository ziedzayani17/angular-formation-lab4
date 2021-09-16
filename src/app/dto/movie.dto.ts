export class Movie {

    upVote: number;
    downVote: number;
    name: string;
    pays: string;
    category: string;
    description: string;
    releaseDate: Date;

    constructor(name: string ,pays: string,
        category: string,description: string,releaseDate:Date,upVote?: number, downVote?: number) {
        this.downVote = downVote || 0;
        this.upVote = upVote || 0;
        this.name = name;
        this.pays = pays;
        this.category = category;
        this.description = description;
        this.releaseDate = releaseDate;
    }
}