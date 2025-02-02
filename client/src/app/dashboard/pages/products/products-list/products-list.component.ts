import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];
  error: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Received products:', data);
        this.products = data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = error.message;
      }
    });
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
  onEdit(product: any) {
    this.router.navigate(['/dashboard/products/edit', product.id]);
  }
}