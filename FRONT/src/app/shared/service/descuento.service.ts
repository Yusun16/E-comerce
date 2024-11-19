import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/modules/login/service/login.service';
import { environment } from 'src/environment/enviroment';

export interface Descuento {
  id?: number;
  fechaInicio: Date;
  fechaFin: Date;
  estado?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DescuentoService {
  private apiUrl = `${environment.api}/descuento`; // URL base del endpoint de descuentos

  constructor(private http: HttpClient, private authService: LoginService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getuserToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    });
  }

  // Método para guardar un nuevo descuento
  guardarDescuento(descuento: Omit<Descuento, 'estado'>): Observable<Descuento> {
    const headers = this.getAuthHeaders();
    const descuentoConEstado = { ...descuento, estado: true }; // Estado por defecto en true
    return this.http.post<Descuento>(`${this.apiUrl}s`, descuentoConEstado, { headers });
  }
}
