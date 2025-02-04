import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../dashboard/pages/products/products.service';
import { CategoryService } from '../../dashboard/pages/products/category/category.service';
import { AngularEditorModule, AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularEditorModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {


  @Input() mode: 'add' | 'edit' = 'add';
  productForm: FormGroup;
  categories: any[] = [];
  selectedImage: File | null = null;
  productId?: number;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter description here...',
    translate: 'no',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.mode = 'edit';
        this.productId = params['id'];
        if (this.productId !== undefined) {
          this.loadProduct(this.productId);
        }
      }
    });
  }


  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  private loadProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          categoryId: product.category.id
        });
      },
      error: (error) => console.error('Error loading product:', error)
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }
  
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.value).forEach(key => {
        if (key !== 'images') {
          formData.append(key, this.productForm.get(key)?.value);
        }
      });
  
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
  
      const operation = this.mode === 'edit' && this.productId
        ? this.productService.updateProduct(this.productId, formData)
        : this.productService.addProduct(formData);
  
      operation.subscribe({
        next: () => {
          this.router.navigate(['/dashboard/products']);
        },
        error: (error) => console.error(`Error ${this.mode === 'edit' ? 'updating' : 'adding'} product:`, error)
      });
    } else {
      this.markFormGroupTouched(this.productForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get formControls() {
    return this.productForm.controls;
  }
}