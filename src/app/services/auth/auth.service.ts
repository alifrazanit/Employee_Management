import { Injectable } from '@angular/core';
import { CommonHttpService } from '@services/common-http/common-http.service';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface signIn {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private preffixKey = 'EM';
  private authKey = 'AUTH'
  private key = `${this.preffixKey}${this.authKey}`;
  private URL = 'mocks/Employee.mock.json';

  constructor(
    private commonHttp: CommonHttpService,
    private localStorage: LocalStorageService
  ) { }

  setKey(value: any){
    return this.localStorage.setItem(this.key, value);
  }

  getKey(){
    return this.localStorage.getItem(this.key);
  }

  checkAuthByUsername(username: string){
    return this.commonHttp.get(this.URL).pipe(
      map((res) => {
        const employeesData: any = res;
        const employee = employeesData.employees;
        const dataExist = employee.filter((e: any) => e.username === username);
        if(dataExist.length != 0){
          return true;
        } else {
          return false;
        }
      })
    )
  }

  signIn(params: signIn) {
    return this.commonHttp.get(this.URL).pipe(
      map((res) => {
        const employeesData: any = res;
        const employee = employeesData.employess;
        if (params.username) {
          const dataExist = employee.filter((e: any) => e.username === params.username);
          if(dataExist.length != 0){
            if (dataExist[0].password === params.password) {
              this.setKey(dataExist[0].username);
              return dataExist[0]
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
    )
  }
}
