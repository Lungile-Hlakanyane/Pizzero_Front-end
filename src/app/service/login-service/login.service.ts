import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/users/login';

  constructor(private http:HttpClient) { }

  login(email: string, password: string): Observable<UserDTO> {
    const body = { email, password };
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<UserDTO>(this.apiUrl, body, { headers });
  }

}
