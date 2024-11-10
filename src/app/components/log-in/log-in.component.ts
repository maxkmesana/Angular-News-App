import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/users.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, A11yModule, NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
 
  @Output() modalClosed = new EventEmitter<void>;
  @Input() isOpenL: boolean = false;

  passwordVisible: boolean = false;
  fb = inject(FormBuilder);
  authService = inject(UserService);

  ngOnInit(): void {
    
  }

  constructor() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpenL) {
        this.closeModal();
      }
    });
  }

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), 
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z0-9-_@#$%^&+=!?]{8,}$')]]
  })

  onSubmit() {
    const checkUser = this.form.getRawValue();
    console.log('aaaaaaaa')
    this.authService.login(checkUser.username, checkUser.password).subscribe({
      next: () => {

        this.closeModal();
      },
      error: (error) => {
        if(error === 500){
          alert('Server error')
        }
      }
    })
  }

  onRevealPassword(password: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    password.type = this.passwordVisible ? 'text' : 'password';
  }

  openModal() {
    this.isOpenL = true;
    document.body.style.overflow = 'hidden';
  }
  
  
  closeModal() {
    this.isOpenL = false;
    document.body.style.overflow = 'auto';
    this.form.reset();
    this.modalClosed.emit();
  }

  
  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleEscKey);
  }

  handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isOpenL) { 
      this.closeModal();
    }
  }
}
