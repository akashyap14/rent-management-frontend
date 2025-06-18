import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {
  private baseUrl = 'http://localhost:3000/api/property-types';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  add(name: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { name });
  }

  update(id: string, name: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, { name });
  }
  
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
