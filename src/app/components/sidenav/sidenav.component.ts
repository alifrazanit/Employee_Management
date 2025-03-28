import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { sideMenu } from '@mocks/sideMenu.mock';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Label } from '@config/label';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTreeModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  label = Label;
  private menu = sideMenu;
  listMenu: any[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.listMenu = this.menu;
  }

  goTo(menu: any) {
    this.menu.forEach(m => {
      if (m.selected && m.id !== menu.id) {
        m.selected = false; 
      }
    });
    menu.selected = true;
    this.router.navigateByUrl(menu.url)
  }
}
