import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  decodeToken(token: string): any {
    if (!token) {
      return null;
    }

    try {
      // JWTs are in the format: header.payload.signature
      const parts = token.split('.');
      if (parts.length !== 3) {
        // Not a valid JWT structure
        return null;
      }

      const payload = parts[1];

      // Replace common Base64 URL characters before decoding
      // This step is crucial for working with standard Base64 decoding (atob)
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

      // Use atob() to decode the Base64 string
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      // Parse the JSON string into an object
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding JWT token:', e);
      return null;
    }
  }

  // Example: Get a specific claim (like 'role')
  getClaim(token: string, claimName: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claimName] : null;
  }
}
