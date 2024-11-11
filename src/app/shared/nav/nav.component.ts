import { Component, inject, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SingInComponent } from '../../components/sing-in/sing-in.component';
import { UserService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { LogInComponent } from '../../components/log-in/log-in.component';
import { CategoryDropdownComponent } from "../../components/dropdown/dropdown.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, SingInComponent, LogInComponent, CategoryDropdownComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit{
  isMenuOpen = false;
  router = inject(Router)
  
  
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
  userSubscription?: Subscription;
  authService = inject(UserService);
  username: string | undefined;

  ngOnInit(): void {
    this.userState();
  }

  isLoginModalOpen: boolean = false;
  isSigninModalOpen: boolean = false;

  userState(){
    this.userSubscription = this.authService.loggedUserId$.subscribe({
      next: (user) => {
        this.username = user?.username;
      },
      error: (error) => {
        console.error('Error fetching user state:', error);
        this.username = undefined;
      }
    })
  }

  openSigninModal() {
    this.isSigninModalOpen = true;
  }
  
  closeSigninModal() {
    this.isSigninModalOpen = false;
  }

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.isLoginModalOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate([""])
  }
}
