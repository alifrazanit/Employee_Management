import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
    })
  }

}
