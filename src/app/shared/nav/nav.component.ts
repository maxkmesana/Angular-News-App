import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingInComponent } from '../../components/sing-in/sing-in.component';
import { UserService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, SingInComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  ngOnInit(): void {
    this.userState();
  }

  userSubscription?: Subscription;
  authService = inject(UserService);
  isModalOpen: boolean = false;
  username: string | undefined;

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

  openModal() {
    this.isModalOpen = true;
  }
  
  closeModal() {
    this.isModalOpen = false;
  }
}
