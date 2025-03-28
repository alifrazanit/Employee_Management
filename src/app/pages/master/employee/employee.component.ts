import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Employee } from '@interfaces/Employee.interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { FormatCurrencyPipe } from 'src/app/pipes/format-currency/format-currency.pipe';
import { EmployeeService } from '@services/employee/employee.service';
import { UtilsService } from '@utils/utils.service';
import { Label } from '@config/label';
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
    UtilsService
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

  constructor(
    private employeeService: EmployeeService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchDDLStatus();
    this.fetchDDLGroup();
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      group: new FormControl(null),
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

  onFind() {
    if (this.form.invalid) {
      this.utils.showError(this.label.ERROR_MESSAGE.INVALID_INPUT);
    } else {

    } 
  }
}
