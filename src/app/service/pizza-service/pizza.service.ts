import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private apiUrl = 'http://localhost:8080/api/pizzas'; 

  constructor(private http:HttpClient) { }

  addPizza(pizza: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('pizza', JSON.stringify(pizza));
    formData.append('file', file);
    
    return this.http.post(this.apiUrl, formData, { responseType: 'text' });
  }
  
  getAllPizzas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); 
  }

  deletePizza(pizzaId: number): Observable<any> {
    const url = `${this.apiUrl}/${pizzaId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  updatePizza(pizza: any) {
    return this.http.put(`${this.apiUrl}/${pizza.id}`, pizza, {responseType:'text'});
  }

  getPizzaCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  addToCart(pizzaId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/addToCart/${pizzaId}/${userId}`, null);
  }
  
  removeFromCart(pizzaId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/removeFromCart/${pizzaId}`, null);
  }
  
}
