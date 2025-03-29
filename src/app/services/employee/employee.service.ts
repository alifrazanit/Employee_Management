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

  fetchDDLGroup() {
    return this.commonHttp.get(this.DDLGROUPURL);
  }

  fetchDDLStatus() {
    return this.commonHttp.get(this.DDLSTATUSURL);
  }

  fetchData(params: any) {
    return this.commonHttp.get(this.URL).pipe(map(results => {
      const data: any = results;
      if (data.employess && data.employess.length != 0) {
        const formattedData = data.employess.map((d: any) => ({
          ...d,
          name: `${d.firstName} ${d.lastName}`
        }));
        if (params.name && params.group && params.status) {
          const user = formattedData.filter((fd: any) => fd.group === params['group'] && fd.status === params['status'] && String(fd.name).toLowerCase().includes(String(params['name']).toLowerCase()));
          return user;
        } else {
          return formattedData;
        }
      } else {
        return [];
      }
    }))
  }
}
