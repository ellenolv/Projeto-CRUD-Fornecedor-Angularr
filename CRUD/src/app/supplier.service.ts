import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from './Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/supplier';
  getSuppliers():Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.url);
    
  }
  save(supplier : Supplier):Observable<Supplier>{ //se fosse para devolver apenas um cliente: Observable<Client

    return this.http.post<Supplier>(this.url, supplier);
  }
  remove(supplier : Supplier):Observable<void>{ //se fosse para devolver apenas um cliente: Observable<Client

    return this.http.delete<void>(`${this.url}/${supplier.id}`);
  }
  update(supplier : Supplier):Observable<Supplier>{ //se fosse para devolver apenas um cliente: Observable<Client

    return this.http.put<Supplier>(`${this.url}/${supplier.id}`, supplier);
  }

}
