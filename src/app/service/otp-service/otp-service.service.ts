import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpServiceService {

  private apiUrl = 'http://localhost:8080/api/users/verify-otp';
  private resendApiUrl = 'http://localhost:8080/api/users/resend-otp';
  private resetPasswordUrl = 'http://localhost:8080/api/users';

  constructor(private http:HttpClient) { }

  verifyOtp(email: string, otp: string): Observable<any> {
    const body = { email, otp };
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' });
  }
  
  resendOtp(email:string):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email };
    return this.http.post(this.resendApiUrl, body, { headers, responseType: 'text' });
  }

  // new methods here
  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.resetPasswordUrl}/reset-password`, { email }, {responseType: 'text'});
  }

  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.resetPasswordUrl}/update-password`, { email, newPassword });
  }
 
}
