import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private apiUrl = 'http://localhost:8080/api/ratings';

  constructor(private http:HttpClient) { }

  submitRating(ratingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, ratingData);
  }

}
