import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  role: string | null = null; // Asegúrate de inicializar role como null por defecto.

  constructor() {}

  ngOnInit(): void {
    // Obtén el rol desde el sessionStorage o cualquier otra fuente confiable.
    this.role = sessionStorage.getItem('role');
    console.log('Rol detectado:', this.role); // Ayuda a depurar si el rol se carga correctamente.
  }
}
