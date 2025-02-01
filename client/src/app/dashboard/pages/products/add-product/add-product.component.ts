import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularEditorComponent, AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { CategoryService } from '../category/category.service';
import { AddProductService } from './add-product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularEditorModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  selectedImage: File | null = null;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private categoryService: CategoryService,
    private addProductService: AddProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      categoryId: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
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
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      if (this.selectedImage) {
        formData.append('file', this.selectedImage);
      }

      this.addProductService.addProduct(formData).subscribe(response => {
        console.log('Product added successfully', response);
        this.productForm.reset();
        this.selectedImage = null;
      }, error => {
        console.error('Error adding product', error);
      });
    } else {
      this.logFormErrors();
    }
  }

  logFormErrors() {
    Object.keys(this.productForm.controls).forEach(key => {
      const controlErrors = this.productForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`Key: ${key}, Errors:`, controlErrors);
      }
    });
  }
}