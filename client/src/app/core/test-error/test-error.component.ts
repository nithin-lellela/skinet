import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  baseUrl = "https://localhost:5001/api/";
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl + 'products/43').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    })
  }
  get400ValidationError(){
    this.http.get(this.baseUrl + 'products/fourtyThree').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.validationErrors = err.errors;
      },
      complete: () => {

      }
    })
  }
  get500Error(){
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    })
  }
  get400Error(){
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    })
  }

}
