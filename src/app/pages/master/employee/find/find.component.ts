import { inject, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormatCurrencyPipe } from 'src/app/pipes/format-currency/format-currency.pipe';
import { EmployeeService } from '@services/employee/employee.service';
import { UtilsService } from '@utils/utils.service';
import { Label } from '@config/label';
import { CurrencyPipe } from '@angular/common';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingService } from '@services/loading/loading.service';
import { Employee } from '@interfaces/Employee.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    FormatCurrencyPipe,
    PaginatorComponent,
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [
    EmployeeService,
    UtilsService,
    CurrencyPipe
  ],
  templateUrl: './find.component.html',
  styleUrl: './find.component.css'
})
export class FindComponent implements OnInit {
  label = Label;
  form!: FormGroup;
  dataSource: MatTableDataSource<Employee[]> = new MatTableDataSource<Employee[]>([]);
  displayedColumns: string[] = [
    'action',
    'id',
    'name',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'group'
  ];
  listDDLStatus: any[] = [];
  listDDLGroup: any[] = [];
  dataTable: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private utils: UtilsService,
    private loading: LoadingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.employeeService.getDDLGroup.subscribe(res => {
      if (res && res.length !== 0) {
        this.listDDLGroup = res;
      }
    });
    this.employeeService.getDDLStatus.subscribe(res => {
      if (res && res.length !== 0) {
        this.listDDLStatus = res;
      }
    });
    this.employeeService.getEmployee.subscribe(res => {
      this.dataTable = res;
      console.log("UPDATE", res)
    })

    this.fetchDDLGroup();
    this.fetchDDLStatus();
    this.fetchMockData();
  }

  fetchMockData() {
    this.employeeService.fetchMockData();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
    })
  }

  fetchDDLStatus() {
    this.loading.setLoading(true)
    this.employeeService.fetchDDLStatus().subscribe(res => {
      this.loading.setLoading(false)
    })
  }

  fetchDDLGroup() {
    this.loading.setLoading(true)
    this.employeeService.fetchDDLGroup().subscribe(result => {
      this.loading.setLoading(false)
    });
  }

  onFind() {
    if (this.form.invalid) {
      this.utils.showError(this.label.ERROR_MESSAGE.INVALID_INPUT);
    } else {
      const formData = this.form.getRawValue();
      const params = {
        name: formData.name,
        status: formData.status,
        group: formData.group,
      }
      this.dataTable = this.employeeService.fetchData(params);
    }
  }

  onDataReady(tableReady: any) {
    this.dataSource = new MatTableDataSource(tableReady);
  }

  matSortChange(event: any) {
    const colomn = event.active;
    const sort = event.direction;
    const sortedData = this.dataTable.sort((a, b) => typeof a[colomn] === 'string' ? a[colomn].localeCompare(b[colomn]) : a[colomn] - b[colomn]);
    if (sort === 'desc') {
      sortedData.reverse();
    }
    this.dataTable = [...sortedData];
  }

  onEdit(row: any) {
    this.utils.showInfo(`Edit Produk ID: ${row.id}`, 'Oke', 'edit-snackbar');
    this.router.navigate(['/master', 'employee', 'form-employee'])
  }

  onDelete(row: any) {
    const exist = this.employeeService.deleteData(row.id)
    if (exist) {
      this.utils.showInfo(`Delete Produk ID: ${row.id}`, 'Oke', 'delete-snackbar');
    }
  }

  onAddEmployee() {
    this.router.navigate(['master', 'employee', 'form-employee'])
  }
}
