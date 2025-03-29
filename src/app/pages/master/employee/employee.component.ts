import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Employee } from '@interfaces/Employee.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { FormatCurrencyPipe } from 'src/app/pipes/format-currency/format-currency.pipe';
import { EmployeeService } from '@services/employee/employee.service';
import { UtilsService } from '@utils/utils.service';
import { Label } from '@config/label';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    FormatCurrencyPipe,
    MatPaginatorModule,
  ],
  providers: [
    EmployeeService,
    UtilsService,
    CurrencyPipe
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  label = Label;
  form!: FormGroup;
  dataSource!: MatTableDataSource<Employee[]>;
  displayedColumns: string[] = [
    'action',
    'id',
    'name',
    'email',
    'birthDate',
    'basicSalary',
    'status'
  ];
  listDDLStatus: any[] = [];
  listDDLGroup: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private utils: UtilsService
  ) { 
    this.paginator = new MatPaginator();
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchDDLStatus();
    this.fetchDDLGroup();
    this.fetchAllData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
    })
  }

  fetchDDLStatus() {
    this.employeeService.fetchDDLStatus().subscribe(res => {
      if (res) {
        const results: any = res;
        if (results?.status && results?.status.length != 0) {
          this.listDDLStatus = results.status;
        }
      }
    })
  }

  fetchDDLGroup() {
    this.employeeService.fetchDDLGroup().subscribe(res => {
      if (res) {
        const results: any = res;
        if (results?.group && results?.group.length != 0) {
          this.listDDLGroup = results.group;
        }
      }
    })
  }

  fetchAllData() {
    const params = {}
    return this.employeeService.fetchData(params).subscribe(results => {
      if (results && results.length !== 0) {
        this.dataSource = new MatTableDataSource(results);
      }
    })
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
      this.employeeService.fetchData(params).subscribe(results => {
        console.log('resutls', results)
      })
    }
  }
}
