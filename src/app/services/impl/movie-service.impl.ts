import { Injectable } from "@angular/core";
import { Movie } from "src/app/dto/movie.dto";
import { IMovieService } from "../interfaces/movie-service.interface";


@Injectable({ providedIn: 'root' })
export class MockMovieService implements IMovieService{

    getMovies(): Movie[]{

        return [
            new Movie("The Matrix","US","SF/Action","Programmeur anonyme dans un service administratif le jour, Thomas Anderson devient Neo la nuit venue. Sous ce pseudonyme, il est l'un des pirates les plus recherchés du cyber-espace",new Date("1999-03-31"),2199,200),
            new Movie("Gladiator","US","Action/Aventure","Le général romain Maximus est le plus fidèle soutien de l'empereur Marc Aurèle, qu'il a conduit de victoire en victoire.",new Date("2000-06-30"),400,20),
            new Movie("Titanic","US","Romance/Drame","En 1997, l'épave du Titanic est l'objet d'une exploration fiévreuse, menée par des chercheurs de trésor en quête d'un diamant bleu qui se trouvait à bord. Frappée par un reportage télévisé, l'une des rescapés du naufrage, âgée de 102 ans, Rose DeWitt, se rend sur place et évoque ses souvenirs.",new Date("1998-01-07"),500,28),
      
          ];
    }
}