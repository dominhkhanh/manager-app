import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this._http.post('https://62df8af4976ae7460bee1bd8.mockapi.io/shop', data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this._http.put(`https://62df8af4976ae7460bee1bd8.mockapi.io/shop/${id}`, data);
  }

  getProductList(): Observable<any> {
    return this._http.get('https://62df8af4976ae7460bee1bd8.mockapi.io/shop');
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`https://62df8af4976ae7460bee1bd8.mockapi.io/shop/${id}`);
  }
}
