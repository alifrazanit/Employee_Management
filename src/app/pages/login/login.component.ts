import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UtilsService } from '@utils/utils.service';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';

// import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [
    UtilsService,
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }


  onLogin() {
    if (this.form.invalid) {
      this.utilsService.showError('Silakan lengkapi informasi yang diperlukan.');
      this.form.markAllAsTouched();
    } else {
      const formData = this.form.getRawValue();
      const payload = {
        username: formData['username'], 
        password: formData['password'], 
      }
      this.authService.signIn(payload).subscribe(res => {
        if(!res){
          this.utilsService.showError('Username atau password tidak sesuai');
        } else {
          this.router.navigate(['/'])
        }
      })
    }
  }
}
