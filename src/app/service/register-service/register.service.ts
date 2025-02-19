import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/api/users/signup';

  constructor(
    private httpClient:HttpClient
  ) { }

  registerUser(userData: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, userData, { responseType: 'text' });
  }

}
