import { Injectable } from '@angular/core';
import { Employee } from '@interfaces/Employee.interface';
import { Group } from '@interfaces/Group.interface';
import { Status } from '@interfaces/Status.interface';
import { CommonHttpService } from '@services/common-http/common-http.service';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL = 'mocks/Employee.mock.json';
  private DDLGROUPURL = 'mocks/Group.mock.json';
  private DDLSTATUSURL = 'mocks/Status.mock.json';

  private ddlGroup = new BehaviorSubject<Group[]>([]);
  private ddlStatus = new BehaviorSubject<Status[]>([]);
  private dataEmployee = new BehaviorSubject<Employee[]>([]);


  get getDDLGroup() {
    return this.ddlGroup.asObservable();
  }

  get getDDLStatus() {
    return this.ddlStatus.asObservable();
  }

  get getEmployee() {
    return this.dataEmployee.asObservable();
  }


  setEmployee(dataEmployee: Employee[]) {
    this.dataEmployee.next(dataEmployee);
  }

  setDDLGroup(group: Group[]) {
    this.ddlGroup.next(group)
  }

  setDDLStatus(status: Status[]) {
    this.ddlStatus.next(status)
  }


  constructor(
    private commonHttp: CommonHttpService,
    private localStorage: LocalStorageService
  ) { }

  fetchDDLGroup() {
    return this.commonHttp.get(this.DDLGROUPURL).pipe(
      tap(dataGroup => {
        if (dataGroup) {
          const results: any = dataGroup;
          if (results?.group && results?.group.length != 0) {
            this.setDDLGroup(results.group);
          }
        }
      })
    )
  }

  fetchDDLStatus() {
    return this.commonHttp.get(this.DDLSTATUSURL).pipe(
      tap(dataStatus => {
        if (dataStatus) {
          const results: any = dataStatus;
          if (results?.status && results?.status.length != 0) {
            this.setDDLStatus(results.status);
          }
        }
      })
    )
  }

  fetchMockData() {
    return this.commonHttp.get(this.URL).subscribe(res => {
      const results: any = res;
      if (results && results.employess) {
        const formattedData = results.employess.map((d: any) => ({
          ...d,
          name: `${d.firstName} ${d.lastName}`
        }));
        this.setLocalEmployeeData(formattedData);
        this.setEmployee(formattedData);
      }
    });
  }

  fetchData(params: any) {
    const dataEmployee = this.dataEmployee.getValue();
    if (params.name && params.group && params.status) {
      const user = dataEmployee.filter((fd: any) => fd.group === params['group'] && fd.status === params['status'] && String(fd.name).toLowerCase().includes(String(params['name']).toLowerCase()));
      return user;
    } else {
      return []
    }
  }

  deleteData(id: any) {
    const dataEmployee = this.dataEmployee.getValue();
    const ExistData = dataEmployee.find(de => de.id === id);
    if (ExistData) {
      const data = dataEmployee.filter(de => de.id !== id);
      this.setEmployee(data);
      return true;
    } else {
      return false;
    }
  }

  save(data: Employee) {
    const dataEmployee = this.dataEmployee.getValue();
    const newData = [...dataEmployee, data];
    console.log('newData', newData)
    this.setEmployee(newData);
    // this.dataEmployee.next([...dataEmployee, data]);
  }

  setLocalEmployeeData(employee: any){
    this.localStorage.setItem('LIST_EMPLOYEE', employee);
  }

  getLocalEmployeeData(){
    return this.localStorage.getItem('LIST_EMPLOYEE');
  }

  fetchLocalDataEmployee(){
    const dataExist = this.localStorage.getItem('LIST_EMPLOYEE');
    if(!dataExist){
      this.fetchMockData();
    } else {
      this.setEmployee(dataExist);
    }
  }
}
