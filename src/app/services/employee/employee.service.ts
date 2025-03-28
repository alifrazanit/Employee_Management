import { Injectable } from '@angular/core';
import { CommonHttpService } from '@services/common-http/common-http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL = 'mocks/Employee.mock.json';
  private DDLGROUPURL = 'mocks/Group.mock.json';
  private DDLSTATUSURL = 'mocks/Status.mock.json';

  constructor(
     private commonHttp: CommonHttpService
  ) { }

  fetchDDLGroup(){
    return this.commonHttp.get(this.DDLGROUPURL);
  }

  fetchDDLStatus(){
    return this.commonHttp.get(this.DDLSTATUSURL);
  }
}
