import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from './orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders(); // Reload orders after deletion
    });
  }

  updateOrderStatus(id: number, status: string): void {
    this.orderService.updateOrderStatus(id, status).subscribe(() => {
      this.loadOrders(); // Reload orders after status update
    });
  }
}

interface Order {
  id: number;
  orderNumber: string;
  customer: {
    id: number;
    name: string;
  };
  products: {
    id: number;
    name: string;
    price: number;
  }[];
  total: number;
  status: string;
}