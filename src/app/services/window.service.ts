import { Injectable } from '@angular/core';

function _window(): any {
  return typeof window !== 'undefined' ? window : null;
}

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  get nativeWindow(): any {
    return _window();
  }
}