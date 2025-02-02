import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../../../../shared/product-form/product-form.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {}