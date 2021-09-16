import { Component, OnInit, Injector } from '@angular/core';
import { Movie } from '../dto/movie.dto';

import { DatePipe } from '@angular/common'
import { MockMovieService } from '../services/impl/movie-service.impl';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [DatePipe]
})
export class MoviesComponent implements OnInit {

  today;
  movies : Movie[];
  items : string[] = [];

  constructor(public datePipe: DatePipe,private mockMovieService: MockMovieService) { 

    //const injector = Injector.create({providers: [{provide: MockMovieService, deps: []}]});
    //this.movies = injector.get(MockMovieService).getMovies();

    this.movies = this.mockMovieService.getMovies();
    this.today = this.datePipe.transform( new Date(),'yyyy-MM-dd  hh:mm:ss');

  }

  ngOnInit(): void {

  }

  addItem(newItem: string) {
    this.items.push(newItem);
  }

}
