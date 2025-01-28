import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: any[] = [];
  editMode = false;
  currentCategoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.editMode) {
        this.categoryService.updateCategory(this.currentCategoryId!, this.categoryForm.value).subscribe(updatedCategory => {
          this.loadCategories();
          this.categoryForm.reset();
          this.editMode = false;
          this.currentCategoryId = null;
        });
      } else {
        this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
          this.loadCategories();
          this.categoryForm.reset();
        });
      }
    }
  }

  onEdit(category: any) {
    this.editMode = true;
    this.currentCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  onDelete(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}