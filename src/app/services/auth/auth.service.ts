import { Injectable } from '@angular/core';
import { CommonHttpService } from '@services/common-http/common-http.service';
import { EmployeeService } from '@services/employee/employee.service';
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
    private localStorage: LocalStorageService,
    private employeeService: EmployeeService
  ) { }

  setKey(value: any) {
    return this.localStorage.setItem(this.key, value);
  }

  getKey() {
    return this.localStorage.getItem(this.key);
  }

  checkAuthByUsername(username: string) {
    const localEmployee = this.employeeService.getLocalEmployeeData();
    if (!localEmployee) {
      return false;
    } else {
      const dataExist = localEmployee.find((e: any) => e.username === username);
      if (dataExist) {
        return true;
      } else {
        return false;
      }
    }
  }

  signIn(params: signIn) {
    return this.commonHttp.get(this.URL).pipe(
      map((res) => {
        const employeesData: any = res;
        const employee = employeesData.employess;
        const localEmployee = this.employeeService.getLocalEmployeeData();
        if (params.username) {
          if (!localEmployee) {
            this.employeeService.setLocalEmployeeData(employee);
            const dataExist = employee.find((e: any) => e.username === params.username);
            if (dataExist) {
              if (dataExist.password === params.password) {
                this.setKey(dataExist.username);
                return dataExist;
              } else {
                return null;
              }
            } else {
              return null;
            }
          } else {
            const dataExist = localEmployee.find((e: any) => e.username === params.username);
            if (dataExist) {
              if (dataExist[0].password === params.password) {
                this.setKey(dataExist.username);
                return dataExist;
              } else {
                return null;
              }
            } else {
              return null;
            }
          }
        } else {
          return null;
        }
      })
    )
  }
}
