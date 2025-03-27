import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {
  private mockUrl = 'mocks/Employee.mock.json';
  constructor(
    private http: HttpClient
  ) { }


  get() {
    return this.http.get(this.mockUrl);
  }

}
