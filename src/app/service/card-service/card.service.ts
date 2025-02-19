import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardDTO } from 'src/app/models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/cards';

  addCard(card: CardDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, card, {responseType:'text'});
  }

  getUserCards(userId: number): Observable<CardDTO[]> {
    return this.http.get<CardDTO[]>(`${this.baseUrl}/user/${userId}`);
  }

  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${cardId}`, {responseType:'text'});
  }

  updateCard(id: number, card: CardDTO): Observable<CardDTO> {
    return this.http.put<CardDTO>(`${this.baseUrl}/${id}`, card);
  }
  
}
