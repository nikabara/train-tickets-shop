import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof localStorage !== 'undefined' && localStorage.getItem('isAuthed') && localStorage.getItem('isAuthed') === 'true') {
    return true;
  }

  Swal.fire({
    icon: "warning",
    title: "You are not Signed In",
    showConfirmButton: true,
    confirmButtonText: "Sign In",
    showDenyButton: true,
    denyButtonText: "Sign Up",
  }).then(result => {
    if (result.isConfirmed) {
      router.navigate(['/home'])
    }
    else if (result.isDenied) {
      router.navigate(['/sign-up'])
    }
  })

  return false;
};

