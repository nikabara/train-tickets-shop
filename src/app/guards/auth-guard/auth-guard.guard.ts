import { CanActivateFn } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('isAuthed') && localStorage.getItem('isAuthed') === 'true') {
    return true;
  }
  
  return false;
};
