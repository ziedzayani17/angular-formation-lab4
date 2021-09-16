import { Injectable } from "@angular/core";
import { Movie } from "src/app/dto/movie.dto";


export interface IMovieService {

getMovies(): Movie[];

}