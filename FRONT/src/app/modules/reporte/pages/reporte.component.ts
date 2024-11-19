import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../service/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
})
export class ReporteComponent implements OnInit {
  // Variables para los datos
  frequentClients: any[] = []; // Clientes frecuentes
  topSoldProducts: any[] = []; // Productos más vendidos
  activeProductsCount: number = 0; // Productos activos

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.loadFrequentClients();
    this.loadTopSoldProducts();
  
    // Suscribirse al observable de productos activos para actualizaciones en tiempo real
    this.reporteService.activeProductsCount$.subscribe({
      next: (count) => {
        console.log('Productos activos actualizados:', count); // Verificar la actualización
        this.activeProductsCount = count;
      },
      error: (err) => {
        console.error('Error al actualizar productos activos:', err);
      },
    });
  }
  

  // Cargar los 5 clientes más frecuentes
  loadFrequentClients(): void {
    this.reporteService.getFrequentClients().subscribe({
      next: (clients) => {
        this.frequentClients = clients;
      },
      error: (err) => {
        console.error('Error al cargar los clientes frecuentes:', err);
      },
    });
  }

  // Cargar los 5 productos más vendidos
  loadTopSoldProducts(): void {
    this.reporteService.getTopSoldProducts().subscribe({
      next: (products) => {
        // Mapear los datos a un formato más estructurado
        this.topSoldProducts = products.map((product: any[]) => ({
          productoNombre: product[0], // Nombre del producto
          totalVendido: product[1],   // Total vendido
        }));
      },
      error: (err) => {
        console.error('Error al cargar los productos más vendidos:', err);
      },
    });
  }
}
