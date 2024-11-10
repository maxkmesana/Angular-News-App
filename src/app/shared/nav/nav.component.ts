import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryDropdownComponent } from "../../components/dropdown/dropdown.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CategoryDropdownComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  isMenuOpen = false;
  
  
  // Función para alternar el menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Prevenir el scroll cuando el menú está abierto
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // Función para cerrar el menú
  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  // Cerrar el menú cuando la ventana se redimensiona
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  // Cerrar el menú cuando se presiona la tecla Escape
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }
}
