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
  imports: [NgIf, NgForOf],
  template: `
    <li class="dropdown-container" [class.active]="isOpen">
      <button (click)="toggleDropdown()" class="dropdown-trigger">
        Categories
        <div class="arrow-wrapper">
          <span class="arrow" [class.up]="isOpen">▼</span>
        </div>
      </button>
      
      <ul class="dropdown-menu" *ngIf="isOpen">
        <li *ngFor="let category of categories" 
            (click)="selectCategory(category)"
            [class.selected]="category.id === selectedCategory?.id">
          {{ category.name }}
        </li>
      </ul>
    </li>
  `,
  styles: [`
    .dropdown-container {
      position: relative;
      list-style: none;
    }

    .dropdown-trigger {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: inherit;
      color: inherit;
      font-family: inherit;
    }

    .arrow-wrapper {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      pointer-events: none;
    }

    .arrow {
      font-size: 0.8em;
      transition: transform 0.2s ease;
      margin-top: 2px;
      display: inline-block;
      text-decoration: none;
      pointer-events: none;
      user-select: none;
    }

    .arrow.up {
      transform: rotate(180deg);
    }

    .dropdown-menu {
      position: fixed;
      min-width: 180px;
      margin-top: 8px;
      padding: 8px 0;
      list-style: none;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 1050;
    }

    :host {
      display: block;
    }

    .dropdown-menu li {
      padding: 8px 16px;
      cursor: pointer;
      white-space: nowrap;
    }

    .dropdown-menu li.selected {
      background: rgba(0,0,0,0.08);
    }
  `]
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