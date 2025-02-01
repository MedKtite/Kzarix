import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProducstListService } from './products-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];

  constructor(private productsListService: ProducstListService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsListService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  onDelete(id: number) {
    this.productsListService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
  onEdit(product: any) {
    this.router.navigate(['dashboard/products', product.id]);
  }
}