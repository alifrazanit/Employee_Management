import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@components/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-template',
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatSidenavModule
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {

}
