import { Injectable } from '@angular/core';
import { CommonHttpService } from '@services/common-http/common-http.service';
import { map } from 'rxjs';

interface signIn {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private commonHttp: CommonHttpService
  ) { }

  signIn(params: signIn) {
    return this.commonHttp.get().pipe(
      map((res) => {
        const employeesData: any = res;
        const employee = employeesData.employees;
        if (params.username) {
          const dataExist = employee.filter((e: any) => e.username === params.username);
          if(dataExist.length != 0){
            if (dataExist[0].password === params.password) {
              return dataExist
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
