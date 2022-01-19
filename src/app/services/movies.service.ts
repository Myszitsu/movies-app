import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDto } from '../models/movie';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3'
  apiKey: string  = '89de8b07893f00bdf9812d47f923190f'

  constructor(private http: HttpClient) {}

  getMovies(category: 'upcoming' | 'popular' | 'top_rated' = 'upcoming', maxResults: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${category}?api_key=${this.apiKey}`).pipe(switchMap(response => of(response.results.slice(0, maxResults))))
  }

  searchMovies(category: 'upcoming' | 'popular' | 'top_rated' = 'upcoming', page: number = 1) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${category}?page=${page}&api_key=${this.apiKey}`).pipe(switchMap(response => of(response.results)))
  }
}
