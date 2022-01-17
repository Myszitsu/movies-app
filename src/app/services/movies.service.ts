import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3'
  apiKey: string  = '89de8b07893f00bdf9812d47f923190f'

  constructor(private http: HttpClient) {}

  getMovies(category: string = 'upcoming') {
    return this.http.get(`${this.baseUrl}/movie/${category}?api_key=${this.apiKey}`)
  }
}
