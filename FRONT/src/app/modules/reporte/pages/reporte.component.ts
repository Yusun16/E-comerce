import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  // Variables para los contadores
  frequentClientsCount: number = 5; // Valor inicial para clientes frecuentes
  topProductsCount: number = 5; // Valor inicial para productos más vendidos
  activeProductsCount: number = 100; // Valor inicial para productos activos

  constructor() {}

  ngOnInit(): void {
    // Simulación de carga de datos
    this.loadReportData();
  }

  loadReportData(): void {
    // Reemplazar con lógica real de servicio para obtener los datos
    this.frequentClientsCount = 5;
    this.topProductsCount = 5;
    this.activeProductsCount = 120;
  }
}
