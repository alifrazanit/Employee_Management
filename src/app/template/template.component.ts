import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { SidenavComponent } from '@components/sidenav/sidenav.component';
@Component({
  selector: 'app-template',
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatSidenavModule,
    SidenavComponent
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onLogout() {
    this.localStorage.removeAll();
    this.router.navigate(['login']);
  }

}
