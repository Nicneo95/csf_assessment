import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Review, Comment } from './models';

const API_URI = "http://localhost:8080/api/search"

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_URI: string = '/api/search';

  constructor(private httpClient: HttpClient) {}

  getMovie(charMovie: string): Promise<any> {
    console.log('get movie');
    const params = new HttpParams().set('query', charMovie);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return lastValueFrom(
      this.httpClient.get<Review[]>(this.API_URI, {
        params: params,
        headers: headers,
      })
    );
  }

  saveComment(c:Comment) : Promise<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body=JSON.stringify(c);
    console.log("save comment !");
    return lastValueFrom(this.httpClient.post<Comment>(this.API_URI+"/" + c.id, body, {headers: headers}));
  }

  getMovieComments(charMovie: string): Promise<Comment[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log("get all comments !");
    return lastValueFrom(this.httpClient
        .get<Comment[]>(this.API_URI+"/comments/" + charMovie, {headers: headers}));
  }
}
