import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGE_SIZES } from '../../constants/image-sizes';
import { MovieDetails, MovieVideo, MovieImage } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: MovieDetails | null = null;
  movieVideos: MovieVideo[] = [];
  movieBackdrops: MovieImage[] = [];
  imageSizes = IMAGE_SIZES;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  getMovieDetails(id: string) {
    this.moviesService
      .getMovie(id)
      .subscribe((movieData) => (this.movie = movieData));
  }

  getMovieVideos(id: string) {
    this.moviesService
      .getMovieVideos(id)
      .subscribe((movieViedeoData) => (this.movieVideos = movieViedeoData));
  }

  getMovieImages(id: string) {
    this.moviesService
      .getMovieImages(id)
      .subscribe(movieImages => this.movieBackdrops = movieImages.backdrops)
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovieDetails(id);
      this.getMovieVideos(id);
      this.getMovieImages(id)
    });
  }
}
