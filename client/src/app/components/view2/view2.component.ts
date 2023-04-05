import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/models';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.css'],
})
export class View2Component implements OnInit, OnDestroy {
  forms!: FormGroup;
  queryParams$!: Subscription;
  charParam!: any;
  charMovie!: string;
  charId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private movieSvc: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forms = this.createForm();
    this.queryParams$ = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.charParam = queryParams['charParam'].split('|');
        console.log(this.charParam[0]);
        console.log(this.charParam[1]);
        this.charMovie = this.charParam[0];
        this.charId = this.charParam[1];
      }
    );
  }

  ngOnDestroy(): void {
    this.queryParams$.unsubscribe();
  }
  
  goHome() {
    this.router.navigate(['/']);
  }

  saveComment(){
    const commentFormVal = this.forms?.value['comment'];
    const c = {} as Comment;
    c.comment = commentFormVal;
    c.id = this.charId;

    this.movieSvc.saveComment(c);
    this.router.navigate(['/list', this.charId]);
  }

  private createForm(): FormGroup{
    return this.fb.group({
      name: this.fb.control('',[Validators.required,Validators.minLength(3)]),
      rating: this.fb.control('',[Validators.required]),
      comment: this.fb.control('',[Validators.required]),  
    })
  }

}
