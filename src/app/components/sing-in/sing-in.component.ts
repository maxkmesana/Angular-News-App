import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/users.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, A11yModule, CommonModule],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})
export class SingInComponent implements OnInit{

  @Output() modalClosed = new EventEmitter<void>();
  @Input() isOpen: boolean = false;

  emailDuplicated$: Observable<boolean> | undefined;
  passwordVisible: boolean = false;
  authService = inject(UserService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    const emailControl = this.form.get('email') as FormControl;
    this.emailDuplicated$ = this.authService.checkDuplicated(emailControl).pipe(
      tap(isDuplicated => {
        // Using tap to avoid modifying the observable data :)
        if (isDuplicated) {
          emailControl.setErrors({ duplicated: true });
        } else {
          const currentErrors = emailControl.errors;
          if (currentErrors) {
            const { duplicated, ...remainingErrors } = currentErrors; // Spread operator to cut duplicated from currentErrors
            emailControl.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
          }
        }
      })
    );
  }

  constructor() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeModal();
      }
    });
  }

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    lastname: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]],
    username: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), 
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z0-9-_@#$%^&+=!?]{8,}$')]]
  })

  onSubmit() {
    const newUser = this.form.getRawValue();

    this.authService.singup(newUser).subscribe({
      next: () => {
        alert('Successfull sing up');
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
   this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  
  closeModal() {
    this.isOpen = false;
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
    if (e.key === 'Escape' && this.isOpen) { 
      this.closeModal();
    }
  }
}
