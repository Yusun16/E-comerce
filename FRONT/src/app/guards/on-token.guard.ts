import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../modules/login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class onTokenGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): boolean {
    // Verificamos si el usuario tiene un token válido
    const token = this.authService.getuserToken();

    if (token) {
      // Si el token existe, redirigimos al usuario a la página de inicio
      this.router.navigate(['/home/products']);
      return false;
    } else {
      // Si no hay token, permitimos el acceso (navegación)
      return true;
    }
  }
}
