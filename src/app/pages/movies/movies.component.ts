import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = []

  constructor(private moviesService: MoviesService) { }

  paginate(event: any) {
    this.getMoviesPage(++event.page)
  }

  getMoviesPage(page: number) {
    this.moviesService.searchMovies('popular', page).subscribe(response => this.movies = response)
  }

  ngOnInit(): void {
    this.getMoviesPage(1)
  }

}
