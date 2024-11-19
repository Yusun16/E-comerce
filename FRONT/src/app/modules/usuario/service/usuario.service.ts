import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8083/api/security/register';

  constructor(private http: HttpClient) {}

  // Método para registrar usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  getUsers(): Observable<any[]> {
    const apiUrl = 'http://localhost:8083/api/security/consultar-usuarios';
    return this.http.get<any[]>(apiUrl);
  }
}
