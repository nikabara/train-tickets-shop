import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+\d{12}$/)]],
      avatar: ['https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'],
      address: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      gender: ['MALE', [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('showSuccessWindowTrue') === 'true') {
      sessionStorage.removeItem('showSuccessWindow');
      this.showSuccessWindow();
    }
    else if (sessionStorage.getItem('showSuccessWindowTrue') === 'false') {
      sessionStorage.removeItem('showSuccessWindow');
      this.showErrorMessage();
    }
  }

  showSuccessWindow() : void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "An account has been created succesfully"
    });
  }

  showErrorMessage() : void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Could not create an account"
    });
  }

  onFormSubmit() : void {
    if (this.signUpForm.valid) {
      console.log("Success", this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value).subscribe(
        (response) => { 
          window.location.reload();
          this.router.navigate(['/home']);
          sessionStorage.setItem('showSuccessWindowTrue', 'true');
        }, 
        (error) => {
          console.warn(error);
          if (error.status === 409) {
            window.location.reload();
            sessionStorage.setItem('showSuccessWindowTrue', 'false');
          }  
        }
      )
    }
    else {
      console.log("Fail", this.signUpForm);
    }
  }
}
