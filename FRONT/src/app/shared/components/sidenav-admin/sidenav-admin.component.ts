import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/service/login.service';


@Component({
  selector: 'app-sidenav-admin',
  templateUrl: './sidenav-admin.component.html',
  styleUrls: ['./sidenav-admin.component.scss']
})
export class SidenavAdminComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private loginService: LoginService, private router: Router) { }

  ngAfterViewInit() {
    //console.log(this.sidenav); 
  }

  toggleSidenav() {
    if (this.sidenav) {
      if (this.sidenav.opened) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    }
  }

    logout() {
      this.loginService.logout(); 
      window.location.reload();    
    }
  
}
