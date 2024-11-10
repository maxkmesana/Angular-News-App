import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingInComponent } from '../../components/sing-in/sing-in.component';
import { UserService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { LogInComponent } from '../../components/log-in/log-in.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, SingInComponent, LogInComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

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
  }
}
