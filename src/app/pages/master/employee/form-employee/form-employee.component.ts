import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { EmployeeService } from '@services/employee/employee.service';
import { LoadingService } from '@services/loading/loading.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@Component({
  selector: 'app-form-employee',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatDatepickerModule,
    MatGridListModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    LoadingService,
    EmployeeService
  ],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent implements OnInit {
  form!: FormGroup;
  listDDLGroup: any[] = [];
  defListDDLGroup: any[] = [];
  readonly maxDate = new Date();
  groupTxt: string = '';

  constructor(
    private employeeService: EmployeeService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.employeeService.getDDLGroup.subscribe(res => {
      if (res && res.length !== 0) {
        this.listDDLGroup = res;
        this.defListDDLGroup = res;
      }
    });

    this.fetchDDLGroup();
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
      groupTxt: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
    this.form.get('groupTxt')?.valueChanges.subscribe(res => {
      this.filterGroup();
    });
  }

  filterGroup() {
    const val = this.form.get('groupTxt')?.value;
    if (!val) {
      this.listDDLGroup = [...this.defListDDLGroup];
      return;
    }
    let search = String(val).toLowerCase();
    this.listDDLGroup = this.defListDDLGroup.filter(ld =>
      String(ld.value).toLowerCase().includes(search)
    );
  }

  fetchDDLGroup() {
    this.loading.setLoading(true)
    this.employeeService.fetchDDLGroup().subscribe(result => {
      this.loading.setLoading(false)
    });
  }

  filterMyOptions(value: any) {
    console.log('VALE', value)
    // this.selectedStates = this.search(value);
  }

  toggleAll(event: any) {
    console.log('Toggle All Clicked:', event);
  }
}
