import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})
export class SingInComponent implements OnInit{

  emailDuplicated$: Observable<boolean> | undefined;
  passwordVisible: boolean = false;
  authService = inject(UserService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    const emailControl = this.form.get('email') as FormControl;
    this.emailDuplicated$ = this.authService.checkDuplicated(emailControl).pipe(response =>  response)
  }

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    lastname: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
    username: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), 
      /*Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$')]*/]]
  })

  onSubmit() {
    const newUser = this.form.getRawValue();

    this.authService.singup(newUser).subscribe({
      next: () => {
        alert('Successfull sing up')
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
  
}

