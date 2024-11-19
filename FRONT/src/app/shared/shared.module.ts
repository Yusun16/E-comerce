import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import { MaterialModule } from '../modules/material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CardProductsComponent } from './components/card-products/card-products.component';
import { TableOrderComponent } from './components/table-order/table-order.component';
import {RouterModule} from '@angular/router';
import { TableDetalleOrderComponent } from './components/table-detalle-order/table-detalle-order.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ImgBrokenDirective,
    SidenavComponent,
    CardProductsComponent,
    TableOrderComponent,
    TableDetalleOrderComponent,
    SidebarComponent,
    ConfirmDeleteDialogComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    SidenavComponent,
    CardProductsComponent,
    TableOrderComponent,
    TableDetalleOrderComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
