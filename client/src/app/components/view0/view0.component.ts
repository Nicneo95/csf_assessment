import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view0',
  templateUrl: './view0.component.html',
  styleUrls: ['./view0.component.css']
})
export class View0Component implements OnInit {
  
  form!: FormGroup;
  charMovie?: string;
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      charMovie: this.fb.control('', [Validators.required, Validators.minLength(2), this.noTwoSpacesValidator, this.noLeadingSpaceValidator])
    })
  }

  noTwoSpacesValidator(control: { value: string | string[]; }) {
    if (control.value && control.value.indexOf('  ') >= 0) {
      return { 'twoSpaces': true };
    }
    return null;
  }

  noLeadingSpaceValidator(control: { value: string; }) {
    if (control.value && control.value.charAt(0) === ' ') {
      return { 'leadingSpace': true };
    }
    return null;
  }

  search() {
    const charMovie = this.form?.value['charMovie'];
    console.log(charMovie)
    this.router.navigate(['/list', charMovie]);
  }

}
