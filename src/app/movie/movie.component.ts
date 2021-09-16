import { Component, OnInit, Input , Output , EventEmitter   } from '@angular/core';
import { Movie } from '../dto/movie.dto';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {

  @Input() movie! : Movie;
  @Output() readonly myFirstEventEmitter = new EventEmitter<string>();

  constructor() { 
  }

  voteUp() {
    this.movie.upVote += 1;
  }
    
  voteDown() {
   this.movie.downVote += 1;
  }

  sendEvent() {
    this.myFirstEventEmitter.emit(`Je suis un événement envoyer par le film :${this.movie.name}`);
  }

  ngOnInit(): void {
  }

}
