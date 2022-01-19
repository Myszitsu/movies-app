import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie, MovieDto } from '../../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('popular', 12).subscribe((response: Movie[]) => {
      this.popularMovies = response;
    });

    this.moviesService.getMovies('upcoming', 12).subscribe((response: Movie[]) => {
      this.upcomingMovies = response;
    });

    this.moviesService.getMovies('top_rated', 12).subscribe((response: Movie[]) => {
      this.topRatedMovies = response;
    });
  }
}
