import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../../services/AppServices/auth.service';
import { JwtService } from '../../services/AppServices/JWT/jwt.service';

export const authGuardGuard: CanActivateFn = (route, state): Observable<boolean> => {
  // const router = inject(Router);

  // return true;

  // if (typeof localStorage !== 'undefined' && localStorage.getItem('isAuthed') && localStorage.getItem('isAuthed') === 'true') {
  //   return true;
  // }

  // // Swal.fire({
  // //   icon: "warning",
  // //   title: "You are not Signed In",
  // //   showConfirmButton: true,
  // //   confirmButtonText: "Sign In",
  // //   showDenyButton: true,
  // //   denyButtonText: "Sign Up",
  // // }).then(result => {
  // //   if (result.isConfirmed) {
  // //     router.navigate(['/home'])
  // //   }
  // //   else if (result.isDenied) {
  // //     router.navigate(['/sign-up'])
  // //   }
  // // })

  // return false;

  const authService: AuthService = inject(AuthService);
  const jwtService: JwtService = inject(JwtService);

  const jwt_token: string | null = localStorage.getItem('jwt_access_token_user');

  // 1. If token is missing, immediately return an Observable that resolves to false.
  if (!jwt_token) {
    console.log("Token missing, access denied.");
    return of(false); // 'of' creates an Observable that immediately emits false
  }

  // 2. If token exists, proceed with the API call and use .pipe() and .map()
  const userId = jwtService.getClaim(jwt_token, 'nameid');

  return authService.IsUserVerified(userId).pipe(
    map((response: any) => {
      console.log(response)
      if (response.data === true) {
        return true;
      }
      else {
        return false;
      }
    })
  )
};

