import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL_TYPES = "http://localhost:8080/types/";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private httpClient: HttpClient) { }
  
  geTypes(): Observable<any> {
    return this.httpClient.get(API_URL_TYPES);
  }

  getUserTypes(userId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return this.httpClient.get(API_URL_TYPES, {params: params});
  }

  getType(typeId: number): Observable<any> {
    return this.httpClient.get(API_URL_TYPES + typeId);
  }

  removeType(typeId: number): Observable<any> {
    return this.httpClient.delete(API_URL_TYPES + typeId);
  }

  addType(name: String, categoryId: number, userId: number): Observable<any> {
    return this.httpClient.post(API_URL_TYPES, 
      {
        name,
        categoryId,
        userId
      });
  }

  updateType(id: number, name: String, categoryId: number, userId: number): Observable<any> {
    return this.httpClient.put(API_URL_TYPES + id, 
      {
        name,
        categoryId,
        userId
      });
  }
}
