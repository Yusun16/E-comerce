import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../modules/login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): boolean {
    // Verificamos si el usuario tiene un token válido
    const token = this.authService.getuserToken();

    if (token) {
      // Si el token existe y es válido, permite la navegación
      return true;
    } else {
      // Si no hay token, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
