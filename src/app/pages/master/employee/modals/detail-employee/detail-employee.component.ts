import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '@services/employee/employee.service';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { LoadingService } from '@services/loading/loading.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UtilsService } from '@utils/utils.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-detail-employee',
  imports: [
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatGridListModule,
    NgxMatSelectSearchModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    LoadingService,
    EmployeeService,
    UtilsService,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './detail-employee.component.html',
  styleUrl: './detail-employee.component.css'
})
export class DetailEmployeeComponent implements OnInit {
  form!: FormGroup;

  defListDDLGroup: any[] = [];
  listDDLGroup: any[] = [];
  listDDLStatus: any[] = [];

  id: string | null = null;
  readonly maxDate = new Date();
  constructor(
    private employeeService: EmployeeService,
    private loading: LoadingService,
    private router: Router,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DetailEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.employeeService.getDDLGroup.subscribe(res => {
      if (res && res.length !== 0) {
        this.listDDLGroup = res;
        this.defListDDLGroup = res;
      }
    });
    this.employeeService.getDDLStatus.subscribe(res => {
      if (res && res.length !== 0) {
        this.listDDLStatus = res;
      }
    });
    this.fetchDDLStatus();
    this.fetchDDLGroup();
    this.mappingForm(this.data);
  }

  mappingForm(data: any) {
    this.form.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate),
      email: data.email,
      username: data.username,
      basicSalary: data.basicSalary,
      description: data.description,
      password: data.password,
      status: data.status,
      group: data.group,
    })
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      basicSalary: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      groupTxt: new FormControl(null),
      group: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
    this.form.get('basicSalary')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.patchValue({
          basicSalary: this.utils.formatCurrenyIDR(value)
        }, { emitEvent: false })
      }
    });
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

  findUser(id: any) {
    const user = this.employeeService.fetchLocalDataEmployeeById(id);
    if (!user) {
      this.router.navigate(['master', 'employee', 'find']);
      return null;
    } else {
      return user;
    }
  }

  toggleAll(event: any) {
    console.log('Toggle All Clicked:', event);
  }
}
