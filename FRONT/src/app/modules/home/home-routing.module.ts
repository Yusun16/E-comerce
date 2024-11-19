import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: determineRedirectPath(),
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'order',
    loadChildren: () => import('../orden/orden.module').then(m => m.OrdenModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('../reporte/reports.module').then(m => m.ReportsModule)
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

/**
 * Función para determinar la redirección inicial basada en el rol.
 */
function determineRedirectPath(): string {
  const role = sessionStorage.getItem('role'); 

  if (role === 'admin') {
    return 'reportes'; 
  }
  return 'products'; 
}
