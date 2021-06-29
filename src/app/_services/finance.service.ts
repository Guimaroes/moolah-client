import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const API_URL_FINANCES = environment.apiUrl + "finances/";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private httpClient: HttpClient) { }
  
  getFinances(): Observable<any> {
    return this.httpClient.get(API_URL_FINANCES);
  }

  getUserFinances(userId: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return this.httpClient.get(API_URL_FINANCES, {params: params});
  }

  getFinance(financeId: number): Observable<any> {
    return this.httpClient.get(API_URL_FINANCES + financeId);
  }

  removeFinance(financeId: number): Observable<any> {
    return this.httpClient.delete(API_URL_FINANCES + financeId);
  }

  addFinance(name: String, value: number, typeId: number, userId: number): Observable<any> {
    return this.httpClient.post(API_URL_FINANCES, 
      {
        name,
        value,
        userId,
        typeId
      });
  }

  updateFinance(id: number, name: String, value: number, typeId: number, userId: number): Observable<any> {
    return this.httpClient.put(API_URL_FINANCES + id, 
      {
        name,
        value,
        userId,
        typeId
      });
  }
}