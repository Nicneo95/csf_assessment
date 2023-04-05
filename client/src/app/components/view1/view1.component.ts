import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review, Comment } from 'src/app/models';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css'],
})
export class View1Component implements OnInit, OnDestroy {
  charMovie = '';
  param$!: Subscription;
  movies!: Review[];
  movie!: Review; 
  comments!: Comment[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieSvc: MovieService
  ) {}

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(async (params) => {
      this.charMovie = params['charMovie'];
      console.log(this.charMovie);
      const l = await this.movieSvc.getMovie(this.charMovie);
      const ll = await this.movieSvc.getMovieComments(this.charMovie);
        console.log(ll);
        this.comments = ll;

      console.log(l);
      if (l === undefined || l.length == 0) {
        this.router.navigate(['/']);
      } else {
        this.movies = l;
      }
    });
  }

  ngOnDestroy(): void {
    console.log('destroy sub');
    this.param$.unsubscribe();
  }

  // home function redirect to home page
  goHome() {
    this.router.navigate(['/']);
  }

  addComment(){
    // const queryParams: Params = { charParam: this.movie['display_title'] + '|' + this.movie.display_title };
    this.router.navigate(['/comment'])
  }
}
