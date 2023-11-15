import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../service/form.service';
import { JsonFormData } from '../dynamic-form/dynamic-form.component';
import { AuthenticationService } from 'src/app/user/service/authentication.service';
import Swal from 'sweetalert2';

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registrationForm!: JsonFormData;

  @Output() registerFormEvent = new EventEmitter<RegisterForm>();
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.formService
      .registerForm()
      .subscribe((jsonFormData) => (this.registrationForm = jsonFormData));
  }

  onSubmit(formValue: RegisterForm) {
    this.authenticationService.register(formValue).subscribe({
      next: (data) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Create user successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Error',
          text: 'An error occurred during registration. Please try again.',
        });
      },
    });
  }
}
