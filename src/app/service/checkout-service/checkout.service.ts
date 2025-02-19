import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = 'http://localhost:8080/api/cart';
  private apiAddUrl = 'http://localhost:8080/api/cart/add';

  private orderData: any = null;

  constructor(private http:HttpClient) { }

  setOrderData(data: any) {
    this.orderData = data;
  }

  getOrderData() {
    return this.orderData;
  }

  addToCart(cartData: any): Observable<any> {
    return this.http.post(this.apiAddUrl, cartData, { responseType: 'text' });
  }
  
  getCart(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
  
  clearCart(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart/clear/${userId}`);
  }

  getCartByCartId(cartId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart/${cartId}`);
  }
  
}
