import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {

  @Output() modalClosed = new EventEmitter<void>;
  @Input() isOpen: boolean = false;
  @Input() message: string = "Something went wrong!";

  openModal() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    this.isOpen = false;
    document.body.style.overflow = 'auto';
    this.modalClosed.emit();
  }

  
  // onBackdropClick(event: MouseEvent) {
  //   if (event.target === event.currentTarget) {
  //     this.closeModal();
  //   }
  // }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleEscKey);
  }

  handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isOpen) { 
      this.closeModal();
    }
  }
}
