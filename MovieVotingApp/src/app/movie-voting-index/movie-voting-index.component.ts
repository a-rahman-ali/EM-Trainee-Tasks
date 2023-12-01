import { Component } from '@angular/core';
import { IMovie, defaultMovies } from 'src/models/IMovie';

@Component({
  selector: 'app-movie-voting-index',
  templateUrl: './movie-voting-index.component.html',
  styleUrls: ['./movie-voting-index.component.css']
})
export class MovieVotingIndexComponent {
  public movies: IMovie[] = defaultMovies;

  public onVote(movie: IMovie){
    if(!movie.isVoted){
      movie.isVoted = true;
    }
    else{
      // comment this line if you want to disable the unvote button
      // movie.isVoted = false;
    }
  }
}
