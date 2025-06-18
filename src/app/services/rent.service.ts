import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rent } from '../models/rent.model';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  private baseUrl = 'https://rent-backend-tgta.onrender.com/api/rents'; // Adjust to your API endpoint
  constructor(private http: HttpClient) { }

  getAllRents(): Observable<Rent[]> {
    return this.http.get<Rent[]>(this.baseUrl);
  }

  getRentById(id: string): Observable<Rent> {
    return this.http.get<Rent>(`${this.baseUrl}/${id}`);
  }
  
  addRent(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(this.baseUrl, rent);
  }

  updateRent(id: string, rent: Rent): Observable<Rent> {
    return this.http.put<Rent>(`${this.baseUrl}/${id}`, rent);
  }
  
  deleteRent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
