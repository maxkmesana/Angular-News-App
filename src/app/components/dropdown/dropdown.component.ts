// category-dropdown.component.ts
import { Component, HostListener, inject } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [ NgForOf, NgIf ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class CategoryDropdownComponent {
  categories: Category[] = [
    { id: "technology", name: 'Technology' },
    { id: "software development", name: 'Software Development' },
    { id: "AI", name: 'Artificial Intelligence' },
    { id: "cybersecurity", name: 'Cybersecurity' },
    { id: "hardware", name: 'Hardware' }
  ];

  router = inject(Router);
  isOpen = false;
  selectedCategory: Category | null = null;

  toggleDropdown(): void {
    if (!this.isOpen) {
      setTimeout(() => {
        const trigger = document.querySelector('.dropdown-trigger') as HTMLElement;
        const menu = document.querySelector('.dropdown-menu') as HTMLElement;
        if (trigger && menu) {
          const rect = trigger.getBoundingClientRect();
          menu.style.top = `${rect.bottom}px`;
          menu.style.left = `${rect.left}px`;
        }
      });
    }
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.isOpen && !target.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }


  selectCategory(category: Category): void {
    this.router.navigate([`category/${category.id}`]);
    this.isOpen = false;
  }
  
}