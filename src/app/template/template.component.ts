import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { SidenavComponent } from '@components/sidenav/sidenav.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '@services/loading/loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';
@Component({
  selector: 'app-template',
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatSidenavModule,
    SidenavComponent,
    MatProgressSpinnerModule
  ],
  providers: [
    LoadingService
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent implements OnInit {
  loadingService = inject(LoadingService);
  isLoading = this.loadingService.isLoading;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onLogout() {
    this.localStorage.removeAll();
    this.router.navigate(['login']);
  }

  toggleLoading() {
    this.loadingService.setLoading(!this.isLoading());
  }

}
