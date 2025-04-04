import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Label } from '@config/label';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: string = '';
  constructor(
    private localStorage: LocalStorageService
  ) {
    this.username = this.localStorage.getItem('EMAUTH');
  }
  label = Label;
  @Output() onOpenSide = new EventEmitter();
  @Output() onLogout = new EventEmitter();

  onOpenSidemenu() {
    this.onOpenSide.emit(true)
  }

  logout() {
    this.onLogout.emit(true);
  }
}
