import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Products } from 'src/app/core/models/products.interface';
import { OrdenService } from 'src/app/modules/orden/service/orden.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen: boolean = false;
  cartItems: Products[] = [];
  total: number = 0;
  private cartSubscription: Subscription = new Subscription();
  errorCompra: string | null = null;

  constructor(
    private cartService: CartService,
    private ordenService: OrdenService
  ) {}

  ngOnInit(): void {
    this.getCartItems();
    this.cartSubscription = this.cartService.cartUpdated$.subscribe(() => {
      this.getCartItems();
      this.calculateTotal();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  getCartItems() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  removeItemFromCart(item: Products) {
    this.cartService.removeFromCart(item);
    this.getCartItems();
  }

  onQuantityChange(productId: number, event: any) {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      this.cartService.updateProductQuantity(productId, quantity);
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => {
      return acc + item.precio * item.cantidad!;
    }, 0);
  }

  comprar() {
    const orderItems = this.cartItems.map((item) => ({
      producto: { id: item.id, },
      cantidad: item.cantidad,
    }));

    console.log(orderItems);

    this.ordenService.postOrden(orderItems).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.getCartItems();
        this.calculateTotal();
        window.location.reload();
      },
      error: (err) => {
        this.errorCompra = err.error;
        console.log('Error al realizar la compra:', err);
      },
    });
  }

  
}
