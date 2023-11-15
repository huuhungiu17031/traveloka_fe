import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css'],
})
export class ErrorDisplayComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input({ required: true }) controlName: string = '';

  getErrorMessages(): string {
    let error: string = '';
    if (this.control.errors) {
      const errorKey = Object.keys(this.control.errors)[0];
      switch (errorKey) {
        case 'required':
          error = `${this.controlName} is required.`;
          break;
        case 'minlength':
          error = `${this.controlName} must be at least ${this.control.errors['minlength'].requiredLength} characters.`;
          break;
        case 'email':
          error = `${this.controlName} must be a valid email address.`;
          break;
        default:
          error = `${this.controlName} has an invalid value.`;
          break;
      }
    }
    return error;
  }
}
