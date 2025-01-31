import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private apiUrl = 'http://localhost:8080/api/users/update-password';

  constructor(private http: HttpClient) { }

  updatePassword(email: string, newPassword: string): Observable<any> {
    const payload = { email, newPassword };
    return this.http.post(`${this.apiUrl}`, payload, { responseType: 'text' });
  }
  
}
